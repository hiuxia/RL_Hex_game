
import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import HexGame
from .serializers import HexGameSerializer
from .utils.utils import check_hex_connection
from asgiref.sync import sync_to_async
import Hexgame.utils.Algorithm as Algorithm

class HexGameConsumer(AsyncWebsocketConsumer):
    """处理Hex游戏的WebSocket连接"""
    
    async def connect(self):
        """处理连接请求"""
        # 如果是创建新游戏的连接（/ws/game/new/）
        if self.scope['path'] == '/ws/game/new/':
            # 特殊标记，不加入任何组
            self.is_creation_connection = True
            await self.accept()
        else:
            # 常规游戏房间连接
            self.game_id = self.scope['url_route']['kwargs']['game_id']
            self.game_group_name = f'game_{self.game_id}'
            await self.channel_layer.group_add(self.game_group_name, self.channel_name)
            await self.accept()
            await self.send_current_game_state()
    
    async def disconnect(self, close_code):
        """客户端断开连接时调用"""
        # 离开游戏组
        await self.channel_layer.group_discard(
            self.game_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        """接收客户端消息"""
        try:
            data = json.loads(text_data)
            action = data.get('action')
            
            # 如果是创建连接且收到创建请求
            if hasattr(self, 'is_creation_connection') and action == 'create_game':
                await self.handle_create_game(data)
        # 修改此处的条件判断
            elif action == 'move':
                await self.handle_move(data)
            elif action == 'ai_move':
                await self.handle_ai_move()
            elif action == 'undo':
                await self.handle_undo()
            elif action == 'restart':
                await self.handle_restart()
            elif action == 'create_ai_game':
                await self.handle_create_ai_game()
            else:
                await self.send_error("Invalid action")
        
        except Exception as e:
            await self.send_error(str(e))
    
    async def send_current_game_state(self):
        """发送当前游戏状态（统一消息格式）"""
        game = await self.get_game()
        serializer = HexGameSerializer(game)
        await self._send_message('game_state', serializer.data)
    
    async def send_error(self, message):
        """发送错误消息（统一错误格式）"""
        await self._send_message('error', {'message': message})
    
    async def game_update(self, event):
        """处理组播消息（统一消息格式）"""
        await self._send_message(event['type'], event['data'])
    
    async def _send_message(self, msg_type, data):
        """统一消息发送方法"""
        await self.send(text_data=json.dumps({
            'type': msg_type,
            'data': data
        }))
    
    async def get_game(self):
        """获取游戏对象（异步方法）"""
        return await HexGame.objects.aget(id=self.game_id)
    
    # ---- 核心操作处理 ----
    async def handle_move(self, data):
        """处理玩家移动"""
        try:
            game = await self.get_game()
            x, y = data['x'], data['y']
            
            if await game.async_make_move(x, y):
                # 检查胜负
                player_val = 1 if (game.player_turn == 'human' and game.human_color == 'red') else -1
                if check_hex_connection(game.board, player_val):
                    game.winner = 'human' if game.player_turn == 'human' else 'AI'
                    await game.asave()
                
                await self.broadcast_game_update(game)
            else:
                await self.send_error("Invalid move")
                
        except Exception as e:
            await self.send_error(f"移动失败: {str(e)}")
    
    async def handle_ai_move(self):
        """处理AI移动(完全异步化)"""
        try:
            game = await self.get_game()
            
            # 调用算法服务
            input_dict = {
                "board": game.board,
                "player_turn": game.player_turn,
                "last_moves": game.last_moves
            }
            ai_model = Algorithm.HexAI()
            response = ai_model.predict(input_dict)
            
            if response:
                ai_move = response["optimal_move"]
                # 使用异步保存
                if await game.async_make_move(ai_move[0], ai_move[1]):
                    # 使用异步更新胜率
                    await game.async_update_win_probability(
                        1 - response["winning_rate"],
                        response["winning_rate"]
                    )
                    
                    # 检查胜负
                    player_val = -1 if game.human_color == 'red' else 1
                    if check_hex_connection(game.board, player_val):
                        game.winner = 'AI'
                        await game.asave()  # 异步保存
                    
                    await self.broadcast_game_update(game)
                    return  # 成功返回
                    
            await self.send_error("AI move failed")
            
        except Exception as e:
            await self.send_error(f"AI移动失败: {str(e)}")
    
    async def handle_undo(self):
        """处理悔棋（异步化）"""
        try:
            game = await self.get_game()
            if await game.async_undo_last_move():
                await self.broadcast_game_update(game)
            else:
                await self.send_error("No moves to undo")
        except Exception as e:
            await self.send_error(f"悔棋失败: {str(e)}")
    
    async def handle_restart(self):
        """处理重置（异步化）"""
        try:
            game = await self.get_game()
            if await game.async_reset_game():
                await self.broadcast_game_update(game)
            else:
                await self.send_error("Reset failed")
        except Exception as e:
            await self.send_error(f"重置失败: {str(e)}")
    
    async def handle_create_game(self, data):
        """创建游戏（异步优化版）"""
        try:
            mode = data.get('mode', 'HUMAN_AI').upper()

            # 验证模式合法性
            if mode not in ['HUMAN_AI', 'AI_AI']:
                await self.send_error("Invalid game mode")
                return

            # 使用异步ORM创建游戏对象
            from .models import HexGame
            game = await sync_to_async(HexGame.objects.create)(mode=mode)
            
            # 异步执行初始化
            await sync_to_async(game.initialize)(new_game=True)

            # 返回创建成功消息
            await self._send_message('game_created', {
                'game_id': str(game.id),  # 确保ID转为字符串
                'redirect': f'/ws/game/{game.id}/',
            })
            await self.close()

            # 异步启动AI对战（如果是AI_AI模式）
            if mode == 'AI_AI':
                from .utils.utils import run_ai_vs_ai_game
                asyncio.create_task(run_ai_vs_ai_game(game.id))

        except Exception as e:
            import traceback
            traceback.print_exc()  # 打印完整错误堆栈
            await self.send_error(f"创建游戏失败: {str(e)}")
            
    async def broadcast_game_update(self, game):
        """统一广播更新方法"""
        serializer = HexGameSerializer(game)
        print(serializer.data)
        await self.channel_layer.group_send(
            self.game_group_name,
            {
                'type': 'game_update',  # 对应game_update方法
                'data': serializer.data
            }
        )

    