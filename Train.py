import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import torch.optim as optim
import numpy as np
import os
from Algorithm.Hexmodel import HexNet
from Algorithm.Selfplay import SelfPlay, ReplayBuffer,ReplayDataset

class Trainer:
    def __init__(self, model, buffer, self_play, save_dir="py_checkpoints", device=torch.device('cuda' if torch.cuda.is_available() else 'cpu'),num_workers=4):
        self.model = model
        self.buffer = buffer
        self.self_play = self_play
        self.save_dir = save_dir
        self.device = device
        self.optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-4) #in case of overfitting
        self.num_workers = num_workers  # 新增
        os.makedirs(save_dir, exist_ok=True)
        self.dataset = None
        self.dataloader = None
    '''
    def train_step(self, batch_size=256): 
        #print("train step 1: len(self.buffer) = ",len(self.buffer))#######################
        if len(self.buffer) < batch_size:#Skip small batches
            print("size = ",len(self.buffer), "Too small, Not Considered")
            return None
        batch = self.buffer.sample(batch_size)
        states = [data["state"].to(self.device) for data in batch]
        policies = [data["policy"] for data in batch]
        values = [data["value"] for data in batch]
        # Stack step:
        states = torch.stack(states).squeeze(1)  # 形状 [batch_size, 2, 11, 11]
        policies = torch.stack([torch.from_numpy(p).float().to(self.device) for p in policies]).view(-1, 11*11)#for 11x11board size
        values = torch.tensor(values).float().to(self.device)
        pred_policies, pred_values = self.model(states)
        # LOSS:
        #policy_loss = nn.CrossEntropyLoss()(pred_policies.view(-1, 11*11), policies.view(-1, 11*11))
        policy_loss = nn.KLDivLoss(reduction='batchmean')(pred_policies.log_softmax(dim=-1),policies)#KL-Divergence Loss
        value_loss = nn.MSELoss()(pred_values.squeeze(), values) #MSE Loss
        total_loss = policy_loss + value_loss #Total
        # Backward
        self.optimizer.zero_grad()
        total_loss.backward()
        self.optimizer.step()
        #print("================================trainstep_COMPLETE================================")
        return {
            "total_loss": total_loss.item(),
            "policy_loss": policy_loss.item(),
            "value_loss": value_loss.item()
        }'''
    def train_step(self, batch_size=1):
        if len(self.buffer) < batch_size:
            print(f"size = {len(self.buffer)} Too small, Not Considered")
            return None
        
        # DataLoader
        #print(self.num_workers)
        if self.dataset is None or len(self.dataset) != len(self.buffer):
            self.dataset = ReplayDataset(self.buffer)
            self.dataloader = DataLoader(
                self.dataset,
                batch_size=batch_size,
                shuffle=True,
                num_workers=self.num_workers,
                pin_memory=True
            )
        
        try:
            batch = next(iter(self.dataloader))
        except StopIteration:
            self.dataloader = DataLoader(
                self.dataset,
                batch_size=batch_size,
                shuffle=True,
                num_workers=self.num_workers,
                pin_memory=True
            )
            batch = next(iter(self.dataloader))
        
        # 提取数据并传输到设备
        states = batch["state"].to(self.device, non_blocking=True)
        policies = batch["policy"].view(-1, 11*11).to(self.device, non_blocking=True)
        values = batch["value"].to(self.device, non_blocking=True)
        
        # 模型前向和损失计算（保持不变）
        pred_policies, pred_values = self.model(states)
        policy_loss = nn.KLDivLoss(reduction='batchmean')(pred_policies.log_softmax(dim=-1), policies)#KL-Divergence LOSS
        value_loss = nn.MSELoss()(pred_values.squeeze(), values.squeeze())#MSE LOSS
        total_loss = policy_loss + value_loss
        
        # 反向传播
        self.optimizer.zero_grad()
        total_loss.backward()
        self.optimizer.step()
        
        return {
            "total_loss": total_loss.item(),
            "policy_loss": policy_loss.item(),
            "value_loss": value_loss.item()
        }

    def save_replay(self, board, last_moves, game_id):
        os.makedirs(self.save_dir, exist_ok=True)#Create dirs if not exist
        file_path = os.path.join(self.save_dir, f"replay_{game_id}.npz")
        # SAVE FINAL GAME
        np.savez(file_path, board=board, last_moves=last_moves)
        print(f"Game: {game_id} has been SAVED to: {file_path}")

    def save_checkpoint(self, game_id):
        os.makedirs(self.save_dir, exist_ok=True)#Create dirs if not exist
        torch.save({
            "model_state": self.model.state_dict(),
            "optimizer_state": self.optimizer.state_dict(),
            "game_id": game_id
        }, f"{self.save_dir}/latest_model.pth")
    ###########################################################################################
    def train(self, start_id, total_games=300):####################################<-Total Game
        for game_id in range(start_id+1, total_games + start_id + 1):
            game_data, final_board, final_last_moves = self.self_play.generate_game()
            #print("GAME: ",game_id," Processe01 PASSED")###############
            self.buffer.add(game_data)
            #print("GAME: ",game_id," Processe02 PASSED")################
            #print(f"Buffer size: {len(self.buffer)}") 
            if game_id % 100 == 0:
                self.save_replay(final_board, final_last_moves, game_id)
            metrics = self.train_step()
            #print("GAME: ",game_id," Processe03 PASSED")###############
            #print(len(self.buffer))
            if metrics:
                print(f"GAME {game_id}/{total_games+start_id} | "
                      f"Total LOSS: {metrics['total_loss']:.4f} | "
                      f"Policy LOSS: {metrics['policy_loss']:.4f} | "
                      f"Value LOSS: {metrics['value_loss']:.4f}")

            if game_id % 100 == 0:
                self.save_checkpoint(game_id)
        self.save_checkpoint(total_games)
        print("Training Completed! Model SAVED!")



def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = HexNet().to(device)
    buffer = ReplayBuffer(capacity=100000)
    self_play = SelfPlay(model=model, buffer=buffer, device=device)
    trainer = Trainer(
        model=model,
        buffer=buffer,
        self_play=self_play,
        save_dir="./py_checkpoints",
        device=device,
        num_workers= 4
    )
    print("<------------------------------------ENVIRONMENT SETTED------------------------------------------->")
    start_game_id = 0
    checkpoint_path = "./py_checkpoints/latest_model.pth"
    if os.path.exists(checkpoint_path):
        checkpoint = torch.load(checkpoint_path, map_location=device)
        model.load_state_dict(checkpoint["model_state"])
        trainer.optimizer.load_state_dict(checkpoint["optimizer_state"])
        start_game_id = checkpoint["game_id"]
        print("Recovered from: model ",start_game_id)
    else:
        print("No games Recovered")
    print("<--------------------------------------START TRAINING--------------------------------------------->")
    ###############################################################################################################
    trainer.train(start_id=start_game_id,total_games=300) #########################################################
    ###############################################################################################################
    print("<------------------------------------TRAINING COMPLETED------------------------------------------->")

if __name__ == "__main__":
    os.makedirs("py_checkpoints", exist_ok=True)
    main()
