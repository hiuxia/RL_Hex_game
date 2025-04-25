import numpy as np
from collections import deque
class HexGame:
    def __init__(self):
        self.board_size = 11
        self.board = None
        self.last_moves = None
        self.current_player = 1  # 1代表先手，-1代表后手
        self.winner = None
        self.reset()

    def reset(self):
        self.board = [[0] * self.board_size for _ in range(self.board_size)]
        self.last_moves = [[0] * self.board_size for _ in range(self.board_size)]
        self.current_player = 1
        self.winner = None
        self._step_counter = 0  # 用于记录总步数

    def insert(self, state):
        """注入指定状态（用于测试）"""
        self.board = [row.copy() for row in state["board"]]
        self.last_moves = [row.copy() for row in state["last_moves"]]
        # 计算当前步数和玩家
        self._step_counter = np.max(np.array(self.last_moves))
        self.current_player = 1 if (self._step_counter % 2 == 0) else -1
        if self.current_player == -1 :
            self.board = (-1 * np.array(self.board).T).tolist() #FLIP the board
            self.last_moves = (np.array(self.last_moves).T).tolist() #FLIP the board
        # 全局检查胜利状态
        self.winner = self._determine_global_winner()

    def make_move(self, x, y):
        """执行落子并更新状态"""
        if self.board[x][y] != 0 or self.winner is not None:
            return False  # Invaild Step
        self.board[x][y] = 1
        self._step_counter += 1
        self.last_moves[x][y] = self._step_counter
        self.winner = self._check_winner(x, y)
        if self.winner is None:
            self.current_player *= -1
            self.board = (-1 * np.array(self.board).T).tolist() #FLIP the board
            self.last_moves = (np.array(self.last_moves).T).tolist() #FLIP the board
        return True

    def is_terminal(self):
        return self.winner if self.winner is not None else 0 #ZERO for not done;1先手胜利-1后手胜利

    def output(self):
        """返回当前状态字典"""
        return {
            "board": [row.copy() for row in self.board],
            "last_moves": [row.copy() for row in self.last_moves]
        }
    """
    def _check_winner(self, x, y):
        player = self.board[x][y]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        target_reached = [False] 
        def dfs(cx, cy):
            if (player == 1 and cy == self.board_size-1) or \
               (player == -1 and cx == self.board_size-1):
                target_reached[0] = True
                return
            for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                nx, ny = cx+dx, cy+dy
                if 0<=nx<self.board_size and 0<=ny<self.board_size:
                    if not visited[nx][ny] and self.board[nx][ny] == player:
                        visited[nx][ny] = True
                        dfs(nx, ny)

        visited[x][y] = True
        dfs(x, y)
        return player if target_reached[0] else None"""

    def _check_winner(self, x, y):
        directions = [(-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0)]
        visited = [[False for _ in range(self.board_size)] for _ in range(self.board_size)]
        queue = deque()
        queue.append((x, y))
        visited[x][y] = True
        touch_left = False
        touch_right = False
        if y == 0:
            touch_left = True
        if y == self.board_size - 1:
            touch_right = True
        while queue:
            cx, cy = queue.popleft()
            if cy == 0:
                touch_left = True
            if cy == self.board_size - 1:
                touch_right = True
            if touch_left and touch_right:
                return self.current_player
            for dx, dy in directions:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < self.board_size and 0 <= ny < self.board_size:
                    if not visited[nx][ny] and self.board[nx][ny] == 1:
                        visited[nx][ny] = True
                        queue.append((nx, ny))
        return self.current_player if touch_left and touch_right else None
        

    def _determine_global_winner(self):
        """全局检查胜利条件"""
        # 检查（1）是否连接左右
        left_nodes = [(i,0) for i in range(self.board_size) if self.board[i][0] == 1]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        for x,y in left_nodes:
            if not visited[x][y]:
                stack = [(x,y)]
                visited[x][y] = True
                while stack:
                    cx, cy = stack.pop()
                    if cy == self.board_size-1:
                        return self.current_player
                    for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                        nx, ny = cx+dx, cy+dy
                        if 0<=nx<self.board_size and 0<=ny<self.board_size:
                            if not visited[nx][ny] and self.board[nx][ny] == 1:
                                visited[nx][ny] = True
                                stack.append((nx, ny))

        # 检查（-1）是否连接上下
        top_nodes = [(0,j) for j in range(self.board_size) if self.board[0][j] == -1]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        for x,y in top_nodes:
            if not visited[x][y]:
                stack = [(x,y)]
                visited[x][y] = True
                while stack:
                    cx, cy = stack.pop()
                    if cx == self.board_size-1:
                        return -self.current_player
                    for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                        nx, ny = cx+dx, cy+dy
                        if 0<=nx<self.board_size and 0<=ny<self.board_size:
                            if not visited[nx][ny] and self.board[nx][ny] == -1:
                                visited[nx][ny] = True
                                stack.append((nx, ny))
        return None

