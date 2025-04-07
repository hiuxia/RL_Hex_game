hex_ai = HexAI()

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