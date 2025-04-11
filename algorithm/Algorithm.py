
import torch
import numpy as np
from Hexmodel import HexNet

class HexAI:
    def __init__(self, model_path=None):
        self.model = self.load_model(model_path) if model_path else None
        

    def load_model(self, model_path):
        model = HexNet()  # Model Seleciton
        model.load_state_dict(torch.load(model_path)["model_state"])
        model.eval()
        return model

    def preprocess_input(self, input):
        #Dict -> Tensor
        board = np.array(input["board"])
        last_moves = np.array(input["last_moves"])
        current_player = 2*(-1*np.sum(board)+0.5) #check current player
        if current_player == -1:
            board = -1 * board.T
            last_moves = last_moves.T
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        print(current_player)
        input_tensor[0] = (board).astype(np.float32)  # Current player
        #print ("current:",input_tensor[0])
        input_tensor[1] = (last_moves).astype(np.float32)  # opponent player#考虑改为最后动作
        #print ("opponent:",input_tensor[1])
        #print(np.where("board" == 0))
        return current_player, torch.from_numpy(input_tensor).unsqueeze(0)  # 添加batch维度
        

    def predict(self, input_dict):
        # Preprocess
        current_player, input_tensor = self.preprocess_input(input_dict)
        #print(current_player)
        legal_moves = np.argwhere(np.array(input_dict["board"])==0).tolist()
        #print(np.argwhere(np.array(input_dict["board"])==0).tolist())
        if self.model:
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            move_probs = torch.softmax(policy_logits, dim=-1).cpu().numpy().flatten() if current_player == 1 else (torch.softmax(policy_logits, dim=-1).cpu().numpy()).reshape(11,11).T.flatten()
        else:
            # Random Action If no model selected
            move_probs = np.ones(np.shape(np.array(input_dict["board"]))).flatten() / len(legal_moves)
            #print(np.shape(np.array(input_dict["board"])))
            #print(move_probs)
            print("Notice: No model selected.")
        #print(list(range(len(legal_moves))))
        legal_indices = [lst[0]*11 + lst[1] for lst in legal_moves]
        #legal_indices = list(range(len(legal_moves)))
        #print(legal_indices)
        #######################################待更改：把输出最高prob改成输出top3
        legal_probs = move_probs[legal_indices]
        optimal_idx = np.argmax(legal_probs)
        optimal_move = legal_moves[optimal_idx]
        winning_rate = (value.item()+1)/2 if self.model else 0.5  #[-1,1]->[0,1], 0.5 if no model selected
        return {"optimal_move": optimal_move,"winning_rate": round(winning_rate, 2)}


hex_ai = HexAI(model_path="./py_checkpoints/model50.pth")############################ ←这里输入模型路径 MODEL PATH HERE

# 模拟后端输入
input_data = {
    "board": [[1, -1, 1, -1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]],  
    "player_turn": "AI",
    "last_moves": [[1, 4, 3, 2, 11, 0, 0, 0, 0, 0, 0],
            [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 9, 0, 0, 0, 0, 0, 8, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    #"legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("胜率:", output["winning_rate"])
