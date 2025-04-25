from asgiref.sync import sync_to_async
from django.db import models


class HexGame(models.Model):
    BOARD_SIZE = 11
    board = models.JSONField(default=list)
    player_turn = models.CharField(max_length=10, default="human")
    last_moves = models.JSONField(default=list)
    moves_history = models.JSONField(default=list)
    winner = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    human_color = models.CharField(max_length=10, default="red")  # 玩家颜色
    win_probability = models.JSONField(default=dict)  # 胜率

    MODE_CHOICES = [
        ("HUMAN_AI", "Human vs AI"),
        ("AI_AI", "AI vs AI"),  # 新增模式
    ]

    mode = models.CharField(  # 模式(pvp or pve)
        max_length=10,
        choices=MODE_CHOICES,
        default='HUMAN_AI'
    )


    def initialize(self, new_game=False):
        """初始化或重置游戏"""
        self.board = [[0]*self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        self.last_moves = [[0]*self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        self.moves_history = []
        self.winner = None

        # 如果是新游戏(不是重置)，随机分配颜色
        if new_game:
            # 确保所有字段初始化
            if self.mode == "AI_AI":
                self.player_turn = "AI_1"
                self.win_probability = {"AI_1": 0.5, "AI_2": 0.5}
                self.human_color = "red"  # 固定值
            else:
                # 确保human_color被正确设置
                self.human_color = "red"
                # if self.human_color == 'blue' else 'blue'
                self.win_probability = {"human": 0.5, "AI": 0.5}
                self.player_turn = "human"
                # if self.human_color == 'red' else 'AI'
            self.save()  # 立即保存
        else:
            # 设置先手玩家
            if self.mode == "AI_AI":
                self.player_turn = "AI_1"
                self.win_probability = {"AI_1": 0.5, "AI_2": 0.5}
            else:
                self.player_turn = "human" if self.human_color == "red" else "AI"
                self.win_probability = {"human": 0.5, "AI": 0.5}
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
            if self.player_turn == 'AI_1':
                player_val = 1
            else:
                player_val = -1
        else:
            # 其他模式
            if self.player_turn == 'human':
                player_val = 1 if self.human_color == 'red' else -1
            else:
                player_val = -1 if self.human_color == 'red' else 1

        step = len(self.moves_history) + 1
        self.board[x][y] = player_val
        self.last_moves[x][y] = step
        self.moves_history.append(
            {
                "player": self.player_turn,
                "x": x,
                "y": y,
                "step": step,
                "color": "red" if player_val == 1 else "blue",
            }
        )

        # 切换回合
        if self.mode == 'AI_AI':
            self.player_turn = 'AI_2' if self.player_turn == 'AI_1' else 'AI_1'
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

        self.player_turn = last_move['player']

        self.save()
        return True

    def update_win_probability(self, human_prob, ai_prob):
        self.win_probability = {
            "human": round(human_prob, 2),
            "AI": round(ai_prob, 2)
        }
        self.save()

    @sync_to_async
    def async_make_move(self, x, y):
        """异步版本的make_move"""
        return self.make_move(x, y)

    @sync_to_async
    def async_undo_last_move(self):
        """异步版本的undo_last_move"""
        return self.undo_last_move()

    @sync_to_async
    def async_reset_game(self):
        """异步版本的reset_game"""
        return self.reset_game()

    @sync_to_async
    def async_update_win_probability(self, human_prob, ai_prob):
        return self.update_win_probability(human_prob, ai_prob)

    @sync_to_async
    def async_check_connection(self, player_val):
        """异步版本的连接检查"""
        from Hexgame.utils.utils import check_hex_connection
        return check_hex_connection(self.board, player_val)
