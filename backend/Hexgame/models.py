from django.db import models
import random

class HexGame(models.Model):
    BOARD_SIZE = 11
    board = models.JSONField(default=list)
    player_turn = models.CharField(max_length=10, default='human')
    last_moves = models.JSONField(default=list)
    moves_history = models.JSONField(default=list)
    winner = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    human_color = models.CharField(max_length=10, default='red')  # 玩家颜色
    win_probability = models.JSONField(default=dict)  # 胜率

    MODE_CHOICES = [
        ('HUMAN_AI', 'Human vs AI'),
        ('AI_AI', 'AI vs AI')  # 新增模式
    ]
    
    mode = models.CharField(  # 模式(pvp or pve)
        max_length=10,
        choices=MODE_CHOICES,
        default='HUMAN_AI'
    )

    current_ai_player = models.CharField(  # 记录当前行动的AI（仅AI vs AI模式使用）
        max_length=10,
        blank=True,
        null=True
    )


    def initialize(self, new_game=False):
        """初始化或重置游戏"""
        self.board = [[0]*self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        self.last_moves = [[0]*self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        self.moves_history = []
        self.winner = None
        self.win_probability = {"human": 0.5, "AI": 0.5}
        
        
        # 如果是新游戏(不是重置)，随机分配颜色
        if new_game:
            if self.mode == 'AI_AI':
                self.current_ai_player = 'AI_1'  # 初始化第一个AI玩家
                self.human_color = 'red'  # AI对战模式中human_color无意义，可固定为red
            else:
                self.human_color = random.choice(['red', 'blue'])
        
        # 设置先手玩家
        if self.human_color == 'red':
            self.player_turn = 'human'
        else:
            self.player_turn = 'AI'
        self.save()

    def reset_game(self):
        """重置当前游戏（保留颜色分配）"""
        self.initialize(new_game=False)
        return True
    def make_move(self, x, y):
        """执行落子（增加模式判断）"""
        if self.board[x][y] != 0:
            return False
        
        # 确定棋子值
        if self.mode == 'AI_AI':
            # AI对战模式根据current_ai_player判断
            if self.current_ai_player == 'AI_1':
                player_val = 1 if self.human_color == 'red' else -1
            else:
                player_val = -1 if self.human_color == 'red' else 1
        else:
            # 其他模式
            if self.player_turn == 'human':
                player_val = 1 if self.human_color == 'red' else -1
            else:
                player_val = -1 if self.human_color == 'red' else 1
        
        step = len(self.moves_history) + 1
        self.board[x][y] = player_val
        self.last_moves[x][y] = step
        self.moves_history.append({
            'player': self.current_ai_player if self.mode == 'AI_AI' else self.player_turn,
            'x': x,
            'y': y,
            'step': step,
            'color': 'red' if player_val == 1 else 'blue'
        })
        
        # 切换回合
        if self.mode == 'AI_AI':
            self.current_ai_player = 'AI_2' if self.current_ai_player == 'AI_1' else 'AI_1'
        else:
            self.player_turn = 'AI' if self.player_turn == 'human' else 'human'
        
        self.save()
        return True

    def undo_last_move(self):
        """悔棋功能(支持AI对战)"""
        if not self.moves_history:
            return False
        
        last_move = self.moves_history.pop()
        x, y = last_move['x'], last_move['y']
        
        self.board[x][y] = 0
        self.last_moves[x][y] = 0
        self.winner = None
        
        if self.mode == 'AI_AI':
            # 回退到上一个AI玩家
            self.current_ai_player = last_move['player']
        else:
            self.player_turn = last_move['player']
        
        self.save()
        return True
    
    def update_win_probability(self, human_prob, ai_prob):
        self.win_probability = {
            "human": round(human_prob, 2),
            "AI": round(ai_prob, 2)
        }
        self.save()