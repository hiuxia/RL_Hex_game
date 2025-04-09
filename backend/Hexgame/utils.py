def check_hex_connection(board, player_val, human_color):
    """根据棋子值判断胜负"""
    if player_val == 1:  # 红色，判断左右连接
        start_edge = 'left'
        end_edge = 'right'
    else:  # -1，蓝色，判断上下连接
        start_edge = 'top'
        end_edge = 'bottom'
    
    visited = [[False]*11 for _ in range(11)]
    queue = []
    
    # 初始化起始边
    for i in range(11):
        if start_edge == 'left' and board[0][i] == player_val:
            queue.append((0, i))
        elif start_edge == 'top' and board[i][0] == player_val:
            queue.append((i, 0))
    
    # 六边形移动方向
    directions = [(-1,0), (-1,1),
                 (0,-1), (0,1),
                 (1,-1), (1,0)]
    
    while queue:
        x, y = queue.pop(0)
        
        # 检查是否到达目标边
        if (end_edge == 'right' and x == 10) or \
           (end_edge == 'bottom' and y == 10):
            return True
        
        for dx, dy in directions:
            nx, ny = x+dx, y+dy
            if 0 <= nx < 11 and 0 <= ny < 11:
                if board[nx][ny] == player_val and not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))
    return False


def run_ai_vs_ai_game(game_id):
    """执行AI对战的自动回合"""
    import requests
    from .models import HexGame
    game = HexGame.objects.get(id=game_id)
    max_steps = 11*11
    step_count = 0
    while game.winner is None and step_count < max_steps:
        # 调用算法API获取当前AI的落子
        step_count +=1  
        ai_name = game.current_ai_player
        player_val = -1 if (ai_name == 'AI_1' and game.human_color == 'red') else 1 
        response = requests.post(
            f'http://algorithm-api/predict/{ai_name}',  # 假设算法端支持不同AI标识
            json={
                'board': game.board,
                'player_turn': ai_name,
                'human_color': 'red'  # 在AI vs AI中此字段可忽略
            }
        )
        
        if response.status_code == 200:
            move = response.json()
            game.make_move(move['x'], move['y'])
            
            # 切换AI玩家并检查胜负
            game.current_ai_player = 'AI_2' if ai_name == 'AI_1' else 'AI_1'
            game.save()
            
            # 检查胜负（复用原有逻辑）
            if check_hex_connection(game.board, player_val, game.human_color):
                game.winner = ai_name
                game.save()
                break
    if step_count >= max_steps:
        game.winner = 'draw'  # 需在模型中添加draw状态