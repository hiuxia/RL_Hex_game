import torch
import numpy as np
from collections import deque
import random

class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)
    
    def add(self, experience):
        """添加单局游戏数据"""
        self.buffer.extend(experience)
    
    def sample(self, batch_size):
        """随机采样批次数据"""
        return random.sample(self.buffer, min(len(self.buffer), batch_size))
    
    def __len__(self):
        return len(self.buffer)

# ======================
# 自对弈生成器
# ======================

class SelfPlay:
    def __init__(self, model, buffer, device):
        """初始化自对弈模块"""
        self.model = model
        self.buffer = buffer
        self.device = device
        self.env = HexGame()

    def preprocess_input(self, input):
        """同algorithm"""
        board = np.array(input["board"])
        current_player = 2*(-board.sum()+0.5) #check current player
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        input_tensor[0] = (board * current_player).astype(np.float32)  # Current player
        #print ("current:",input_tensor[0])
        input_tensor[1] = (np.array(input["last_moves"])).astype(np.float32)  # opponent player#考虑改为最后动作
        #print ("opponent:",input_tensor[1])
        #print(np.where("board" == 0))
        return torch.from_numpy(input_tensor).unsqueeze(0)  # 添加batch维度
    
    def generate_game(self):
        # 初始化环境
        self.env.reset()
        game_history = []
        
        while not self.env.is_terminal():
            # 获取当前状态
            input = self.env.output()
            # 动态计算合法动作（所有空位置）
            legal_moves = np.argwhere(np.array(input["board"]) == 0).tolist()  # [(x1,y1), (x2,y2), ...]
            
            # 预处理输入
            input_tensor = self.preprocess_input(input)
            
            # 模型预测
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            
            # 生成动作概率（仅合法位置）
            policy_probs = torch.softmax(policy_logits, dim=-1).squeeze().numpy()
            legal_indices = [lst[0]*11 + lst[1] for lst in legal_moves]
            legal_probs = policy_probs[legal_indices]
            legal_probs /= legal_probs.sum()  # 重新归一化
            
            # 选择动作
            action_idx = np.random.choice(len(legal_probs), p=legal_probs)
            action = legal_moves[action_idx]
            
            # 执行动作并记录数据
            self.env.step(action)
            game_history.append((input_tensor, legal_probs, value))
        
        # 生成终局棋谱
        final_board = self.env.output()["board"]
        return game_history, final_board, final_last_moves

