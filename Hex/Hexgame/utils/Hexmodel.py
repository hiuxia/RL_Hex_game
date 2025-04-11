import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from collections import deque
import random
# ======================
# 1. 神经网络模型定义
# ======================
class HexNet(nn.Module):
    """Hex策略-价值网络 (兼容AlphaZero架构)"""
    def __init__(self, board_size=11, num_channels=256, num_res_blocks=4):
        super().__init__()
        self.board_size = board_size
        
        # 输入通道：2 (玩家1位置, 玩家2位置, 当前玩家)
        self.conv_in = nn.Conv2d(2, num_channels, 3, padding=1)
        self.bn_in = nn.BatchNorm2d(num_channels)
        
        # 残差块堆叠
        self.res_blocks = nn.ModuleList([
            nn.Sequential(
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels),
                nn.ReLU(),
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels)
            ) for _ in range(num_res_blocks)
        ])
        
        # 策略头
        self.policy_head = nn.Sequential(
            nn.Conv2d(num_channels, 2, 1),
            nn.Flatten(),
            nn.Linear(2*board_size*board_size, board_size*board_size)
        )
        
        # 价值头
        self.value_head = nn.Sequential(
            nn.Conv2d(num_channels, 1, 1),
            nn.Flatten(),
            nn.Linear(board_size*board_size, 256),
            nn.ReLU(),
            nn.Linear(256, 1),
            nn.Tanh()
        )


    def forward(self, x):
        x = torch.relu(self.bn_in(self.conv_in(x)))#Residual
        for block in self.res_blocks:
            x = block(x) + x 
            x = torch.relu(x)
        policy = self.policy_head(x)
        value = self.value_head(x)
        return policy, value
# ======================
# 2. 经验回放缓冲区
# ======================
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
# 3. 自对弈生成器
# ======================
class SelfPlay:
    def __init__(self, model, buffer):
        self.model = model
        self.buffer = buffer
        # self.env = HexGame()  # 假设已实现Hex游戏逻辑
    
    def generate_game(self, temperature=1.0):
        """生成一局自对弈数据"""
        states = []
        probs = []
        current_player = 1
        self.env.reset()
        
        while not self.env.is_terminal():
            # 获取当前状态
            board_state = self.env.get_state()
            legal_moves = self.env.legal_moves()
            
            # 模型预测
            with torch.no_grad():
                policy_logits, value = self.model(board_state)
            
            # 转换为动作概率（可添加噪声）
            policy = torch.softmax(policy_logits/temperature, dim=-1)
            action_probs = policy.squeeze().numpy()
            
            # 过滤非法动作
            legal_mask = np.zeros_like(action_probs)
            for move in legal_moves:
                idx = move[0]*self.env.size + move[1]
                legal_mask[idx] = 1
            action_probs *= legal_mask
            action_probs /= np.sum(action_probs)
            
            # 保存训练数据
            states.append({
                "state": board_state,
                "player": current_player,
                "legal_moves": legal_moves
            })
            probs.append(action_probs)
            
            # 执行动作
            action_idx = np.random.choice(len(action_probs), p=action_probs)
            action = (action_idx//self.env.size, action_idx%self.env.size)
            self.env.step(action)
            current_player = 3 - current_player
        
        # 获取最终胜负
        winner = self.env.get_winner()
        
        # 生成训练样本
        game_data = []
        for i, (state, prob) in enumerate(zip(states, probs)):
            reward = 1 if state["player"] == winner else -1
            game_data.append((
                state["state"],
                prob,
                torch.tensor([reward], dtype=torch.float32)
            ))
        
        self.buffer.add(game_data)



