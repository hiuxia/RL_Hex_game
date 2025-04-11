from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # 创建游戏专用路由（无需game_id）
    re_path(r'^ws/game/new/$', consumers.HexGameConsumer.as_asgi()),
    
    # 游戏房间路由（需要game_id）
    re_path(r'^ws/game/(?P<game_id>\d+)/$', consumers.HexGameConsumer.as_asgi()),
]