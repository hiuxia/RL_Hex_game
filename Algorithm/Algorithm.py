
import torch
import numpy as np
from .Hexmodel import HexModel

class HexAI:
    def __init__(self, model_path=None):
        # 初始化模型（当前可以是随机策略，未来替换为训练后的模型）
        self.model = self.load_model(model_path) if model_path else None

    def load_model(self, model_path):
        """加载训练好的PyTorch模型"""
        model = HexModel  # Model Seleciton
        model.load_state_dict(torch.load(model_path))
        model.eval()
        return model

    def preprocess_input(self, input):
        """将输入字典转换为模型需要的张量格式"""
        board = np.array(input["board"])
        current_player = 2*(-board.sum()+0.5) #check current player
        input_tensor = np.zeros((3, 11, 11), dtype=np.float32)
        input_tensor[0] = (board * current_player).astype(np.float32)  # Current player
        print ("current:",input_tensor[0])
        input_tensor[1] = (np.array(input["last_moves"])).astype(np.float32)  # opponent player#考虑改为最后动作
        print ("opponent:",input_tensor[1])
        #print(np.where("board" == 0))
        return torch.from_numpy(input_tensor).unsqueeze(0)  # 添加batch维度
        

    def predict(self, input_dict):
        """核心逻辑：生成最优动作和胜率"""
        # 1. 预处理输入数据
        input_tensor = self.preprocess_input(input_dict)
        
        # 2. 调用模型预测（此处以随机动作为例，未来替换为模型推理）
        if self.model:
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            move_probs = torch.softmax(policy_logits, dim=-1).numpy().flatten()
        else:
            # 若无模型，随机选择合法动作
            move_probs = np.ones(len(input_dict["legal_moves"])) / len(input_dict["legal_moves"])

        # 3. 过滤合法动作的概率
        legal_indices = [self.coord_to_index(x, y) for (x, y) in input_dict["legal_moves"]]
        legal_probs = move_probs[legal_indices]
        optimal_idx = np.argmax(legal_probs)
        optimal_move = input_dict["legal_moves"][optimal_idx]

        # 4. 胜率计算（此处假设value为AI的胜率）
        winning_rate = value.item() if self.model else 0.5  # 若无模型，假设AI胜率75%
     

        return {
            "optimal_move": optimal_move,
            "winning_rate": round(winning_rate, 2)
        }

    @staticmethod
    def coord_to_index(x, y):
        """将坐标(x,y)转换为模型输出的索引（假设模型输出为11x11的展平概率）"""
        return x * 11 + y






hex_ai = HexAI()

# 模拟后端输入
input_data = {
    "board": [[1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],  
    "player_turn": "AI",
    "last_moves": [[1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("胜率:", output["winning_rate"])
