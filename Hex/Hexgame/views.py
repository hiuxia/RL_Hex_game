from rest_framework.views import APIView
from rest_framework.response import Response
from .models import HexGame
from .serializers import HexGameSerializer
from .utils.utils import check_hex_connection,run_ai_vs_ai_game
import Hexgame.utils.Algorithm as Algorithm



from django.shortcuts import render

def test_api_view(request):
    return render(request, 'html/test_api.html')

class GameAPI(APIView):
    def post(self, request):
        serializer = HexGameSerializer(data=request.data)
        if serializer.is_valid():
            # 手动创建对象
            game = HexGame.objects.create(
                mode=serializer.validated_data['mode']
            )
            game.initialize(new_game=True)
            print(HexGameSerializer(game).data)
            return Response(HexGameSerializer(game).data, status=201)
        print(serializer.errors) 
        return Response(serializer.errors, status=400)
    
    # 获取游戏状态
    def get(self,request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            serializer = HexGameSerializer(game)
            print(serializer.data)
            return Response(serializer.data)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)

class MoveAPI(APIView):
    # 处理人类落子
    def post(self, request, game_id):
        try:
            print(f"[DEBUG] 收到请求,游戏ID: {game_id}")
            game = HexGame.objects.get(id=game_id)
            print(f"当前回合: {game.player_turn}, 模式: {game.mode}")
            x = request.data['x']
            y = request.data['y']
            
            if game.make_move(x, y):
                # 检查当前玩家是否胜利（非对手）
                player_val = 1 if (game.player_turn == 'human' and game.human_color == 'red') else -1
                if check_hex_connection(game.board, player_val):
                    game.winner = 'human' if game.player_turn == 'human' else 'AI'
                    game.save()
                    
                return Response(HexGameSerializer(game).data)
            return Response({'error': 'Invalid move'}, status=400)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)

class AIMoveAPI(APIView):
    # 处理AI落子
    def post(self, request, game_id):
        try:
            print(f"[DEBUG] 收到AI移动请求,游戏ID: {game_id}")
            game = HexGame.objects.get(id=game_id)
            print(f"当前回合: {game.player_turn}, 模式: {game.mode}")
            # 调用算法服务获取AI落子
            input_dict = {
                "board": game.board,  # 假设HexGame.board是二维数组
                "player_turn": game.player_turn,
                "last_moves": game.last_moves  # 根据模型需要调整字段
            }
            ai_model = Algorithm.HexAI()
            response = ai_model.predict(input_dict)  

            if response:
                ai_move = response["optimal_move"]
                print("AI收到的棋盘状态:", game.board)
                print("AI选择的落子:", ai_move)
                game.update_win_probability(1-response["winning_rate"], response["winning_rate"])
                if game.make_move(ai_move[0], ai_move[1]):
                    # 胜负判断
                    player_val = -1 if game.human_color == 'red' else 1
                    if check_hex_connection(game.board, player_val):
                        game.winner = 'AI'
                        game.save()
                    print(f"AI落子坐标: {ai_move[0]}, {ai_move[1]}")
                    return Response(HexGameSerializer(game).data)
            
            return Response({'error': 'AI move failed'}, status=500)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)

class UndoAPI(APIView):
    # 处理悔棋
    def post(self,request , game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            if game.undo_last_move():
                return Response(HexGameSerializer(game).data)
            return Response({'error': 'No moves to undo'}, status=400)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)
    

class RestartAPI(APIView):
    def post(self, request,game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            if game.reset_game():
                return Response(HexGameSerializer(game).data)
            return Response({'error': 'Reset failed'}, status=400)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)
        
    
from threading import Thread

class CreateAIGameAPI(APIView):
    def post(self, request):
        game = HexGame.objects.create(mode='AI_AI')
        game.initialize(new_game=True)
        
        # 启动后台线程
        Thread(target=run_ai_vs_ai_game, args=(game.id,)).start()
        
        return Response(HexGameSerializer(game).data)

class AIGameStatusAPI(APIView):
    """获取AI对战状态"""
    def get(self, request, game_id):
        game = HexGame.objects.get(id=game_id)
        return Response(HexGameSerializer(game).data)