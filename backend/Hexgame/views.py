from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import HexGame
from .serializers import HexGameSerializer
from .utils import check_hex_connection,run_ai_vs_ai_game
import requests

class GameAPI(APIView):
    # 创建新游戏
    def post(self, request):
        serializer = HexGameSerializer(data=request.data)
        if serializer.is_valid():
            game = serializer.save()  # 使用序列化器创建
            game.initialize(new_game=True)
            return Response(HexGameSerializer(game).data, status=201)
        return Response(serializer.errors, status=400)
    
    # 获取游戏状态
    def get(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            serializer = HexGameSerializer(game)
            return Response(serializer.data)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)

class MoveAPI(APIView):
    # 处理人类落子
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            x = request.data['x']
            y = request.data['y']
            
            if game.make_move(x, y):
                # 胜负判断
                player_val = 1 if (game.player_turn == 'human' and game.human_color == 'red') else -1
                if check_hex_connection(game.board, player_val, game.human_color):
                    game.winner = 'human'
                    game.save()
                return Response(HexGameSerializer(game).data)
            return Response({'error': 'Invalid move'}, status=400)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)

class AIMoveAPI(APIView):
    # 处理AI落子
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            
            # 调用算法服务获取AI落子
            response = requests.post('http://algorithm-api/predict', json={
                'board': game.board,
                'player_turn': game.player_turn,
                'last_moves': game.last_moves
            })
            
            if response.status_code == 200:
                ai_move = response.json()
                
                if game.make_move(ai_move['x'], ai_move['y']):
                    # 胜负判断
                    if check_hex_connection(game.board, -1 if game.human_color == 'red' else 1, game.human_color):
                        game.winner = 'AI'
                        game.save()
                    return Response(HexGameSerializer(game).data)
            return Response({'error': 'AI move failed'}, status=500)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)

class UndoAPI(APIView):
    # 处理悔棋
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            if game.undo_last_move():
                return Response(HexGameSerializer(game).data)
            return Response({'error': 'No moves to undo'}, status=400)
        except HexGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=404)
    

class RestartAPI(APIView):
    def post(self, request, game_id):
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