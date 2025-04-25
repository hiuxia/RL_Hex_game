"""
ASGI config for Hex project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# Set Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Hex.settings")

# Initialize Django ASGI application
# Note: This only handles HTTP connections, not WebSocket
application = get_asgi_application()
