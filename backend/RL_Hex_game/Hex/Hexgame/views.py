from django.conf import settings
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

import Hexgame.utils.Algorithm as Algorithm

from .models import HexGame
from .serializers import HexGameSerializer, HexGameSummarySerializer
from .utils.utils import check_hex_connection, run_ai_vs_ai_game


def test_api_view(request):
    return render(request, "html/test_api.html")


class GameAPI(APIView):
    def post(self, request):
        serializer = HexGameSerializer(data=request.data)
        if serializer.is_valid():
            # 手动创建对象
            game = HexGame.objects.create(mode=serializer.validated_data["mode"])
            game.initialize(new_game=True)
            print(HexGameSerializer(game).data)
            return Response(HexGameSerializer(game).data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)

    # 获取游戏状态
    def get(self, request, game_id=None):
        if game_id is not None:
            try:
                game = HexGame.objects.get(id=game_id)
                serializer = HexGameSerializer(game)
                print(serializer.data)
                return Response(serializer.data)
            except HexGame.DoesNotExist:
                return Response({"error": "Game not found"}, status=404)
        else:
            # If no game_id is provided, return a list of all games
            games = HexGame.objects.all().order_by("-id")  # Most recent first
            serializer = HexGameSummarySerializer(games, many=True)
            return Response(serializer.data)


class MoveAPI(APIView):
    # 处理人类落子
    def post(self, request, game_id):
        try:
            print(f"[DEBUG] 收到请求,游戏ID: {game_id}")
            game = HexGame.objects.get(id=game_id)
            print(f"当前回合: {game.player_turn}, 模式: {game.mode}")

            # Don't allow moves if the game is already over
            if game.winner:
                return Response({"error": "Game is already over"}, status=400)

            x = request.data["x"]
            y = request.data["y"]

            if game.make_move(x, y):
                # 检查当前玩家是否胜利（非对手）
                player_val = (
                    1
                    if (game.player_turn == "human" and game.human_color == "red")
                    else -1
                )
                if check_hex_connection(game.board, player_val):
                    game.winner = "human" if game.player_turn == "human" else "AI"
                    game.save()

                return Response(HexGameSerializer(game).data, status=200)
            return Response({"error": "Invalid move"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)
        except KeyError as e:
            return Response(
                {"error": f"Missing required parameter: {str(e)}"}, status=400
            )
        except Exception as e:
            return Response({"error": f"Unexpected error: {str(e)}"}, status=500)


class AIMoveAPI(APIView):
    # 处理AI落子
    def post(self, request, game_id):
        try:
            print(f"[DEBUG] 收到AI移动请求,游戏ID: {game_id}")
            game = HexGame.objects.get(id=game_id)
            print(f"当前回合: {game.player_turn}, 模式: {game.mode}")

            # Don't allow AI move if the game is already over
            if game.winner:
                return Response({"error": "Game is already over"}, status=400)

            # Don't allow AI move if it's not AI's turn
            if game.mode == "HUMAN_AI" and game.player_turn == "human":
                return Response({"error": "Not AI's turn"}, status=400)

            # Prepare input for AI model
            input_dict = {
                "board": game.board,  # 假设HexGame.board是二维数组
                "player_turn": game.player_turn,
                "last_moves": game.last_moves,  # 根据模型需要调整字段
            }

            # Multiple attempts for AI move in case of issues
            max_attempts = 3
            for attempt in range(max_attempts):
                try:
                    print(f"[INFO] AI move attempt {attempt + 1}/{max_attempts}")
                    # Use the configurable model path from settings instead of hardcoded path
                    ai_model = Algorithm.HexAI()
                    response = ai_model.predict(input_dict)

                    if not response:
                        print(
                            f"[ERROR] AI model returned no response (attempt {attempt + 1})"
                        )
                        if attempt == max_attempts - 1:
                            # If last attempt, try fallback to random move
                            empty_positions = [
                                (i, j)
                                for i in range(len(game.board))
                                for j in range(len(game.board[0]))
                                if game.board[i][j] == 0
                            ]
                            if empty_positions:
                                import random

                                response = {
                                    "optimal_move": random.choice(empty_positions),
                                    "winning_rate": 0.5,
                                }
                                print(
                                    f"[INFO] Using fallback random move: {response['optimal_move']}"
                                )
                            else:
                                return Response(
                                    {"error": "No valid moves available"}, status=500
                                )
                        else:
                            # Try again
                            continue

                    if "optimal_move" not in response:
                        print(
                            f"[ERROR] AI response missing optimal_move (attempt {attempt + 1}): {response}"
                        )
                        if attempt == max_attempts - 1:
                            return Response(
                                {"error": "Invalid AI response format"}, status=500
                            )
                        else:
                            continue

                    ai_move = response["optimal_move"]
                    print("AI收到的棋盘状态:", game.board)
                    print("AI选择的落子:", ai_move)

                    # Update win probability if available
                    if "winning_rate" in response:
                        game.update_win_probability(
                            1 - response["winning_rate"], response["winning_rate"]
                        )

                    # Validate move is within board bounds
                    if not (
                        0 <= ai_move[0] < len(game.board)
                        and 0 <= ai_move[1] < len(game.board[0])
                    ):
                        print(
                            f"[ERROR] AI move out of bounds (attempt {attempt + 1}): {ai_move}"
                        )
                        if attempt == max_attempts - 1:
                            return Response(
                                {"error": f"AI move out of bounds: {ai_move}"},
                                status=500,
                            )
                        else:
                            continue

                    # Validate move is on an empty cell
                    if game.board[ai_move[0]][ai_move[1]] != 0:
                        print(
                            f"[ERROR] AI tried to move on non-empty cell (attempt {attempt + 1}): {ai_move}"
                        )
                        if attempt == max_attempts - 1:
                            return Response(
                                {
                                    "error": f"AI tried to move on non-empty cell: {ai_move}"
                                },
                                status=500,
                            )
                        else:
                            continue

                    # Make the move
                    if game.make_move(ai_move[0], ai_move[1]):
                        # Check for win condition
                        player_val = -1 if game.human_color == "red" else 1
                        if check_hex_connection(game.board, player_val):
                            game.winner = (
                                "AI"
                                if game.mode == "HUMAN_AI"
                                else ("AI_1" if game.player_turn == "AI_1" else "AI_2")
                            )
                            game.save()
                        print(f"AI落子坐标: {ai_move[0]}, {ai_move[1]}")
                        return Response(HexGameSerializer(game).data)
                    else:
                        print(
                            f"[ERROR] AI move failed with make_move (attempt {attempt + 1}): {ai_move}"
                        )
                        if attempt == max_attempts - 1:
                            return Response(
                                {"error": f"AI move failed: {ai_move}"}, status=500
                            )
                        else:
                            continue

                except Exception as model_error:
                    print(
                        f"[ERROR] AI model error (attempt {attempt + 1}): {str(model_error)}"
                    )
                    if attempt == max_attempts - 1:
                        return Response(
                            {
                                "error": f"AI model error after {max_attempts} attempts: {str(model_error)}"
                            },
                            status=500,
                        )

            # If we get here, all attempts failed
            return Response(
                {"error": f"AI move failed after {max_attempts} attempts"}, status=500
            )

        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)
        except Exception as e:
            print(f"[ERROR] Unexpected error in AI move: {str(e)}")
            return Response({"error": f"Unexpected error: {str(e)}"}, status=500)


class UndoAPI(APIView):
    # 处理悔棋
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)

            # Don't allow undo if the game is already over
            if game.winner:
                return Response({"error": "Cannot undo after game is over"}, status=400)

            if game.undo_last_move():
                return Response(HexGameSerializer(game).data, status=200)
            return Response({"error": "No moves to undo"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)
        except Exception as e:
            return Response({"error": f"Unexpected error: {str(e)}"}, status=500)


class RestartAPI(APIView):
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            if game.reset_game():
                return Response(HexGameSerializer(game).data, status=200)
            return Response({"error": "Reset failed"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)
        except Exception as e:
            return Response({"error": f"Unexpected error: {str(e)}"}, status=500)


from threading import Thread


class CreateAIGameAPI(APIView):
    def post(self, request):
        game = HexGame.objects.create(mode="AI_AI")
        game.initialize(new_game=True)

        # Start a background thread to handle the AI vs AI game - only make one move
        Thread(target=run_ai_vs_ai_game, args=(game.id, True), daemon=True).start()

        return Response(HexGameSerializer(game).data, status=201)


class NextAIMoveAPI(APIView):
    """Handle requesting the next AI move in an AI vs AI game"""

    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)

            # Verify this is an AI_AI game
            if game.mode != "AI_AI":
                return Response(
                    {"error": "This endpoint is only for AI vs AI games"}, status=400
                )

            # Verify the game isn't already over
            if game.winner:
                return Response({"error": "Game is already over"}, status=400)

            # Make a single AI move
            Thread(target=run_ai_vs_ai_game, args=(game_id, True), daemon=True).start()

            # Wait a short time for the move to be processed
            import time

            time.sleep(0.5)

            # Refresh the game state
            game = HexGame.objects.get(id=game_id)

            # Return the updated game state
            return Response(HexGameSerializer(game).data)

        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)
        except Exception as e:
            print(f"[ERROR] Unexpected error in NextAIMoveAPI: {str(e)}")
            return Response({"error": f"Unexpected error: {str(e)}"}, status=500)


class AIGameStatusAPI(APIView):
    """获取AI对战状态"""

    def get(self, request, game_id):
        game = HexGame.objects.get(id=game_id)
        return Response(HexGameSerializer(game).data)


class GameListView(APIView):
    """Get a list of all games"""

    def get(self, request):
        """Return a list of all existing games"""
        games = HexGame.objects.all().order_by("-id")  # Most recent first
        serializer = HexGameSummarySerializer(games, many=True)
        return Response(serializer.data)


class UpdateWinStateAPI(APIView):
    """Handle updating the win state from the frontend

    This allows the frontend to inform the backend when it detects a win,
    which can help when the backend check might have issues or when we want
    to ensure both frontend and backend agree on the game state.
    """

    def post(self, request, game_id):
        try:
            print(f"[DEBUG] Received win state update for game {game_id}")
            game = HexGame.objects.get(id=game_id)

            # Get winner from request payload
            winner = request.data.get("winner")
            if not winner:
                return Response({"error": "No winner specified"}, status=400)

            # Validate winner value
            if winner not in ["human", "AI", "AI_1", "AI_2", "draw"]:
                return Response(
                    {"error": f"Invalid winner value: {winner}"}, status=400
                )

            # Check if the game is already over with a different winner
            if game.winner and game.winner != winner:
                print(
                    f"[WARNING] Game {game_id} already has winner {game.winner}, but frontend reported {winner}"
                )

                # Run our own verification to resolve conflict
                board = game.board

                # Check for red player connection (row)
                player_val = 1 if game.human_color == "red" else -1
                if check_hex_connection(board, player_val):
                    correct_winner = "human" if game.mode == "HUMAN_AI" else "AI_1"
                    print(f"[INFO] Backend verified win for {correct_winner}")
                    game.winner = correct_winner
                    game.save()
                # Check for blue player connection (column)
                elif check_hex_connection(board, -player_val):
                    correct_winner = "AI" if game.mode == "HUMAN_AI" else "AI_2"
                    print(f"[INFO] Backend verified win for {correct_winner}")
                    game.winner = correct_winner
                    game.save()
                else:
                    # No clear win - trust frontend for now
                    print(
                        f"[INFO] No clear winner, using frontend's determination: {winner}"
                    )
                    game.winner = winner
                    game.save()
            else:
                # Update the winner
                print(f"[INFO] Setting winner to {winner} for game {game_id}")
                game.winner = winner
                game.save()

            return Response(HexGameSerializer(game).data)

        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)
        except Exception as e:
            print(f"[ERROR] Unexpected error in UpdateWinStateAPI: {str(e)}")
            return Response({"error": f"Unexpected error: {str(e)}"}, status=500)
