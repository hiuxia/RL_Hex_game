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
        #self.env = HexGame() 
    def generate_game(self):
        # 初始化环境
        self.env.reset()
        game_history = []
        
        while not self.env.is_terminal():
            # 获取当前状态
            current_board = self.env.get_board()
            last_moves = self.env.get_last_moves()  # 假设环境提供此方法
            
            # 动态计算合法动作（所有空位置）
            legal_moves = np.argwhere(current_board == 0).tolist()  # [(x1,y1), (x2,y2), ...]
            
            # 预处理输入
            input_tensor = self.preprocess_input({
                "board": current_board,
                "last_moves": last_moves,
                "player_turn": "AI"  # 训练时忽略此字段
            })
            
            # 模型预测
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            
            # 生成动作概率（仅合法位置）
            policy_probs = torch.softmax(policy_logits, dim=-1).squeeze().numpy()
            legal_indices = [x*11 + y for (x,y) in legal_moves]
            legal_probs = policy_probs[legal_indices]
            legal_probs /= legal_probs.sum()  # 重新归一化
            
            # 选择动作
            action_idx = np.random.choice(len(legal_probs), p=legal_probs)
            action = legal_moves[action_idx]
            
            # 执行动作并记录数据
            self.env.step(action)
            game_history.append((input_tensor, legal_probs, value))
        
        # 生成终局棋谱
        final_board = self.env.get_board()
        final_last_moves = self.env.get_last_moves()
        return game_history, final_board, final_last_moves

