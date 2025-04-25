import os
from pathlib import Path

# Get current script directory
current_dir = Path(__file__).parent
print("Current Directory:", current_dir)

# Navigate to target directory
os.chdir(current_dir.resolve())  # resolve() normalizes the path


import numpy as np
import torch
from Hexmodel import HexNet


class HexAI:
    def __init__(self, model_path):
        self.model = self.load_model(model_path)

    def load_model(self, model_path):
        model = HexNet()  # Model Seleciton
        if torch.cuda.is_available():
            device = torch.device("cuda")
            print("Using CUDA device.")
        elif torch.backends.mps.is_available():
            device = torch.device("mps")
            print("Using MPS device.")
        else:
            device = torch.device("cpu")
            print("Using CPU device.")

        # Load the state dictionary with map_location to ensure compatibility
        state_dict = torch.load(model_path, map_location=device)

        # Check if the state_dict is nested (e.g., contains 'model_state')
        if "model_state" in state_dict:
            model.load_state_dict(state_dict["model_state"])
        else:
            # Assume the loaded object is directly the state_dict
            # model.load_state_dict(state_dict)
            raise ValueError("Invalid model state dictionary format.")

        model.to(device)  # Move the model to the selected device
        model.eval()
        return model

    def preprocess_input(self, input):
        # Dict -> Tensor
        board = np.array(input["board"])
        last_moves = np.array(input["last_moves"])
        current_player = 2 * (-1 * np.sum(board) + 0.5)  # check current player
        if current_player == -1:
            board = -1 * board.T
            last_moves = last_moves.T
        # Read: input_tensor 第一维度为当前局面，第二维度为落子顺序
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        # print(current_player)
        input_tensor[0] = (board).astype(np.float32)  # Current player
        # print ("current:",input_tensor[0])
        input_tensor[1] = (last_moves).astype(
            np.float32
        )  # opponent player#考虑改为最后动作
        # print ("opponent:",input_tensor[1])
        # print(np.where("board" == 0))
        return current_player, torch.from_numpy(input_tensor).unsqueeze(
            0
        )  # 添加batch维度

    def predict(self, input_dict):
        # Preprocess
        current_player, input_tensor = self.preprocess_input(input_dict)

        # Get the device that the model is on
        device = next(self.model.parameters()).device

        # Move input tensor to the same device as the model
        input_tensor = input_tensor.to(device)

        legal_moves = (
            np.argwhere(np.array(input_dict["board"]) == 0).tolist()
            if current_player == 1
            else np.argwhere(np.array(input_dict["board"]).T == 0).tolist()
        )

        if self.model:
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            probs_device = torch.softmax(policy_logits, dim=-1)
            move_probs = (
                probs_device.flatten()
                if current_player == 1
                else probs_device.reshape(11, 11).T.flatten()
            )
        else:
            # 若无模型，随机选择合法动作
            move_probs = np.ones(
                np.shape(np.array(input_dict["board"]))
            ).flatten() / len(legal_moves)
            print("Notice: No model selected.")

        # index = row * width + column
        if current_player == 1:
            legal_indices = [lst[0] * 11 + lst[1] for lst in legal_moves]
        else:
            legal_indices = [lst[1] * 11 + lst[0] for lst in legal_moves]

        # TODO:待更改：把输出最高prob改成输出top3

        legal_probs = move_probs[legal_indices]
        optimal_idx = torch.argmax(legal_probs).item()
        optimal_move = legal_moves[optimal_idx]
        winning_rate = (
            (value.item() + 1) / 2 if self.model else 0.5
        )  # [-1,1]->[0,1], 0.5 if no model selected
        return {"optimal_move": optimal_move, "winning_rate": round(winning_rate, 2)}


hex_ai = HexAI(model_path="../model/model600.pth")

# 模拟后端输入
input_data = {
    "board": [
        [1, -1, 1, -1, 1, 0, -1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    "player_turn": "AI",
    "last_moves": [
        [1, 4, 3, 2, 11, 0, 12, 13, 0, 0, 0],
        [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 9, 0, 0, 0, 0, 0, 8, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    # "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("胜率:", output["winning_rate"])
