import logging
import time

from django.conf import settings

import Hexgame.utils.Algorithm as Algorithm

# Set up logging
logger = logging.getLogger(__name__)


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
        (-1, 0),
        (-1, 1),  # 左上、右上
        (0, -1),
        (0, 1),  # 左、右
        (1, -1),
        (1, 0),  # 左下、右下
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


def run_ai_vs_ai_game(game_id, make_single_move=True):
    """执行AI对战的自动回合(同步版本)

    Args:
        game_id: ID of the game
        make_single_move: If True, only make a single move and return (for better frontend control)
    """
    logger.info(
        f"Starting AI vs AI game with ID: {game_id}, single_move: {make_single_move}"
    )
    from ..models import HexGame

    try:
        game = HexGame.objects.get(id=game_id)

        # If the game is already over, don't do anything
        if game.winner is not None:
            logger.info(f"Game {game_id} already has a winner: {game.winner}")
            return

        # Make a single AI move
        ai_name = game.player_turn
        player_val = 1 if (ai_name == "AI_1" and game.human_color == "red") else -1

        logger.info(f"Game {game_id}: AI {ai_name} is making a move")

        # Call the AI algorithm to get the move
        input_dict = {
            "board": game.board,
            "player_turn": game.player_turn,
            "last_moves": game.last_moves,
        }

        # Use the configurable model path from settings
        ai_model = Algorithm.HexAI()
        response = ai_model.predict(input_dict)

        if response:
            move = response["optimal_move"]
            # Make the move
            success = game.make_move(move[0], move[1])
            if not success:
                logger.warning(f"Game {game_id}: Failed to make move {move}")
                return

            # Update win probability
            game.update_win_probability(
                1 - response["winning_rate"], response["winning_rate"]
            )

            # Switch AI player and save
            game.player_turn = "AI_2" if ai_name == "AI_1" else "AI_1"
            game.save()

            # Check for a win
            if check_hex_connection(game.board, player_val):
                game.winner = ai_name
                game.save()
                logger.info(f"Game {game_id}: {ai_name} won the game")
                return

            logger.info(
                f"Game {game_id}: Move completed, now {game.player_turn}'s turn"
            )

            # If we're supposed to make multiple moves, wait a bit and continue
            if not make_single_move:
                # Add delay to allow frontend polling to catch up
                time.sleep(1.0)
                # Recursive call to make next move
                run_ai_vs_ai_game(game_id, make_single_move)
        else:
            logger.error(f"Game {game_id}: AI model failed to predict a move")

    except HexGame.DoesNotExist:
        logger.error(f"Game with ID {game_id} not found")
    except Exception as e:
        logger.error(f"Error in AI vs AI game {game_id}: {str(e)}")
