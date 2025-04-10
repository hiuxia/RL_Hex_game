import torch
import torch.nn as nn

class HexNet(nn.Module):
    def __init__(self, board_size=11, num_channels=256, num_res_blocks=4):
        super().__init__()
        self.board_size = board_size
        
        self.conv_in = nn.Conv2d(2, num_channels, 3, padding=1)
        self.bn_in = nn.BatchNorm2d(num_channels)
        
        # Residual
        self.res_blocks = nn.ModuleList([nn.Sequential(
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels),
                nn.ReLU(),
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels)
            ) for _ in range(num_res_blocks)])
        
        self.policy_head = nn.Sequential(nn.Conv2d(num_channels, 2, 1),nn.Flatten(),nn.Linear(2*board_size*board_size, board_size*board_size))# Policy_head
        self.value_head = nn.Sequential( nn.Conv2d(num_channels, 1, 1),nn.Flatten(),nn.Linear(board_size*board_size, 256),nn.ReLU(),nn.Linear(256, 1),nn.Tanh())# Value_head


    def forward(self, x):
        x = torch.relu(self.bn_in(self.conv_in(x)))#Residual
        for block in self.res_blocks:
            x = block(x) + x 
            x = torch.relu(x)
        policy = self.policy_head(x)
        value = self.value_head(x)
        return policy, value

