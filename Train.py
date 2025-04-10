import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import os
from Algorithm.Hexmodel import HexNet
from Algorithm.Selfplay import SelfPlay, ReplayBuffer

class Trainer:
    def __init__(self, model, buffer, self_play, save_dir="checkpoints", device=torch.device('cuda' if torch.cuda.is_available() else 'cpu')):
        self.model = model
        self.buffer = buffer
        self.self_play = self_play
        self.save_dir = save_dir
        self.device = device
        self.optimizer = optim.Adam(model.parameters(), lr=0.001)
        os.makedirs(save_dir, exist_ok=True)
    '''
    def train_step(self, batch_size=512):
        if len(self.buffer) < batch_size:
            return None

        batch = self.buffer.sample(batch_size)
        states, policies, values = zip(*batch)
        print("Policies: ",  policies)########################
        policies = [
        torch.from_numpy(policies).float().to(self.device)  # 关键转换
        for data in batch
        ]
        values = [
        torch.tensor(values, dtype=torch.float32).to(self.device)
        for data in batch
        ]
        states = torch.stack(states).to(self.device)
        policies = torch.stack(policies)#.to(self.device)
        values = torch.stack(values).to(self.device)
        states = [data["state"] for data in batch]
        policies = [data["policy"] for data in batch]
        values = [data["value"] for data in batch]


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
            if game_id % 100 == 0:
                self.save_replay(final_board, final_last_moves, game_id)
            metrics = self.train_step(batch_size=512)
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
        save_dir="./checkpoints",
        device=device
    )
    print("<------------------------------------ENVIRONMENT SETTED------------------------------------------->")
    start_game_id = 0
    checkpoint_path = "./checkpoints/latest_model.pth"
    if os.path.exists(checkpoint_path):
        checkpoint = torch.load(checkpoint_path, map_location=device)
        model.load_state_dict(checkpoint["model_state"])
        trainer.optimizer.load_state_dict(checkpoint["optimizer_state"])
        start_game_id = checkpoint["game_id"]
        print(f"已从游戏 {start_game_id} 恢复训练")
    print("<--------------------------------------START TRAINING--------------------------------------------->")
    ###############################################################################################################
    trainer.train(start_id=start_game_id,total_games=300) #########################################################
    ###############################################################################################################
    print("<------------------------------------TRAINING COMPLETED------------------------------------------->")

if __name__ == "__main__":
    os.makedirs("checkpoints", exist_ok=True)
    main()
