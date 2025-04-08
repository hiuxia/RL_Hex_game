import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import os
from collections import deque
from Python.Hexmodel import HexModel
from Python.Selfplay import ReplayBuffer,SelfPlay


class Trainer:
    def __init__(self, model, buffer, save_dir="checkpoints"):
        self.model = model
        self.buffer = buffer
        self.save_dir = save_dir
        os.makedirs(save_dir, exist_ok=True)
        
    def train(self, total_games=10000):
        game_count = 0
        for _ in range(total_games // 100):
            # 生成100局游戏
            for _ in range(100):
                game_data, final_board, final_last_moves = self.self_play.generate_game()
                self.buffer.add(game_data)
                game_count += 1
            self.save_replay(final_board, final_last_moves, game_count)
            
            # 训练模型
            self.update_model()
            
            # 保存检查点
            self.save_checkpoint(game_count)

    def save_replay(self, board, last_moves, game_id):
        np.savez(
            f"{self.save_dir}/replay_{game_id}.npz",
            board=board,
            last_moves=last_moves
        )

    def save_checkpoint(self, game_id):
        torch.save({
            "model_state": self.model.state_dict(),
            "optimizer_state": self.optimizer.state_dict(),
            "game_id": game_id
        }, f"{self.save_dir}/model_{game_id}.pth")


def main():
    # ======================
    # 1. 初始化核心组件
    # ======================
    # 设备选择（优先GPU）
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    # 初始化模型和回放缓冲区
    model = HexModel().to(device)
    buffer = ReplayBuffer(capacity=100000)
    
    # 初始化自对弈和训练模块
    self_play = SelfPlay(model=model, buffer=buffer, device=device)
    trainer = Trainer(
        model=model,
        buffer=buffer,
        save_dir="checkpoints"
    )
    
    # ======================
    # 2. 加载已有检查点（可选）
    # ======================
    start_game_id = 0
    checkpoint_path = "checkpoints/latest_model.pth"
    if os.path.exists(checkpoint_path):
        checkpoint = torch.load(checkpoint_path, map_location=device)
        model.load_state_dict(checkpoint["model_state"])
        trainer.optimizer.load_state_dict(checkpoint["optimizer_state"])
        start_game_id = checkpoint["game_id"]
        print(f"已从游戏 {start_game_id} 恢复训练")

    # ======================
    # 3. 主训练循环
    # ======================
    total_games = 10000  # 总训练局数
    save_interval = 100  # 保存间隔
    
    for game_id in range(start_game_id + 1, total_games + 1):
        # 生成单局自对弈数据
        game_data, final_board, final_last_moves = self_play.generate_game()
        buffer.add(game_data)
        
        # 每100局保存棋谱
        if game_id % save_interval == 0:
            trainer.save_replay(final_board, final_last_moves, game_id)
            print(f"已保存游戏 {game_id} 的终局棋谱")
        
        # 训练模型（每局训练一次）
        metrics = trainer.train_step(batch_size=512)
        
        # 打印训练指标
        if metrics:
            print(f"游戏 {game_id}/{total_games} | "
                  f"总损失: {metrics['total_loss']:.4f} | "
                  f"策略损失: {metrics['policy_loss']:.4f} | "
                  f"价值损失: {metrics['value_loss']:.4f}")
        
        # 定期保存检查点
        if game_id % 500 == 0:
            trainer.save_checkpoint(game_id)
            print(f"已保存检查点至游戏 {game_id}")

    # ======================
    # 4. 最终保存
    # ======================
    trainer.save_checkpoint(total_games)
    print("训练完成！最终模型已保存")

if __name__ == "__main__":
    # 创建检查点目录
    os.makedirs("checkpoints", exist_ok=True)
    main()
