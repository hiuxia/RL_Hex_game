"""hex_ai = HexAI("../model/model1000.pth")

# 模拟后端输入
input_data = {
    "board": [[0]*11 for _ in range(11)],  # 空棋盘
    "player_turn": "AI",
    "last_moves": [],
    "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("人类胜率:", output["win_rate_human"])
print("AI胜率:", output["win_rate_AI"])
"""

from GameLogic import HexGame

game = HexGame()
test_state = {
    "board": [
        [1, 1, 1, -1, 0, -1, 1, -1, 0, 1, -1],
        [-1, 1, -1, 1, 0, -1, 0, 0, 0, 1, -1],
        [-1, -1, 1, 1, 0, 1, -1, -1, -1, -1, 1],
        [1, -1, -1, 1, -1, 0, 0, 0, -1, -1, 0],
        [1, -1, -1, -1, 1, 0, -1, 1, 1, 0, 0],
        [-1, 0, 0, 1, 1, 1, 1, 1, -1, -1, 1],
        [-1, -1, -1, 1, -1, -1, -1, 0, 1, 1, 1],
        [0, 1, 0, 1, 0, 0, 1, 1, -1, 0, 0],
        [1, -1, 0, 1, 0, -1, -1, -1, 0, 0, 0],
        [0, -1, 1, -1, 1, 1, 0, 1, 1, 0, -1],
        [-1, 0, -1, 1, 1, 0, 0, 0, 1, -1, 1],
    ],
    "last_moves": [
        [1, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 3, 0, 3, 5, 0, 0, 0, 0, 0, 0],
        [24, 0, 0, 30, 7, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 28, 9, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 26, 11, 0, 10, 0, 0, 0, 0],
        [0, 0, 0, 12, 13, 0, 34, 0, 0, 0, 0],
        [0, 0, 0, 14, 15, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 18, 19, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 20, 21, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0],
    ],
}
import numpy as np

game.insert(test_state)
print(np.array(game.board))
game.make_move(2,10)
print(np.array(game.board))
game.make_move(2,10)
#print(game.output())
print(np.array(game.board))
print(game.current_player)
print(game.is_terminal())  # 输出-1（后手胜）
