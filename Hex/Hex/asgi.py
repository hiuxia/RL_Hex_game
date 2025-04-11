"""
ASGI config for Hex project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

# 首先设置环境变量
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Hex.settings')

# 初始化Django ASGI应用
django_asgi_app = get_asgi_application()

# 之后再导入需要Django环境的模块
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import Hexgame.routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            Hexgame.routing.websocket_urlpatterns
        )
    ),
})