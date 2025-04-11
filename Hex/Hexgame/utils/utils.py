import Hexgame.utils.Algorithm as Algorithm
def check_hex_connection(board, player_val):
    """检查六边形棋盘是否形成连接"""
    size = len(board)
    visited = [[False for _ in range(size)] for _ in range(size)]
    queue = []

    # 红色（1）需连接左右，蓝色（-1）需连接上下
    if player_val == 1:  # 红色
        # 从左边界开始
        for y in range(size):
            if board[0][y] == player_val:
                queue.append((0, y))
                visited[0][y] = True
    else:  # 蓝色
        # 从上边界开始
        for x in range(size):
            if board[x][0] == player_val:
                queue.append((x, 0))
                visited[x][0] = True

    # 六边形邻接方向（六向）
    directions = [
        (-1, 0), (-1, 1),  # 左上、右上
        (0, -1), (0, 1),    # 左、右
        (1, -1), (1, 0)      # 左下、右下
    ]

    while queue:
        x, y = queue.pop(0)

        # 检查是否到达目标边界
        if (player_val == 1 and x == size - 1) or (player_val == -1 and y == size - 1):
            return True

        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < size and 0 <= ny < size:
                if board[nx][ny] == player_val and not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))
    return False


async def run_ai_vs_ai_game(game_id):
    """执行AI对战的自动回合(完全异步版本)"""
    from ..models import HexGame
    game = await HexGame.objects.aget(id=game_id)
    max_steps = 11*11
    step_count = 0
    
    while game.winner is None and step_count < max_steps:
        step_count += 1  
        ai_name = game.player_turn
        player_val = 1 if (ai_name == 'AI_1' and game.human_color == 'red') else -1 
        
        # 调用算法服务获取AI落子
        input_dict = {
            "board": game.board,
            "player_turn": game.player_turn,
            "last_moves": game.last_moves
        }
        ai_model = Algorithm.HexAI()
        response = ai_model.predict(input_dict)
        
        if response:
            move = response['optimal_move']
            # 使用异步方法执行落子
            success = await game.async_make_move(move[0], move[1])
            if not success:
                break
            
            # 异步更新胜率
            await game.async_update_win_probability(
                1 - response['winning_rate'],
                response['winning_rate']
            )
            
            # 切换AI玩家并保存
            game.player_turn = 'AI_2' if ai_name == 'AI_1' else 'AI_1'
            await game.asave()
            
            # 异步检查胜负
            if check_hex_connection(game.board, player_val):
                game.winner = ai_name
                await game.asave()
                break
    
    if step_count >= max_steps:
        game.winner = 'draw'
        await game.asave()