import torch
import numpy as np
from collections import deque
from torch.utils.data import Dataset, DataLoader
import random
from .GameLogic import HexGame #这里不用relative import反而会在运行train.py的时候报错
from .MCTS import MCTS #这里不用relative import反而会在运行train.py的时候报错

class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)
    
    def add(self, experience):
        self.buffer.extend(experience)
    
    def sample(self, batch_size):
        return random.sample(self.buffer, min(len(self.buffer), batch_size))
    
    def __len__(self):
        return len(self.buffer)

class ReplayDataset(Dataset):
    def __init__(self, buffer):
        # 确保 buffer.buffer 是 deque 或可索引对象
        self.buffer = list(buffer.buffer)  # 将 deque 转换为 list
    
    def __len__(self):
        return len(self.buffer)
    
    def __getitem__(self, idx):
        data = self.buffer[idx]
        state = data["state"].squeeze(0)  # 形状 [2,11,11]
        policy = data["policy"]           # 形状 [11,11]
        value = data["value"]
        return {
            "state": torch.FloatTensor(state),  # 确保转换为 Tensor
            "policy": torch.FloatTensor(policy),
            "value": torch.FloatTensor([value])
        }

class SelfPlay:
    def __init__(self, model, buffer, device):
        self.model = model.to(device)
        self.buffer = buffer
        self.device = device
        self.env = HexGame()
    """
    def preprocess_input(self, state_dict):
        board = np.array(state_dict["board"], dtype=np.float32)
        last_moves = np.array(state_dict["last_moves"], dtype=np.float32)
        input_np = np.stack([board, last_moves], axis=0)  # shape(2,11,11)
        input_tensor = torch.tensor(input_np, dtype=torch.float32)  # tensor
        return input_tensor.unsqueeze(0)  # shape(1,2,11,11)"""
    
    def preprocess_input(self, state_dict):
        board = np.array(state_dict["board"], dtype=np.float32)
        last_moves = np.array(state_dict["last_moves"], dtype=np.float32)
        if self.env.current_player == -1 and np.sum(board) == 1: #make sure the board is filpped
            board = -1 * board.T  # Flip the board
            last_moves = last_moves.T  # Flip the board
        input_np = np.stack([board, last_moves], axis=0)  #shape(2,11,11)
        return torch.tensor(input_np, dtype=torch.float32).unsqueeze(0)

    def generate_game(self):
        # Initialize
        self.env.reset()
        game_history = []
        mcts = MCTS(self.model, device=self.device)
        while True:
            # Check Winner and end loop
            terminal_status = self.env.is_terminal()
            if terminal_status != 0:
                winner = 1 if terminal_status == 1 else -1
                break
            '''
            #########################[Without  MCTS]#########################
            input = self.env.output()
            legal_moves = np.argwhere(np.array(input["board"]) == 0).tolist()
            # Preprocess
            input_tensor = self.preprocess_input(input).to(self.device)
            
            # Model Prediction
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            
            # Legal Movements
            policy_probs = torch.softmax(policy_logits, dim=-1).squeeze().cpu().numpy()
            if policy_probs.ndim == 1:
                policy_probs = policy_probs.reshape(11, 11)
            
            legal_indices = [lst[0]*11 + lst[1] for lst in legal_moves]
            legal_probs = policy_probs.reshape(-1)[legal_indices]
            legal_probs /= legal_probs.sum()
            
            # Apply Action
            action_idx = np.random.choice(len(legal_probs), p=legal_probs)
            x, y = legal_moves[action_idx]
            self.env.make_move(x, y)
            game_history.append({
                "state": input_tensor.cpu(),
                "policy": policy_probs,    
                "value": value.item(),
                "action": (x, y)
            })
            #########################[Without  MCTS]#########################
            '''
            ###########################[With MCTS]###########################
            mcts_policy = mcts.search(self.env)
            # 选择动作（按概率采样）
            actions = list(mcts_policy.keys())
            probs = list(mcts_policy.values())
            action = actions[np.random.choice(len(actions), p=probs)]
            # 执行动作
            current_state = self.env.output()
            current_player = 2*(np.sum(np.array(current_state["board"]))+0.5)
            self.env.make_move(action[0], action[1])
            #print("-------------------------------")###################
            #print(np.array(current_state["board"]))####################
            #print("#of Actions:",len(actions))##################################
            game_history.append({
                "state": self.preprocess_input(current_state),
                "policy": self._policy_to_matrix(mcts_policy),
                "value": None,  
                "player": current_player
            })
        #print("========Check point passed=======")#####################
        for data in game_history:
            data["value"] = 1.0 if data["player"] == winner else -1.0
            ###########################[With MCTS]###########################
        
        final_board = self.env.output()["board"]
        #print(np.array(final_board))
        return game_history, final_board, winner
    
    def _policy_to_matrix(self, mcts_policy):
        policy_matrix = np.zeros((11, 11), dtype=np.float32)
        for (x, y), prob in mcts_policy.items():
            policy_matrix[x, y] = prob
        return policy_matrix
