import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import os
import random
from collections import deque
from Algorithm.Hexmodel import HexNet
from Algorithm.Selfplay import SelfPlay, ReplayBuffer

class Trainer:
    def __init__(self, model, buffer, self_play, save_dir="checkpoints", device="cpu"):
        self.model = model
        self.buffer = buffer
        self.self_play = self_play
        self.save_dir = save_dir
        self.device = device
        self.optimizer = optim.Adam(model.parameters(), lr=0.001)
        os.makedirs(save_dir, exist_ok=True)

    def train_step(self, batch_size=512):
        if len(self.buffer) < batch_size:
            return None

        batch = self.buffer.sample(batch_size)
        states, policies, values = zip(*batch)

        states = torch.stack(states).to(self.device)
        policies = torch.stack(policies).to(self.device)
        values = torch.stack(values).to(self.device)

        pred_policies, pred_values = self.model(states)
        policy_loss = nn.CrossEntropyLoss()(pred_policies, policies)
        value_loss = nn.MSELoss()(pred_values.squeeze(), values)
        total_loss = policy_loss + value_loss

        self.optimizer.zero_grad()
        total_loss.backward()
        self.optimizer.step()

        return {
            "total_loss": total_loss.item(),
            "policy_loss": policy_loss.item(),
            "value_loss": value_loss.item()
        }

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

    def train(self, total_games=10000):
        for game_id in range(1, total_games + 1):
            game_data, final_board, final_last_moves = self.self_play.generate_game()
            self.buffer.add(game_data)

            if game_id % 100 == 0:
                self.save_replay(final_board, final_last_moves, game_id)
                print(f"已保存游戏 {game_id} 的终局棋谱")

            metrics = self.train_step(batch_size=512)
            if metrics:
                print(f"游戏 {game_id}/{total_games} | "
                      f"总损失: {metrics['total_loss']:.4f} | "
                      f"策略损失: {metrics['policy_loss']:.4f} | "
                      f"价值损失: {metrics['value_loss']:.4f}")

            if game_id % 500 == 0:
                self.save_checkpoint(game_id)
                print(f"已保存检查点至游戏 {game_id}")

        self.save_checkpoint(total_games)
        print("训练完成！最终模型已保存")

def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = HexNet().to(device)
    buffer = ReplayBuffer(capacity=100000)
    self_play = SelfPlay(model=model, buffer=buffer, device=device)
    trainer = Trainer(
        model=model,
        buffer=buffer,
        self_play=self_play,
        save_dir="checkpoints",
        device=device
    )

    start_game_id = 0
    checkpoint_path = "checkpoints/latest_model.pth"
    if os.path.exists(checkpoint_path):
        checkpoint = torch.load(checkpoint_path, map_location=device)
        model.load_state_dict(checkpoint["model_state"])
        trainer.optimizer.load_state_dict(checkpoint["optimizer_state"])
        start_game_id = checkpoint["game_id"]
        print(f"已从游戏 {start_game_id} 恢复训练")

    trainer.train(total_games=10000)

if __name__ == "__main__":
    os.makedirs("checkpoints", exist_ok=True)
    main()