# RL Hex Game Documentation

Generated on 4/17/2025

This doc provides a comprehensive overview of the RL Hex Game project.

## Table of Contents

- 📁 .cursor/
  - 📁 rules/
- 📁 backend/
  - 📄 [API_test.html](#backend-api_test-html)
  - 📁 RL_Hex_game/
    - 📁 Hex/
      - 📁 Hex/
        - 📄 [__init__.py](#backend-rl_hex_game-hex-hex-__init__-py)
        - 📄 [asgi.py](#backend-rl_hex_game-hex-hex-asgi-py)
        - 📄 [settings.py](#backend-rl_hex_game-hex-hex-settings-py)
        - 📄 [urls.py](#backend-rl_hex_game-hex-hex-urls-py)
        - 📄 [wsgi.py](#backend-rl_hex_game-hex-hex-wsgi-py)
      - 📁 Hexgame/
        - 📄 [__init__.py](#backend-rl_hex_game-hex-hexgame-__init__-py)
        - 📄 [admin.py](#backend-rl_hex_game-hex-hexgame-admin-py)
        - 📄 [apps.py](#backend-rl_hex_game-hex-hexgame-apps-py)
        - 📄 [consumers.py](#backend-rl_hex_game-hex-hexgame-consumers-py)
        - 📁 models/
        - 📄 [models.py](#backend-rl_hex_game-hex-hexgame-models-py)
        - 📄 [routing.py](#backend-rl_hex_game-hex-hexgame-routing-py)
        - 📄 [serializers.py](#backend-rl_hex_game-hex-hexgame-serializers-py)
        - 📄 [urls.py](#backend-rl_hex_game-hex-hexgame-urls-py)
        - 📁 utils/
          - 📄 [Algorithm.py](#backend-rl_hex_game-hex-hexgame-utils-algorithm-py)
          - 📄 [Hexmodel.py](#backend-rl_hex_game-hex-hexgame-utils-hexmodel-py)
          - 📄 [Selfplay.py](#backend-rl_hex_game-hex-hexgame-utils-selfplay-py)
          - 📄 [__init__.py](#backend-rl_hex_game-hex-hexgame-utils-__init__-py)
          - 📄 [utils.py](#backend-rl_hex_game-hex-hexgame-utils-utils-py)
        - 📄 [views.py](#backend-rl_hex_game-hex-hexgame-views-py)
      - 📄 [hex_test.py](#backend-rl_hex_game-hex-hex_test-py)
      - 📄 [manage.py](#backend-rl_hex_game-hex-manage-py)
    - 📄 [Train.py](#backend-rl_hex_game-train-py)
    - 📁 algorithm/
      - 📄 [Algorithm.py](#backend-rl_hex_game-algorithm-algorithm-py)
      - 📄 [GameLogic.py](#backend-rl_hex_game-algorithm-gamelogic-py)
      - 📄 [Hexmodel.py](#backend-rl_hex_game-algorithm-hexmodel-py)
      - 📄 [MCTS.py](#backend-rl_hex_game-algorithm-mcts-py)
      - 📄 [Selfplay.py](#backend-rl_hex_game-algorithm-selfplay-py)
      - 📄 [Test.py](#backend-rl_hex_game-algorithm-test-py)
      - 📄 [__init__.py](#backend-rl_hex_game-algorithm-__init__-py)
      - 📁 model/
    - 📁 model/
    - 📁 replay/
    - 📄 [repository.md](#backend-rl_hex_game-repository-md)
- 📁 hex-ai-frontend/
  - 📁 frontend_effect/
    - 📄 [image_merge.py](#hex-ai-frontend-frontend_effect-image_merge-py)
  - 📄 [output.md](#hex-ai-frontend-output-md)
  - 📁 public/
  - 📁 src/
    - 📁 app/
      - 📁 (app)/
        - 📁 dashboard/
          - 📄 [page.tsx](#hex-ai-frontend-src-app--app--dashboard-page-tsx)
        - 📁 game/
          - 📁 [gameId]/
            - 📄 [page.tsx](#hex-ai-frontend-src-app--app--game--gameid--page-tsx)
        - 📄 [layout.tsx](#hex-ai-frontend-src-app--app--layout-tsx)
        - 📁 replay/
          - 📁 [gameId]/
            - 📄 [page.tsx](#hex-ai-frontend-src-app--app--replay--gameid--page-tsx)
        - 📁 settings/
          - 📄 [page.tsx](#hex-ai-frontend-src-app--app--settings-page-tsx)
      - 📄 [globals.css](#hex-ai-frontend-src-app-globals-css)
      - 📄 [layout.tsx](#hex-ai-frontend-src-app-layout-tsx)
      - 📄 [page.tsx](#hex-ai-frontend-src-app-page-tsx)
    - 📁 components/
      - 📁 dashboard/
        - 📄 [GameListTable.tsx](#hex-ai-frontend-src-components-dashboard-gamelisttable-tsx)
        - 📄 [NewGameOptions.tsx](#hex-ai-frontend-src-components-dashboard-newgameoptions-tsx)
        - 📄 [UserStatsCard.tsx](#hex-ai-frontend-src-components-dashboard-userstatscard-tsx)
      - 📁 hex/
        - 📄 [GameInfo.tsx](#hex-ai-frontend-src-components-hex-gameinfo-tsx)
        - 📄 [GameplayControls.tsx](#hex-ai-frontend-src-components-hex-gameplaycontrols-tsx)
        - 📄 [HexBoard.tsx](#hex-ai-frontend-src-components-hex-hexboard-tsx)
      - 📁 replay/
        - 📄 [ReplayControlBar.tsx](#hex-ai-frontend-src-components-replay-replaycontrolbar-tsx)
      - 📁 settings/
        - 📄 [GameOptionToggles.tsx](#hex-ai-frontend-src-components-settings-gameoptiontoggles-tsx)
        - 📄 [ThemeSelector.tsx](#hex-ai-frontend-src-components-settings-themeselector-tsx)
        - 📄 [UserProfileForm.tsx](#hex-ai-frontend-src-components-settings-userprofileform-tsx)
      - 📁 ui/
        - 📄 [SideBarNav.tsx](#hex-ai-frontend-src-components-ui-sidebarnav-tsx)
    - 📁 hooks/
      - 📄 [useGameWebSocket.ts](#hex-ai-frontend-src-hooks-usegamewebsocket-ts)
    - 📁 lib/
      - 📄 [constants.ts](#hex-ai-frontend-src-lib-constants-ts)
      - 📄 [coordinates.ts](#hex-ai-frontend-src-lib-coordinates-ts)
    - 📁 store/
      - 📄 [gameStore.ts](#hex-ai-frontend-src-store-gamestore-ts)
    - 📁 types/
      - 📄 [hexProps.ts](#hex-ai-frontend-src-types-hexprops-ts)
  - 📄 [tailwind.config.ts](#hex-ai-frontend-tailwind-config-ts)
  - 📄 [tsconfig.json](#hex-ai-frontend-tsconfig-json)
- 📄 [hex_game_refactoring_plan.md](#hex_game_refactoring_plan-md)
- 📄 [进度.md](#---md)

## Source Code

### <a id="backend-api_test-html"></a>backend/API_test.html

```plaintext
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hex Game WebSocket Test</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; padding: 20px; }
        pre { background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .log { border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px; }
        .success { color: green; }
        .error { color: red; }
        .info { color: blue; }
        button { padding: 10px 15px; margin: 10px 5px 10px 0; cursor: pointer; border-radius: 5px; border: 1px solid #ccc; background-color: #e7e7e7; }
        button:hover { background-color: #ddd; }
    </style>
</head>
<body>
    <h1>Hex Game WebSocket Test</h1>
    <button onclick="runAllTests()">Run All Tests</button>
    <div id="output"></div>

    <script>
        const WS_BASE_URL = "ws://localhost:8000/ws/game/";
        const outputDiv = document.getElementById('output');
        let currentGameId = null;
        let gameWebSocket = null;

        // --- Helper Functions ---

        function logMessage(message, type = 'info') {
            console.log(`[${type.toUpperCase()}] ${message}`);
            const logEntry = document.createElement('div');
            logEntry.className = `log ${type}`;
            logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            outputDiv.prepend(logEntry); // Add new logs to the top
        }

        function connectWebSocket(url) {
            return new Promise((resolve, reject) => {
                logMessage(`Connecting to ${url}...`);
                const ws = new WebSocket(url);

                ws.onopen = () => {
                    logMessage(`Connected to ${url}`, 'success');
                    resolve(ws);
                };

                ws.onerror = (error) => {
                    logMessage(`WebSocket Error: ${error.message || 'Unknown error'}`, 'error');
                    console.error("WebSocket Error:", error);
                    reject(error);
                };

                ws.onclose = (event) => {
                    logMessage(`WebSocket closed: Code=${event.code}, Reason=${event.reason || 'No reason given'}`, event.wasClean ? 'info' : 'error');
                    if (gameWebSocket === ws) {
                        gameWebSocket = null; // Clear reference if it's the main game socket
                    }
                };
            });
        }

        function sendMessage(ws, action, data = {}) {
            if (!ws || ws.readyState !== WebSocket.OPEN) {
                logMessage("WebSocket is not open.", 'error');
                return;
            }
            const message = JSON.stringify({ action, ...data });
            logMessage(`Sending: ${message}`);
            ws.send(message);
        }

        function waitForMessage(ws, expectedType = null, timeout = 5000) {
            return new Promise((resolve, reject) => {
                let timeoutId = null;

                const messageListener = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        logMessage(`Received: ${JSON.stringify(message)}`);

                        if (message.type === 'error') {
                            logMessage(`Received error: ${message.data?.message}`, 'error');
                            // Decide if this error should reject the promise or be handled differently
                            // For now, we resolve with the error message for inspection
                            resolve(message);
                            cleanup();
                            return;
                        }

                        if (expectedType === null || message.type === expectedType) {
                            resolve(message);
                            cleanup();
                        }
                        // If expectedType is set but doesn't match, keep listening
                    } catch (e) {
                        logMessage(`Error parsing message: ${e}`, 'error');
                        console.error("Parsing error:", e, "Raw data:", event.data);
                        // Decide how to handle parsing errors, maybe reject?
                        // For now, log and keep listening
                    }
                };

                const errorListener = (error) => {
                    logMessage(`WebSocket error during wait: ${error.message || 'Unknown error'}`, 'error');
                    cleanup();
                    reject(error);
                };

                const closeListener = (event) => {
                    logMessage(`WebSocket closed unexpectedly during wait. Code=${event.code}`, 'error');
                    cleanup();
                    reject(new Error(`WebSocket closed unexpectedly. Code=${event.code}`));
                };

                const cleanup = () => {
                    clearTimeout(timeoutId);
                    ws.removeEventListener('message', messageListener);
                    ws.removeEventListener('error', errorListener);
                    ws.removeEventListener('close', closeListener);
                };

                ws.addEventListener('message', messageListener);
                ws.addEventListener('error', errorListener);
                ws.addEventListener('close', closeListener);

                timeoutId = setTimeout(() => {
                    logMessage(`Timeout waiting for message (expected type: ${expectedType || 'any'})`, 'error');
                    cleanup();
                    reject(new Error(`Timeout waiting for message (expected type: ${expectedType || 'any'})`));
                }, timeout);
            });
        }

        // --- Test Functions ---

        async function testCreateGame(mode = 'HUMAN_AI') {
            logMessage(`--- Test: Create Game (Mode: ${mode}) ---`);
            let creationWs = null;
            try {
                creationWs = await connectWebSocket(WS_BASE_URL + "new/");
                sendMessage(creationWs, 'create_game', { mode });
                const response = await waitForMessage(creationWs, 'game_created');

                if (response && response.type === 'game_created' && response.data && response.data.game_id) {
                    currentGameId = response.data.game_id;
                    logMessage(`Game created successfully! ID: ${currentGameId}`, 'success');
                    // The server should close this connection after sending game_created
                    // await creationWs.close(); // No need to manually close, server does it
                } else {
                    throw new Error(`Failed to create game. Response: ${JSON.stringify(response)}`);
                }
            } catch (error) {
                logMessage(`Create Game Test Failed: ${error.message}`, 'error');
                if (creationWs && creationWs.readyState === WebSocket.OPEN) {
                    creationWs.close();
                }
                throw error; // Re-throw to stop further tests if needed
            }
            logMessage(`--- End Test: Create Game ---`);
        }

        async function testJoinGame() {
            logMessage(`--- Test: Join Game (ID: ${currentGameId}) ---`);
            if (!currentGameId) {
                throw new Error("Cannot join game: No game ID available.");
            }
            try {
                if (gameWebSocket && gameWebSocket.readyState === WebSocket.OPEN) {
                    logMessage("Closing existing game WebSocket connection...");
                    gameWebSocket.close();
                    await new Promise(resolve => setTimeout(resolve, 500)); // Short delay
                }
                gameWebSocket = await connectWebSocket(`${WS_BASE_URL}${currentGameId}/`);
                const response = await waitForMessage(gameWebSocket, 'game_state'); // Expect initial state

                if (response && response.type === 'game_state' && response.data && response.data.id == currentGameId) {
                    logMessage(`Successfully joined game ${currentGameId} and received initial state.`, 'success');
                    // Log initial state details
                    logMessage(`Mode: ${response.data.mode}, Turn: ${response.data.player_turn}, Human Color: ${response.data.human_color}`);
                } else {
                    throw new Error(`Failed to join game or receive initial state. Response: ${JSON.stringify(response)}`);
                }
            } catch (error) {
                logMessage(`Join Game Test Failed: ${error.message}`, 'error');
                if (gameWebSocket && gameWebSocket.readyState === WebSocket.OPEN) {
                    gameWebSocket.close();
                }
                gameWebSocket = null;
                throw error;
            }
            logMessage(`--- End Test: Join Game ---`);
        }

        async function testMakeMove(x, y) {
            logMessage(`--- Test: Make Move (${x}, ${y}) ---`);
            if (!gameWebSocket) throw new Error("Not connected to game WebSocket.");
            try {
                sendMessage(gameWebSocket, 'move', { x, y });
                const response = await waitForMessage(gameWebSocket, 'game_update');
                if (response && response.type === 'game_update' && response.data) {
                     logMessage(`Move successful. Board[${x}][${y}] updated. Current turn: ${response.data.player_turn}`, 'success');
                     // Basic check: Ensure the board at x,y is no longer 0
                     if (response.data.board && response.data.board[x][y] !== 0) {
                         logMessage(`Board state at [${x}][${y}] confirmed updated.`, 'success');
                     } else {
                         logMessage(`Board state at [${x}][${y}] was not updated as expected.`, 'error');
                     }
                } else {
                    throw new Error(`Move failed or unexpected response: ${JSON.stringify(response)}`);
                }
            } catch (error) {
                logMessage(`Make Move Test Failed: ${error.message}`, 'error');
                throw error;
            }
            logMessage(`--- End Test: Make Move ---`);
        }

         async function testAiMove() {
            logMessage(`--- Test: AI Move ---`);
            if (!gameWebSocket) throw new Error("Not connected to game WebSocket.");
            try {
                // Optional: Check if it's AI's turn based on previous state if necessary
                sendMessage(gameWebSocket, 'ai_move');
                const response = await waitForMessage(gameWebSocket, 'game_update', 10000); // AI move might take longer
                if (response && response.type === 'game_update' && response.data) {
                     logMessage(`AI move successful. Current turn: ${response.data.player_turn}`, 'success');
                     // Add more checks if needed, e.g., verify a piece was placed
                } else {
                    throw new Error(`AI move failed or unexpected response: ${JSON.stringify(response)}`);
                }
            } catch (error) {
                logMessage(`AI Move Test Failed: ${error.message}`, 'error');
                throw error;
            }
            logMessage(`--- End Test: AI Move ---`);
        }

        async function testUndoMove() {
            logMessage(`--- Test: Undo Move ---`);
            if (!gameWebSocket) throw new Error("Not connected to game WebSocket.");
            try {
                sendMessage(gameWebSocket, 'undo');
                const response = await waitForMessage(gameWebSocket, 'game_update');
                if (response && response.type === 'game_update' && response.data) {
                     logMessage(`Undo successful. Current turn: ${response.data.player_turn}`, 'success');
                     // Add checks, e.g., verify last move in history is removed, board state reverted
                } else {
                     // Handle case where undo might be invalid (e.g., no moves made)
                     if (response && response.type === 'error') {
                         logMessage(`Undo failed as expected (or server error): ${response.data.message}`, 'info');
                     } else {
                        throw new Error(`Undo failed or unexpected response: ${JSON.stringify(response)}`);
                     }
                }
            } catch (error) {
                logMessage(`Undo Move Test Failed: ${error.message}`, 'error');
                throw error;
            }
            logMessage(`--- End Test: Undo Move ---`);
        }

        async function testRestartGame() {
            logMessage(`--- Test: Restart Game ---`);
            if (!gameWebSocket) throw new Error("Not connected to game WebSocket.");
            try {
                sendMessage(gameWebSocket, 'restart');
                const response = await waitForMessage(gameWebSocket, 'game_update');
                if (response && response.type === 'game_update' && response.data) {
                     logMessage(`Restart successful. Current turn: ${response.data.player_turn}`, 'success');
                     // Check if board is reset, history cleared etc.
                     const isBoardReset = response.data.board.every(row => row.every(cell => cell === 0));
                     if (isBoardReset) {
                        logMessage('Board confirmed reset.', 'success');
                     } else {
                        logMessage('Board not fully reset.', 'error');
                     }
                } else {
                    throw new Error(`Restart failed or unexpected response: ${JSON.stringify(response)}`);
                }
            } catch (error) {
                logMessage(`Restart Game Test Failed: ${error.message}`, 'error');
                throw error;
            }
            logMessage(`--- End Test: Restart Game ---`);
        }

        // --- Main Test Runner ---

        async function runAllTests() {
            outputDiv.innerHTML = ''; // Clear previous logs
            currentGameId = null;
            if (gameWebSocket && gameWebSocket.readyState === WebSocket.OPEN) {
                gameWebSocket.close();
                gameWebSocket = null;
            }
            logMessage("====== Starting WebSocket API Tests ======");

            try {
                // Test Human vs AI Flow
                await testCreateGame('HUMAN_AI');
                await testJoinGame();
                await testMakeMove(0, 0); // Make a move as human
                await testAiMove();       // Trigger AI move
                await testMakeMove(1, 1); // Make another move
                await testUndoMove();       // Undo last human move
                await testUndoMove();       // Undo AI move (if implementation allows/makes sense)
                await testRestartGame();    // Restart the game
                logMessage("====== Human vs AI Flow Tests Passed ======", 'success');

                // Test AI vs AI Flow (Basic creation and join)
                await testCreateGame('AI_AI');
                await testJoinGame(); // Join the AI vs AI game to observe
                // Note: AI vs AI game runs in the background on the server.
                // We can listen for updates here if needed.
                logMessage("Listening for AI vs AI game updates for 5 seconds...");
                try {
                    // Listen for a few updates
                    await waitForMessage(gameWebSocket, 'game_update', 5000);
                    await waitForMessage(gameWebSocket, 'game_update', 5000);
                } catch (timeoutError) {
                    logMessage("No game updates received for AI vs AI game in the timeframe (or timeout occurred). This might be normal if the game finished quickly or updates are slow.", 'info');
                }
                logMessage("====== AI vs AI Flow Tests (Create/Join) Passed ======", 'success');

                logMessage("====== All Tests Completed ======", 'success');

            } catch (error) {
                logMessage(`====== A Test Failed: ${error.message} ======`, 'error');
                console.error("Test failure:", error);
            } finally {
                if (gameWebSocket && gameWebSocket.readyState === WebSocket.OPEN) {
                    logMessage("Closing final WebSocket connection.");
                    gameWebSocket.close();
                    gameWebSocket = null;
                }
                logMessage("====== Test Run Finished ======");
            }
        }

    </script>
</body>
</html>

```

### <a id="backend-rl_hex_game-hex-hex-__init__-py"></a>backend/RL_Hex_game/Hex/Hex/__init__.py

```python

```

### <a id="backend-rl_hex_game-hex-hex-asgi-py"></a>backend/RL_Hex_game/Hex/Hex/asgi.py

```python
"""
ASGI config for Hex project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# 首先设置环境变量
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Hex.settings")

# 初始化Django ASGI应用
django_asgi_app = get_asgi_application()

# 之后再导入需要Django环境的模块
import Hexgame.routing
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AuthMiddlewareStack(
            URLRouter(Hexgame.routing.websocket_urlpatterns)
        ),
    }
)

```

### <a id="backend-rl_hex_game-hex-hex-settings-py"></a>backend/RL_Hex_game/Hex/Hex/settings.py

```python
"""
Django settings for Hex project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-6gy26qr_=++60sdd#mp8k+=lfd$b-ahbhg(4b&wr-f$!v0n^xo"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "Hexgame",
    "rest_framework",
    "channels",
]

# 配置ASGI应用
ASGI_APPLICATION = "Hex.asgi.application"

# 配置通道层（使用内存作为后端，不需要Redis）
CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "Hex.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "Hexgame/templates/html")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "Hex.wsgi.application"


# 允许本地开发跨域
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "Hexgame/static"),  # 应用静态目录
]
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# RL Model settings
RL_MODEL_PATH = "../../Hex/Hexgame/models/model1000.pth"

```

### <a id="backend-rl_hex_game-hex-hex-urls-py"></a>backend/RL_Hex_game/Hex/Hex/urls.py

```python
"""
URL configuration for Hex project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Hexgame.urls')),
]
```

### <a id="backend-rl_hex_game-hex-hex-wsgi-py"></a>backend/RL_Hex_game/Hex/Hex/wsgi.py

```python
"""
WSGI config for Hex project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Hex.settings")

application = get_wsgi_application()

```

### <a id="backend-rl_hex_game-hex-hexgame-__init__-py"></a>backend/RL_Hex_game/Hex/Hexgame/__init__.py

```python

```

### <a id="backend-rl_hex_game-hex-hexgame-admin-py"></a>backend/RL_Hex_game/Hex/Hexgame/admin.py

```python
from django.contrib import admin

# Register your models here.

```

### <a id="backend-rl_hex_game-hex-hexgame-apps-py"></a>backend/RL_Hex_game/Hex/Hexgame/apps.py

```python
from django.apps import AppConfig


class HexgameConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Hexgame"

```

### <a id="backend-rl_hex_game-hex-hexgame-consumers-py"></a>backend/RL_Hex_game/Hex/Hexgame/consumers.py

```python
import asyncio
import json
import logging

from asgiref.sync import sync_to_async
from channels.exceptions import ChannelFull
from channels.generic.websocket import AsyncWebsocketConsumer

import Hexgame.utils.Algorithm as Algorithm

from .models import HexGame
from .serializers import HexGameSerializer
from .utils.utils import check_hex_connection

# Set up logging
logger = logging.getLogger(__name__)


class HexGameConsumer(AsyncWebsocketConsumer):
    """处理Hex游戏的WebSocket连接"""

    async def connect(self):
        """处理连接请求"""
        try:
            # 如果是创建新游戏的连接（/ws/game/new/）
            if self.scope["path"] == "/ws/game/new/":
                # 特殊标记，不加入任何组
                self.is_creation_connection = True
                await self.accept()
                logger.info("New game creation connection accepted")
            else:
                # 常规游戏房间连接
                self.game_id = self.scope["url_route"]["kwargs"]["game_id"]
                self.game_group_name = f"game_{self.game_id}"

                # Check if channel layer is configured
                if self.channel_layer is None:
                    logger.error("Channel layer not configured")
                    raise ValueError("Channel layer not configured")

                # Verify game exists before joining group
                try:
                    game = await self.get_game()
                except Exception as e:
                    logger.error(f"Failed to get game with ID {self.game_id}: {str(e)}")
                    await self.close(code=4004)  # Custom close code
                    return

                # Join group and accept connection
                try:
                    await self.channel_layer.group_add(
                        self.game_group_name, self.channel_name
                    )
                    await self.accept()
                    logger.info(f"Connection accepted for game {self.game_id}")

                    # Send initial game state
                    await self.send_current_game_state()
                except ChannelFull:
                    logger.error(f"Channel is full for game {self.game_id}")
                    await self.close(code=4001)
                except Exception as e:
                    logger.error(f"Error in connect for game {self.game_id}: {str(e)}")
                    await self.close(code=4002)
        except Exception as e:
            logger.error(f"Unhandled exception in connect: {str(e)}")
            # Try to close the connection if possible
            try:
                await self.close(code=4000)
            except:
                pass

    async def disconnect(self, close_code):
        """处理断开连接"""
        try:
            logger.info(f"WebSocket disconnected with code: {close_code}")
            # Only remove from group if we joined a group
            if hasattr(self, "game_group_name") and self.channel_layer:
                try:
                    await self.channel_layer.group_discard(
                        self.game_group_name, self.channel_name
                    )
                    logger.info(f"Removed from group {self.game_group_name}")
                except Exception as e:
                    logger.error(f"Error removing from group: {str(e)}")
        except Exception as e:
            logger.error(f"Error in disconnect: {str(e)}")

    async def receive(self, text_data):
        """接收客户端消息"""
        try:
            data = json.loads(text_data)
            action = data.get("action")
            logger.info(f"Received action: {action}")

            # 如果是创建连接且收到创建请求
            if hasattr(self, "is_creation_connection") and action == "create_game":
                await self.handle_create_game(data)
            # 修改此处的条件判断
            elif action == "move":
                await self.handle_move(data)
            elif action == "ai_move":
                await self.handle_ai_move()
            elif action == "undo":
                await self.handle_undo()
            elif action == "restart":
                await self.handle_restart()
            elif action == "create_ai_game":
                # Check if this method is implemented
                if hasattr(self, "handle_create_ai_game"):
                    await self.handle_create_ai_game()
                else:
                    await self.send_error("Action not implemented: create_ai_game")
            else:
                await self.send_error(f"Invalid action: {action}")

        except json.JSONDecodeError:
            await self.send_error("Invalid JSON format")
        except Exception as e:
            logger.error(f"Error in receive: {str(e)}")
            await self.send_error(f"Error processing request: {str(e)}")

    async def send_current_game_state(self):
        """发送当前游戏状态（统一消息格式）"""
        try:
            game = await self.get_game()
            serializer = HexGameSerializer(game)
            await self._send_message("game_state", serializer.data)
        except Exception as e:
            logger.error(f"Error sending game state: {str(e)}")
            await self.send_error(f"Could not retrieve game state: {str(e)}")

    async def send_error(self, message):
        """发送错误消息（统一错误格式）"""
        try:
            logger.error(f"Sending error to client: {message}")
            await self._send_message("error", {"message": message})
        except Exception as e:
            logger.error(f"Error sending error message: {str(e)}")

    async def game_update(self, event):
        """处理组播消息（统一消息格式）"""
        try:
            await self._send_message(event["type"], event["data"])
        except Exception as e:
            logger.error(f"Error in game_update: {str(e)}")

    async def _send_message(self, msg_type, data):
        """统一消息发送方法"""
        try:
            await self.send(text_data=json.dumps({"type": msg_type, "data": data}))
        except Exception as e:
            logger.error(f"Error in _send_message: {str(e)}")

    async def get_game(self):
        """获取游戏对象（异步方法）"""
        try:
            return await HexGame.objects.aget(id=self.game_id)
        except HexGame.DoesNotExist:
            logger.error(f"Game with ID {self.game_id} not found")
            raise ValueError(f"Game with ID {self.game_id} not found")
        except Exception as e:
            logger.error(f"Error fetching game: {str(e)}")
            raise

    # ---- 核心操作处理 ----
    async def handle_move(self, data):
        """处理玩家移动"""
        try:
            game = await self.get_game()

            # Validate input
            if "x" not in data or "y" not in data:
                await self.send_error("Missing coordinates (x, y)")
                return

            x, y = data["x"], data["y"]

            # Additional validation
            if not isinstance(x, int) or not isinstance(y, int):
                await self.send_error("Coordinates must be integers")
                return

            if not (0 <= x < 11 and 0 <= y < 11):  # 11x11 board assumption
                await self.send_error("Coordinates out of bounds")
                return

            if await game.async_make_move(x, y):
                # 检查胜负
                player_val = (
                    1
                    if (game.player_turn == "human" and game.human_color == "red")
                    else -1
                )
                if check_hex_connection(game.board, player_val):
                    game.winner = "human" if game.player_turn == "human" else "AI"
                    await game.asave()

                await self.broadcast_game_update(game)
            else:
                await self.send_error("Invalid move")

        except Exception as e:
            logger.error(f"Error in handle_move: {str(e)}")
            await self.send_error(f"Move failed: {str(e)}")

    async def handle_ai_move(self):
        """处理AI移动(完全异步化)"""
        try:
            game = await self.get_game()

            if game.winner:
                await self.send_error("Game already has a winner")
                return

            if game.player_turn != "AI":
                await self.send_error("Not AI's turn")
                return

            # 调用算法服务
            input_dict = {
                "board": game.board,
                "player_turn": game.player_turn,
                "last_moves": game.last_moves,
            }

            try:
                ai_model = Algorithm.HexAI()
                response = ai_model.predict(input_dict)
            except Exception as e:
                logger.error(f"AI prediction error: {str(e)}")
                await self.send_error(f"AI prediction failed: {str(e)}")
                return

            if response:
                ai_move = response["optimal_move"]
                # 使用异步保存
                if await game.async_make_move(ai_move[0], ai_move[1]):
                    # 使用异步更新胜率
                    await game.async_update_win_probability(
                        1 - response["winning_rate"], response["winning_rate"]
                    )

                    # 检查胜负
                    player_val = -1 if game.human_color == "red" else 1
                    if check_hex_connection(game.board, player_val):
                        game.winner = "AI"
                        await game.asave()  # 异步保存

                    await self.broadcast_game_update(game)
                    return  # 成功返回
                else:
                    await self.send_error(f"AI could not make move at {ai_move}")
            else:
                await self.send_error("AI failed to generate a move")

        except Exception as e:
            logger.error(f"AI move error: {str(e)}")
            await self.send_error(f"AI move failed: {str(e)}")

    async def handle_undo(self):
        """处理悔棋（异步化）"""
        try:
            game = await self.get_game()
            if await game.async_undo_last_move():
                await self.broadcast_game_update(game)
            else:
                await self.send_error("No moves to undo")
        except Exception as e:
            logger.error(f"Undo error: {str(e)}")
            await self.send_error(f"Undo failed: {str(e)}")

    async def handle_restart(self):
        """处理重置（异步化）"""
        try:
            game = await self.get_game()
            if await game.async_reset_game():
                await self.broadcast_game_update(game)
            else:
                await self.send_error("Reset failed")
        except Exception as e:
            logger.error(f"Restart error: {str(e)}")
            await self.send_error(f"Restart failed: {str(e)}")

    async def handle_create_game(self, data):
        """创建游戏（异步优化版）"""
        try:
            mode = data.get("mode", "HUMAN_AI").upper()

            # 验证模式合法性
            if mode not in ["HUMAN_AI", "AI_AI"]:
                await self.send_error(f"Invalid game mode: {mode}")
                return

            # 使用异步ORM创建游戏对象
            from .models import HexGame

            try:
                game = await sync_to_async(HexGame.objects.create)(mode=mode)
            except Exception as e:
                logger.error(f"Error creating game: {str(e)}")
                await self.send_error(f"Could not create game: {str(e)}")
                return

            # 异步执行初始化
            try:
                await sync_to_async(game.initialize)(new_game=True)
            except Exception as e:
                logger.error(f"Error initializing game: {str(e)}")
                # Clean up the created game if initialization fails
                await sync_to_async(game.delete)()
                await self.send_error(f"Could not initialize game: {str(e)}")
                return

            # 返回创建成功消息
            await self._send_message(
                "game_created",
                {
                    "game_id": str(game.id),  # 确保ID转为字符串
                    "redirect": f"/ws/game/{game.id}/",
                },
            )

            logger.info(f"Created new game with ID {game.id}, mode {mode}")

            # Close the connection after successful game creation
            await self.close()

            # 异步启动AI对战（如果是AI_AI模式）
            if mode == "AI_AI":
                from .utils.utils import run_ai_vs_ai_game

                try:
                    asyncio.create_task(run_ai_vs_ai_game(game.id))
                    logger.info(f"Started AI vs AI game with ID {game.id}")
                except Exception as e:
                    logger.error(f"Error starting AI vs AI game: {str(e)}")

        except Exception as e:
            logger.error(f"Error in handle_create_game: {str(e)}")
            await self.send_error(f"Game creation failed: {str(e)}")

    async def broadcast_game_update(self, game):
        """统一广播更新方法"""
        try:
            serializer = HexGameSerializer(game)
            # Avoid large debug output
            logger.debug(f"Broadcasting update for game {game.id}")

            if self.channel_layer is None:
                logger.error("Channel layer not available for broadcast")
                return

            await self.channel_layer.group_send(
                self.game_group_name,
                {
                    "type": "game_update",  # 对应game_update方法
                    "data": serializer.data,
                },
            )
        except Exception as e:
            logger.error(f"Error broadcasting game update: {str(e)}")
            # Try to send error to the client who initiated the action
            await self.send_error(f"Failed to broadcast game update: {str(e)}")

```

### <a id="backend-rl_hex_game-hex-hexgame-models-py"></a>backend/RL_Hex_game/Hex/Hexgame/models.py

```python
from asgiref.sync import sync_to_async
from django.db import models


class HexGame(models.Model):
    BOARD_SIZE = 11
    board = models.JSONField(default=list)
    player_turn = models.CharField(max_length=10, default="human")
    last_moves = models.JSONField(default=list)
    moves_history = models.JSONField(default=list)
    winner = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    human_color = models.CharField(max_length=10, default="red")  # 玩家颜色
    win_probability = models.JSONField(default=dict)  # 胜率

    MODE_CHOICES = [
        ("HUMAN_AI", "Human vs AI"),
        ("AI_AI", "AI vs AI"),  # 新增模式
    ]

    mode = models.CharField(  # 模式(pvp or pve)
        max_length=10,
        choices=MODE_CHOICES,
        default='HUMAN_AI'
    )


    def initialize(self, new_game=False):
        """初始化或重置游戏"""
        self.board = [[0]*self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        self.last_moves = [[0]*self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        self.moves_history = []
        self.winner = None

        # 如果是新游戏(不是重置)，随机分配颜色
        if new_game:
            # 确保所有字段初始化
            if self.mode == "AI_AI":
                self.player_turn = "AI_1"
                self.win_probability = {"AI_1": 0.5, "AI_2": 0.5}
                self.human_color = "red"  # 固定值
            else:
                # 确保human_color被正确设置
                self.human_color = "red"
                # if self.human_color == 'blue' else 'blue'
                self.win_probability = {"human": 0.5, "AI": 0.5}
                self.player_turn = "human"
                # if self.human_color == 'red' else 'AI'
            self.save()  # 立即保存
        else:
            # 设置先手玩家
            if self.mode == "AI_AI":
                self.player_turn = "AI_1"
                self.win_probability = {"AI_1": 0.5, "AI_2": 0.5}
            else:
                self.player_turn = "human" if self.human_color == "red" else "AI"
                self.win_probability = {"human": 0.5, "AI": 0.5}
            self.save()

    def reset_game(self):
        """重置当前游戏（保留颜色分配）"""
        self.initialize(new_game=False)
        return True

    def make_move(self, x, y):
        """执行落子（增加模式判断）"""
        if self.board[x][y] != 0:
            return False

        # 确定棋子值
        if self.mode == 'AI_AI':
            # AI对战模式根据current_ai_player判断
            if self.player_turn == 'AI_1':
                player_val = 1
            else:
                player_val = -1
        else:
            # 其他模式
            if self.player_turn == 'human':
                player_val = 1 if self.human_color == 'red' else -1
            else:
                player_val = -1 if self.human_color == 'red' else 1

        step = len(self.moves_history) + 1
        self.board[x][y] = player_val
        self.last_moves[x][y] = step
        self.moves_history.append(
            {
                "player": self.player_turn,
                "x": x,
                "y": y,
                "step": step,
                "color": "red" if player_val == 1 else "blue",
            }
        )

        # 切换回合
        if self.mode == 'AI_AI':
            self.player_turn = 'AI_2' if self.player_turn == 'AI_1' else 'AI_1'
        else:
            self.player_turn = 'AI' if self.player_turn == 'human' else 'human'

        self.save()
        return True

    def undo_last_move(self):
        """悔棋功能(支持AI对战)"""
        if not self.moves_history:
            return False

        last_move = self.moves_history.pop()
        x, y = last_move['x'], last_move['y']

        self.board[x][y] = 0
        self.last_moves[x][y] = 0
        self.winner = None

        self.player_turn = last_move['player']

        self.save()
        return True

    def update_win_probability(self, human_prob, ai_prob):
        self.win_probability = {
            "human": round(human_prob, 2),
            "AI": round(ai_prob, 2)
        }
        self.save()

    @sync_to_async
    def async_make_move(self, x, y):
        """异步版本的make_move"""
        return self.make_move(x, y)

    @sync_to_async
    def async_undo_last_move(self):
        """异步版本的undo_last_move"""
        return self.undo_last_move()

    @sync_to_async
    def async_reset_game(self):
        """异步版本的reset_game"""
        return self.reset_game()

    @sync_to_async
    def async_update_win_probability(self, human_prob, ai_prob):
        return self.update_win_probability(human_prob, ai_prob)

    @sync_to_async
    def async_check_connection(self, player_val):
        """异步版本的连接检查"""
        from Hexgame.utils.utils import check_hex_connection
        return check_hex_connection(self.board, player_val)

```

### <a id="backend-rl_hex_game-hex-hexgame-routing-py"></a>backend/RL_Hex_game/Hex/Hexgame/routing.py

```python
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # 创建游戏专用路由（无需game_id）
    re_path(r'^ws/game/new/$', consumers.HexGameConsumer.as_asgi()),
    
    # 游戏房间路由（需要game_id）
    re_path(r'^ws/game/(?P<game_id>\d+)/$', consumers.HexGameConsumer.as_asgi()),
]
```

### <a id="backend-rl_hex_game-hex-hexgame-serializers-py"></a>backend/RL_Hex_game/Hex/Hexgame/serializers.py

```python
from rest_framework import serializers

from .models import HexGame


class HexGameSerializer(serializers.ModelSerializer):
    """Within the HexGameSerializer, a Meta class is defined. This inner class provides metadata about the serializer, telling it which model it should work with and which fields of that model should be included in the serialization process. The model = HexGame line indicates that this serializer is designed to handle instances of the HexGame model, which is defined in Hexgame/models.py"""

    class Meta:
        model = HexGame
        fields = [
            "id",
            "board",
            "player_turn",
            "human_color",
            "last_moves",
            "winner",
            "moves_history",
            "win_probability",
            "mode",
        ]
        extra_kwargs = {"board": {"read_only": True}, "last_moves": {"read_only": True}}


class HexGameSummarySerializer(serializers.ModelSerializer):
    """
    A lightweight serializer for the game list view that includes only essential fields.
    This reduces payload size and improves performance when fetching multiple games.
    """

    class Meta:
        model = HexGame
        fields = [
            "id",
            "player_turn",
            "winner",
            "mode",
            "human_color",
        ]

```

### <a id="backend-rl_hex_game-hex-hexgame-urls-py"></a>backend/RL_Hex_game/Hex/Hexgame/urls.py

```python
from django.urls import path

from .views import (
    AIGameStatusAPI,
    AIMoveAPI,
    CreateAIGameAPI,
    GameAPI,
    GameListView,
    MoveAPI,
    RestartAPI,
    UndoAPI,
    test_api_view,
)

urlpatterns = [
    path("", test_api_view),
    path("api/games/", GameListView.as_view()),  # NEW: API to get list of all games
    # The following REST endpoints are being maintained for backward compatibility
    # but should be considered deprecated in favor of WebSocket communication
    path(
        "games/", GameAPI.as_view()
    ),  # POST create new game (prefer WebSocket create_game action)
    path(
        "games/<int:game_id>/", GameAPI.as_view()
    ),  # GET game status (prefer WebSocket connection)
    path(
        "games/<int:game_id>/move/", MoveAPI.as_view()
    ),  # DEPRECATED: prefer WebSocket move action
    path(
        "games/<int:game_id>/ai_move/", AIMoveAPI.as_view()
    ),  # DEPRECATED: prefer WebSocket ai_move action
    path(
        "games/<int:game_id>/undo/", UndoAPI.as_view()
    ),  # DEPRECATED: prefer WebSocket undo action
    path(
        "games/<int:game_id>/restart/", RestartAPI.as_view()
    ),  # DEPRECATED: prefer WebSocket restart action
    path(
        "ai_games/", CreateAIGameAPI.as_view()
    ),  # Create AI vs AI game (consider WebSocket)
    path("ai_games/<int:game_id>/", AIGameStatusAPI.as_view()),  # Query AI game status
]

```

### <a id="backend-rl_hex_game-hex-hexgame-utils-algorithm-py"></a>backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py

```python
import os
from pathlib import Path

# Get current script directory
current_dir = Path(__file__).parent
print("Current Directory:", current_dir)

# Navigate to target directory
os.chdir(current_dir.resolve())  # resolve() normalizes the path


import logging

import numpy as np
import torch
from django.conf import settings

from .Hexmodel import HexNet

logger = logging.getLogger(__name__)


class HexAI:
    def __init__(self, model_path=None):
        # Use the model_path parameter if provided, otherwise use the Django settings
        if model_path is None:
            try:
                model_path = settings.RL_MODEL_PATH
                logger.info(f"Using model path from settings: {model_path}")
            except AttributeError:
                error_msg = "RL_MODEL_PATH not defined in Django settings."
                logger.error(error_msg)
                raise ValueError(error_msg)

        self.model = self.load_model(model_path)

    def load_model(self, model_path):
        model = HexNet()  # Model Seleciton

        try:
            if torch.cuda.is_available():
                device = torch.device("cuda")
                print("Using CUDA device.")
            elif torch.backends.mps.is_available():
                device = torch.device("mps")
                print("Using MPS device.")
            else:
                device = torch.device("cpu")
                print("Using CPU device.")

            # Check if model path exists
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at: {model_path}")

            # Load the state dictionary with map_location to ensure compatibility
            state_dict = torch.load(model_path, map_location=device)

            # Check if the state_dict is nested (e.g., contains 'model_state')
            if "model_state" in state_dict:
                model.load_state_dict(state_dict["model_state"])
            else:
                # Assume the loaded object is directly the state_dict
                # model.load_state_dict(state_dict)
                raise ValueError("Invalid model state dictionary format.")

            model.to(device)  # Move the model to the selected device
            model.eval()
            return model

        except Exception as e:
            logger.error(f"Error loading model from {model_path}: {str(e)}")
            raise

    def preprocess_input(self, input):
        # Dict -> Tensor
        board = np.array(input["board"])
        last_moves = np.array(input["last_moves"])
        current_player = 2 * (-1 * np.sum(board) + 0.5)  # check current player
        if current_player == -1:
            board = -1 * board.T
            last_moves = last_moves.T
        # Read: input_tensor 第一维度为当前局面，第二维度为落子顺序
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        # print(current_player)
        input_tensor[0] = (board).astype(np.float32)  # Current player
        # print ("current:",input_tensor[0])
        input_tensor[1] = (last_moves).astype(
            np.float32
        )  # opponent player#考虑改为最后动作
        # print ("opponent:",input_tensor[1])
        # print(np.where("board" == 0))
        return current_player, torch.from_numpy(input_tensor).unsqueeze(
            0
        )  # 添加batch维度

    def predict(self, input_dict):
        # Preprocess
        try:
            current_player, input_tensor = self.preprocess_input(input_dict)
            print("current_player:", current_player)
            print("input_tensor:", input_tensor)

            # Get the device that the model is on
            device = next(self.model.parameters()).device

            # Move input tensor to the same device as the model
            input_tensor = input_tensor.to(device)

            legal_moves = (
                np.argwhere(np.array(input_dict["board"]) == 0).tolist()
                if current_player == 1
                else np.argwhere(np.array(input_dict["board"]).T == 0).tolist()
            )
            print("legal_moves:", legal_moves)

            if self.model:
                with torch.no_grad():
                    policy_logits, value = self.model(input_tensor)
                    print("policy_logits:", policy_logits)
                    print("value:", value)
                probs_device = torch.softmax(policy_logits, dim=-1)
                move_probs = (
                    probs_device.flatten()
                    if current_player == 1
                    else probs_device.reshape(11, 11).T.flatten()
                )
                print("move_probs:", move_probs)
            else:
                # 若无模型，随机选择合法动作
                move_probs = np.ones(
                    np.shape(np.array(input_dict["board"]))
                ).flatten() / len(legal_moves)
                print("Notice: No model selected.")

            # index = row * width + column
            if current_player == 1:
                legal_indices = [lst[0] * 11 + lst[1] for lst in legal_moves]
            else:
                legal_indices = [lst[1] * 11 + lst[0] for lst in legal_moves]

            # TODO:待更改：把输出最高prob改成输出top3

            legal_probs = move_probs[legal_indices]
            print("legal_probs:", legal_probs)

            # Ensure legal_probs is a tensor before calling torch.argmax
            if isinstance(legal_probs, np.ndarray):
                legal_probs = torch.from_numpy(legal_probs)

            optimal_idx = torch.argmax(legal_probs).item()
            print("optimal_idx:", optimal_idx)
            optimal_move = legal_moves[optimal_idx]
            print("optimal_move:", optimal_move)
            winning_rate = (
                (value.item() + 1) / 2 if self.model else 0.5
            )  # [-1,1]->[0,1], 0.5 if no model selected
            print("winning_rate:", winning_rate)
            return {
                "optimal_move": optimal_move,
                "winning_rate": round(winning_rate, 2),
            }
        except Exception as e:
            print(f"Error in prediction: {str(e)}")
            return None


# Move the test code into if __name__ == "__main__": block
if __name__ == "__main__":
    # Test code - only runs when script is executed directly
    hex_ai = HexAI()

    # 模拟后端输入
    input_data = {
        "board": [
            [1, -1, 1, -1, 1, 0, -1, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        "player_turn": "AI",
        "last_moves": [
            [1, 4, 3, 2, 11, 0, 12, 13, 0, 0, 0],
            [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 9, 0, 0, 0, 0, 0, 8, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        # "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
    }

    # 调用预测函数
    output = hex_ai.predict(input_data)
    print("AI选择的动作:", output["optimal_move"])
    print("胜率:", output["winning_rate"])

```

### <a id="backend-rl_hex_game-hex-hexgame-utils-hexmodel-py"></a>backend/RL_Hex_game/Hex/Hexgame/utils/Hexmodel.py

```python
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from collections import deque
import random
# ======================
# 1. 神经网络模型定义
# ======================
class HexNet(nn.Module):
    """Hex策略-价值网络 (兼容AlphaZero架构)"""
    def __init__(self, board_size=11, num_channels=256, num_res_blocks=4):
        super().__init__()
        self.board_size = board_size
        
        # 输入通道：2 (玩家1位置, 玩家2位置, 当前玩家)
        self.conv_in = nn.Conv2d(2, num_channels, 3, padding=1)
        self.bn_in = nn.BatchNorm2d(num_channels)
        
        # 残差块堆叠
        self.res_blocks = nn.ModuleList([
            nn.Sequential(
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels),
                nn.ReLU(),
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels)
            ) for _ in range(num_res_blocks)
        ])
        
        # 策略头
        self.policy_head = nn.Sequential(
            nn.Conv2d(num_channels, 2, 1),
            nn.Flatten(),
            nn.Linear(2*board_size*board_size, board_size*board_size)
        )
        
        # 价值头
        self.value_head = nn.Sequential(
            nn.Conv2d(num_channels, 1, 1),
            nn.Flatten(),
            nn.Linear(board_size*board_size, 256),
            nn.ReLU(),
            nn.Linear(256, 1),
            nn.Tanh()
        )


    def forward(self, x):
        x = torch.relu(self.bn_in(self.conv_in(x)))#Residual
        for block in self.res_blocks:
            x = block(x) + x 
            x = torch.relu(x)
        policy = self.policy_head(x)
        value = self.value_head(x)
        return policy, value
# ======================
# 2. 经验回放缓冲区
# ======================
class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)
    
    def add(self, experience):
        """添加单局游戏数据"""
        self.buffer.extend(experience)
    
    def sample(self, batch_size):
        """随机采样批次数据"""
        return random.sample(self.buffer, min(len(self.buffer), batch_size))
    
    def __len__(self):
        return len(self.buffer)

# ======================
# 3. 自对弈生成器
# ======================
class SelfPlay:
    def __init__(self, model, buffer):
        self.model = model
        self.buffer = buffer
        # self.env = HexGame()  # 假设已实现Hex游戏逻辑
    
    def generate_game(self, temperature=1.0):
        """生成一局自对弈数据"""
        states = []
        probs = []
        current_player = 1
        self.env.reset()
        
        while not self.env.is_terminal():
            # 获取当前状态
            board_state = self.env.get_state()
            legal_moves = self.env.legal_moves()
            
            # 模型预测
            with torch.no_grad():
                policy_logits, value = self.model(board_state)
            
            # 转换为动作概率（可添加噪声）
            policy = torch.softmax(policy_logits/temperature, dim=-1)
            action_probs = policy.squeeze().numpy()
            
            # 过滤非法动作
            legal_mask = np.zeros_like(action_probs)
            for move in legal_moves:
                idx = move[0]*self.env.size + move[1]
                legal_mask[idx] = 1
            action_probs *= legal_mask
            action_probs /= np.sum(action_probs)
            
            # 保存训练数据
            states.append({
                "state": board_state,
                "player": current_player,
                "legal_moves": legal_moves
            })
            probs.append(action_probs)
            
            # 执行动作
            action_idx = np.random.choice(len(action_probs), p=action_probs)
            action = (action_idx//self.env.size, action_idx%self.env.size)
            self.env.step(action)
            current_player = 3 - current_player
        
        # 获取最终胜负
        winner = self.env.get_winner()
        
        # 生成训练样本
        game_data = []
        for i, (state, prob) in enumerate(zip(states, probs)):
            reward = 1 if state["player"] == winner else -1
            game_data.append((
                state["state"],
                prob,
                torch.tensor([reward], dtype=torch.float32)
            ))
        
        self.buffer.add(game_data)




```

### <a id="backend-rl_hex_game-hex-hexgame-utils-selfplay-py"></a>backend/RL_Hex_game/Hex/Hexgame/utils/Selfplay.py

```python
import torch
import numpy as np
from collections import deque
import random

class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)
    
    def add(self, experience):
        """添加单局游戏数据"""
        self.buffer.extend(experience)
    
    def sample(self, batch_size):
        """随机采样批次数据"""
        return random.sample(self.buffer, min(len(self.buffer), batch_size))
    
    def __len__(self):
        return len(self.buffer)

# ======================
# 自对弈生成器
# ======================

class SelfPlay:
    def __init__(self, model, buffer, device):
        """初始化自对弈模块"""
        self.model = model
        self.buffer = buffer
        self.device = device
        self.env = HexGame()

    def preprocess_input(self, input):
        """同algorithm"""
        board = np.array(input["board"])
        current_player = 2*(-board.sum()+0.5) #check current player
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        input_tensor[0] = (board * current_player).astype(np.float32)  # Current player
        #print ("current:",input_tensor[0])
        input_tensor[1] = (np.array(input["last_moves"])).astype(np.float32)  # opponent player#考虑改为最后动作
        #print ("opponent:",input_tensor[1])
        #print(np.where("board" == 0))
        return torch.from_numpy(input_tensor).unsqueeze(0)  # 添加batch维度
    
    def generate_game(self):
        # 初始化环境
        self.env.reset()
        game_history = []
        
        while not self.env.is_terminal():
            # 获取当前状态
            input = self.env.output()
            # 动态计算合法动作（所有空位置）
            legal_moves = np.argwhere(np.array(input["board"]) == 0).tolist()  # [(x1,y1), (x2,y2), ...]
            
            # 预处理输入
            input_tensor = self.preprocess_input(input)
            
            # 模型预测
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            
            # 生成动作概率（仅合法位置）
            policy_probs = torch.softmax(policy_logits, dim=-1).squeeze().numpy()
            legal_indices = [lst[0]*11 + lst[1] for lst in legal_moves]
            legal_probs = policy_probs[legal_indices]
            legal_probs /= legal_probs.sum()  # 重新归一化
            
            # 选择动作
            action_idx = np.random.choice(len(legal_probs), p=legal_probs)
            action = legal_moves[action_idx]
            
            # 执行动作并记录数据
            self.env.step(action)
            game_history.append((input_tensor, legal_probs, value))
        
        # 生成终局棋谱
        final_board = self.env.output()["board"]
        return game_history, final_board, final_last_moves


```

### <a id="backend-rl_hex_game-hex-hexgame-utils-__init__-py"></a>backend/RL_Hex_game/Hex/Hexgame/utils/__init__.py

```python

```

### <a id="backend-rl_hex_game-hex-hexgame-utils-utils-py"></a>backend/RL_Hex_game/Hex/Hexgame/utils/utils.py

```python
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
        player_val = 1 if (ai_name == "AI_1" and game.human_color == "red") else -1

        # 调用算法服务获取AI落子
        input_dict = {
            "board": game.board,
            "player_turn": game.player_turn,
            "last_moves": game.last_moves,
        }
        ai_model = Algorithm.HexAI(
            "/Users/wanghaonan/Library/CloudStorage/OneDrive-个人/cityu/第一年 B 学期/RL/RL 课程项目/01/backend/RL_Hex_game/Hex/Hexgame/models/model1000.pth"
        )
        response = ai_model.predict(input_dict)

        if response:
            move = response['optimal_move']
            # 使用异步方法执行落子
            success = await game.async_make_move(move[0], move[1])
            if not success:
                break

            # 异步更新胜率
            await game.async_update_win_probability(
                1 - response["winning_rate"], response["winning_rate"]
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

```

### <a id="backend-rl_hex_game-hex-hexgame-views-py"></a>backend/RL_Hex_game/Hex/Hexgame/views.py

```python
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
    def get(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            serializer = HexGameSerializer(game)
            print(serializer.data)
            return Response(serializer.data)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


class MoveAPI(APIView):
    # 处理人类落子
    def post(self, request, game_id):
        try:
            print(f"[DEBUG] 收到请求,游戏ID: {game_id}")
            game = HexGame.objects.get(id=game_id)
            print(f"当前回合: {game.player_turn}, 模式: {game.mode}")
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

                return Response(HexGameSerializer(game).data)
            return Response({"error": "Invalid move"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


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
                "last_moves": game.last_moves,  # 根据模型需要调整字段
            }
            # Use the configurable model path from settings instead of hardcoded path
            ai_model = Algorithm.HexAI()
            response = ai_model.predict(input_dict)

            if response:
                ai_move = response["optimal_move"]
                print("AI收到的棋盘状态:", game.board)
                print("AI选择的落子:", ai_move)
                game.update_win_probability(
                    1 - response["winning_rate"], response["winning_rate"]
                )
                if game.make_move(ai_move[0], ai_move[1]):
                    # 胜负判断
                    player_val = -1 if game.human_color == "red" else 1
                    if check_hex_connection(game.board, player_val):
                        game.winner = "AI"
                        game.save()
                    print(f"AI落子坐标: {ai_move[0]}, {ai_move[1]}")
                    return Response(HexGameSerializer(game).data)

            return Response({"error": "AI move failed"}, status=500)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


class UndoAPI(APIView):
    # 处理悔棋
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            if game.undo_last_move():
                return Response(HexGameSerializer(game).data)
            return Response({"error": "No moves to undo"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


class RestartAPI(APIView):
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            if game.reset_game():
                return Response(HexGameSerializer(game).data)
            return Response({"error": "Reset failed"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


from threading import Thread


class CreateAIGameAPI(APIView):
    def post(self, request):
        game = HexGame.objects.create(mode="AI_AI")
        game.initialize(new_game=True)

        # 启动后台线程
        Thread(target=run_ai_vs_ai_game, args=(game.id,)).start()

        return Response(HexGameSerializer(game).data)


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

```

### <a id="backend-rl_hex_game-hex-hex_test-py"></a>backend/RL_Hex_game/Hex/hex_test.py

```python
import websockets
import json
import asyncio

WS_BASE = "ws://localhost:8000/ws/game/"

async def validate_response(response, expected_type):
    """统一验证响应格式"""
    assert "type" in response, "响应缺少type字段"
    assert "data" in response, "响应缺少data字段"
    assert response["type"] == expected_type, f"预期类型{expected_type}，实际收到{response['type']}"
    return response["data"]

async def create_game_websocket(mode):
    """通过WebSocket创建游戏"""
    async with websockets.connect(WS_BASE + "new/") as ws:
        # 发送创建游戏请求
        await ws.send(json.dumps({
            "action": "create_game",
            "mode": mode
        }))
        
        # 接收创建响应
        response = json.loads(await ws.recv())
        data = await validate_response(response, "game_created")
        return data["game_id"]

async def test_human_ai_mode():
    """测试HUMAN_AI模式"""
    print("\n=== 测试HUMAN_AI模式 ===")
    
    # 1. 通过WebSocket创建游戏
    game_id = await create_game_websocket("HUMAN_AI")
    print(f"✓ 创建游戏成功 ID: {game_id}")

    async with websockets.connect(WS_BASE + f"{game_id}/") as ws:
        # [原有测试逻辑保持不变...]
        # 2. 验证初始状态
        init_resp = json.loads(await ws.recv())
        init_data = await validate_response(init_resp, "game_state")
        assert init_data["mode"] == "HUMAN_AI", "游戏模式错误"

        # 3. 测试人类移动
        print("\n--- 测试人类移动 ---")
        await ws.send(json.dumps({"action": "move", "x": 0, "y": 0}))
        move_resp = json.loads(await ws.recv())
        move_data = await validate_response(move_resp, "game_update")
        assert move_data["board"][0][0] != 0, "人类落子失败"
        print("✓ 人类移动成功")

        # [其余测试步骤保持不变...]

async def test_ai_ai_mode():
    """测试AI_AI模式"""
    print("\n=== 测试AI_AI模式 ===")
    
    # 1. 通过WebSocket创建游戏
    game_id = await create_game_websocket("AI_AI")
    print(f"✓ 创建游戏成功 ID: {game_id}")

    async with websockets.connect(WS_BASE + f"{game_id}/") as ws:
        # [原有测试逻辑保持不变...]
        # 2. 验证初始状态
        init_resp = json.loads(await ws.recv())
        init_data = await validate_response(init_resp, "game_state")
        assert init_data["player_turn"] in ["AI_1", "AI_2"]

        # 3. 自动对战测试
        print("\n--- 自动对战测试 ---")
        for step in range(121):
            await ws.send(json.dumps({"action": "ai_move"}))
            update_resp = json.loads(await ws.recv())
            update_data = await validate_response(update_resp, "game_update")
            
            # 打印进度
            filled = sum(cell !=0 for row in update_data["board"] for cell in row)
            print(f"第{step+1}步 | 落子数: {filled} | 当前玩家: {update_data['player_turn']}")
            
            if update_data.get("winner"):
                print(f"游戏结束！胜者: {update_data['winner']}")
                return

        # 4. 最终状态验证
        final_resp = json.loads(await ws.recv())
        final_data = await validate_response(final_resp, "game_state")
        assert final_data["winner"] in ["AI_1", "AI_2", "draw"]
        print(f"✓ 游戏结束验证成功 结果: {final_data['winner']}")

async def main():
    """主测试流程"""
    try:
        await test_human_ai_mode()
        await test_ai_ai_mode()
        print("\n所有测试通过！")
    except Exception as e:
        print(f"\n测试失败: {str(e)}")
        raise

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
```

### <a id="backend-rl_hex_game-hex-manage-py"></a>backend/RL_Hex_game/Hex/manage.py

```python
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Hex.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main_python manage.py runserver_":
    try:
        main()
    except SystemExit as e:
        print(f"Error: {e}")

```

### <a id="backend-rl_hex_game-train-py"></a>backend/RL_Hex_game/Train.py

```python
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import torch.optim as optim
import numpy as np
import os
from Algorithm.Hexmodel import HexNet
from Algorithm.Selfplay import SelfPlay, ReplayBuffer,ReplayDataset

class Trainer:
    def __init__(self, model, buffer, self_play, save_dir="py_checkpoints", device=torch.device('cuda' if torch.cuda.is_available() else 'cpu'),num_workers=4):
        self.model = model
        self.buffer = buffer
        self.self_play = self_play
        self.save_dir = save_dir
        self.device = device
        self.optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-4) #in case of overfitting
        self.num_workers = num_workers  # 新增
        os.makedirs(save_dir, exist_ok=True)
        self.dataset = None
        self.dataloader = None
    '''
    def train_step(self, batch_size=256): 
        #print("train step 1: len(self.buffer) = ",len(self.buffer))#######################
        if len(self.buffer) < batch_size:#Skip small batches
            print("size = ",len(self.buffer), "Too small, Not Considered")
            return None
        batch = self.buffer.sample(batch_size)
        states = [data["state"].to(self.device) for data in batch]
        policies = [data["policy"] for data in batch]
        values = [data["value"] for data in batch]
        # Stack step:
        states = torch.stack(states).squeeze(1)  # 形状 [batch_size, 2, 11, 11]
        policies = torch.stack([torch.from_numpy(p).float().to(self.device) for p in policies]).view(-1, 11*11)#for 11x11board size
        values = torch.tensor(values).float().to(self.device)
        pred_policies, pred_values = self.model(states)
        # LOSS:
        #policy_loss = nn.CrossEntropyLoss()(pred_policies.view(-1, 11*11), policies.view(-1, 11*11))
        policy_loss = nn.KLDivLoss(reduction='batchmean')(pred_policies.log_softmax(dim=-1),policies)#KL-Divergence Loss
        value_loss = nn.MSELoss()(pred_values.squeeze(), values) #MSE Loss
        total_loss = policy_loss + value_loss #Total
        # Backward
        self.optimizer.zero_grad()
        total_loss.backward()
        self.optimizer.step()
        #print("================================trainstep_COMPLETE================================")
        return {
            "total_loss": total_loss.item(),
            "policy_loss": policy_loss.item(),
            "value_loss": value_loss.item()
        }'''
    def train_step(self, batch_size=1):
        if len(self.buffer) < batch_size:
            print(f"size = {len(self.buffer)} Too small, Not Considered")
            return None
        
        # DataLoader
        #print(self.num_workers)
        if self.dataset is None or len(self.dataset) != len(self.buffer):
            self.dataset = ReplayDataset(self.buffer)
            self.dataloader = DataLoader(
                self.dataset,
                batch_size=batch_size,
                shuffle=True,
                num_workers=self.num_workers,
                pin_memory=True
            )
        
        try:
            batch = next(iter(self.dataloader))
        except StopIteration:
            self.dataloader = DataLoader(
                self.dataset,
                batch_size=batch_size,
                shuffle=True,
                num_workers=self.num_workers,
                pin_memory=True
            )
            batch = next(iter(self.dataloader))
        
        # 提取数据并传输到设备
        states = batch["state"].to(self.device, non_blocking=True)
        policies = batch["policy"].view(-1, 11*11).to(self.device, non_blocking=True)
        values = batch["value"].to(self.device, non_blocking=True)
        
        # 模型前向和损失计算（保持不变）
        pred_policies, pred_values = self.model(states)
        policy_loss = nn.KLDivLoss(reduction='batchmean')(pred_policies.log_softmax(dim=-1), policies)#KL-Divergence LOSS
        value_loss = nn.MSELoss()(pred_values.squeeze(), values.squeeze())#MSE LOSS
        total_loss = policy_loss + value_loss
        
        # 反向传播
        self.optimizer.zero_grad()
        total_loss.backward()
        self.optimizer.step()
        
        return {
            "total_loss": total_loss.item(),
            "policy_loss": policy_loss.item(),
            "value_loss": value_loss.item()
        }

    def save_replay(self, board, last_moves, game_id):
        os.makedirs(self.save_dir, exist_ok=True)#Create dirs if not exist
        file_path = os.path.join(self.save_dir, f"replay_{game_id}.npz")
        # SAVE FINAL GAME
        np.savez(file_path, board=board, last_moves=last_moves)
        print(f"Game: {game_id} has been SAVED to: {file_path}")

    def save_checkpoint(self, game_id):
        os.makedirs(self.save_dir, exist_ok=True)#Create dirs if not exist
        torch.save({
            "model_state": self.model.state_dict(),
            "optimizer_state": self.optimizer.state_dict(),
            "game_id": game_id
        }, f"{self.save_dir}/latest_model.pth")
    ###########################################################################################
    def train(self, start_id, total_games=300):####################################<-Total Game
        for game_id in range(start_id+1, total_games + start_id + 1):
            game_data, final_board, final_last_moves = self.self_play.generate_game()
            #print("GAME: ",game_id," Processe01 PASSED")###############
            self.buffer.add(game_data)
            #print("GAME: ",game_id," Processe02 PASSED")################
            #print(f"Buffer size: {len(self.buffer)}") 
            if game_id % 100 == 0:
                self.save_replay(final_board, final_last_moves, game_id)
            metrics = self.train_step()
            #print("GAME: ",game_id," Processe03 PASSED")###############
            #print(len(self.buffer))
            if metrics:
                print(f"GAME {game_id}/{total_games+start_id} | "
                      f"Total LOSS: {metrics['total_loss']:.4f} | "
                      f"Policy LOSS: {metrics['policy_loss']:.4f} | "
                      f"Value LOSS: {metrics['value_loss']:.4f}")

            if game_id % 100 == 0:
                self.save_checkpoint(game_id)
        self.save_checkpoint(total_games)
        print("Training Completed! Model SAVED!")



def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = HexNet().to(device)
    buffer = ReplayBuffer(capacity=100000)
    self_play = SelfPlay(model=model, buffer=buffer, device=device)
    trainer = Trainer(
        model=model,
        buffer=buffer,
        self_play=self_play,
        save_dir="./py_checkpoints",
        device=device,
        num_workers= 4
    )
    print("<------------------------------------ENVIRONMENT SETTED------------------------------------------->")
    start_game_id = 0
    checkpoint_path = "./py_checkpoints/latest_model.pth"
    if os.path.exists(checkpoint_path):
        checkpoint = torch.load(checkpoint_path, map_location=device)
        model.load_state_dict(checkpoint["model_state"])
        trainer.optimizer.load_state_dict(checkpoint["optimizer_state"])
        start_game_id = checkpoint["game_id"]
        print("Recovered from: model ",start_game_id)
    else:
        print("No games Recovered")
    print("<--------------------------------------START TRAINING--------------------------------------------->")
    ###############################################################################################################
    trainer.train(start_id=start_game_id,total_games=300) #########################################################
    ###############################################################################################################
    print("<------------------------------------TRAINING COMPLETED------------------------------------------->")

if __name__ == "__main__":
    os.makedirs("py_checkpoints", exist_ok=True)
    main()

```

### <a id="backend-rl_hex_game-algorithm-algorithm-py"></a>backend/RL_Hex_game/algorithm/Algorithm.py

```python
import os
from pathlib import Path

# Get current script directory
current_dir = Path(__file__).parent
print("Current Directory:", current_dir)

# Navigate to target directory
os.chdir(current_dir.resolve())  # resolve() normalizes the path


import numpy as np
import torch
from Hexmodel import HexNet


class HexAI:
    def __init__(self, model_path):
        self.model = self.load_model(model_path)

    def load_model(self, model_path):
        model = HexNet()  # Model Seleciton
        if torch.cuda.is_available():
            device = torch.device("cuda")
            print("Using CUDA device.")
        elif torch.backends.mps.is_available():
            device = torch.device("mps")
            print("Using MPS device.")
        else:
            device = torch.device("cpu")
            print("Using CPU device.")

        # Load the state dictionary with map_location to ensure compatibility
        state_dict = torch.load(model_path, map_location=device)

        # Check if the state_dict is nested (e.g., contains 'model_state')
        if "model_state" in state_dict:
            model.load_state_dict(state_dict["model_state"])
        else:
            # Assume the loaded object is directly the state_dict
            # model.load_state_dict(state_dict)
            raise ValueError("Invalid model state dictionary format.")

        model.to(device)  # Move the model to the selected device
        model.eval()
        return model

    def preprocess_input(self, input):
        # Dict -> Tensor
        board = np.array(input["board"])
        last_moves = np.array(input["last_moves"])
        current_player = 2 * (-1 * np.sum(board) + 0.5)  # check current player
        if current_player == -1:
            board = -1 * board.T
            last_moves = last_moves.T
        # Read: input_tensor 第一维度为当前局面，第二维度为落子顺序
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        # print(current_player)
        input_tensor[0] = (board).astype(np.float32)  # Current player
        # print ("current:",input_tensor[0])
        input_tensor[1] = (last_moves).astype(
            np.float32
        )  # opponent player#考虑改为最后动作
        # print ("opponent:",input_tensor[1])
        # print(np.where("board" == 0))
        return current_player, torch.from_numpy(input_tensor).unsqueeze(
            0
        )  # 添加batch维度

    def predict(self, input_dict):
        # Preprocess
        current_player, input_tensor = self.preprocess_input(input_dict)

        # Get the device that the model is on
        device = next(self.model.parameters()).device

        # Move input tensor to the same device as the model
        input_tensor = input_tensor.to(device)

        legal_moves = (
            np.argwhere(np.array(input_dict["board"]) == 0).tolist()
            if current_player == 1
            else np.argwhere(np.array(input_dict["board"]).T == 0).tolist()
        )

        if self.model:
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            probs_device = torch.softmax(policy_logits, dim=-1)
            move_probs = (
                probs_device.flatten()
                if current_player == 1
                else probs_device.reshape(11, 11).T.flatten()
            )
        else:
            # 若无模型，随机选择合法动作
            move_probs = np.ones(
                np.shape(np.array(input_dict["board"]))
            ).flatten() / len(legal_moves)
            print("Notice: No model selected.")

        # index = row * width + column
        if current_player == 1:
            legal_indices = [lst[0] * 11 + lst[1] for lst in legal_moves]
        else:
            legal_indices = [lst[1] * 11 + lst[0] for lst in legal_moves]

        # TODO:待更改：把输出最高prob改成输出top3

        legal_probs = move_probs[legal_indices]
        optimal_idx = torch.argmax(legal_probs).item()
        optimal_move = legal_moves[optimal_idx]
        winning_rate = (
            (value.item() + 1) / 2 if self.model else 0.5
        )  # [-1,1]->[0,1], 0.5 if no model selected
        return {"optimal_move": optimal_move, "winning_rate": round(winning_rate, 2)}


hex_ai = HexAI(model_path="../model/model600.pth")

# 模拟后端输入
input_data = {
    "board": [
        [1, -1, 1, -1, 1, 0, -1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    "player_turn": "AI",
    "last_moves": [
        [1, 4, 3, 2, 11, 0, 12, 13, 0, 0, 0],
        [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 9, 0, 0, 0, 0, 0, 8, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    # "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("胜率:", output["winning_rate"])

```

### <a id="backend-rl_hex_game-algorithm-gamelogic-py"></a>backend/RL_Hex_game/algorithm/GameLogic.py

```python
import numpy as np
from collections import deque
class HexGame:
    def __init__(self):
        self.board_size = 11
        self.board = None
        self.last_moves = None
        self.current_player = 1  # 1代表先手，-1代表后手
        self.winner = None
        self.reset()

    def reset(self):
        self.board = [[0] * self.board_size for _ in range(self.board_size)]
        self.last_moves = [[0] * self.board_size for _ in range(self.board_size)]
        self.current_player = 1
        self.winner = None
        self._step_counter = 0  # 用于记录总步数

    def insert(self, state):
        """注入指定状态（用于测试）"""
        self.board = [row.copy() for row in state["board"]]
        self.last_moves = [row.copy() for row in state["last_moves"]]
        # 计算当前步数和玩家
        self._step_counter = np.max(np.array(self.last_moves))
        self.current_player = 1 if (self._step_counter % 2 == 0) else -1
        if self.current_player == -1 :
            self.board = (-1 * np.array(self.board).T).tolist() #FLIP the board
            self.last_moves = (np.array(self.last_moves).T).tolist() #FLIP the board
        # 全局检查胜利状态
        self.winner = self._determine_global_winner()

    def make_move(self, x, y):
        """执行落子并更新状态"""
        if self.board[x][y] != 0 or self.winner is not None:
            return False  # Invaild Step
        self.board[x][y] = 1
        self._step_counter += 1
        self.last_moves[x][y] = self._step_counter
        self.winner = self._check_winner(x, y)
        if self.winner is None:
            self.current_player *= -1
            self.board = (-1 * np.array(self.board).T).tolist() #FLIP the board
            self.last_moves = (np.array(self.last_moves).T).tolist() #FLIP the board
        return True

    def is_terminal(self):
        return self.winner if self.winner is not None else 0 #ZERO for not done;1先手胜利-1后手胜利

    def output(self):
        """返回当前状态字典"""
        return {
            "board": [row.copy() for row in self.board],
            "last_moves": [row.copy() for row in self.last_moves]
        }
    """
    def _check_winner(self, x, y):
        player = self.board[x][y]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        target_reached = [False] 
        def dfs(cx, cy):
            if (player == 1 and cy == self.board_size-1) or \
               (player == -1 and cx == self.board_size-1):
                target_reached[0] = True
                return
            for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                nx, ny = cx+dx, cy+dy
                if 0<=nx<self.board_size and 0<=ny<self.board_size:
                    if not visited[nx][ny] and self.board[nx][ny] == player:
                        visited[nx][ny] = True
                        dfs(nx, ny)

        visited[x][y] = True
        dfs(x, y)
        return player if target_reached[0] else None"""

    def _check_winner(self, x, y):
        directions = [(-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0)]
        visited = [[False for _ in range(self.board_size)] for _ in range(self.board_size)]
        queue = deque()
        queue.append((x, y))
        visited[x][y] = True
        touch_left = False
        touch_right = False
        if y == 0:
            touch_left = True
        if y == self.board_size - 1:
            touch_right = True
        while queue:
            cx, cy = queue.popleft()
            if cy == 0:
                touch_left = True
            if cy == self.board_size - 1:
                touch_right = True
            if touch_left and touch_right:
                return self.current_player
            for dx, dy in directions:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < self.board_size and 0 <= ny < self.board_size:
                    if not visited[nx][ny] and self.board[nx][ny] == 1:
                        visited[nx][ny] = True
                        queue.append((nx, ny))
        return self.current_player if touch_left and touch_right else None
        

    def _determine_global_winner(self):
        """全局检查胜利条件"""
        # 检查（1）是否连接左右
        left_nodes = [(i,0) for i in range(self.board_size) if self.board[i][0] == 1]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        for x,y in left_nodes:
            if not visited[x][y]:
                stack = [(x,y)]
                visited[x][y] = True
                while stack:
                    cx, cy = stack.pop()
                    if cy == self.board_size-1:
                        return self.current_player
                    for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                        nx, ny = cx+dx, cy+dy
                        if 0<=nx<self.board_size and 0<=ny<self.board_size:
                            if not visited[nx][ny] and self.board[nx][ny] == 1:
                                visited[nx][ny] = True
                                stack.append((nx, ny))

        # 检查（-1）是否连接上下
        top_nodes = [(0,j) for j in range(self.board_size) if self.board[0][j] == -1]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        for x,y in top_nodes:
            if not visited[x][y]:
                stack = [(x,y)]
                visited[x][y] = True
                while stack:
                    cx, cy = stack.pop()
                    if cx == self.board_size-1:
                        return -self.current_player
                    for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                        nx, ny = cx+dx, cy+dy
                        if 0<=nx<self.board_size and 0<=ny<self.board_size:
                            if not visited[nx][ny] and self.board[nx][ny] == -1:
                                visited[nx][ny] = True
                                stack.append((nx, ny))
        return None


```

### <a id="backend-rl_hex_game-algorithm-hexmodel-py"></a>backend/RL_Hex_game/algorithm/Hexmodel.py

```python
import torch
import torch.nn as nn

class HexNet(nn.Module):
    def __init__(self, board_size=11, num_channels=256, num_res_blocks=4):
        super().__init__()
        self.board_size = board_size
        
        self.conv_in = nn.Conv2d(2, num_channels, 3, padding=1)
        self.bn_in = nn.BatchNorm2d(num_channels)
        
        # Residual
        self.res_blocks = nn.ModuleList([nn.Sequential(
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels),
                nn.ReLU(),
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels)
            ) for _ in range(num_res_blocks)])
        
        self.policy_head = nn.Sequential(nn.Conv2d(num_channels, 2, 1),nn.Flatten(),nn.Linear(2*board_size*board_size, board_size*board_size))# Policy_head
        self.value_head = nn.Sequential( nn.Conv2d(num_channels, 1, 1),nn.Flatten(),nn.Linear(board_size*board_size, 256),nn.ReLU(),nn.Linear(256, 1),nn.Tanh())# Value_head


    def forward(self, x):
        x = torch.relu(self.bn_in(self.conv_in(x)))#Residual
        for block in self.res_blocks:
            x = block(x) + x 
            x = torch.relu(x)
        policy = self.policy_head(x)
        value = self.value_head(x)
        return policy, value


```

### <a id="backend-rl_hex_game-algorithm-mcts-py"></a>backend/RL_Hex_game/algorithm/MCTS.py

```python
import numpy as np
import torch
from .GameLogic import HexGame

class MCTSNode:
    def __init__(self, game_state: HexGame, prior: float, parent=None):
        # 节点数据保留在CPU（树结构操作不适合GPU加速）
        self.game_state = game_state 
        self.parent = parent
        self.children = {}
        self.visit_count = 0
        self.total_value = 0.0
        self.prior = prior

class MCTS:
    #################################################################################################################################################
    def __init__(self, model, simulations=2, c_puct=2.0, device=('cuda' if torch.cuda.is_available() else 'cpu')):#########<- Simluations，C_puct##
        self.model = model.to(device)
        self.simulations = simulations
        self.c_puct = c_puct
        self.device = device

    def search(self, initial_game: HexGame) -> dict:
        root_node = MCTSNode(initial_game, prior=0.0)
        for _ in range(self.simulations):
            node = root_node
            env = HexGame()
            env.insert(node.game_state.output())  # 复制初始状态
            #print("----Process01 Passed----")###########################################
            while node.children and not env.is_terminal():
                action = self._select_action(node)  # GPU加速选择
                env.make_move(*action)
                #env.board = (-1 *np.array(env.board).T).tolist()
                node = node.children[action]
            #print("----Process02 Passed----")###########################################
            if env.is_terminal() == 0:
                # GPU加速模型预测
                #make sure the board is flipped or not
                if env.current_player == -1 and np.sum(np.array(env.board)) == 1:
                    env.board = (-1* np.array(env.board)).T.tolist() # Flip the board
                    env.last_moves = (np.array(env.last_moves)).T.tolist() # Flip the board
                input_tensor = self._state_to_tensor(env.output()).to(self.device)
                with torch.no_grad():
                    policy_logits, value = self.model(input_tensor)
                policy_probs = torch.softmax(policy_logits, dim=-1).view(11, 11)
                # GPU加速生成合法动作掩码
                legal_actions = self._get_legal_actions(env)
                legal_mask = torch.zeros(11, 11, device=self.device)
                for x, y in legal_actions:
                    legal_mask[x, y] = 1.0
                masked_probs = policy_probs * legal_mask
                masked_probs /= masked_probs.sum()
                # 创建子节点（CPU操作）
                for x, y in legal_actions:
                    prior = masked_probs[x, y].item()  # 取回标量值
                    child_env = HexGame()
                    child_env.insert(env.output())
                    child_env.make_move(x, y)
                    #child_env.board = (-1 *np.array(child_env.board).T).tolist()
                    node.children[(x, y)] = MCTSNode(child_env, prior=prior, parent=node)
                
                value = value.item()  # 取回标量值
            #print("----Process03 Passed----")###########################################
            winner = env.is_terminal()
            final_value = 1.0 if winner == 1 else -1.0
            self._backpropagate(node, final_value)
            #print("----Process04 Passed----")###########################################
            #print(f"Simulations {_}/{self.simulations} | ")
        return self._get_final_policy(root_node)

    def _select_action(self, node: MCTSNode) -> tuple:
        actions = list(node.children.keys())
        # 将子节点数据转换为GPU张量
        N_childs = torch.tensor([c.visit_count for c in node.children.values()],dtype=torch.float32,device=self.device) #Number of Visits
        V_childs = torch.tensor([c.total_value for c in node.children.values()], dtype=torch.float32,device=self.device) #Value
        priors = torch.tensor([c.prior for c in node.children.values()],dtype=torch.float32,device=self.device)
        q = V_childs / (N_childs + 1e-8)#Prevent denominator from being ZERO
        N_parents =  torch.sqrt(torch.tensor(node.visit_count, device=self.device))
        # PUCT(Prioritized Upper Confidence Tree)：Q + c_puct * P * sqrt(N_parent) / (N_child + 1)
        scores = q + self.c_puct * priors * N_parents / (N_childs + 1)
        # 选择最高分动作
        return actions[torch.argmax(scores).item()]

    def _backpropagate(self, node: MCTSNode, value: float):
        """回溯更新（CPU操作）"""
        while node is not None:
            node.visit_count += 1
            node.total_value += value
            node = node.parent

    def _get_final_policy(self, root_node: MCTSNode) -> dict:
        """生成最终策略分布"""
        total_visits = sum(c.visit_count for c in root_node.children.values())
        return {a: c.visit_count / total_visits for a, c in root_node.children.items()}

    def _get_legal_actions(self, env: HexGame) -> list:
        legal_positions = np.argwhere(np.array(env.output()["board"]) == 0).tolist()
        return [(x, y) for x, y in legal_positions]

    def _state_to_tensor(self, state: dict) -> torch.Tensor:
        board = np.array(state["board"], dtype=np.float32)
        last_moves = np.array(state["last_moves"], dtype=np.float32)
        return torch.tensor(
            np.stack([board, last_moves], axis=0),
            dtype=torch.float32
        ).unsqueeze(0)

```

### <a id="backend-rl_hex_game-algorithm-selfplay-py"></a>backend/RL_Hex_game/algorithm/Selfplay.py

```python
import torch
import numpy as np
from collections import deque
from torch.utils.data import Dataset, DataLoader
import random
from .GameLogic import HexGame #这里不用relative import反而会在运行train.py的时候报错
from .MCTS import MCTS #这里不用relative import反而会在运行train.py的时候报错

class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)
    
    def add(self, experience):
        self.buffer.extend(experience)
    
    def sample(self, batch_size):
        return random.sample(self.buffer, min(len(self.buffer), batch_size))
    
    def __len__(self):
        return len(self.buffer)

class ReplayDataset(Dataset):
    def __init__(self, buffer):
        # 确保 buffer.buffer 是 deque 或可索引对象
        self.buffer = list(buffer.buffer)  # 将 deque 转换为 list
    
    def __len__(self):
        return len(self.buffer)
    
    def __getitem__(self, idx):
        data = self.buffer[idx]
        state = data["state"].squeeze(0)  # 形状 [2,11,11]
        policy = data["policy"]           # 形状 [11,11]
        value = data["value"]
        return {
            "state": torch.FloatTensor(state),  # 确保转换为 Tensor
            "policy": torch.FloatTensor(policy),
            "value": torch.FloatTensor([value])
        }

class SelfPlay:
    def __init__(self, model, buffer, device):
        self.model = model.to(device)
        self.buffer = buffer
        self.device = device
        self.env = HexGame()
    """
    def preprocess_input(self, state_dict):
        board = np.array(state_dict["board"], dtype=np.float32)
        last_moves = np.array(state_dict["last_moves"], dtype=np.float32)
        input_np = np.stack([board, last_moves], axis=0)  # shape(2,11,11)
        input_tensor = torch.tensor(input_np, dtype=torch.float32)  # tensor
        return input_tensor.unsqueeze(0)  # shape(1,2,11,11)"""
    
    def preprocess_input(self, state_dict):
        board = np.array(state_dict["board"], dtype=np.float32)
        last_moves = np.array(state_dict["last_moves"], dtype=np.float32)
        if self.env.current_player == -1 and np.sum(board) == 1: #make sure the board is filpped
            board = -1 * board.T  # Flip the board
            last_moves = last_moves.T  # Flip the board
        input_np = np.stack([board, last_moves], axis=0)  #shape(2,11,11)
        return torch.tensor(input_np, dtype=torch.float32).unsqueeze(0)

    def generate_game(self):
        # Initialize
        self.env.reset()
        game_history = []
        mcts = MCTS(self.model, device=self.device)
        while True:
            # Check Winner and end loop
            terminal_status = self.env.is_terminal()
            if terminal_status != 0:
                winner = 1 if terminal_status == 1 else -1
                break
            '''
            #########################[Without  MCTS]#########################
            input = self.env.output()
            legal_moves = np.argwhere(np.array(input["board"]) == 0).tolist()
            # Preprocess
            input_tensor = self.preprocess_input(input).to(self.device)
            
            # Model Prediction
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            
            # Legal Movements
            policy_probs = torch.softmax(policy_logits, dim=-1).squeeze().cpu().numpy()
            if policy_probs.ndim == 1:
                policy_probs = policy_probs.reshape(11, 11)
            
            legal_indices = [lst[0]*11 + lst[1] for lst in legal_moves]
            legal_probs = policy_probs.reshape(-1)[legal_indices]
            legal_probs /= legal_probs.sum()
            
            # Apply Action
            action_idx = np.random.choice(len(legal_probs), p=legal_probs)
            x, y = legal_moves[action_idx]
            self.env.make_move(x, y)
            game_history.append({
                "state": input_tensor.cpu(),
                "policy": policy_probs,    
                "value": value.item(),
                "action": (x, y)
            })
            #########################[Without  MCTS]#########################
            '''
            ###########################[With MCTS]###########################
            mcts_policy = mcts.search(self.env)
            # 选择动作（按概率采样）
            actions = list(mcts_policy.keys())
            probs = list(mcts_policy.values())
            action = actions[np.random.choice(len(actions), p=probs)]
            # 执行动作
            current_state = self.env.output()
            current_player = 2*(np.sum(np.array(current_state["board"]))+0.5)
            self.env.make_move(action[0], action[1])
            #print("-------------------------------")###################
            #print(np.array(current_state["board"]))####################
            #print("#of Actions:",len(actions))##################################
            game_history.append({
                "state": self.preprocess_input(current_state),
                "policy": self._policy_to_matrix(mcts_policy),
                "value": None,  
                "player": current_player
            })
        #print("========Check point passed=======")#####################
        for data in game_history:
            data["value"] = 1.0 if data["player"] == winner else -1.0
            ###########################[With MCTS]###########################
        
        final_board = self.env.output()["board"]
        #print(np.array(final_board))
        return game_history, final_board, winner
    
    def _policy_to_matrix(self, mcts_policy):
        policy_matrix = np.zeros((11, 11), dtype=np.float32)
        for (x, y), prob in mcts_policy.items():
            policy_matrix[x, y] = prob
        return policy_matrix

```

### <a id="backend-rl_hex_game-algorithm-test-py"></a>backend/RL_Hex_game/algorithm/Test.py

```python
"""hex_ai = HexAI("../model/model1000.pth")

# 模拟后端输入
input_data = {
    "board": [[0]*11 for _ in range(11)],  # 空棋盘
    "player_turn": "AI",
    "last_moves": [],
    "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("人类胜率:", output["win_rate_human"])
print("AI胜率:", output["win_rate_AI"])
"""

from GameLogic import HexGame

game = HexGame()
test_state = {
    "board": [
        [1, 1, 1, -1, 0, -1, 1, -1, 0, 1, -1],
        [-1, 1, -1, 1, 0, -1, 0, 0, 0, 1, -1],
        [-1, -1, 1, 1, 0, 1, -1, -1, -1, -1, 1],
        [1, -1, -1, 1, -1, 0, 0, 0, -1, -1, 0],
        [1, -1, -1, -1, 1, 0, -1, 1, 1, 0, 0],
        [-1, 0, 0, 1, 1, 1, 1, 1, -1, -1, 1],
        [-1, -1, -1, 1, -1, -1, -1, 0, 1, 1, 1],
        [0, 1, 0, 1, 0, 0, 1, 1, -1, 0, 0],
        [1, -1, 0, 1, 0, -1, -1, -1, 0, 0, 0],
        [0, -1, 1, -1, 1, 1, 0, 1, 1, 0, -1],
        [-1, 0, -1, 1, 1, 0, 0, 0, 1, -1, 1],
    ],
    "last_moves": [
        [1, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 3, 0, 3, 5, 0, 0, 0, 0, 0, 0],
        [24, 0, 0, 30, 7, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 28, 9, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 26, 11, 0, 10, 0, 0, 0, 0],
        [0, 0, 0, 12, 13, 0, 34, 0, 0, 0, 0],
        [0, 0, 0, 14, 15, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 18, 19, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 20, 21, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0],
    ],
}
import numpy as np

game.insert(test_state)
print(np.array(game.board))
game.make_move(2,10)
print(np.array(game.board))
game.make_move(2,10)
#print(game.output())
print(np.array(game.board))
print(game.current_player)
print(game.is_terminal())  # 输出-1（后手胜）

```

### <a id="backend-rl_hex_game-algorithm-__init__-py"></a>backend/RL_Hex_game/algorithm/__init__.py

```python

```

### <a id="backend-rl_hex_game-repository-md"></a>backend/RL_Hex_game/repository.md

```markdown
# RL_Hex_game Project Documentation

Generated on 4/15/2025

This document contains code files from the RL_Hex_game project.

## Table of Contents

- 📁 Hex/
  - 📁 Hex/
    - 📄 [__init__.py](#hex-hex-__init__-py)
    - 📄 [asgi.py](#hex-hex-asgi-py)
    - 📄 [settings.py](#hex-hex-settings-py)
    - 📄 [urls.py](#hex-hex-urls-py)
    - 📄 [wsgi.py](#hex-hex-wsgi-py)
  - 📁 Hexgame/
    - 📄 [__init__.py](#hex-hexgame-__init__-py)
    - 📄 [admin.py](#hex-hexgame-admin-py)
    - 📄 [apps.py](#hex-hexgame-apps-py)
    - 📄 [consumers.py](#hex-hexgame-consumers-py)
    - 📁 migrations/
      - 📄 [0001_initial.py](#hex-hexgame-migrations-0001_initial-py)
      - 📄 [0002_rename_human_color_hexgame_player_color_and_more.py](#hex-hexgame-migrations-0002_rename_human_color_hexgame_player_color_and_more-py)
      - 📄 [0003_rename_player_color_hexgame_human_color.py](#hex-hexgame-migrations-0003_rename_player_color_hexgame_human_color-py)
      - 📄 [0004_remove_hexgame_current_ai_player.py](#hex-hexgame-migrations-0004_remove_hexgame_current_ai_player-py)
      - 📄 [__init__.py](#hex-hexgame-migrations-__init__-py)
    - 📁 models/
    - 📄 [models.py](#hex-hexgame-models-py)
    - 📄 [routing.py](#hex-hexgame-routing-py)
    - 📄 [serializers.py](#hex-hexgame-serializers-py)
    - 📁 static/
      - 📁 js/
        - 📁 css/
          - 📁 html/
            - 📄 [websocket.js](#hex-hexgame-static-js-css-html-websocket-js)
    - 📄 [urls.py](#hex-hexgame-urls-py)
    - 📁 utils/
      - 📄 [Algorithm.py](#hex-hexgame-utils-algorithm-py)
      - 📄 [Hexmodel.py](#hex-hexgame-utils-hexmodel-py)
      - 📄 [Selfplay.py](#hex-hexgame-utils-selfplay-py)
      - 📄 [__init__.py](#hex-hexgame-utils-__init__-py)
      - 📄 [utils.py](#hex-hexgame-utils-utils-py)
    - 📄 [views.py](#hex-hexgame-views-py)
  - 📄 [hex_test.py](#hex-hex_test-py)
  - 📄 [manage.py](#hex-manage-py)
- 📄 [README.md](#readme-md)
- 📄 [Train.py](#train-py)
- 📁 algorithm/
  - 📄 [Algorithm.py](#algorithm-algorithm-py)
  - 📄 [GameLogic.py](#algorithm-gamelogic-py)
  - 📄 [Hexmodel.py](#algorithm-hexmodel-py)
  - 📄 [MCTS.py](#algorithm-mcts-py)
  - 📄 [Selfplay.py](#algorithm-selfplay-py)
  - 📄 [Test.py](#algorithm-test-py)
  - 📄 [__init__.py](#algorithm-__init__-py)
  - 📁 model/
- 📁 model/
- 📁 replay/

## Source Code

### <a id="hex-hex-__init__-py"></a>Hex/Hex/__init__.py

```python

```

### <a id="hex-hex-asgi-py"></a>Hex/Hex/asgi.py

```python
"""
ASGI config for Hex project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# 首先设置环境变量
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Hex.settings")

# 初始化Django ASGI应用
django_asgi_app = get_asgi_application()

# 之后再导入需要Django环境的模块
import Hexgame.routing
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AuthMiddlewareStack(
            URLRouter(Hexgame.routing.websocket_urlpatterns)
        ),
    }
)

```

### <a id="hex-hex-settings-py"></a>Hex/Hex/settings.py

```python
"""
Django settings for Hex project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-6gy26qr_=++60sdd#mp8k+=lfd$b-ahbhg(4b&wr-f$!v0n^xo"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "Hexgame",
    'rest_framework',
     'channels',
    
]

# 配置ASGI应用
ASGI_APPLICATION = 'Hex.asgi.application'

# 配置通道层（使用内存作为后端，不需要Redis）
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "Hex.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "Hexgame/templates/html")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "Hex.wsgi.application"


# 允许本地开发跨域
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'Hexgame/static'),  # 应用静态目录
]
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


```

### <a id="hex-hex-urls-py"></a>Hex/Hex/urls.py

```python
"""
URL configuration for Hex project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Hexgame.urls')),
]
```

### <a id="hex-hex-wsgi-py"></a>Hex/Hex/wsgi.py

```python
"""
WSGI config for Hex project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Hex.settings")

application = get_wsgi_application()

```

### <a id="hex-hexgame-__init__-py"></a>Hex/Hexgame/__init__.py

```python

```

### <a id="hex-hexgame-admin-py"></a>Hex/Hexgame/admin.py

```python
from django.contrib import admin

# Register your models here.

```

### <a id="hex-hexgame-apps-py"></a>Hex/Hexgame/apps.py

```python
from django.apps import AppConfig


class HexgameConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Hexgame"

```

### <a id="hex-hexgame-consumers-py"></a>Hex/Hexgame/consumers.py

```python

import asyncio
import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

import Hexgame.utils.Algorithm as Algorithm

from .models import HexGame
from .serializers import HexGameSerializer
from .utils.utils import check_hex_connection


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
        # Add a safety check
        if hasattr(self, "game_group_name"):
            await self.channel_layer.group_discard(
                self.game_group_name, self.channel_name
            )

    # Rest of your disconnect method...

    async def receive(self, text_data):
        """接收客户端消息"""
        try:
            data = json.loads(text_data)
            action = data.get("action")

            # 如果是创建连接且收到创建请求
            if hasattr(self, "is_creation_connection") and action == "create_game":
                await self.handle_create_game(data)
            # 修改此处的条件判断
            elif action == "move":
                await self.handle_move(data)
            elif action == "ai_move":
                await self.handle_ai_move()
            elif action == "undo":
                await self.handle_undo()
            elif action == "restart":
                await self.handle_restart()
            elif action == "create_ai_game":
                await self.handle_create_ai_game()
            else:
                await self.send_error("Invalid action")

        except Exception as e:
            await self.send_error(str(e))

    async def send_current_game_state(self):
        """发送当前游戏状态（统一消息格式）"""
        game = await self.get_game()
        serializer = HexGameSerializer(game)
        await self._send_message("game_state", serializer.data)

    async def send_error(self, message):
        """发送错误消息（统一错误格式）"""
        await self._send_message("error", {"message": message})

    async def game_update(self, event):
        """处理组播消息（统一消息格式）"""
        await self._send_message(event["type"], event["data"])

    async def _send_message(self, msg_type, data):
        """统一消息发送方法"""
        await self.send(text_data=json.dumps({"type": msg_type, "data": data}))

    async def get_game(self):
        """获取游戏对象（异步方法）"""
        return await HexGame.objects.aget(id=self.game_id)

    # ---- 核心操作处理 ----
    async def handle_move(self, data):
        """处理玩家移动"""
        try:
            game = await self.get_game()
            x, y = data["x"], data["y"]

            if await game.async_make_move(x, y):
                # 检查胜负
                player_val = (
                    1
                    if (game.player_turn == "human" and game.human_color == "red")
                    else -1
                )
                if check_hex_connection(game.board, player_val):
                    game.winner = "human" if game.player_turn == "human" else "AI"
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
                "last_moves": game.last_moves,
            }
            ai_model = Algorithm.HexAI(
                "/Users/wanghaonan/Library/CloudStorage/OneDrive-个人/cityu/第一年 B 学期/RL/RL 课程项目/01/backend/RL_Hex_game/Hex/Hexgame/models/model1000.pth"
            )
            response = ai_model.predict(input_dict)

            if response:
                ai_move = response["optimal_move"]
                # 使用异步保存
                if await game.async_make_move(ai_move[0], ai_move[1]):
                    # 使用异步更新胜率
                    await game.async_update_win_probability(
                        1 - response["winning_rate"], response["winning_rate"]
                    )

                    # 检查胜负
                    player_val = -1 if game.human_color == "red" else 1
                    if check_hex_connection(game.board, player_val):
                        game.winner = "AI"
                        await game.asave()  # 异步保存

                    await self.broadcast_game_update(game)
                    return  # 成功返回

            await self.send_error("AI move failed")

        except Exception as e:
            print(f"AI移动异常: {str(e)}")
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
            mode = data.get("mode", "HUMAN_AI").upper()

            # 验证模式合法性
            if mode not in ["HUMAN_AI", "AI_AI"]:
                await self.send_error("Invalid game mode")
                return

            # 使用异步ORM创建游戏对象
            from .models import HexGame

            game = await sync_to_async(HexGame.objects.create)(mode=mode)

            # 异步执行初始化
            await sync_to_async(game.initialize)(new_game=True)

            # 返回创建成功消息
            await self._send_message(
                "game_created",
                {
                    "game_id": str(game.id),  # 确保ID转为字符串
                    "redirect": f"/ws/game/{game.id}/",
                },
            )
            await self.close()

            # 异步启动AI对战（如果是AI_AI模式）
            if mode == "AI_AI":
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
                "type": "game_update",  # 对应game_update方法
                "data": serializer.data,
            },
        )

```

### <a id="hex-hexgame-migrations-0001_initial-py"></a>Hex/Hexgame/migrations/0001_initial.py

```python
# Generated by Django 4.2 on 2025-04-08 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="HexGame",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("board", models.JSONField(default=list)),
                ("player_turn", models.CharField(default="human", max_length=10)),
                ("last_moves", models.JSONField(default=list)),
                ("moves_history", models.JSONField(default=list)),
                ("winner", models.CharField(blank=True, max_length=10, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("human_color", models.CharField(default="red", max_length=10)),
                ("win_probability", models.JSONField(default=dict)),
                (
                    "mode",
                    models.CharField(
                        choices=[("HUMAN_AI", "Human vs AI"), ("AI_AI", "AI vs AI")],
                        default="HUMAN_AI",
                        max_length=10,
                    ),
                ),
                (
                    "current_ai_player",
                    models.CharField(blank=True, max_length=10, null=True),
                ),
            ],
        ),
    ]

```

### <a id="hex-hexgame-migrations-0002_rename_human_color_hexgame_player_color_and_more-py"></a>Hex/Hexgame/migrations/0002_rename_human_color_hexgame_player_color_and_more.py

```python
# Generated by Django 4.2 on 2025-04-10 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Hexgame", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="hexgame",
            old_name="human_color",
            new_name="player_color",
        ),
        migrations.AlterField(
            model_name="hexgame",
            name="winner",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]

```

### <a id="hex-hexgame-migrations-0003_rename_player_color_hexgame_human_color-py"></a>Hex/Hexgame/migrations/0003_rename_player_color_hexgame_human_color.py

```python
# Generated by Django 4.2 on 2025-04-10 07:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("Hexgame", "0002_rename_human_color_hexgame_player_color_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="hexgame",
            old_name="player_color",
            new_name="human_color",
        ),
    ]

```

### <a id="hex-hexgame-migrations-0004_remove_hexgame_current_ai_player-py"></a>Hex/Hexgame/migrations/0004_remove_hexgame_current_ai_player.py

```python
# Generated by Django 4.2 on 2025-04-10 08:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("Hexgame", "0003_rename_player_color_hexgame_human_color"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="hexgame",
            name="current_ai_player",
        ),
    ]

```

### <a id="hex-hexgame-migrations-__init__-py"></a>Hex/Hexgame/migrations/__init__.py

```python

```

### <a id="hex-hexgame-models-py"></a>Hex/Hexgame/models.py

```python
from django.db import models
from asgiref.sync import sync_to_async

class HexGame(models.Model):
    BOARD_SIZE = 11
    board = models.JSONField(default=list)
    player_turn = models.CharField(max_length=10, default='human')
    last_moves = models.JSONField(default=list)
    moves_history = models.JSONField(default=list)
    winner = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    human_color = models.CharField(max_length=10, default='red')  # 玩家颜色
    win_probability = models.JSONField(default=dict)  # 胜率

    MODE_CHOICES = [
        ('HUMAN_AI', 'Human vs AI'),
        ('AI_AI', 'AI vs AI')  # 新增模式
    ]
    
    mode = models.CharField(  # 模式(pvp or pve)
        max_length=10,
        choices=MODE_CHOICES,
        default='HUMAN_AI'
    )


    def initialize(self, new_game=False):
        """初始化或重置游戏"""
        self.board = [[0]*self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        self.last_moves = [[0]*self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        self.moves_history = []
        self.winner = None
        
        # 如果是新游戏(不是重置)，随机分配颜色
        if new_game:
            # 确保所有字段初始化
            if self.mode == 'AI_AI':
                self.player_turn = 'AI_1'
                self.win_probability = {"AI_1": 0.5, "AI_2": 0.5}
                self.human_color = 'red'  # 固定值
            else:
                # 确保human_color被正确设置
                self.human_color = 'red' 
                # if self.human_color == 'blue' else 'blue'
                self.win_probability = {"human": 0.5, "AI": 0.5}
                self.player_turn = 'human' 
                # if self.human_color == 'red' else 'AI'
            self.save()  # 立即保存
        else:
            # 设置先手玩家
            if self.mode == 'AI_AI':
                self.player_turn = 'AI_1'
                self.win_probability = {"AI_1": 0.5, "AI_2": 0.5}
            else:
                self.player_turn = 'human' if self.human_color == 'red' else 'AI'
                self.win_probability = {"human": 0.5, "AI": 0.5}
            self.save()

    def reset_game(self):
        """重置当前游戏（保留颜色分配）"""
        self.initialize(new_game=False)
        return True
    def make_move(self, x, y):
        """执行落子（增加模式判断）"""
        if self.board[x][y] != 0:
            return False
        
        # 确定棋子值
        if self.mode == 'AI_AI':
            # AI对战模式根据current_ai_player判断
            if self.player_turn == 'AI_1':
                player_val = 1
            else:
                player_val = -1
        else:
            # 其他模式
            if self.player_turn == 'human':
                player_val = 1 if self.human_color == 'red' else -1
            else:
                player_val = -1 if self.human_color == 'red' else 1
        
        step = len(self.moves_history) + 1
        self.board[x][y] = player_val
        self.last_moves[x][y] = step
        self.moves_history.append({
            'player': self.player_turn,
            'x': x,
            'y': y,
            'step': step,
            'color': 'red' if player_val == 1 else 'blue'
        })
        
        # 切换回合
        if self.mode == 'AI_AI':
            self.player_turn = 'AI_2' if self.player_turn == 'AI_1' else 'AI_1'
        else:
            self.player_turn = 'AI' if self.player_turn == 'human' else 'human'
        
        self.save()
        return True

    def undo_last_move(self):
        """悔棋功能(支持AI对战)"""
        if not self.moves_history:
            return False
        
        last_move = self.moves_history.pop()
        x, y = last_move['x'], last_move['y']
        
        self.board[x][y] = 0
        self.last_moves[x][y] = 0
        self.winner = None
        
        self.player_turn = last_move['player']
        
        self.save()
        return True
    
    def update_win_probability(self, human_prob, ai_prob):
        self.win_probability = {
            "human": round(human_prob, 2),
            "AI": round(ai_prob, 2)
        }
        self.save()

    @sync_to_async
    def async_make_move(self, x, y):
        """异步版本的make_move"""
        return self.make_move(x, y)

    @sync_to_async
    def async_undo_last_move(self):
        """异步版本的undo_last_move"""
        return self.undo_last_move()

    @sync_to_async
    def async_reset_game(self):
        """异步版本的reset_game"""
        return self.reset_game()
    
    @sync_to_async
    def async_update_win_probability(self,human_prob, ai_prob ):
        return self.update_win_probability(human_prob, ai_prob)
    
    @sync_to_async
    def async_check_connection(self, player_val):
        """异步版本的连接检查"""
        from Hexgame.utils.utils import check_hex_connection
        return check_hex_connection(self.board, player_val)
```

### <a id="hex-hexgame-routing-py"></a>Hex/Hexgame/routing.py

```python
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # 创建游戏专用路由（无需game_id）
    re_path(r'^ws/game/new/$', consumers.HexGameConsumer.as_asgi()),
    
    # 游戏房间路由（需要game_id）
    re_path(r'^ws/game/(?P<game_id>\d+)/$', consumers.HexGameConsumer.as_asgi()),
]
```

### <a id="hex-hexgame-serializers-py"></a>Hex/Hexgame/serializers.py

```python
from rest_framework import serializers
from .models import HexGame


class HexGameSerializer(serializers.ModelSerializer):
    """Within the HexGameSerializer, a Meta class is defined. This inner class provides metadata about the serializer, telling it which model it should work with and which fields of that model should be included in the serialization process. The model = HexGame line indicates that this serializer is designed to handle instances of the HexGame model, which is defined in Hexgame/models.py"""

    class Meta:
        model = HexGame
        fields = [
            "id",
            "board",
            "player_turn",
            "human_color",
            "last_moves",
            "winner",
            "moves_history",
            "win_probability",
            "mode",
        ]
        extra_kwargs = {"board": {"read_only": True}, "last_moves": {"read_only": True}}

```

### <a id="hex-hexgame-static-js-css-html-websocket-js"></a>Hex/Hexgame/static/js/css/html/websocket.js

```javascript
// 在Hexgame/static/js目录下新建websocket.js
const gameSocket = new WebSocket(
    `ws://${window.location.host}/ws/game/${gameId}/`
);

// 接收消息
gameSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    // 更新游戏界面
    updateBoard(data.board);
    updateTurn(data.player_turn);
    updateWinProbability(data.win_probability);
};

// 发送动作
function sendMove(x, y) {
    gameSocket.send(JSON.stringify({
        'action': 'make_move',
        'x': x,
        'y': y
    }));
}

// AI移动按钮
document.querySelector('#ai-move').addEventListener('click', () => {
    gameSocket.send(JSON.stringify({'action': 'ai_move'}));
});
```

### <a id="hex-hexgame-urls-py"></a>Hex/Hexgame/urls.py

```python
from django.urls import path
from .views import AIGameStatusAPI, AIMoveAPI, GameAPI, CreateAIGameAPI, MoveAPI, RestartAPI, UndoAPI, test_api_view

urlpatterns = [
    path('', test_api_view),
    path('games/', GameAPI.as_view()),  # POST创建新游戏
    path('games/<int:game_id>/', GameAPI.as_view()),  # GET获取游戏状态
    path('games/<int:game_id>/move/', MoveAPI.as_view()),
    path('games/<int:game_id>/ai_move/', AIMoveAPI.as_view()),
    path('games/<int:game_id>/undo/', UndoAPI.as_view()),
    path('games/<int:game_id>/restart/', RestartAPI.as_view()),  # 新增路由
    path('ai_games/', CreateAIGameAPI.as_view()),  # 创建AI对战
    path('ai_games/<int:game_id>/', AIGameStatusAPI.as_view()),  # 查询状态
]
```

### <a id="hex-hexgame-utils-algorithm-py"></a>Hex/Hexgame/utils/Algorithm.py

```python
import os
from pathlib import Path

# Get current script directory
current_dir = Path(__file__).parent
print("Current Directory:", current_dir)

# Navigate to target directory
os.chdir(current_dir.resolve())  # resolve() normalizes the path


import numpy as np
import torch

from .Hexmodel import HexNet


class HexAI:
    def __init__(self, model_path=None):
        model_path = "/Users/wanghaonan/Library/CloudStorage/OneDrive-个人/cityu/第一年 B 学期/RL/RL 课程项目/01/backend/RL_Hex_game/Hex/Hexgame/models/model1000.pth"
        self.model = self.load_model(model_path)

    def load_model(self, model_path):
        model = HexNet()  # Model Seleciton
        if torch.cuda.is_available():
            device = torch.device("cuda")
            print("Using CUDA device.")
        elif torch.backends.mps.is_available():
            device = torch.device("mps")
            print("Using MPS device.")
        else:
            device = torch.device("cpu")
            print("Using CPU device.")

        # Load the state dictionary with map_location to ensure compatibility
        state_dict = torch.load(model_path, map_location=device)

        # Check if the state_dict is nested (e.g., contains 'model_state')
        if "model_state" in state_dict:
            model.load_state_dict(state_dict["model_state"])
        else:
            # Assume the loaded object is directly the state_dict
            # model.load_state_dict(state_dict)
            raise ValueError("Invalid model state dictionary format.")

        model.to(device)  # Move the model to the selected device
        model.eval()
        return model

    def preprocess_input(self, input):
        # Dict -> Tensor
        board = np.array(input["board"])
        last_moves = np.array(input["last_moves"])
        current_player = 2 * (-1 * np.sum(board) + 0.5)  # check current player
        if current_player == -1:
            board = -1 * board.T
            last_moves = last_moves.T
        # Read: input_tensor 第一维度为当前局面，第二维度为落子顺序
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        # print(current_player)
        input_tensor[0] = (board).astype(np.float32)  # Current player
        # print ("current:",input_tensor[0])
        input_tensor[1] = (last_moves).astype(
            np.float32
        )  # opponent player#考虑改为最后动作
        # print ("opponent:",input_tensor[1])
        # print(np.where("board" == 0))
        return current_player, torch.from_numpy(input_tensor).unsqueeze(
            0
        )  # 添加batch维度

    def predict(self, input_dict):
        # Preprocess
        current_player, input_tensor = self.preprocess_input(input_dict)

        # Get the device that the model is on
        device = next(self.model.parameters()).device

        # Move input tensor to the same device as the model
        input_tensor = input_tensor.to(device)

        legal_moves = (
            np.argwhere(np.array(input_dict["board"]) == 0).tolist()
            if current_player == 1
            else np.argwhere(np.array(input_dict["board"]).T == 0).tolist()
        )

        if self.model:
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            probs_device = torch.softmax(policy_logits, dim=-1)
            move_probs = (
                probs_device.flatten()
                if current_player == 1
                else probs_device.reshape(11, 11).T.flatten()
            )
        else:
            # 若无模型，随机选择合法动作
            move_probs = np.ones(
                np.shape(np.array(input_dict["board"]))
            ).flatten() / len(legal_moves)
            print("Notice: No model selected.")

        # index = row * width + column
        if current_player == 1:
            legal_indices = [lst[0] * 11 + lst[1] for lst in legal_moves]
        else:
            legal_indices = [lst[1] * 11 + lst[0] for lst in legal_moves]

        # TODO:待更改：把输出最高prob改成输出top3

        legal_probs = move_probs[legal_indices]
        optimal_idx = torch.argmax(legal_probs).item()
        optimal_move = legal_moves[optimal_idx]
        winning_rate = (
            (value.item() + 1) / 2 if self.model else 0.5
        )  # [-1,1]->[0,1], 0.5 if no model selected
        return {"optimal_move": optimal_move, "winning_rate": round(winning_rate, 2)}

# !remeber to change the directory
model_path = "../models/model600.pth"
hex_ai = HexAI(model_path=model_path)

# 模拟后端输入
input_data = {
    "board": [
        [1, -1, 1, -1, 1, 0, -1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    "player_turn": "AI",
    "last_moves": [
        [1, 4, 3, 2, 11, 0, 12, 13, 0, 0, 0],
        [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 9, 0, 0, 0, 0, 0, 8, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    # "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("胜率:", output["winning_rate"])

```

### <a id="hex-hexgame-utils-hexmodel-py"></a>Hex/Hexgame/utils/Hexmodel.py

```python
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from collections import deque
import random
# ======================
# 1. 神经网络模型定义
# ======================
class HexNet(nn.Module):
    """Hex策略-价值网络 (兼容AlphaZero架构)"""
    def __init__(self, board_size=11, num_channels=256, num_res_blocks=4):
        super().__init__()
        self.board_size = board_size
        
        # 输入通道：2 (玩家1位置, 玩家2位置, 当前玩家)
        self.conv_in = nn.Conv2d(2, num_channels, 3, padding=1)
        self.bn_in = nn.BatchNorm2d(num_channels)
        
        # 残差块堆叠
        self.res_blocks = nn.ModuleList([
            nn.Sequential(
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels),
                nn.ReLU(),
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels)
            ) for _ in range(num_res_blocks)
        ])
        
        # 策略头
        self.policy_head = nn.Sequential(
            nn.Conv2d(num_channels, 2, 1),
            nn.Flatten(),
            nn.Linear(2*board_size*board_size, board_size*board_size)
        )
        
        # 价值头
        self.value_head = nn.Sequential(
            nn.Conv2d(num_channels, 1, 1),
            nn.Flatten(),
            nn.Linear(board_size*board_size, 256),
            nn.ReLU(),
            nn.Linear(256, 1),
            nn.Tanh()
        )


    def forward(self, x):
        x = torch.relu(self.bn_in(self.conv_in(x)))#Residual
        for block in self.res_blocks:
            x = block(x) + x 
            x = torch.relu(x)
        policy = self.policy_head(x)
        value = self.value_head(x)
        return policy, value
# ======================
# 2. 经验回放缓冲区
# ======================
class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)
    
    def add(self, experience):
        """添加单局游戏数据"""
        self.buffer.extend(experience)
    
    def sample(self, batch_size):
        """随机采样批次数据"""
        return random.sample(self.buffer, min(len(self.buffer), batch_size))
    
    def __len__(self):
        return len(self.buffer)

# ======================
# 3. 自对弈生成器
# ======================
class SelfPlay:
    def __init__(self, model, buffer):
        self.model = model
        self.buffer = buffer
        # self.env = HexGame()  # 假设已实现Hex游戏逻辑
    
    def generate_game(self, temperature=1.0):
        """生成一局自对弈数据"""
        states = []
        probs = []
        current_player = 1
        self.env.reset()
        
        while not self.env.is_terminal():
            # 获取当前状态
            board_state = self.env.get_state()
            legal_moves = self.env.legal_moves()
            
            # 模型预测
            with torch.no_grad():
                policy_logits, value = self.model(board_state)
            
            # 转换为动作概率（可添加噪声）
            policy = torch.softmax(policy_logits/temperature, dim=-1)
            action_probs = policy.squeeze().numpy()
            
            # 过滤非法动作
            legal_mask = np.zeros_like(action_probs)
            for move in legal_moves:
                idx = move[0]*self.env.size + move[1]
                legal_mask[idx] = 1
            action_probs *= legal_mask
            action_probs /= np.sum(action_probs)
            
            # 保存训练数据
            states.append({
                "state": board_state,
                "player": current_player,
                "legal_moves": legal_moves
            })
            probs.append(action_probs)
            
            # 执行动作
            action_idx = np.random.choice(len(action_probs), p=action_probs)
            action = (action_idx//self.env.size, action_idx%self.env.size)
            self.env.step(action)
            current_player = 3 - current_player
        
        # 获取最终胜负
        winner = self.env.get_winner()
        
        # 生成训练样本
        game_data = []
        for i, (state, prob) in enumerate(zip(states, probs)):
            reward = 1 if state["player"] == winner else -1
            game_data.append((
                state["state"],
                prob,
                torch.tensor([reward], dtype=torch.float32)
            ))
        
        self.buffer.add(game_data)




```

### <a id="hex-hexgame-utils-selfplay-py"></a>Hex/Hexgame/utils/Selfplay.py

```python
import torch
import numpy as np
from collections import deque
import random

class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)
    
    def add(self, experience):
        """添加单局游戏数据"""
        self.buffer.extend(experience)
    
    def sample(self, batch_size):
        """随机采样批次数据"""
        return random.sample(self.buffer, min(len(self.buffer), batch_size))
    
    def __len__(self):
        return len(self.buffer)

# ======================
# 自对弈生成器
# ======================

class SelfPlay:
    def __init__(self, model, buffer, device):
        """初始化自对弈模块"""
        self.model = model
        self.buffer = buffer
        self.device = device
        self.env = HexGame()

    def preprocess_input(self, input):
        """同algorithm"""
        board = np.array(input["board"])
        current_player = 2*(-board.sum()+0.5) #check current player
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        input_tensor[0] = (board * current_player).astype(np.float32)  # Current player
        #print ("current:",input_tensor[0])
        input_tensor[1] = (np.array(input["last_moves"])).astype(np.float32)  # opponent player#考虑改为最后动作
        #print ("opponent:",input_tensor[1])
        #print(np.where("board" == 0))
        return torch.from_numpy(input_tensor).unsqueeze(0)  # 添加batch维度
    
    def generate_game(self):
        # 初始化环境
        self.env.reset()
        game_history = []
        
        while not self.env.is_terminal():
            # 获取当前状态
            input = self.env.output()
            # 动态计算合法动作（所有空位置）
            legal_moves = np.argwhere(np.array(input["board"]) == 0).tolist()  # [(x1,y1), (x2,y2), ...]
            
            # 预处理输入
            input_tensor = self.preprocess_input(input)
            
            # 模型预测
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            
            # 生成动作概率（仅合法位置）
            policy_probs = torch.softmax(policy_logits, dim=-1).squeeze().numpy()
            legal_indices = [lst[0]*11 + lst[1] for lst in legal_moves]
            legal_probs = policy_probs[legal_indices]
            legal_probs /= legal_probs.sum()  # 重新归一化
            
            # 选择动作
            action_idx = np.random.choice(len(legal_probs), p=legal_probs)
            action = legal_moves[action_idx]
            
            # 执行动作并记录数据
            self.env.step(action)
            game_history.append((input_tensor, legal_probs, value))
        
        # 生成终局棋谱
        final_board = self.env.output()["board"]
        return game_history, final_board, final_last_moves


```

### <a id="hex-hexgame-utils-__init__-py"></a>Hex/Hexgame/utils/__init__.py

```python

```

### <a id="hex-hexgame-utils-utils-py"></a>Hex/Hexgame/utils/utils.py

```python
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
        player_val = 1 if (ai_name == "AI_1" and game.human_color == "red") else -1

        # 调用算法服务获取AI落子
        input_dict = {
            "board": game.board,
            "player_turn": game.player_turn,
            "last_moves": game.last_moves,
        }
        ai_model = Algorithm.HexAI(
            "/Users/wanghaonan/Library/CloudStorage/OneDrive-个人/cityu/第一年 B 学期/RL/RL 课程项目/01/backend/RL_Hex_game/Hex/Hexgame/models/model1000.pth"
        )
        response = ai_model.predict(input_dict)

        if response:
            move = response['optimal_move']
            # 使用异步方法执行落子
            success = await game.async_make_move(move[0], move[1])
            if not success:
                break

            # 异步更新胜率
            await game.async_update_win_probability(
                1 - response["winning_rate"], response["winning_rate"]
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

```

### <a id="hex-hexgame-views-py"></a>Hex/Hexgame/views.py

```python
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

import Hexgame.utils.Algorithm as Algorithm

from .models import HexGame
from .serializers import HexGameSerializer
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
    def get(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            serializer = HexGameSerializer(game)
            print(serializer.data)
            return Response(serializer.data)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


class MoveAPI(APIView):
    # 处理人类落子
    def post(self, request, game_id):
        try:
            print(f"[DEBUG] 收到请求,游戏ID: {game_id}")
            game = HexGame.objects.get(id=game_id)
            print(f"当前回合: {game.player_turn}, 模式: {game.mode}")
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

                return Response(HexGameSerializer(game).data)
            return Response({"error": "Invalid move"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


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
                "last_moves": game.last_moves,  # 根据模型需要调整字段
            }
            ai_model = Algorithm.HexAI(
                "/Users/wanghaonan/Library/CloudStorage/OneDrive-个人/cityu/第一年 B 学期/RL/RL 课程项目/01/backend/RL_Hex_game/Hex/Hexgame/models/model1000.pth"
            )
            response = ai_model.predict(input_dict)

            if response:
                ai_move = response["optimal_move"]
                print("AI收到的棋盘状态:", game.board)
                print("AI选择的落子:", ai_move)
                game.update_win_probability(
                    1 - response["winning_rate"], response["winning_rate"]
                )
                if game.make_move(ai_move[0], ai_move[1]):
                    # 胜负判断
                    player_val = -1 if game.human_color == "red" else 1
                    if check_hex_connection(game.board, player_val):
                        game.winner = "AI"
                        game.save()
                    print(f"AI落子坐标: {ai_move[0]}, {ai_move[1]}")
                    return Response(HexGameSerializer(game).data)

            return Response({"error": "AI move failed"}, status=500)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


class UndoAPI(APIView):
    # 处理悔棋
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            if game.undo_last_move():
                return Response(HexGameSerializer(game).data)
            return Response({"error": "No moves to undo"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


class RestartAPI(APIView):
    def post(self, request, game_id):
        try:
            game = HexGame.objects.get(id=game_id)
            if game.reset_game():
                return Response(HexGameSerializer(game).data)
            return Response({"error": "Reset failed"}, status=400)
        except HexGame.DoesNotExist:
            return Response({"error": "Game not found"}, status=404)


from threading import Thread


class CreateAIGameAPI(APIView):
    def post(self, request):
        game = HexGame.objects.create(mode="AI_AI")
        game.initialize(new_game=True)

        # 启动后台线程
        Thread(target=run_ai_vs_ai_game, args=(game.id,)).start()

        return Response(HexGameSerializer(game).data)


class AIGameStatusAPI(APIView):
    """获取AI对战状态"""

    def get(self, request, game_id):
        game = HexGame.objects.get(id=game_id)
        return Response(HexGameSerializer(game).data)

```

### <a id="hex-hex_test-py"></a>Hex/hex_test.py

```python
import websockets
import json
import asyncio

WS_BASE = "ws://localhost:8000/ws/game/"

async def validate_response(response, expected_type):
    """统一验证响应格式"""
    assert "type" in response, "响应缺少type字段"
    assert "data" in response, "响应缺少data字段"
    assert response["type"] == expected_type, f"预期类型{expected_type}，实际收到{response['type']}"
    return response["data"]

async def create_game_websocket(mode):
    """通过WebSocket创建游戏"""
    async with websockets.connect(WS_BASE + "new/") as ws:
        # 发送创建游戏请求
        await ws.send(json.dumps({
            "action": "create_game",
            "mode": mode
        }))
        
        # 接收创建响应
        response = json.loads(await ws.recv())
        data = await validate_response(response, "game_created")
        return data["game_id"]

async def test_human_ai_mode():
    """测试HUMAN_AI模式"""
    print("\n=== 测试HUMAN_AI模式 ===")
    
    # 1. 通过WebSocket创建游戏
    game_id = await create_game_websocket("HUMAN_AI")
    print(f"✓ 创建游戏成功 ID: {game_id}")

    async with websockets.connect(WS_BASE + f"{game_id}/") as ws:
        # [原有测试逻辑保持不变...]
        # 2. 验证初始状态
        init_resp = json.loads(await ws.recv())
        init_data = await validate_response(init_resp, "game_state")
        assert init_data["mode"] == "HUMAN_AI", "游戏模式错误"

        # 3. 测试人类移动
        print("\n--- 测试人类移动 ---")
        await ws.send(json.dumps({"action": "move", "x": 0, "y": 0}))
        move_resp = json.loads(await ws.recv())
        move_data = await validate_response(move_resp, "game_update")
        assert move_data["board"][0][0] != 0, "人类落子失败"
        print("✓ 人类移动成功")

        # [其余测试步骤保持不变...]

async def test_ai_ai_mode():
    """测试AI_AI模式"""
    print("\n=== 测试AI_AI模式 ===")
    
    # 1. 通过WebSocket创建游戏
    game_id = await create_game_websocket("AI_AI")
    print(f"✓ 创建游戏成功 ID: {game_id}")

    async with websockets.connect(WS_BASE + f"{game_id}/") as ws:
        # [原有测试逻辑保持不变...]
        # 2. 验证初始状态
        init_resp = json.loads(await ws.recv())
        init_data = await validate_response(init_resp, "game_state")
        assert init_data["player_turn"] in ["AI_1", "AI_2"]

        # 3. 自动对战测试
        print("\n--- 自动对战测试 ---")
        for step in range(121):
            await ws.send(json.dumps({"action": "ai_move"}))
            update_resp = json.loads(await ws.recv())
            update_data = await validate_response(update_resp, "game_update")
            
            # 打印进度
            filled = sum(cell !=0 for row in update_data["board"] for cell in row)
            print(f"第{step+1}步 | 落子数: {filled} | 当前玩家: {update_data['player_turn']}")
            
            if update_data.get("winner"):
                print(f"游戏结束！胜者: {update_data['winner']}")
                return

        # 4. 最终状态验证
        final_resp = json.loads(await ws.recv())
        final_data = await validate_response(final_resp, "game_state")
        assert final_data["winner"] in ["AI_1", "AI_2", "draw"]
        print(f"✓ 游戏结束验证成功 结果: {final_data['winner']}")

async def main():
    """主测试流程"""
    try:
        await test_human_ai_mode()
        await test_ai_ai_mode()
        print("\n所有测试通过！")
    except Exception as e:
        print(f"\n测试失败: {str(e)}")
        raise

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
```

### <a id="hex-manage-py"></a>Hex/manage.py

```python
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Hex.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main_python manage.py runserver_":
    main()

```

### <a id="readme-md"></a>README.md

```markdown
# RL_Hex_game

This project aims to implement a reinforcement learning agent to play the game of Hex. It has three main components:

1. Frontend: A graphical user interface (GUI) for the game, built using React.
2. Backend: A server that handles the game logic and communicates with the frontend, built using dajango.
3. Reinforcement Learning Agent: An agent that learns to play the game using reinforcement learning techniques, built using PyTorch. Similar to katago
```

### <a id="train-py"></a>Train.py

```python
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import torch.optim as optim
import numpy as np
import os
from Algorithm.Hexmodel import HexNet
from Algorithm.Selfplay import SelfPlay, ReplayBuffer,ReplayDataset

class Trainer:
    def __init__(self, model, buffer, self_play, save_dir="py_checkpoints", device=torch.device('cuda' if torch.cuda.is_available() else 'cpu'),num_workers=4):
        self.model = model
        self.buffer = buffer
        self.self_play = self_play
        self.save_dir = save_dir
        self.device = device
        self.optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-4) #in case of overfitting
        self.num_workers = num_workers  # 新增
        os.makedirs(save_dir, exist_ok=True)
        self.dataset = None
        self.dataloader = None
    '''
    def train_step(self, batch_size=256): 
        #print("train step 1: len(self.buffer) = ",len(self.buffer))#######################
        if len(self.buffer) < batch_size:#Skip small batches
            print("size = ",len(self.buffer), "Too small, Not Considered")
            return None
        batch = self.buffer.sample(batch_size)
        states = [data["state"].to(self.device) for data in batch]
        policies = [data["policy"] for data in batch]
        values = [data["value"] for data in batch]
        # Stack step:
        states = torch.stack(states).squeeze(1)  # 形状 [batch_size, 2, 11, 11]
        policies = torch.stack([torch.from_numpy(p).float().to(self.device) for p in policies]).view(-1, 11*11)#for 11x11board size
        values = torch.tensor(values).float().to(self.device)
        pred_policies, pred_values = self.model(states)
        # LOSS:
        #policy_loss = nn.CrossEntropyLoss()(pred_policies.view(-1, 11*11), policies.view(-1, 11*11))
        policy_loss = nn.KLDivLoss(reduction='batchmean')(pred_policies.log_softmax(dim=-1),policies)#KL-Divergence Loss
        value_loss = nn.MSELoss()(pred_values.squeeze(), values) #MSE Loss
        total_loss = policy_loss + value_loss #Total
        # Backward
        self.optimizer.zero_grad()
        total_loss.backward()
        self.optimizer.step()
        #print("================================trainstep_COMPLETE================================")
        return {
            "total_loss": total_loss.item(),
            "policy_loss": policy_loss.item(),
            "value_loss": value_loss.item()
        }'''
    def train_step(self, batch_size=1):
        if len(self.buffer) < batch_size:
            print(f"size = {len(self.buffer)} Too small, Not Considered")
            return None
        
        # DataLoader
        #print(self.num_workers)
        if self.dataset is None or len(self.dataset) != len(self.buffer):
            self.dataset = ReplayDataset(self.buffer)
            self.dataloader = DataLoader(
                self.dataset,
                batch_size=batch_size,
                shuffle=True,
                num_workers=self.num_workers,
                pin_memory=True
            )
        
        try:
            batch = next(iter(self.dataloader))
        except StopIteration:
            self.dataloader = DataLoader(
                self.dataset,
                batch_size=batch_size,
                shuffle=True,
                num_workers=self.num_workers,
                pin_memory=True
            )
            batch = next(iter(self.dataloader))
        
        # 提取数据并传输到设备
        states = batch["state"].to(self.device, non_blocking=True)
        policies = batch["policy"].view(-1, 11*11).to(self.device, non_blocking=True)
        values = batch["value"].to(self.device, non_blocking=True)
        
        # 模型前向和损失计算（保持不变）
        pred_policies, pred_values = self.model(states)
        policy_loss = nn.KLDivLoss(reduction='batchmean')(pred_policies.log_softmax(dim=-1), policies)#KL-Divergence LOSS
        value_loss = nn.MSELoss()(pred_values.squeeze(), values.squeeze())#MSE LOSS
        total_loss = policy_loss + value_loss
        
        # 反向传播
        self.optimizer.zero_grad()
        total_loss.backward()
        self.optimizer.step()
        
        return {
            "total_loss": total_loss.item(),
            "policy_loss": policy_loss.item(),
            "value_loss": value_loss.item()
        }

    def save_replay(self, board, last_moves, game_id):
        os.makedirs(self.save_dir, exist_ok=True)#Create dirs if not exist
        file_path = os.path.join(self.save_dir, f"replay_{game_id}.npz")
        # SAVE FINAL GAME
        np.savez(file_path, board=board, last_moves=last_moves)
        print(f"Game: {game_id} has been SAVED to: {file_path}")

    def save_checkpoint(self, game_id):
        os.makedirs(self.save_dir, exist_ok=True)#Create dirs if not exist
        torch.save({
            "model_state": self.model.state_dict(),
            "optimizer_state": self.optimizer.state_dict(),
            "game_id": game_id
        }, f"{self.save_dir}/latest_model.pth")
    ###########################################################################################
    def train(self, start_id, total_games=300):####################################<-Total Game
        for game_id in range(start_id+1, total_games + start_id + 1):
            game_data, final_board, final_last_moves = self.self_play.generate_game()
            #print("GAME: ",game_id," Processe01 PASSED")###############
            self.buffer.add(game_data)
            #print("GAME: ",game_id," Processe02 PASSED")################
            #print(f"Buffer size: {len(self.buffer)}") 
            if game_id % 100 == 0:
                self.save_replay(final_board, final_last_moves, game_id)
            metrics = self.train_step()
            #print("GAME: ",game_id," Processe03 PASSED")###############
            #print(len(self.buffer))
            if metrics:
                print(f"GAME {game_id}/{total_games+start_id} | "
                      f"Total LOSS: {metrics['total_loss']:.4f} | "
                      f"Policy LOSS: {metrics['policy_loss']:.4f} | "
                      f"Value LOSS: {metrics['value_loss']:.4f}")

            if game_id % 100 == 0:
                self.save_checkpoint(game_id)
        self.save_checkpoint(total_games)
        print("Training Completed! Model SAVED!")



def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = HexNet().to(device)
    buffer = ReplayBuffer(capacity=100000)
    self_play = SelfPlay(model=model, buffer=buffer, device=device)
    trainer = Trainer(
        model=model,
        buffer=buffer,
        self_play=self_play,
        save_dir="./py_checkpoints",
        device=device,
        num_workers= 4
    )
    print("<------------------------------------ENVIRONMENT SETTED------------------------------------------->")
    start_game_id = 0
    checkpoint_path = "./py_checkpoints/latest_model.pth"
    if os.path.exists(checkpoint_path):
        checkpoint = torch.load(checkpoint_path, map_location=device)
        model.load_state_dict(checkpoint["model_state"])
        trainer.optimizer.load_state_dict(checkpoint["optimizer_state"])
        start_game_id = checkpoint["game_id"]
        print("Recovered from: model ",start_game_id)
    else:
        print("No games Recovered")
    print("<--------------------------------------START TRAINING--------------------------------------------->")
    ###############################################################################################################
    trainer.train(start_id=start_game_id,total_games=300) #########################################################
    ###############################################################################################################
    print("<------------------------------------TRAINING COMPLETED------------------------------------------->")

if __name__ == "__main__":
    os.makedirs("py_checkpoints", exist_ok=True)
    main()

```

### <a id="algorithm-algorithm-py"></a>algorithm/Algorithm.py

```python
import os
from pathlib import Path

# Get current script directory
current_dir = Path(__file__).parent
print("Current Directory:", current_dir)

# Navigate to target directory
os.chdir(current_dir.resolve())  # resolve() normalizes the path


import numpy as np
import torch
from Hexmodel import HexNet


class HexAI:
    def __init__(self, model_path=):
        self.model = self.load_model(model_path)

    def load_model(self, model_path):
        model = HexNet()  # Model Seleciton
        if torch.cuda.is_available():
            device = torch.device("cuda")
            print("Using CUDA device.")
        elif torch.backends.mps.is_available():
            device = torch.device("mps")
            print("Using MPS device.")
        else:
            device = torch.device("cpu")
            print("Using CPU device.")

        # Load the state dictionary with map_location to ensure compatibility
        state_dict = torch.load(model_path, map_location=device)

        # Check if the state_dict is nested (e.g., contains 'model_state')
        if "model_state" in state_dict:
            model.load_state_dict(state_dict["model_state"])
        else:
            # Assume the loaded object is directly the state_dict
            # model.load_state_dict(state_dict)
            raise ValueError("Invalid model state dictionary format.")

        model.to(device)  # Move the model to the selected device
        model.eval()
        return model

    def preprocess_input(self, input):
        # Dict -> Tensor
        board = np.array(input["board"])
        last_moves = np.array(input["last_moves"])
        current_player = 2 * (-1 * np.sum(board) + 0.5)  # check current player
        if current_player == -1:
            board = -1 * board.T
            last_moves = last_moves.T
        # Read: input_tensor 第一维度为当前局面，第二维度为落子顺序
        input_tensor = np.zeros((2, 11, 11), dtype=np.float32)
        # print(current_player)
        input_tensor[0] = (board).astype(np.float32)  # Current player
        # print ("current:",input_tensor[0])
        input_tensor[1] = (last_moves).astype(
            np.float32
        )  # opponent player#考虑改为最后动作
        # print ("opponent:",input_tensor[1])
        # print(np.where("board" == 0))
        return current_player, torch.from_numpy(input_tensor).unsqueeze(
            0
        )  # 添加batch维度

    def predict(self, input_dict):
        # Preprocess
        current_player, input_tensor = self.preprocess_input(input_dict)

        # Get the device that the model is on
        device = next(self.model.parameters()).device

        # Move input tensor to the same device as the model
        input_tensor = input_tensor.to(device)

        legal_moves = (
            np.argwhere(np.array(input_dict["board"]) == 0).tolist()
            if current_player == 1
            else np.argwhere(np.array(input_dict["board"]).T == 0).tolist()
        )

        if self.model:
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            probs_device = torch.softmax(policy_logits, dim=-1)
            move_probs = (
                probs_device.flatten()
                if current_player == 1
                else probs_device.reshape(11, 11).T.flatten()
            )
        else:
            # 若无模型，随机选择合法动作
            move_probs = np.ones(
                np.shape(np.array(input_dict["board"]))
            ).flatten() / len(legal_moves)
            print("Notice: No model selected.")

        # index = row * width + column
        if current_player == 1:
            legal_indices = [lst[0] * 11 + lst[1] for lst in legal_moves]
        else:
            legal_indices = [lst[1] * 11 + lst[0] for lst in legal_moves]

        # TODO:待更改：把输出最高prob改成输出top3

        legal_probs = move_probs[legal_indices]
        optimal_idx = torch.argmax(legal_probs).item()
        optimal_move = legal_moves[optimal_idx]
        winning_rate = (
            (value.item() + 1) / 2 if self.model else 0.5
        )  # [-1,1]->[0,1], 0.5 if no model selected
        return {"optimal_move": optimal_move, "winning_rate": round(winning_rate, 2)}


hex_ai = HexAI(model_path="../model/model600.pth")

# 模拟后端输入
input_data = {
    "board": [
        [1, -1, 1, -1, 1, 0, -1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    "player_turn": "AI",
    "last_moves": [
        [1, 4, 3, 2, 11, 0, 12, 13, 0, 0, 0],
        [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 9, 0, 0, 0, 0, 0, 8, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    # "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("胜率:", output["winning_rate"])

```

### <a id="algorithm-gamelogic-py"></a>algorithm/GameLogic.py

```python
import numpy as np
from collections import deque
class HexGame:
    def __init__(self):
        self.board_size = 11
        self.board = None
        self.last_moves = None
        self.current_player = 1  # 1代表先手，-1代表后手
        self.winner = None
        self.reset()

    def reset(self):
        self.board = [[0] * self.board_size for _ in range(self.board_size)]
        self.last_moves = [[0] * self.board_size for _ in range(self.board_size)]
        self.current_player = 1
        self.winner = None
        self._step_counter = 0  # 用于记录总步数

    def insert(self, state):
        """注入指定状态（用于测试）"""
        self.board = [row.copy() for row in state["board"]]
        self.last_moves = [row.copy() for row in state["last_moves"]]
        # 计算当前步数和玩家
        self._step_counter = np.max(np.array(self.last_moves))
        self.current_player = 1 if (self._step_counter % 2 == 0) else -1
        if self.current_player == -1 :
            self.board = (-1 * np.array(self.board).T).tolist() #FLIP the board
            self.last_moves = (np.array(self.last_moves).T).tolist() #FLIP the board
        # 全局检查胜利状态
        self.winner = self._determine_global_winner()

    def make_move(self, x, y):
        """执行落子并更新状态"""
        if self.board[x][y] != 0 or self.winner is not None:
            return False  # Invaild Step
        self.board[x][y] = 1
        self._step_counter += 1
        self.last_moves[x][y] = self._step_counter
        self.winner = self._check_winner(x, y)
        if self.winner is None:
            self.current_player *= -1
            self.board = (-1 * np.array(self.board).T).tolist() #FLIP the board
            self.last_moves = (np.array(self.last_moves).T).tolist() #FLIP the board
        return True

    def is_terminal(self):
        return self.winner if self.winner is not None else 0 #ZERO for not done;1先手胜利-1后手胜利

    def output(self):
        """返回当前状态字典"""
        return {
            "board": [row.copy() for row in self.board],
            "last_moves": [row.copy() for row in self.last_moves]
        }
    """
    def _check_winner(self, x, y):
        player = self.board[x][y]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        target_reached = [False] 
        def dfs(cx, cy):
            if (player == 1 and cy == self.board_size-1) or \
               (player == -1 and cx == self.board_size-1):
                target_reached[0] = True
                return
            for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                nx, ny = cx+dx, cy+dy
                if 0<=nx<self.board_size and 0<=ny<self.board_size:
                    if not visited[nx][ny] and self.board[nx][ny] == player:
                        visited[nx][ny] = True
                        dfs(nx, ny)

        visited[x][y] = True
        dfs(x, y)
        return player if target_reached[0] else None"""

    def _check_winner(self, x, y):
        directions = [(-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0)]
        visited = [[False for _ in range(self.board_size)] for _ in range(self.board_size)]
        queue = deque()
        queue.append((x, y))
        visited[x][y] = True
        touch_left = False
        touch_right = False
        if y == 0:
            touch_left = True
        if y == self.board_size - 1:
            touch_right = True
        while queue:
            cx, cy = queue.popleft()
            if cy == 0:
                touch_left = True
            if cy == self.board_size - 1:
                touch_right = True
            if touch_left and touch_right:
                return self.current_player
            for dx, dy in directions:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < self.board_size and 0 <= ny < self.board_size:
                    if not visited[nx][ny] and self.board[nx][ny] == 1:
                        visited[nx][ny] = True
                        queue.append((nx, ny))
        return self.current_player if touch_left and touch_right else None
        

    def _determine_global_winner(self):
        """全局检查胜利条件"""
        # 检查（1）是否连接左右
        left_nodes = [(i,0) for i in range(self.board_size) if self.board[i][0] == 1]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        for x,y in left_nodes:
            if not visited[x][y]:
                stack = [(x,y)]
                visited[x][y] = True
                while stack:
                    cx, cy = stack.pop()
                    if cy == self.board_size-1:
                        return self.current_player
                    for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                        nx, ny = cx+dx, cy+dy
                        if 0<=nx<self.board_size and 0<=ny<self.board_size:
                            if not visited[nx][ny] and self.board[nx][ny] == 1:
                                visited[nx][ny] = True
                                stack.append((nx, ny))

        # 检查（-1）是否连接上下
        top_nodes = [(0,j) for j in range(self.board_size) if self.board[0][j] == -1]
        visited = [[False]*self.board_size for _ in range(self.board_size)]
        for x,y in top_nodes:
            if not visited[x][y]:
                stack = [(x,y)]
                visited[x][y] = True
                while stack:
                    cx, cy = stack.pop()
                    if cx == self.board_size-1:
                        return -self.current_player
                    for dx, dy in [(-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0)]:
                        nx, ny = cx+dx, cy+dy
                        if 0<=nx<self.board_size and 0<=ny<self.board_size:
                            if not visited[nx][ny] and self.board[nx][ny] == -1:
                                visited[nx][ny] = True
                                stack.append((nx, ny))
        return None


```

### <a id="algorithm-hexmodel-py"></a>algorithm/Hexmodel.py

```python
import torch
import torch.nn as nn

class HexNet(nn.Module):
    def __init__(self, board_size=11, num_channels=256, num_res_blocks=4):
        super().__init__()
        self.board_size = board_size
        
        self.conv_in = nn.Conv2d(2, num_channels, 3, padding=1)
        self.bn_in = nn.BatchNorm2d(num_channels)
        
        # Residual
        self.res_blocks = nn.ModuleList([nn.Sequential(
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels),
                nn.ReLU(),
                nn.Conv2d(num_channels, num_channels, 3, padding=1),
                nn.BatchNorm2d(num_channels)
            ) for _ in range(num_res_blocks)])
        
        self.policy_head = nn.Sequential(nn.Conv2d(num_channels, 2, 1),nn.Flatten(),nn.Linear(2*board_size*board_size, board_size*board_size))# Policy_head
        self.value_head = nn.Sequential( nn.Conv2d(num_channels, 1, 1),nn.Flatten(),nn.Linear(board_size*board_size, 256),nn.ReLU(),nn.Linear(256, 1),nn.Tanh())# Value_head


    def forward(self, x):
        x = torch.relu(self.bn_in(self.conv_in(x)))#Residual
        for block in self.res_blocks:
            x = block(x) + x 
            x = torch.relu(x)
        policy = self.policy_head(x)
        value = self.value_head(x)
        return policy, value


```

### <a id="algorithm-mcts-py"></a>algorithm/MCTS.py

```python
import numpy as np
import torch
from .GameLogic import HexGame

class MCTSNode:
    def __init__(self, game_state: HexGame, prior: float, parent=None):
        # 节点数据保留在CPU（树结构操作不适合GPU加速）
        self.game_state = game_state 
        self.parent = parent
        self.children = {}
        self.visit_count = 0
        self.total_value = 0.0
        self.prior = prior

class MCTS:
    #################################################################################################################################################
    def __init__(self, model, simulations=2, c_puct=2.0, device=('cuda' if torch.cuda.is_available() else 'cpu')):#########<- Simluations，C_puct##
        self.model = model.to(device)
        self.simulations = simulations
        self.c_puct = c_puct
        self.device = device

    def search(self, initial_game: HexGame) -> dict:
        root_node = MCTSNode(initial_game, prior=0.0)
        for _ in range(self.simulations):
            node = root_node
            env = HexGame()
            env.insert(node.game_state.output())  # 复制初始状态
            #print("----Process01 Passed----")###########################################
            while node.children and not env.is_terminal():
                action = self._select_action(node)  # GPU加速选择
                env.make_move(*action)
                #env.board = (-1 *np.array(env.board).T).tolist()
                node = node.children[action]
            #print("----Process02 Passed----")###########################################
            if env.is_terminal() == 0:
                # GPU加速模型预测
                #make sure the board is flipped or not
                if env.current_player == -1 and np.sum(np.array(env.board)) == 1:
                    env.board = (-1* np.array(env.board)).T.tolist() # Flip the board
                    env.last_moves = (np.array(env.last_moves)).T.tolist() # Flip the board
                input_tensor = self._state_to_tensor(env.output()).to(self.device)
                with torch.no_grad():
                    policy_logits, value = self.model(input_tensor)
                policy_probs = torch.softmax(policy_logits, dim=-1).view(11, 11)
                # GPU加速生成合法动作掩码
                legal_actions = self._get_legal_actions(env)
                legal_mask = torch.zeros(11, 11, device=self.device)
                for x, y in legal_actions:
                    legal_mask[x, y] = 1.0
                masked_probs = policy_probs * legal_mask
                masked_probs /= masked_probs.sum()
                # 创建子节点（CPU操作）
                for x, y in legal_actions:
                    prior = masked_probs[x, y].item()  # 取回标量值
                    child_env = HexGame()
                    child_env.insert(env.output())
                    child_env.make_move(x, y)
                    #child_env.board = (-1 *np.array(child_env.board).T).tolist()
                    node.children[(x, y)] = MCTSNode(child_env, prior=prior, parent=node)
                
                value = value.item()  # 取回标量值
            #print("----Process03 Passed----")###########################################
            winner = env.is_terminal()
            final_value = 1.0 if winner == 1 else -1.0
            self._backpropagate(node, final_value)
            #print("----Process04 Passed----")###########################################
            #print(f"Simulations {_}/{self.simulations} | ")
        return self._get_final_policy(root_node)

    def _select_action(self, node: MCTSNode) -> tuple:
        actions = list(node.children.keys())
        # 将子节点数据转换为GPU张量
        N_childs = torch.tensor([c.visit_count for c in node.children.values()],dtype=torch.float32,device=self.device) #Number of Visits
        V_childs = torch.tensor([c.total_value for c in node.children.values()], dtype=torch.float32,device=self.device) #Value
        priors = torch.tensor([c.prior for c in node.children.values()],dtype=torch.float32,device=self.device)
        q = V_childs / (N_childs + 1e-8)#Prevent denominator from being ZERO
        N_parents =  torch.sqrt(torch.tensor(node.visit_count, device=self.device))
        # PUCT(Prioritized Upper Confidence Tree)：Q + c_puct * P * sqrt(N_parent) / (N_child + 1)
        scores = q + self.c_puct * priors * N_parents / (N_childs + 1)
        # 选择最高分动作
        return actions[torch.argmax(scores).item()]

    def _backpropagate(self, node: MCTSNode, value: float):
        """回溯更新（CPU操作）"""
        while node is not None:
            node.visit_count += 1
            node.total_value += value
            node = node.parent

    def _get_final_policy(self, root_node: MCTSNode) -> dict:
        """生成最终策略分布"""
        total_visits = sum(c.visit_count for c in root_node.children.values())
        return {a: c.visit_count / total_visits for a, c in root_node.children.items()}

    def _get_legal_actions(self, env: HexGame) -> list:
        legal_positions = np.argwhere(np.array(env.output()["board"]) == 0).tolist()
        return [(x, y) for x, y in legal_positions]

    def _state_to_tensor(self, state: dict) -> torch.Tensor:
        board = np.array(state["board"], dtype=np.float32)
        last_moves = np.array(state["last_moves"], dtype=np.float32)
        return torch.tensor(
            np.stack([board, last_moves], axis=0),
            dtype=torch.float32
        ).unsqueeze(0)

```

### <a id="algorithm-selfplay-py"></a>algorithm/Selfplay.py

```python
import torch
import numpy as np
from collections import deque
from torch.utils.data import Dataset, DataLoader
import random
from .GameLogic import HexGame #这里不用relative import反而会在运行train.py的时候报错
from .MCTS import MCTS #这里不用relative import反而会在运行train.py的时候报错

class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)
    
    def add(self, experience):
        self.buffer.extend(experience)
    
    def sample(self, batch_size):
        return random.sample(self.buffer, min(len(self.buffer), batch_size))
    
    def __len__(self):
        return len(self.buffer)

class ReplayDataset(Dataset):
    def __init__(self, buffer):
        # 确保 buffer.buffer 是 deque 或可索引对象
        self.buffer = list(buffer.buffer)  # 将 deque 转换为 list
    
    def __len__(self):
        return len(self.buffer)
    
    def __getitem__(self, idx):
        data = self.buffer[idx]
        state = data["state"].squeeze(0)  # 形状 [2,11,11]
        policy = data["policy"]           # 形状 [11,11]
        value = data["value"]
        return {
            "state": torch.FloatTensor(state),  # 确保转换为 Tensor
            "policy": torch.FloatTensor(policy),
            "value": torch.FloatTensor([value])
        }

class SelfPlay:
    def __init__(self, model, buffer, device):
        self.model = model.to(device)
        self.buffer = buffer
        self.device = device
        self.env = HexGame()
    """
    def preprocess_input(self, state_dict):
        board = np.array(state_dict["board"], dtype=np.float32)
        last_moves = np.array(state_dict["last_moves"], dtype=np.float32)
        input_np = np.stack([board, last_moves], axis=0)  # shape(2,11,11)
        input_tensor = torch.tensor(input_np, dtype=torch.float32)  # tensor
        return input_tensor.unsqueeze(0)  # shape(1,2,11,11)"""
    
    def preprocess_input(self, state_dict):
        board = np.array(state_dict["board"], dtype=np.float32)
        last_moves = np.array(state_dict["last_moves"], dtype=np.float32)
        if self.env.current_player == -1 and np.sum(board) == 1: #make sure the board is filpped
            board = -1 * board.T  # Flip the board
            last_moves = last_moves.T  # Flip the board
        input_np = np.stack([board, last_moves], axis=0)  #shape(2,11,11)
        return torch.tensor(input_np, dtype=torch.float32).unsqueeze(0)

    def generate_game(self):
        # Initialize
        self.env.reset()
        game_history = []
        mcts = MCTS(self.model, device=self.device)
        while True:
            # Check Winner and end loop
            terminal_status = self.env.is_terminal()
            if terminal_status != 0:
                winner = 1 if terminal_status == 1 else -1
                break
            '''
            #########################[Without  MCTS]#########################
            input = self.env.output()
            legal_moves = np.argwhere(np.array(input["board"]) == 0).tolist()
            # Preprocess
            input_tensor = self.preprocess_input(input).to(self.device)
            
            # Model Prediction
            with torch.no_grad():
                policy_logits, value = self.model(input_tensor)
            
            # Legal Movements
            policy_probs = torch.softmax(policy_logits, dim=-1).squeeze().cpu().numpy()
            if policy_probs.ndim == 1:
                policy_probs = policy_probs.reshape(11, 11)
            
            legal_indices = [lst[0]*11 + lst[1] for lst in legal_moves]
            legal_probs = policy_probs.reshape(-1)[legal_indices]
            legal_probs /= legal_probs.sum()
            
            # Apply Action
            action_idx = np.random.choice(len(legal_probs), p=legal_probs)
            x, y = legal_moves[action_idx]
            self.env.make_move(x, y)
            game_history.append({
                "state": input_tensor.cpu(),
                "policy": policy_probs,    
                "value": value.item(),
                "action": (x, y)
            })
            #########################[Without  MCTS]#########################
            '''
            ###########################[With MCTS]###########################
            mcts_policy = mcts.search(self.env)
            # 选择动作（按概率采样）
            actions = list(mcts_policy.keys())
            probs = list(mcts_policy.values())
            action = actions[np.random.choice(len(actions), p=probs)]
            # 执行动作
            current_state = self.env.output()
            current_player = 2*(np.sum(np.array(current_state["board"]))+0.5)
            self.env.make_move(action[0], action[1])
            #print("-------------------------------")###################
            #print(np.array(current_state["board"]))####################
            #print("#of Actions:",len(actions))##################################
            game_history.append({
                "state": self.preprocess_input(current_state),
                "policy": self._policy_to_matrix(mcts_policy),
                "value": None,  
                "player": current_player
            })
        #print("========Check point passed=======")#####################
        for data in game_history:
            data["value"] = 1.0 if data["player"] == winner else -1.0
            ###########################[With MCTS]###########################
        
        final_board = self.env.output()["board"]
        #print(np.array(final_board))
        return game_history, final_board, winner
    
    def _policy_to_matrix(self, mcts_policy):
        policy_matrix = np.zeros((11, 11), dtype=np.float32)
        for (x, y), prob in mcts_policy.items():
            policy_matrix[x, y] = prob
        return policy_matrix

```

### <a id="algorithm-test-py"></a>algorithm/Test.py

```python
"""hex_ai = HexAI("../model/model1000.pth")

# 模拟后端输入
input_data = {
    "board": [[0]*11 for _ in range(11)],  # 空棋盘
    "player_turn": "AI",
    "last_moves": [],
    "legal_moves": [(x, y) for x in range(11) for y in range(11)]  # 所有位置合法
}

# 调用预测函数
output = hex_ai.predict(input_data)
print("AI选择的动作:", output["optimal_move"])
print("人类胜率:", output["win_rate_human"])
print("AI胜率:", output["win_rate_AI"])
"""

from GameLogic import HexGame

game = HexGame()
test_state = {
    "board": [
        [1, 1, 1, -1, 0, -1, 1, -1, 0, 1, -1],
        [-1, 1, -1, 1, 0, -1, 0, 0, 0, 1, -1],
        [-1, -1, 1, 1, 0, 1, -1, -1, -1, -1, 1],
        [1, -1, -1, 1, -1, 0, 0, 0, -1, -1, 0],
        [1, -1, -1, -1, 1, 0, -1, 1, 1, 0, 0],
        [-1, 0, 0, 1, 1, 1, 1, 1, -1, -1, 1],
        [-1, -1, -1, 1, -1, -1, -1, 0, 1, 1, 1],
        [0, 1, 0, 1, 0, 0, 1, 1, -1, 0, 0],
        [1, -1, 0, 1, 0, -1, -1, -1, 0, 0, 0],
        [0, -1, 1, -1, 1, 1, 0, 1, 1, 0, -1],
        [-1, 0, -1, 1, 1, 0, 0, 0, 1, -1, 1],
    ],
    "last_moves": [
        [1, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 3, 0, 3, 5, 0, 0, 0, 0, 0, 0],
        [24, 0, 0, 30, 7, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 28, 9, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 26, 11, 0, 10, 0, 0, 0, 0],
        [0, 0, 0, 12, 13, 0, 34, 0, 0, 0, 0],
        [0, 0, 0, 14, 15, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 18, 19, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 20, 21, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0],
    ],
}
import numpy as np

game.insert(test_state)
print(np.array(game.board))
game.make_move(2,10)
print(np.array(game.board))
game.make_move(2,10)
#print(game.output())
print(np.array(game.board))
print(game.current_player)
print(game.is_terminal())  # 输出-1（后手胜）

```

### <a id="algorithm-__init__-py"></a>algorithm/__init__.py

```python

```


```

### <a id="hex-ai-frontend-frontend_effect-image_merge-py"></a>hex-ai-frontend/frontend_effect/image_merge.py

```python
from PIL import Image
import os

def merge_images(folder_path, output_filename="merged_ui.png"):
    """
    Merge images in the specified folder into a single horizontal image

    Args:
        folder_path: Path to folder containing images
        output_filename: Name of the output merged image
    """
    # Get list of image files (png)
    image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]

    if not image_files:
        print("No PNG images found in the folder.")
        return

    print(f"Found {len(image_files)} images: {image_files}")

    # Open all images
    images = [Image.open(os.path.join(folder_path, img)) for img in image_files]

    # Calculate dimensions for the merged image
    # Use max height and sum of widths for horizontal arrangement
    max_height = max(img.height for img in images)
    total_width = sum(img.width for img in images)

    # Create a new blank image with the calculated dimensions
    merged_image = Image.new('RGB', (total_width, max_height))

    # Paste each image side by side
    x_offset = 0
    for img in images:
        # Center vertically if needed
        y_offset = (max_height - img.height) // 2
        merged_image.paste(img, (x_offset, y_offset))
        x_offset += img.width

    # Save the merged image
    output_path = os.path.join(folder_path, output_filename)
    merged_image.save(output_path)
    print(f"Merged image saved to {output_path}")

if __name__ == "__main__":
    # Use current directory as the folder path
    current_folder = os.path.dirname(os.path.abspath(__file__))
    merge_images(current_folder)

    print("Alternative layouts available:")
    print("1. Vertical stack: Add parameter 'vertical=True' to merge_images()")
    print("2. Grid layout: Use merge_images_grid() function instead")

```

### <a id="hex-ai-frontend-output-md"></a>hex-ai-frontend/output.md

```markdown
# RL_Hex_game Project Documentation

_Generated on 4/15/2025_

This document contains code files from the RL_Hex_game project.


## Table of Contents

- 📁 **app/**
  - 📁 **(app)/**
    - 📁 **dashboard/**
      - [📄 page.tsx](#srcappappdashboardpagetsx)
    - 📁 **game/**
      - 📁 **[gameId]/**
        - [📄 page.tsx](#srcappappgamegameidpagetsx)
    - [📄 layout.tsx](#srcappapplayouttsx)
    - 📁 **replay/**
      - 📁 **[gameId]/**
        - [📄 page.tsx](#srcappappreplaygameidpagetsx)
    - 📁 **settings/**
      - [📄 page.tsx](#srcappappsettingspagetsx)
  - [📄 layout.tsx](#srcapplayouttsx)
  - [📄 page.tsx](#srcapppagetsx)
- 📁 **components/**
  - 📁 **dashboard/**
    - [📄 GameListTable.tsx](#srccomponentsdashboardgamelisttabletsx)
    - [📄 NewGameOptions.tsx](#srccomponentsdashboardnewgameoptionstsx)
    - [📄 UserStatsCard.tsx](#srccomponentsdashboarduserstatscardtsx)
  - 📁 **hex/**
    - [📄 GameInfo.tsx](#srccomponentshexgameinfotsx)
    - [📄 GameplayControls.tsx](#srccomponentshexgameplaycontrolstsx)
    - [📄 HexBoard.tsx](#srccomponentshexhexboardtsx)
  - 📁 **replay/**
    - [📄 ReplayControlBar.tsx](#srccomponentsreplayreplaycontrolbartsx)
  - 📁 **settings/**
    - [📄 GameOptionToggles.tsx](#srccomponentssettingsgameoptiontogglestsx)
    - [📄 ThemeSelector.tsx](#srccomponentssettingsthemeselectortsx)
    - [📄 UserProfileForm.tsx](#srccomponentssettingsuserprofileformtsx)
  - 📁 **ui/**
    - [📄 SideBarNav.tsx](#srccomponentsuisidebarnavtsx)
- 📁 **hooks/**
  - [📄 useGameWebSocket.ts](#srchooksusegamewebsocketts)
- 📁 **lib/**
  - [📄 constants.ts](#srclibconstantsts)
  - [📄 coordinates.ts](#srclibcoordinatests)
- 📁 **store/**
  - [📄 gameStore.ts](#srcstoregamestorets)
- 📁 **types/**
  - [📄 hexProps.ts](#srctypeshexpropsts)

---


### <a name="srcappappdashboardpagetsx"></a>app/(app)/dashboard/page.tsx


```tsx
    import React from 'react';
    import UserStatsCard from '@/components/dashboard/UserStatsCard';
    import GameListTable from '@/components/dashboard/GameListTable';
    import NewGameOptions from '@/components/dashboard/NewGameOptions';

    export default function DashboardPage() {
      return (
        // Use padding defined in AppLayout or add here if needed
        <div className="p-6 space-y-6"> {/* Added space-y for vertical spacing */}
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Stats Card - Takes 1 column on medium screens */}
            <div className="md:col-span-1">
              <UserStatsCard />
            </div>
            {/* New Game Options - Takes 2 columns on medium screens */}
            <div className="md:col-span-2">
              <NewGameOptions />
            </div>
          </div>

          {/* Recent Games Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Games</h2>
            <GameListTable />
          </div>

        </div>
      );
    }
    
```


---


### <a name="srcappappgamegameidpagetsx"></a>app/(app)/game/[gameId]/page.tsx


```tsx
'use client';

import React, { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation'; // Hook to get route parameters

// Import Game Components
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import GameplayControls from "@/components/hex/GameplayControls";

// Import WebSocket Hook and State
import { useGameWebSocket, WebSocketState } from '@/hooks/useGameWebSocket';
import { useGameStore } from '@/store/gameStore';

// Import types and helpers
import { CubeCoordinates, PlayerColors } from '@/types/hexProps';

const BOARD_SIZE = 11; // Assuming standard size

export default function GamePage() {
  const params = useParams();
  const gameId = params?.gameId as string | undefined; // Extract gameId

  // Get state and actions from Zustand store
  const {
    // State...
    boardState, playerTurn, humanPlayerColor, moves, highlightedHexes, winner, mode, winProbability,
    connectionState: storedConnectionState,
    // Actions...
    handleGameStateUpdate, setConnectionState: setStoreConnectionState, setGameId: setStoreGameId,
    setLastError, resetLocalState, setSendMessage, // <-- Get setSendMessage action
    requestMove, requestUndo, requestRedo, requestRestart, requestAiMove,
  } = useGameStore();

  // Callback to handle messages received from the WebSocket hook
  const handleWebSocketMessage = useCallback((message: any) => {
    if (!message || !message.type) return;

    switch (message.type) {
      case 'game_state':
      case 'game_update':
        handleGameStateUpdate(message.data);
        break;
      case 'error':
        console.error("Received error message from backend:", message.data?.message);
        setLastError(message.data?.message || "Unknown error from backend.");
        break;
      default:
        console.log("Received unhandled message type:", message.type);
    }
  }, [handleGameStateUpdate, setLastError]);

  // Initialize WebSocket hook
  const {
      connect, disconnect, sendMessage, // <-- Get sendMessage from hook
      connectionState: hookConnectionState,
      error: wsError
  } = useGameWebSocket(handleWebSocketMessage);


  // --- Effects ---

  // Effect to connect WebSocket when gameId is available
  useEffect(() => {
    if (gameId) {
      resetLocalState();
      setStoreGameId(gameId);
      const wsUrl = `ws://localhost:8000/ws/game/${gameId}/`;
      connect(wsUrl);
      return () => {
        disconnect();
        setStoreConnectionState(WebSocketState.CLOSED);
        setStoreGameId(null);
      };
    } else {
      console.error("Game ID is missing from route parameters.");
      setLastError("Game ID is missing.");
    }
  }, [gameId, connect, disconnect, setStoreGameId, setStoreConnectionState, resetLocalState]);

   // Effect to sync hook's connection state and errors to the Zustand store
   useEffect(() => {
        setStoreConnectionState(hookConnectionState);
        if (hookConnectionState === WebSocketState.ERROR && wsError) {
            setLastError(`WebSocket connection error: ${wsError.type}`);
        }
        if (hookConnectionState === WebSocketState.OPEN) {
             setLastError(null);
        }
   }, [hookConnectionState, wsError, setStoreConnectionState, setLastError]);

   // Effect to pass the actual sendMessage function to the Zustand store once available
   useEffect(() => {
       if (hookConnectionState === WebSocketState.OPEN && sendMessage) {
           setSendMessage(sendMessage);
       }
       // Optional: Clear sendMessage in store on disconnect?
       // return () => {
       //     setSendMessage((payload) => { console.warn("Attempted to send message after disconnect.", payload); });
       // }
   }, [hookConnectionState, sendMessage, setSendMessage]);


  // --- Derived State & Constants ---
  // Determine if interaction is allowed (game not over, connection open)
  const isInteractionAllowed = winner === null && storedConnectionState === WebSocketState.OPEN;
  // Determine if undo/redo are possible (requires backend state info, e.g., history length > 1)
  // Placeholder logic - needs refinement based on actual state available from backend
  const canUndo = isInteractionAllowed && moves > 0; // Simple example: can undo if moves > 0
  const canRedo = false; // Placeholder: Requires tracking history index

  const playerColors: PlayerColors = { p1: '#E53E3E', p2: '#3182CE', empty: '#F7FAFC', background: '#ffffff' };
  const gameMetadata = { size: BOARD_SIZE, moves: moves };

  // --- Render Logic ---
  if (storedConnectionState === WebSocketState.CONNECTING && !gameId) {
       return <div className="p-6 text-center text-red-600">Invalid Game ID.</div>;
  }
  if (storedConnectionState === WebSocketState.CONNECTING) {
      return <div className="p-6 text-center">Connecting to game {gameId}...</div>;
  }
  if (storedConnectionState === WebSocketState.ERROR) {
       return <div className="p-6 text-center text-red-600">Connection Error. Please try refreshing.</div>;
  }
  // Handle case where connection closes unexpectedly after initial connection attempt
   if (storedConnectionState === WebSocketState.CLOSED && gameId) {
        return <div className="p-6 text-center text-orange-600">Connection Closed. Please try refreshing.</div>;
   }


  return (
    <div className="flex h-full p-4 gap-4">
      {/* Left Column: Hex Board */}
      <div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow h-full">
        <HexBoard
          boardState={boardState}
          playerColors={playerColors}
          // Pass requestMove directly - it checks interaction allowed internally (via store state)
          onHexClick={requestMove}
          className="max-w-full max-h-full"
          boardSize={BOARD_SIZE}
          highlightedHexes={highlightedHexes}
        />
      </div>

      {/* Right Column: Info and Controls */}
      <div className="w-1/3 flex-none flex flex-col gap-4 overflow-hidden h-full">
        {/* Game Info Panel */}
        <div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
          <GameInfo gameMetadata={gameMetadata} className="text-gray-600" />
           {winProbability && (
                <div className="mt-2 text-sm">
                    <h3 className="font-medium text-gray-700">Win Probability:</h3>
                    {Object.entries(winProbability).map(([player, prob]) => (
                        <p key={player}>{player}: {(prob * 100).toFixed(1)}%</p>
                    ))}
                </div>
            )}
        </div>

        {/* Gameplay Controls Panel */}
        <div className="flex-1 min-h-0 p-4 bg-white rounded-lg shadow flex flex-col overflow-y-auto">
          <GameplayControls
            playerTurn={playerTurn ?? 0}
            winner={winner}
            onNewGameClick={() => { console.log("New Game clicked - Navigating to dashboard might be appropriate"); /* router.push('/dashboard'); */ }}
            onUndoClick={requestUndo}
            onRedoClick={requestRedo}
            // onResignClick={requestResign}
            isInteractionAllowed={isInteractionAllowed} // Pass derived flag
            canUndo={canUndo} // Pass derived flag
            canRedo={canRedo} // Pass derived flag
            className="text-gray-600"
          />
           <p className="text-xs text-gray-400 mt-4">Status: {storedConnectionState}</p>
        </div>
      </div>
    </div>
  );
}


```


---


### <a name="srcappapplayouttsx"></a>app/(app)/layout.tsx


```tsx
import SidebarNav from '@/components/ui/SideBarNav'; // Adjust path if needed
import React from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Main container using flexbox to position sidebar and content
    <div className="flex h-screen overflow-hidden bg-gray-100"> {/* Base light background */}

      {/* Persistent Sidebar */}
      <SidebarNav />

      {/* Main content area */}
      {/* flex-1 allows it to take remaining width */}
      {/* overflow-y-auto enables scrolling ONLY for the content area */}
      <main className="flex-1 overflow-y-auto">
        {/* Page content from dashboard/page.tsx, game/page.tsx etc. renders here */}
        {children}
      </main>

    </div>
  );
}


```


---


### <a name="srcappappreplaygameidpagetsx"></a>app/(app)/replay/[gameId]/page.tsx


```tsx
"use client"; // Needed for state and effects

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation"; // Can use this or params prop

// Import Game Components (assuming they are client components or compatible)
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import ReplayControlBar from "@/components/replay/ReplayControlBar"; // Import the new component

// Import types and helpers
import { CubeCoordinates, PlayerColors } from "@/types/hexProps";
import { computeGridCoordinates, cubeToKey } from "@/lib/coordinates";

const BOARD_SIZE = 11; // Assuming standard size

// Define structure for a single move in the history
interface ReplayMove {
	player: 1 | 2; // Or 'human'/'AI' if matching backend
	coords: CubeCoordinates;
	moveNumber: number;
}

// Define structure for the full game data fetched for replay
interface ReplayGameData {
	gameId: string;
	players: { p1: string; p2: string }; // Player names/identifiers
	movesHistory: ReplayMove[];
	winner?: number | null; // Or 'human'/'AI'
	// Add other static game metadata if needed
}

// Helper function to create board state at a specific move number
const getBoardStateAtMove = (
	history: ReplayMove[],
	moveNum: number,
	size: number
): Map<string, 0 | 1 | 2> => {
	const board = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => board.set(cubeToKey(coords), 0));

	for (let i = 0; i < moveNum && i < history.length; i++) {
		const move = history[i];
		board.set(cubeToKey(move.coords), move.player);
	}
	return board;
};

export default function ReplayPage({ params }: { params: { gameId: string } }) {
	const gameId = params.gameId;

	// --- State for Replay ---
	const [replayData, setReplayData] = useState<ReplayGameData | null>(null);
	const [currentMoveNumber, setCurrentMoveNumber] = useState<number>(0);
	const [boardState, setBoardState] = useState<Map<string, 0 | 1 | 2>>(() =>
		initializeBoardState(BOARD_SIZE)
	); // Initial empty board
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// --- Fetch Replay Data ---
	useEffect(() => {
		setIsLoading(true);
		setError(null);
		console.log(`Fetching replay data for game ID: ${gameId}`);
		// TODO: Implement actual data fetching (e.g., using fetch API)
		// fetch(`/api/replays/${gameId}`) // Example API endpoint
		//   .then(res => res.json())
		//   .then(data => {
		//      setReplayData(data);
		//      setCurrentMoveNumber(0); // Start at beginning
		//      setBoardState(getBoardStateAtMove(data.movesHistory, 0, BOARD_SIZE));
		//      setIsLoading(false);
		//   })
		//   .catch(err => {
		//      console.error("Failed to fetch replay data:", err);
		//      setError("Failed to load replay.");
		//      setIsLoading(false);
		//   });

		// --- Placeholder Data ---
		setTimeout(() => {
			// Simulate fetch delay
			const placeholderMoves: ReplayMove[] = [
				{ player: 1, coords: { q: 5, r: 5, s: -10 }, moveNumber: 1 },
				{ player: 2, coords: { q: 4, r: 5, s: -9 }, moveNumber: 2 },
				{ player: 1, coords: { q: 6, r: 4, s: -10 }, moveNumber: 3 },
				{ player: 2, coords: { q: 3, r: 6, s: -9 }, moveNumber: 4 },
				{ player: 1, coords: { q: 7, r: 3, s: -10 }, moveNumber: 5 },
			];
			const placeholderData: ReplayGameData = {
				gameId: gameId,
				players: { p1: "Player 1", p2: "Player 2" },
				movesHistory: placeholderMoves,
				winner: null, // Example: Game not finished
			};
			setReplayData(placeholderData);
			setCurrentMoveNumber(0);
			setBoardState(
				getBoardStateAtMove(placeholderData.movesHistory, 0, BOARD_SIZE)
			);
			setIsLoading(false);
		}, 1000);
		// --- End Placeholder Data ---
	}, [gameId]); // Refetch if gameId changes

	// --- Update board state when move number changes ---
	useEffect(() => {
		if (replayData) {
			setBoardState(
				getBoardStateAtMove(
					replayData.movesHistory,
					currentMoveNumber,
					BOARD_SIZE
				)
			);
		}
	}, [currentMoveNumber, replayData]);

	// --- Playback Timer ---
	useEffect(() => {
		let timerId: NodeJS.Timeout | null = null;
		if (
			isPlaying &&
			replayData &&
			currentMoveNumber < replayData.movesHistory.length
		) {
			timerId = setTimeout(() => {
				setCurrentMoveNumber((prev) => prev + 1);
			}, 1000); // Adjust speed as needed (1 second per move)
		} else if (isPlaying) {
			setIsPlaying(false); // Stop playing if end is reached
		}
		return () => {
			// Cleanup timer on unmount or when isPlaying changes
			if (timerId) clearTimeout(timerId);
		};
	}, [isPlaying, currentMoveNumber, replayData]);

	// --- Control Handlers ---
	const handlePlayPause = useCallback(
		() => setIsPlaying((prev) => !prev),
		[]
	);
	const handleNext = useCallback(() => {
		if (replayData && currentMoveNumber < replayData.movesHistory.length) {
			setIsPlaying(false); // Stop playback if manually stepping
			setCurrentMoveNumber((prev) => prev + 1);
		}
	}, [replayData, currentMoveNumber]);
	const handlePrevious = useCallback(() => {
		if (currentMoveNumber > 0) {
			setIsPlaying(false);
			setCurrentMoveNumber((prev) => prev - 1);
		}
	}, [currentMoveNumber]);
	const handleGoToStart = useCallback(() => {
		setIsPlaying(false);
		setCurrentMoveNumber(0);
	}, []);
	const handleGoToEnd = useCallback(() => {
		if (replayData) {
			setIsPlaying(false);
			setCurrentMoveNumber(replayData.movesHistory.length);
		}
	}, [replayData]);
	const handleSeek = useCallback(
		(moveNumber: number) => {
			if (
				replayData &&
				moveNumber >= 0 &&
				moveNumber <= replayData.movesHistory.length
			) {
				setIsPlaying(false);
				setCurrentMoveNumber(moveNumber);
			}
		},
		[replayData]
	);

	// --- Render Logic ---
	if (isLoading) {
		return (
			<div className="p-6 text-center text-gray-600">
				Loading Replay...
			</div>
		);
	}
	if (error) {
		return <div className="p-6 text-center text-red-600">{error}</div>;
	}
	if (!replayData) {
		return (
			<div className="p-6 text-center text-gray-600">
				Replay data not found.
			</div>
		);
	}

	// Static player colors for replay board
	const playerColors: PlayerColors = {
		p1: "#E53E3E",
		p2: "#3182CE",
		empty: "#F7FAFC",
		background: "#ffffff",
	};

	// Static game info for replay
	const staticGameMetadata = {
		size: BOARD_SIZE,
		moves: replayData.movesHistory.length, // Total moves in game
		// Add players, date, winner etc. from replayData if needed
	};

	// Highlight the piece placed at the current move number (if applicable)
	const highlightedHexes =
		currentMoveNumber > 0 &&
		currentMoveNumber <= replayData.movesHistory.length
			? [replayData.movesHistory[currentMoveNumber - 1].coords]
			: [];

	return (
		// Reuse the two-column layout structure
		<div className="flex h-full p-4 gap-4">
			{/* Left Column: Board */}
			<div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow h-full">
				<HexBoard
					boardState={boardState} // Display board at current replay step
					playerColors={playerColors}
					onHexClick={() => {}} // Disable clicking on replay board
					className="max-w-full max-h-full"
					boardSize={BOARD_SIZE}
					highlightedHexes={highlightedHexes} // Highlight last move shown
				/>
			</div>
			{/* Right Column: Info + Controls */}
			<div className="w-1/3 flex-none flex flex-col gap-4 overflow-hidden h-full">
				{/* Static Game Info */}
				<div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
					<GameInfo
						gameMetadata={staticGameMetadata}
						className="text-gray-600"
					/>
					{/* Add more static info like players, winner */}
					<div className="mt-2 text-sm text-gray-600">
						<p>
							<span className="font-medium text-gray-700">
								Player 1:
							</span>{" "}
							{replayData.players.p1}
						</p>
						<p>
							<span className="font-medium text-gray-700">
								Player 2:
							</span>{" "}
							{replayData.players.p2}
						</p>
						{replayData.winner && (
							<p>
								<span className="font-medium text-gray-700">
									Winner:
								</span>{" "}
								Player {replayData.winner}
							</p>
						)}
					</div>
				</div>
				{/* Replay Controls */}
				{/* Use flex-1 so it takes remaining space */}
				<div className="flex-1 min-h-0 bg-white rounded-lg shadow flex flex-col overflow-y-auto">
					<div className="p-4 flex-grow">
						{" "}
						{/* Padding for potential future content */}
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Replay Controls
						</h3>
						<p className="text-sm text-gray-500">
							Step through the game.
						</p>
					</div>
					{/* Control bar at the bottom */}
					<ReplayControlBar
						currentMove={currentMoveNumber}
						totalMoves={replayData.movesHistory.length}
						isPlaying={isPlaying}
						onPlayPause={handlePlayPause}
						onNext={handleNext}
						onPrevious={handlePrevious}
						onGoToStart={handleGoToStart}
						onGoToEnd={handleGoToEnd}
						onSeek={handleSeek}
					/>
				</div>
			</div>
		</div>
	);
}

// Helper to initialize board state (can be moved to utils)
const initializeBoardState = (size: number): Map<string, 0 | 1 | 2> => {
	const state = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => {
		state.set(cubeToKey(coords), 0);
	});
	return state;
};

```


---


### <a name="srcappappsettingspagetsx"></a>app/(app)/settings/page.tsx


```tsx
"use client";
// Note: No 'use client' needed here if form state is managed within child components
import React from "react";
import UserProfileForm from "@/components/settings/UserProfileForm";
import ThemeSelector from "@/components/settings/ThemeSelector";
import GameOptionToggles from "@/components/settings/GameOptionToggles";

export default function SettingsPage() {
	// TODO: Add handler for form submission
	const handleSaveSettings = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Saving settings... (API call needed)");
		// Gather data from form state (likely managed within child components or lifted up)
		alert("Saving settings... (Not implemented)");
	};

	return (
		// Use padding defined in AppLayout or add here
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-semibold text-gray-900 mb-6">
				Settings
			</h1>

			{/* Form element wraps all settings sections */}
			<form
				className="bg-white p-6 rounded-lg shadow space-y-8"
				onSubmit={handleSaveSettings}
			>
				{/* Profile Section */}
				<section aria-labelledby="profile-heading">
					<h2
						id="profile-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Profile
					</h2>
					<UserProfileForm />
				</section>

				{/* Appearance Section */}
				<section aria-labelledby="appearance-heading">
					<h2
						id="appearance-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Appearance
					</h2>
					<ThemeSelector />
				</section>

				{/* Gameplay Section */}
				<section aria-labelledby="gameplay-heading">
					<h2
						id="gameplay-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Gameplay
					</h2>
					<GameOptionToggles />
				</section>

				{/* Save Button */}
				<div className="pt-4 border-t border-gray-200">
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Save Settings
					</button>
				</div>
			</form>
		</div>
	);
}

```


---


### <a name="srcapplayouttsx"></a>app/layout.tsx


```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Example font
import "./globals.css";

// Optional: Load a font like Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hex AI Game",
  description: "Play Hex against an AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* Apply font class if using one */}
      <body className={`${inter.className} h-full bg-background text-text-primary`}>
        {/* The main container enforcing viewport height and no scroll */}
        {/* Using flex flex-col ensures children can correctly use flex-grow */}
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Optional Navbar could go here */}
          {/* <Navbar /> */}

          {/* Main content area that takes up remaining space */}
          {/* overflow-hidden here might be redundant if page.tsx handles it, but reinforces the constraint */}
          <main className="flex-grow overflow-hidden">
            {children} {/* page.tsx content will be rendered here */}
          </main>

          {/* Optional Footer could go here */}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}

```


---


### <a name="srcapppagetsx"></a>app/page.tsx


```tsx
// Using redirect requires this page to be a Client Component or used in Server Actions
// Let's make it a simple Client Component for redirection
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use useRouter for client-side redirect

export default function RootPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the dashboard page on component mount
		router.replace("/dashboard");
	}, [router]);

	// Optionally render a loading state or minimal content while redirecting
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<p className="text-gray-600">Loading Hex AI...</p>
			{/* Or a spinner component */}
		</div>
	);

	// Alternative using Next.js redirect function (works on server):
	// import { redirect } from 'next/navigation';
	// export default function RootPage() {
	//   redirect('/dashboard');
	// }
}

```


---


### <a name="srccomponentsdashboardgamelisttabletsx"></a>components/dashboard/GameListTable.tsx


```tsx
import React from "react";
import Link from "next/link"; // For linking to game/replay pages

// TODO: Define props (e.g., list of game objects)
interface Game {
	id: string;
	opponent: string;
	status: "Active" | "Completed" | "Waiting";
	outcome?: "Win" | "Loss" | "Draw";
	date: string;
	mode: "HUMAN_AI" | "AI_AI" | "HUMAN_HUMAN"; // Example modes
}

interface GameListTableProps {
	// games?: Game[];
}

const GameListTable: React.FC<GameListTableProps> = (/*{ games = [] }*/) => {
	// Placeholder data
	const games: Game[] = [
		{
			id: "123",
			opponent: "AI (Medium)",
			status: "Active",
			date: "Today",
			mode: "HUMAN_AI",
		},
		{
			id: "456",
			opponent: "AI (Hard)",
			status: "Completed",
			outcome: "Win",
			date: "Yesterday",
			mode: "HUMAN_AI",
		},
		{
			id: "789",
			opponent: "PlayerX",
			status: "Completed",
			outcome: "Loss",
			date: "2 days ago",
			mode: "HUMAN_HUMAN",
		},
	];

	return (
		<div className="bg-white rounded-lg shadow overflow-hidden">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Opponent
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Status
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Outcome
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Date
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
					{games.length === 0 && (
						<tr>
							<td
								colSpan={5}
								className="px-4 py-4 text-center text-gray-500"
							>
								No recent games found.
							</td>
						</tr>
					)}
					{games.map((game) => (
						<tr key={game.id}>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.opponent}
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{/* Add status indicators if desired */}
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
										game.status === "Active"
											? "bg-yellow-100 text-yellow-800"
											: game.status === "Completed"
											? "bg-green-100 text-green-800"
											: "bg-blue-100 text-blue-800"
									}`}
								>
									{game.status}
								</span>
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.outcome ?? "-"}
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.date}
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
								{game.status === "Active" && (
									<Link
										href={`/game/${game.id}`}
										className="text-indigo-600 hover:text-indigo-900"
									>
										Resume
									</Link>
								)}
								{game.status === "Completed" && (
									<Link
										href={`/replay/${game.id}`}
										className="text-indigo-600 hover:text-indigo-900"
									>
										Replay
									</Link>
								)}
								{/* Add other actions like 'View' if needed */}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GameListTable;

```


---


### <a name="srccomponentsdashboardnewgameoptionstsx"></a>components/dashboard/NewGameOptions.tsx


```tsx
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Define game modes explicitly based on backend expectations
type GameMode = "HUMAN_AI" | "AI_AI";

// Define difficulty levels (currently only used for display/selection)
type Difficulty = "easy" | "medium" | "hard";

interface NewGameOptionsProps {}

const NewGameOptions: React.FC<NewGameOptionsProps> = () => {
	const router = useRouter(); // Initialize router
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	// State for AI difficulty selection (visual only for now)
	const [aiDifficulty, setAiDifficulty] = useState<Difficulty>("medium");

	/**
	 * Creates a new game by connecting to the WebSocket endpoint,
	 * sending the create_game action, and handling the response.
	 * @param mode - The game mode ('HUMAN_AI' or 'AI_AI').
	 */
	const createGame = useCallback(
		async (mode: GameMode) => {
			setIsLoading(true); // Show loading state on the button
			setError(null); // Clear previous errors
			console.log(`Attempting to create game with mode: ${mode}`);

			// WebSocket URL for creating a new game (from backend_api_doc.pdf)
			const wsUrl = "ws://localhost:8000/ws/game/new/";
			let ws: WebSocket | null = null; // Declare ws to access it in the finally block

			try {
				// --- WebSocket Connection and Message Handling ---
				ws = new WebSocket(wsUrl);

				// Wrap the message handling in a Promise to await the game_id
				const messagePromise = new Promise<string>(
					(resolve, reject) => {
						if (!ws) {
							reject(new Error("WebSocket instance is null."));
							return;
						}

						ws.onopen = () => {
							console.log(
								"WebSocket connection opened for game creation."
							);
							// Send the create_game action once connected
							const createPayload = {
								action: "create_game",
								mode: mode,
								// Add difficulty or other options here if backend supports them
							};
							ws?.send(JSON.stringify(createPayload));
							console.log(
								"Sent create_game action:",
								createPayload
							);
						};

						ws.onerror = (event) => {
							console.error(
								"WebSocket error during game creation:",
								event
							);
							reject(
								new Error(
									"WebSocket connection failed. Check if the backend server is running."
								)
							);
							ws?.close(); // Ensure closure on error
						};

						ws.onmessage = (event) => {
							try {
								const message = JSON.parse(event.data);
								console.log(
									"Received message during game creation:",
									message
								);

								// Check for the expected 'game_created' response type
								if (
									message.type === "game_created" &&
									message.data?.game_id
								) {
									console.log(
										`Game created successfully! Game ID: ${message.data.game_id}`
									);
									resolve(message.data.game_id); // Resolve the promise with the game ID
								} else if (message.type === "error") {
									console.error(
										"Backend error during game creation:",
										message.data?.message
									);
									reject(
										new Error(
											message.data?.message ||
												"Unknown backend error during creation."
										)
									);
								} else {
									// Handle unexpected message types
									console.warn(
										"Received unexpected message type during game creation:",
										message.type
									);
									// Optionally reject or just ignore
								}
							} catch (e) {
								console.error(
									"Failed to parse message during game creation:",
									e
								);
								reject(
									new Error(
										"Failed to parse response from server."
									)
								);
							} finally {
								// Close the WebSocket connection once we have the game ID or an error
								if (
									ws?.readyState === WebSocket.OPEN ||
									ws?.readyState === WebSocket.CONNECTING
								) {
									console.log(
										"Closing WebSocket after game creation response."
									);
									ws?.close();
								}
							}
						};

						ws.onclose = (event) => {
							console.log(
								`Game creation WebSocket closed. Code: ${event.code}, Clean: ${event.wasClean}`
							);
							// If the promise hasn't been resolved/rejected yet, it means the connection closed prematurely.
							// Note: The 'reject' might have already been called by onerror or onmessage error handling.
							// This is a fallback. A robust implementation might use a flag.
							// reject(new Error("WebSocket closed before game ID was received."));
						};
					}
				);

				// --- Timeout for the Promise ---
				const timeoutPromise = new Promise<string>((_, reject) => {
					const id = setTimeout(() => {
						clearTimeout(id);
						reject(
							new Error(
								"Game creation timed out after 10 seconds."
							)
						);
					}, 5000); // 5-second timeout
				});

				// --- Wait for Game ID or Timeout ---
				// Race the message promise against the timeout
				const gameId = await Promise.race([
					messagePromise,
					timeoutPromise,
				]);

				// --- Navigation ---
				// If successful, navigate to the game page
				if (gameId) {
					console.log(`Navigating to /game/${gameId}`);
					router.push(`/game/${gameId}`); // Use Next.js router for navigation
				}
				// setIsLoading(false) will be handled in the finally block
			} catch (err: any) {
				console.error("Error during game creation process:", err);
				setError(err.message || "An unexpected error occurred.");
				setIsLoading(false); // Stop loading on error
				// Ensure WebSocket is closed on error
				if (ws && ws.readyState !== WebSocket.CLOSED) {
					console.log(
						"Closing WebSocket due to error during creation process."
					);
					ws.close();
				}
			} finally {
				// Ensure loading state is reset *unless* navigation is happening
				// Navigation might unmount the component, so resetting state might not be necessary
				// or could cause a brief flicker. If navigation is successful, let the unmount handle cleanup.
				// We already set isLoading to false in the catch block.
				// If successful, the component might unmount before this finally runs fully.
				console.log("Game creation process finished.");
			}
		},
		[router] // Add router to dependency array
	);

	// Handler for the "Start Game" (Human vs AI) button
	const handleStartHumanVsAi = () => {
		// Pass the selected difficulty if the backend supports it in the future
		createGame("HUMAN_AI");
	};

	// Handler for the "Start AI Match" button
	const handleStartAiVsAi = () => {
		createGame("AI_AI");
	};

	return (
		// Component Structure (Tailwind styled)
		<div className="bg-white p-4 rounded-lg shadow">
			<h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
				Start New Game
			</h3>
			{/* Display error message if any */}
			{error && (
				<p className="text-red-500 text-sm mb-2">Error: {error}</p>
			)}

			<div className="space-y-4">
				{/* Human vs AI Section */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">
						Human vs AI
					</span>
					<div className="flex items-center gap-2">
						{/* Difficulty Selector - currently visual only */}
						<select
							value={aiDifficulty}
							onChange={(e) =>
								setAiDifficulty(e.target.value as Difficulty)
							}
							className="block w-full sm:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-sm"
							disabled={isLoading} // Disable while loading
						>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
						{/* Start Button */}
						<button
							onClick={handleStartHumanVsAi} // Use the specific handler
							disabled={isLoading} // Disable button while loading
							className="px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait"
						>
							{isLoading ? "Starting..." : "Start Game"}
						</button>
					</div>
				</div>

				{/* AI vs AI Section */}
				<div className="flex items-center justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">AI vs AI</span>
					{/* Start Button */}
					<button
						onClick={handleStartAiVsAi} // Use the specific handler
						disabled={isLoading} // Disable during loading
						className="px-4 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait"
					>
						{isLoading ? "Starting..." : "Start AI Match"}
					</button>
				</div>

				{/* Placeholder for Human vs Human if needed later */}
			</div>
		</div>
	);
};

export default NewGameOptions;

```


---


### <a name="srccomponentsdashboarduserstatscardtsx"></a>components/dashboard/UserStatsCard.tsx


```tsx
import React from "react";

// TODO: Define props if data is passed down (e.g., stats object)
interface UserStatsCardProps {
	// Example: stats?: { wins: number; losses: number; rank?: string };
}

const UserStatsCard: React.FC<UserStatsCardProps> = (/*{ stats }*/) => {
	// Placeholder data
	const stats = { wins: 15, losses: 8, rank: "Gold III" };

	return (
		<div className="bg-white p-4 rounded-lg shadow">
			<h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
				Your Stats
			</h3>
			<div className="space-y-1 text-sm text-gray-600">
				<p>
					<span className="font-medium text-gray-700">Wins:</span>{" "}
					{stats.wins}
				</p>
				<p>
					<span className="font-medium text-gray-700">Losses:</span>{" "}
					{stats.losses}
				</p>
				{stats.rank && (
					<p>
						<span className="font-medium text-gray-700">Rank:</span>{" "}
						{stats.rank}
					</p>
				)}
				{/* Add more stats as needed */}
			</div>
		</div>
	);
};

export default UserStatsCard;

```


---


### <a name="srccomponentshexgameinfotsx"></a>components/hex/GameInfo.tsx


```tsx
"use client";
import React from 'react';
import { GameInfoProps } from '../../types/hexProps'; // Import the correct props interface

// Use the GameInfoProps interface
const GameInfo: React.FC<GameInfoProps> = ({ className, gameMetadata }) => {
  // Function to format date/time nicely (optional)
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString(undefined, { // Use locale default format
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  };

  return (
    // Apply passed className, default text color is inherited
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
        Game Information
      </h2>
      <div className="space-y-1 text-sm"> {/* Add spacing between info items */}
        <p>
          <span className="font-medium text-gray-700">Board Size:</span> {gameMetadata.size}x{gameMetadata.size}
        </p>
        <p>
          <span className="font-medium text-gray-700">Moves:</span> {gameMetadata.moves ?? 0}
        </p>
        {/* Conditionally display created date if available */}
        {gameMetadata.created && (
           <p>
             <span className="font-medium text-gray-700">Started:</span> {formatDateTime(gameMetadata.created)}
           </p>
        )}
        {/* Add more metadata display as needed */}
      </div>

      {/* Remove placeholder text if desired */}
      {/* <p className="mt-4 text-xs text-gray-400">(GameInfo Placeholder Content)</p> */}
    </div>
  );
};

export default GameInfo;

```


---


### <a name="srccomponentshexgameplaycontrolstsx"></a>components/hex/GameplayControls.tsx


```tsx
'use client'; // Keep this directive as it uses event handlers

import React from 'react';
import { GameplayControlsProps } from '../../types/hexProps'; // Import the correct props interface

// Use the GameplayControlsProps interface
const GameplayControls: React.FC<GameplayControlsProps> = ({
  className,
  playerTurn,
  winner,
  onNewGameClick,
  onUndoClick, // Added optional undo handler
  onResignClick, // Added optional resign handler
  isInteractionAllowed
}) => {

  // Determine text color for the current player's turn indicator
  const turnColorClass = playerTurn === 1 ? 'text-red-600' : 'text-blue-600'; // Match player colors

  return (
    // Use flex flex-col h-full to make the container take full height and stack vertically
    // Apply passed className, default text color is inherited
    <div className={`flex flex-col h-full ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
        Controls
      </h2>

      {/* Game Status Area */}
      <div className="mb-4 flex-shrink-0"> {/* Prevent status area from shrinking excessively */}
        {winner !== null ? (
          // Display winner message
          <p className={`text-lg font-bold ${winner === 1 ? 'text-red-600' : 'text-blue-600'}`}>
            Player {winner} Wins! 🎉
          </p>
        ) : (
          // Display current turn
          <p className="text-md">
            Turn: <span className={`font-semibold ${turnColorClass}`}>
              Player {playerTurn}
            </span>
          </p>
        )}
      </div>

      {/* Spacer to push buttons to the bottom */}
      <div className="flex-grow"></div>

      {/* Action Buttons Area */}
      {/* Use flex-shrink-0 to prevent buttons shrinking */}
      <div className="flex flex-col gap-2 flex-shrink-0">
         <button
           onClick={onNewGameClick}
           // Disable button if interaction is not allowed
           disabled={!isInteractionAllowed}
           className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                       bg-blue-600 text-white
                       hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed`}
         >
           New Game
         </button>

         {/* Optional Undo Button */}
         {onUndoClick && (
            <button
              onClick={onUndoClick}
              // Disable if interaction not allowed or game is over
              disabled={!isInteractionAllowed || winner !== null}
              className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                          bg-gray-500 text-white
                          hover:bg-gray-600
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Undo (Placeholder)
            </button>
         )}

         {/* Optional Resign Button */}
         {onResignClick && (
            <button
              onClick={onResignClick}
              // Disable if interaction not allowed or game is over
              disabled={!isInteractionAllowed || winner !== null}
              className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                          bg-red-600 text-white
                          hover:bg-red-700
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Resign (Placeholder)
            </button>
         )}
      </div>
       {/* Remove placeholder text if desired */}
       {/* <p className="mt-4 text-xs text-gray-400 text-center">(GameplayControls Placeholder)</p> */}
    </div>
  );
};

export default GameplayControls;


```


---


### <a name="srccomponentshexhexboardtsx"></a>components/hex/HexBoard.tsx


```tsx
"use client";

import React, { useMemo, useRef, useCallback } from "react";
import { HEX_SIZE } from "../../lib/constants";
import {
	cubeToPixelPointy,
	getHexagonVertices,
	formatVerticesForSVG,
	computeGridCoordinates,
	pixelToHex, // Import for later use
	cubeRound, // Import for later use
	cubeToKey,
} from "@/lib/coordinates";
import {
	HexBoardProps,
	CubeCoordinates,
	PlayerColors,
} from "../..//types/hexProps";

// --- calculateViewBoxPrecise function remains the same ---
const calculateViewBoxPrecise = (
	gridCoords: CubeCoordinates[],
	hexSize: number
): string => {
	if (gridCoords.length === 0) return "0 0 100 100";
	let minX = Infinity,
		minY = Infinity,
		maxX = -Infinity,
		maxY = -Infinity;
	gridCoords.forEach((coords) => {
		const center = cubeToPixelPointy(coords, hexSize);
		const vertices = getHexagonVertices(center.x, center.y, hexSize);
		vertices.forEach((vertex) => {
			minX = Math.min(minX, vertex.x);
			minY = Math.min(minY, vertex.y);
			maxX = Math.max(maxX, vertex.x);
			maxY = Math.max(maxY, vertex.y);
		});
	});
	const padding = hexSize * 0.5;
	minX -= padding;
	minY -= padding;
	maxX += padding;
	maxY += padding;
	const width = maxX - minX;
	const height = maxY - minY;
	return `${minX.toFixed(3)} ${minY.toFixed(3)} ${width.toFixed(
		3
	)} ${height.toFixed(3)}`;
};

// --- getFillColor function remains the same ---
const getFillColor = (
	state: 0 | 1 | 2 | undefined,
	playerColors: PlayerColors
): string => {
	switch (state) {
		case 1:
			return playerColors.p1;
		case 2:
			return playerColors.p2;
		case 0:
		default:
			return playerColors.empty;
	}
};

// --- generateBorderPaths function remains the same ---
const generateBorderPaths = (
	boardSize: number,
	hexSize: number
): { p1Top: string; p1Bottom: string; p2Left: string; p2Right: string } => {
	const pathData = { p1Top: "", p1Bottom: "", p2Left: "", p2Right: "" };
	const N = boardSize;

	// Player 1 Borders (Top: r=0, Bottom: r=N-1) - Correct
	let topPoints: { x: number; y: number }[] = [];
	let bottomPoints: { x: number; y: number }[] = [];
	for (let q = 0; q < N; q++) {
		// Top border (r=0)
		const topCoords: CubeCoordinates = { q, r: 0, s: -q };
		const topCenter = cubeToPixelPointy(topCoords, hexSize);
		const topVertices = getHexagonVertices(
			topCenter.x,
			topCenter.y,
			hexSize
		);
		// Vertices 0 (top-right) and 5 (top) trace the top edge
		if (q === 0) {
			// For the first hex, we need to include the top-left vertex
			topPoints.push(topVertices[4]); // Corrected from 1
		}
		topPoints.push(topVertices[5]);
		topPoints.push(topVertices[0]);

		// Bottom border (r=N-1)
		const bottomCoords: CubeCoordinates = { q, r: N - 1, s: -q - (N - 1) };
		const bottomCenter = cubeToPixelPointy(bottomCoords, hexSize);
		const bottomVertices = getHexagonVertices(
			bottomCenter.x,
			bottomCenter.y,
			hexSize
		);
		// Vertices 3 (bottom left) and 2 (bottom) trace the bottom edge
		bottomPoints.push(bottomVertices[3]);
		bottomPoints.push(bottomVertices[2]);
		if (q === N - 1) {
			// For the last hex, we need to include the bottom-right vertex
			bottomPoints.push(bottomVertices[1]); // Corrected from 0
		}
	}
	pathData.p1Top = `M ${topPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;
	pathData.p1Bottom = `M ${bottomPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;

	// Player 2 Borders (Left: q=0, Right: q=N-1) - Corrected Vertices
	let leftPoints: { x: number; y: number }[] = [];
	let rightPoints: { x: number; y: number }[] = [];
	for (let r = 0; r < N; r++) {
		// Left border (q=0)
		const leftCoords: CubeCoordinates = { q: 0, r, s: -r };
		const leftCenter = cubeToPixelPointy(leftCoords, hexSize);
		const leftVertices = getHexagonVertices(
			leftCenter.x,
			leftCenter.y,
			hexSize
		);
		// Vertices 1 (left) and 2 (bottom-left) trace the left edge
		leftPoints.push(leftVertices[4]); // Corrected from 0
		leftPoints.push(leftVertices[3]); // Corrected from 1

		// Right border (q=N-1)
		const rightCoords: CubeCoordinates = { q: N - 1, r, s: -(N - 1) - r };
		const rightCenter = cubeToPixelPointy(rightCoords, hexSize);
		const rightVertices = getHexagonVertices(
			rightCenter.x,
			rightCenter.y,
			hexSize
		);
		// Vertices 4 (right) and 3 (bottom-right) trace the right edge
		rightPoints.push(rightVertices[0]); // Corrected from 5
		rightPoints.push(rightVertices[1]); // Corrected from 4
	}
	pathData.p2Left = `M ${leftPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;
	pathData.p2Right = `M ${rightPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;

	return pathData;
};

const HexBoard: React.FC<HexBoardProps> = ({
	boardState,
	playerColors,
	onHexClick,
	className,
	boardSize,
	highlightedHexes = [],
}) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const gridCoords = useMemo(
		() => computeGridCoordinates(boardSize),
		[boardSize]
	);
	const viewBox = useMemo(
		() => calculateViewBoxPrecise(gridCoords, HEX_SIZE),
		[gridCoords]
	);
	const highlightedKeys = useMemo(
		() => new Set(highlightedHexes.map(cubeToKey)),
		[highlightedHexes]
	);
	const borderPaths = useMemo(
		() => generateBorderPaths(boardSize, HEX_SIZE),
		[boardSize]
	);

	// Store valid grid coordinate keys in a memoized Set for quick checking
	const validKeys = useMemo(
		() => new Set(gridCoords.map(cubeToKey)),
		[gridCoords]
	);

	// --- Updated handleSvgClick with Accurate Pixel-to-Hex Logic ---
	const handleSvgClick = useCallback(
		(event: React.MouseEvent<SVGSVGElement>) => {
			console.log("--- handleSvgClick (Custom Coords) ---");
			if (!svgRef.current) {
				console.error("SVG ref not available.");
				return;
			}
			const svgElement = svgRef.current;
			const svgRect = svgElement.getBoundingClientRect();
			const vb = svgElement.viewBox.baseVal;

			if (!vb || svgRect.width === 0 || svgRect.height === 0) {
				console.error("SVG dimensions or viewBox not available.");
				return;
			}
			console.log(
				`SVG Rect: { left: ${svgRect.left.toFixed(
					2
				)}, top: ${svgRect.top.toFixed(
					2
				)}, width: ${svgRect.width.toFixed(
					2
				)}, height: ${svgRect.height.toFixed(2)} }`
			);
			console.log(
				`ViewBox: { x: ${vb.x.toFixed(2)}, y: ${vb.y.toFixed(
					2
				)}, width: ${vb.width.toFixed(2)}, height: ${vb.height.toFixed(
					2
				)} }`
			);
			const clickXRelative = event.clientX - svgRect.left;
			const clickYRelative = event.clientY - svgRect.top;
			console.log(
				`Click Relative: { x: ${clickXRelative.toFixed(
					2
				)}, y: ${clickYRelative.toFixed(
					2
				)} } (Screen click: { clientX: ${event.clientX}, clientY: ${
					event.clientY
				} })`
			);
			const svgInternalX =
				vb.x + (clickXRelative * vb.width / svgRect.width);
			const svgInternalY =
				vb.y + (clickYRelative * vb.height / svgRect.height);
			console.log(
				`SVG Internal Coords: { x: ${svgInternalX.toFixed(
					3
				)}, y: ${svgInternalY.toFixed(3)} }`
			);
			const fractionalHex = pixelToHex(
				svgInternalX,
				svgInternalY,
				HEX_SIZE
			); // Use custom function
			console.log(
				`Fractional Hex: { q: ${fractionalHex.q.toFixed(
					3
				)}, r: ${fractionalHex.r.toFixed(
					3
				)}, s: ${fractionalHex.s.toFixed(3)} }`
			);
			const clickedCubeCoords = cubeRound(fractionalHex); // Use custom function
			console.log(
				`Rounded Cube Coords: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
			);
			const clickedKey = cubeToKey(clickedCubeCoords);
			if (validKeys.has(clickedKey)) {
				console.log(
					`VALID Click -> Calling onHexClick with: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
				);
				onHexClick(clickedCubeCoords);
			} else {
				console.log(
					`INVALID Click - Outside valid hex grid area. Coords: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
				);
			}
			console.log("--- handleSvgClick End ---");
		},
		[onHexClick, validKeys]
	);

	return (
		<svg
			ref={svgRef} // Assign the ref
			viewBox={viewBox}
			preserveAspectRatio="xMidYMid meet"
			className={`w-full h-auto ${className || ""}`}
			style={{ backgroundColor: playerColors.background }}
			onClick={handleSvgClick} // Attach click handler
		>
			<g>
				{" "}
				{/* Group for Hexagons */}
				{gridCoords.map((coords) => {
					const center = cubeToPixelPointy(coords, HEX_SIZE);
					const vertices = getHexagonVertices(
						center.x,
						center.y,
						HEX_SIZE
					);
					const points = formatVerticesForSVG(vertices);
					const key = cubeToKey(coords);
					const hexState = boardState.get(key);
					const fillColor = getFillColor(hexState, playerColors);
					const isHighlighted = highlightedKeys.has(key);
					const strokeColor = isHighlighted ? "black" : "#CBD5E0"; // gray-300
					const strokeWidth = isHighlighted
						? Math.max(1.5, 2.5 * (30 / HEX_SIZE))
						: 1;

					return (
						<polygon
							key={key}
							// Remove data attributes, no longer needed for click handling
							points={points}
							fill={fillColor}
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							// Add pointer-events: none if clicks should only register on SVG background
							// style={{ pointerEvents: 'none' }}
							className="cursor-pointer transition-opacity duration-150 hover:opacity-80"
						/>
					);
				})}
			</g>

			{/* Render Border Paths */}
			<g
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
				style={{ pointerEvents: "none" }}
			>
				{" "}
				{/* Make borders non-interactive */}
				<path
					d={borderPaths.p1Top}
					stroke={playerColors.p1}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p1Bottom}
					stroke={playerColors.p1}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p2Left}
					stroke={playerColors.p2}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p2Right}
					stroke={playerColors.p2}
					strokeWidth={HEX_SIZE * 0.15}
				/>
			</g>
		</svg>
	);
};

export default HexBoard;

```


---


### <a name="srccomponentsreplayreplaycontrolbartsx"></a>components/replay/ReplayControlBar.tsx


```tsx
"use client"; // Needs client component for state and interaction

import React from "react";
// Example icons
import {
	PlayIcon,
	PauseIcon,
	ForwardIcon,
	BackwardIcon,
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon,
	StopIcon,
	PlayPauseIcon,
} from "@heroicons/react/20/solid";

interface ReplayControlBarProps {
	rel;
	currentMove: number;
	totalMoves: number;
	isPlaying: boolean;
	onPlayPause: () => void;
	onNext: () => void;
	onPrevious: () => void;
	onGoToStart: () => void;
	onGoToEnd: () => void;
	onSeek?: (moveNumber: number) => void; // Optional seek functionality
}

const ReplayControlBar: React.FC<ReplayControlBarProps> = ({
	currentMove,
	totalMoves,
	isPlaying,
	onPlayPause,
	onNext,
	onPrevious,
	onGoToStart,
	onGoToEnd,
	onSeek,
}) => {
	const canGoBack = currentMove > 0;
	const canGoForward = currentMove < totalMoves;

	const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onSeek) {
			const value = parseInt(event.target.value, 10);
			onSeek(value);
		}
	};

	return (
		<div className="bg-gray-50 p-3 rounded-b-lg border-t border-gray-200">
			{" "}
			{/* Example styling */}
			{/* Optional Seek Slider */}
			{onSeek && totalMoves > 0 && (
				<div className="mb-2 px-2">
					<label htmlFor="replay-seek" className="sr-only">
						Seek Replay
					</label>
					<input
						type="range"
						id="replay-seek"
						min="0"
						max={totalMoves}
						value={currentMove}
						onChange={handleSeek}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
					/>
					<div className="flex justify-between text-xs text-gray-500 mt-1">
						<span>Move: {currentMove}</span>
						<span>Total: {totalMoves}</span>
					</div>
				</div>
			)}
			{/* Control Buttons */}
			<div className="flex items-center justify-center space-x-3">
				{/* Go to Start */}
				<button
					onClick={onGoToStart}
					disabled={!canGoBack}
					title="Go to Start"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<BackwardIcon className="h-5 w-5" />
				</button>
				{/* Previous */}
				<button
					onClick={onPrevious}
					disabled={!canGoBack}
					title="Previous Move"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ArrowUturnLeftIcon className="h-5 w-5" />
				</button>
				{/* Play/Pause */}
				<button
					onClick={onPlayPause}
					title={isPlaying ? "Pause" : "Play"}
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					{isPlaying ? (
						<PauseIcon className="h-6 w-6" />
					) : (
						<PlayIcon className="h-6 w-6" />
					)}
				</button>
				{/* Next */}
				<button
					onClick={onNext}
					disabled={!canGoForward}
					title="Next Move"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ArrowUturnRightIcon className="h-5 w-5" />
				</button>
				{/* Go to End */}
				<button
					onClick={onGoToEnd}
					disabled={!canGoForward}
					title="Go to End"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ForwardIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

export default ReplayControlBar;

```


---


### <a name="srccomponentssettingsgameoptiontogglestsx"></a>components/settings/GameOptionToggles.tsx


```tsx
"use client"; // Needs client component for state

import React, { useState } from "react";

interface GameOptionTogglesProps {
	// Props for initial settings
}

const GameOptionToggles: React.FC<GameOptionTogglesProps> = () => {
	// Example state
	const [showHints, setShowHints] = useState(true);
	const [defaultDifficulty, setDefaultDifficulty] = useState("medium");

	return (
		<fieldset className="space-y-4">
			<legend className="text-sm font-medium text-gray-700 sr-only">
				Gameplay Options
			</legend>{" "}
			{/* Screen reader only legend */}
			{/* Example Toggle */}
			<div className="relative flex items-start">
				<div className="flex h-5 items-center">
					<input
						id="show-hints"
						aria-describedby="show-hints-description"
						name="show-hints"
						type="checkbox"
						checked={showHints}
						onChange={(e) => setShowHints(e.target.checked)}
						className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
				</div>
				<div className="ml-3 text-sm">
					<label
						htmlFor="show-hints"
						className="font-medium text-gray-700"
					>
						Show Gameplay Hints
					</label>
					<p id="show-hints-description" className="text-gray-500">
						Display helpful hints during your turn (vs AI).
					</p>
				</div>
			</div>
			{/* Example Radio Group */}
			<div>
				<label className="text-sm font-medium text-gray-700">
					Default AI Difficulty
				</label>
				<div className="mt-2 space-y-2">
					{(["easy", "medium", "hard"] as const).map((difficulty) => (
						<div className="flex items-center" key={difficulty}>
							<input
								id={`difficulty-${difficulty}`}
								name="difficulty-option"
								type="radio"
								value={difficulty}
								checked={defaultDifficulty === difficulty}
								onChange={() =>
									setDefaultDifficulty(difficulty)
								}
								className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label
								htmlFor={`difficulty-${difficulty}`}
								className="ml-2 block text-sm text-gray-900 capitalize"
							>
								{difficulty}
							</label>
						</div>
					))}
				</div>
			</div>
		</fieldset>
	);
};

export default GameOptionToggles;

```


---


### <a name="srccomponentssettingsthemeselectortsx"></a>components/settings/ThemeSelector.tsx


```tsx
    'use client'; // Needs client component for state/interaction

    import React, { useState, useEffect } from 'react';

    interface ThemeSelectorProps {}

    const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
        // Example state - actual theme switching needs more logic (e.g., context, localStorage)
        const [theme, setTheme] = useState<'light' | 'dark'>('light');

        // TODO: Implement actual theme switching logic
        // This might involve updating a class on the <html> element
        // and saving the preference (e.g., in localStorage)
        useEffect(() => {
            console.log("Theme selected:", theme);
            // Example: document.documentElement.classList.toggle('dark', theme === 'dark');
        }, [theme]);


        return (
            <fieldset>
                 <legend className="text-sm font-medium text-gray-700 mb-1">Select Theme</legend>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <input
                            id="light-theme"
                            name="theme-option"
                            type="radio"
                            value="light"
                            checked={theme === 'light'}
                            onChange={() => setTheme('light')}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="light-theme" className="ml-2 block text-sm text-gray-900">
                            Light
                        </label>
                    </div>
                     <div className="flex items-center">
                        <input
                            id="dark-theme"
                            name="theme-option"
                            type="radio"
                            value="dark"
                            checked={theme === 'dark'}
                            onChange={() => setTheme('dark')}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="dark-theme" className="ml-2 block text-sm text-gray-900">
                            Dark
                        </label>
                    </div>
                 </div>
            </fieldset>
        );
    };

    export default ThemeSelector;
    
```


---


### <a name="srccomponentssettingsuserprofileformtsx"></a>components/settings/UserProfileForm.tsx


```tsx
"use client"; // Forms typically need client components for state

import React, { useState } from "react";

interface UserProfileFormProps {
	// Props for initial data, e.g., initialUsername: string;
}

const UserProfileForm: React.FC<UserProfileFormProps> = () => {
	// Example state for form fields
	const [username, setUsername] = useState("CurrentUser"); // Replace with actual data later
	const [email, setEmail] = useState("user@example.com"); // Replace with actual data later

	return (
		<div className="space-y-4">
			<div>
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email (Read-only example)
				</label>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					readOnly // Example: Email might not be editable
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
				/>
			</div>
			{/* Add Avatar upload/display later */}
		</div>
	);
};

export default UserProfileForm;

```


---


### <a name="srccomponentsuisidebarnavtsx"></a>components/ui/SideBarNav.tsx


```tsx
'use client'; // Needs to be a client component to use usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // Import React

// Example icons, you might need different ones
import {
  HomeIcon, // For Dashboard
  // PuzzlePieceIcon, // For Game - REMOVED
  PlayCircleIcon, // For Replay (If added later)
  Cog6ToothIcon, // For Settings
  // QuestionMarkCircleIcon // Placeholder for other links
} from '@heroicons/react/24/outline';


// Define navigation items
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  // { name: 'Game', href: '/game', icon: PuzzlePieceIcon }, // <-- REMOVED THIS LINE
  // Add Replay link later if needed, maybe points to a list first
  // { name: 'Replays', href: '/replays', icon: PlayCircleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

// Helper function to apply conditional classes
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4 flex flex-col">
      {/* Logo/Brand Area */}
      <div className="mb-8 flex items-center justify-center h-16">
        {/* You can replace this with an actual logo component or image */}
        <span className="text-2xl font-bold text-white">Hex AI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              // Basic active check: true if pathname starts with item.href
              // More specific checks might be needed (e.g., exact match for dashboard)
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out'
            )}
            aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                pathname.startsWith(item.href) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                'mr-3 flex-shrink-0 h-5 w-5' // Adjusted icon size slightly
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Optional: User Profile/Logout section at bottom */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        {/* Placeholder for user info/logout */}
        <p className="text-xs text-gray-400 text-center">User Actions Area</p>
      </div>
    </aside>
  );
}


```


---


### <a name="srchooksusegamewebsocketts"></a>hooks/useGameWebSocket.ts


```ts
import { useState, useCallback, useRef, useEffect } from 'react';

// Enum for WebSocket connection states
export enum WebSocketState {
  CONNECTING = 'CONNECTING',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
  ERROR = 'ERROR',
}

// Interface for the hook's return value
interface UseGameWebSocketReturn {
  connectionState: WebSocketState;
  sendMessage: (payload: object) => void;
  connect: (url: string) => void;
  disconnect: () => void;
  lastMessage: any | null;
  error: Event | Error | null; // Allow Error type for creation failures
}

/**
 * Custom hook to manage a WebSocket connection.
 * @param onMessageCallback Optional callback function to handle incoming messages.
 */
export function useGameWebSocket(onMessageCallback?: (message: any) => void): UseGameWebSocketReturn {
  const [connectionState, setConnectionState] = useState<WebSocketState>(WebSocketState.CLOSED);
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const [error, setError] = useState<Event | Error | null>(null); // Allow Error type
  const ws = useRef<WebSocket | null>(null);

  // Function to connect to a WebSocket URL
  const connect = useCallback((url: string) => {
    // Prevent multiple connections if already open or connecting
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
      console.log(`WebSocket already ${ws.current.readyState === WebSocket.OPEN ? 'open' : 'connecting'}.`);
      return;
    }

    // Clean up previous connection if any (ensures disconnect logic runs)
    if (ws.current) {
       // Set state to CLOSING before explicitly closing
       setConnectionState(WebSocketState.CLOSING);
       ws.current.close();
       ws.current = null; // Clear ref immediately after calling close
       console.log("Cleaned up previous WebSocket connection before reconnecting.");
    }


    console.log(`Connecting to ${url}...`);
    setConnectionState(WebSocketState.CONNECTING);
    setError(null);
    setLastMessage(null);

    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connection opened.');
        setConnectionState(WebSocketState.OPEN);
        setError(null);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('WebSocket message received:', message);
          setLastMessage(message);
          if (onMessageCallback) {
            onMessageCallback(message);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e, 'Raw data:', event.data);
        }
      };

      ws.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        // Check if connection is already closing/closed to avoid overwriting state
        if (connectionState !== WebSocketState.CLOSING && connectionState !== WebSocketState.CLOSED) {
             setConnectionState(WebSocketState.ERROR);
             setError(event);
        }
      };

      ws.current.onclose = (event) => {
        console.log(`WebSocket connection closed: Code=${event.code}, Reason=${event.reason}`);
        // Only update state if it wasn't an intentional close initiated by disconnect() or a reconnect attempt
         if (connectionState !== WebSocketState.CLOSING) {
             setConnectionState(WebSocketState.CLOSED);
             setError(null); // Clear error on close unless it was an error state already
         }
        // Check if ws.current still points to the closing socket before nulling
        // This check might be less critical now due to immediate nulling in disconnect/reconnect
        if (ws.current && ws.current.url === url) {
             ws.current = null;
        }
      };

    } catch (err) {
        console.error("Failed to create WebSocket:", err);
        setConnectionState(WebSocketState.ERROR);
        // Store the actual error object
        setError(err instanceof Error ? err : new Error('WebSocket creation failed'));
        ws.current = null;
    }
    // ** THE FIX IS HERE **
    // Removed `connectionState` from the dependency array.
    // `connect` should only be recreated if `onMessageCallback` changes.
  }, [onMessageCallback]); // <--- FIXED DEPENDENCY ARRAY

  // Function to disconnect the WebSocket
  const disconnect = useCallback(() => {
    if (ws.current) {
      console.log('Closing WebSocket connection intentionally...');
      setConnectionState(WebSocketState.CLOSING); // Set state *before* closing
      ws.current.close();
      ws.current = null; // Clear ref immediately
    }
  }, []); // No dependencies needed

  // Function to send a JSON message
  const sendMessage = useCallback((payload: object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const messageString = JSON.stringify(payload);
        console.log('Sending WebSocket message:', messageString);
        ws.current.send(messageString);
      } catch (e) {
        console.error('Failed to stringify or send WebSocket message:', e);
      }
    } else {
      console.warn(`Cannot send message: WebSocket is not open (State: ${ws.current?.readyState})`);
    }
  }, []); // No dependencies needed

   // Effect to disconnect on component unmount
   useEffect(() => {
    // Store the current WebSocket ref in a variable accessible by the cleanup function
    const currentWs = ws.current;
    return () => {
      // Use the captured ref in the cleanup
      if (currentWs) {
        console.log("Disconnecting WebSocket on component unmount");
        // No need to set state here as the component is unmounting
        currentWs.close();
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount


  return { connectionState, sendMessage, connect, disconnect, lastMessage, error };
}

```


---


### <a name="srclibconstantsts"></a>lib/constants.ts


```ts
/**
 * Defines the size (radius) of the hexagons in SVG coordinate units.
 * This value is fundamental for coordinate conversions and vertex calculations.
 */
export const HEX_SIZE: number = 30; // Example size, adjust as needed for visual appearance

```


---


### <a name="srclibcoordinatests"></a>lib/coordinates.ts


```ts
import { CubeCoordinates } from '@/types/hexProps';
import { HEX_SIZE } from './constants'; // Import hex size

/**
 * Converts Cube coordinates {q, r, s} to pixel coordinates {x, y} for pointy-top hexagons.
 * Assumes the origin (0,0) of the SVG coordinate system corresponds to the center
 * of the hexagon at Cube coordinates (0, 0, 0). Adjustments might be needed based on
 * how the parallelogram grid is centered.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#hex-to-pixel
 * @param cube - The Cube coordinates {q, r, s}.
 * @param size - The size (radius) of the hexagon.
 * @returns The pixel coordinates {x, y}.
 */
export function cubeToPixelPointy(cube: CubeCoordinates, size: number): { x: number; y: number } {
  // Use q and r from Cube coordinates (s is redundant: s = -q -r)
  const q = cube.q;
  const r = cube.r;
  // Apply the pointy-top axial_to_pixel formula
  const x = size * Math.sqrt(3) * (q + r / 2);
  const y = size * (3 / 2) * r;
  return { x, y };
}

/**
 * Calculates the six vertex coordinates for a pointy-top hexagon relative to its center.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#basics
 * @param centerX - The x-coordinate of the hexagon's center.
 * @param centerY - The y-coordinate of the hexagon's center.
 * @param size - The size (radius) of the hexagon.
 * @returns An array of six {x, y} vertex coordinates.
 */
export function getHexagonVertices(centerX: number, centerY: number, size: number): { x: number; y: number }[] {
  const vertices: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    // Angle calculation for pointy-top vertices
    // Starts at -30 degrees (pointing upwards) and increments by 60 degrees.
    const angleRad = Math.PI / 180 * (60 * i - 30);
    const x = centerX + size * Math.cos(angleRad);
    const y = centerY + size * Math.sin(angleRad);
    vertices.push({ x, y });
  }
  return vertices;
}

/**
 * Formats an array of vertex coordinates into a string suitable for an SVG polygon's 'points' attribute.
 * @param vertices - An array of {x, y} vertex coordinates.
 * @returns A string like "x1,y1 x2,y2 ... x6,y6".
 */
export function formatVerticesForSVG(vertices: { x: number; y: number }[]): string {
  return vertices.map(v => `${v.x.toFixed(3)},${v.y.toFixed(3)}`).join(' '); // Use toFixed for cleaner output
}

/**
 * Converts pixel coordinates (within the SVG's internal coordinate system)
 * back to fractional Cube coordinates {q, r, s}.
 * This is the inverse of cubeToPixelPointy.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
 * @param pixelX - The x-coordinate within the SVG's internal system.
 * @param pixelY - The y-coordinate within the SVG's internal system.
 * @param size - The size (radius) of the hexagons used for rendering.
 * @returns Fractional Cube coordinates {q, r, s}.
 */
export function pixelToHex(pixelX: number, pixelY: number, size: number): CubeCoordinates {
  // Apply the inverse formula for pointy-top hexagons
  const q_frac = (Math.sqrt(3) / 3 * pixelX - 1 / 3 * pixelY) / size;
  const r_frac = (2 / 3 * pixelY) / size;
  const s_frac = -q_frac - r_frac; // Derive s from q and r
  return { q: q_frac, r: r_frac, s: s_frac };
}

/**
 * Rounds fractional Cube coordinates to the nearest integer Cube coordinates,
 * ensuring the constraint q + r + s = 0 is maintained.
 * Based on the rounding algorithm from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#rounding
 * @param fracCube - The fractional Cube coordinates {q, r, s}.
 * @returns The nearest integer Cube coordinates {q, r, s}.
 */
export function cubeRound(fracCube: CubeCoordinates): CubeCoordinates {
  let q = Math.round(fracCube.q);
  let r = Math.round(fracCube.r);
  let s = Math.round(fracCube.s);

  const q_diff = Math.abs(q - fracCube.q);
  const r_diff = Math.abs(r - fracCube.r);
  const s_diff = Math.abs(s - fracCube.s);

  // Reset the component with the largest rounding difference to maintain the constraint
  if (q_diff > r_diff && q_diff > s_diff) {
    q = -r - s;
  } else if (r_diff > s_diff) {
    r = -q - s;
  } else {
    s = -q - r;
  }

  return { q, r, s };
}

/**
 * Generates all valid CubeCoordinates for a standard NxN Hex game board,
 * which forms a parallelogram (rhombus) shape.
 * Uses Axial coordinates 0 <= q < N and 0 <= r < N internally.
 * @param boardSize - The size N of the board (e.g., 11 for 11x11).
 * @returns An array of CubeCoordinates representing all hexes on the board.
 */
export function computeGridCoordinates(boardSize: number): CubeCoordinates[] {
  const coordinates: CubeCoordinates[] = [];
  // Iterate q from 0 to N-1
  for (let q = 0; q < boardSize; q++) {
    // Iterate r from 0 to N-1
    for (let r = 0; r < boardSize; r++) {
      // Calculate s based on q and r to satisfy the Cube constraint q + r + s = 0
      const s = -q - r;
      coordinates.push({ q, r, s });
    }
  }
  return coordinates;
}


/**
 * Helper function to create a string key from CubeCoordinates, useful for Maps.
 * @param coords - The CubeCoordinates object.
 * @returns A string representation like "q,r,s".
 */
export function cubeToKey(coords: CubeCoordinates): string {
  return `${coords.q},${coords.r},${coords.s}`;
}

/**
 * Helper function to convert a string key back to CubeCoordinates.
 * @param key - The string representation like "q,r,s".
 * @returns A CubeCoordinates object. Returns null if key is invalid.
 */
export function keyToCube(key: string): CubeCoordinates | null {
    const parts = key.split(',');
    if (parts.length !== 3) return null;
    const q = parseInt(parts[0], 10);
    const r = parseInt(parts[1], 10);
    const s = parseInt(parts[2], 10);
    if (isNaN(q) || isNaN(r) || isNaN(s) || q + r + s !== 0) {
        return null; // Invalid key or doesn't satisfy constraint
    }
    return { q, r, s };
}

// --- Backend XY <-> Frontend Cube Conversion ---
// ** CRITICAL: Verify & Update based on Backend **

/**
 * Converts Frontend CubeCoordinates (q, r, s) to Backend XY coordinates (x, y).
 * **MUST** be updated to match the coordinate system used by the backend API.
 * The current implementation assumes the backend uses Axial coordinates (x=q, y=r).
 * Check backend code (e.g., consumers.py) to confirm how 'x' and 'y' are interpreted.
 *
 * @param coords Frontend CubeCoordinates.
 * @param boardSize The size of the board (e.g., 11).
 * @returns Object { x: number, y: number } or null if invalid/unconvertible.
 */
export function cubeToXY(coords: CubeCoordinates, boardSize: number = 11): { x: number; y: number } | null {
    // --- Active Implementation: Assuming Backend uses Axial x=q, y=r ---
    // VERIFY THIS ASSUMPTION WITH YOUR BACKEND CODE.
    const x_axial = coords.r;
    const y_axial = coords.q;

    // Validate if the resulting x, y are within the expected 0 to N-1 range.
    if (x_axial >= 0 && x_axial < boardSize && y_axial >= 0 && y_axial < boardSize) {
        return { x: x_axial, y: y_axial };
    }

    // --- Add other implementations (e.g., for Offset) below if needed, ---
    // --- but only activate the one that matches the backend. ---

    console.warn(`Cannot convert Cube coordinates (${coords.q}, ${coords.r}, ${coords.s}) to backend XY using the current implementation (Axial assumed). Verify backend coordinate system.`);
    return null; // Conversion failed or coords out of range for the chosen system
}

/**
 * Converts Backend XY coordinates (x, y) received from the API to Frontend CubeCoordinates (q, r, s).
 * **MUST** be updated to match the coordinate system used by the backend API.
 * This **MUST** be the exact inverse of the chosen `cubeToXY` implementation.
 * The current implementation assumes the backend uses Axial coordinates (x=q, y=r).
 *
 * @param x Backend x coordinate (0-10).
 * @param y Backend y coordinate (0-10).
 * @returns CubeCoordinates object or null if input is invalid.
 */
export function xyToCube(x: number, y: number): CubeCoordinates | null {
     // Basic validation for backend coordinates
     if (x === undefined || y === undefined || x < 0 || y < 0) {
         console.warn(`Invalid backend XY coordinates received: x=${x}, y=${y}`);
         return null;
     }

    // --- Active Implementation: Assuming Backend uses Axial x=q, y=r ---
    // VERIFY THIS ASSUMPTION WITH YOUR BACKEND CODE.
    const q_axial = y;
    const r_axial = x;
    const s_axial = -q_axial - r_axial; // Calculate s using the constraint q+r+s=0
    return { q: q_axial, r: r_axial, s: s_axial };

    // --- Add other implementations (e.g., for Offset) below if needed, ---
    // --- but only activate the one that matches the backend. ---

    // console.warn(`Cannot convert backend XY coordinates (${x}, ${y}) to Cube using the current implementation (Axial assumed). Verify backend coordinate system.`);
    // return null; // If no valid conversion matches
}

```


---


### <a name="srcstoregamestorets"></a>store/gameStore.ts


```ts
import { create } from 'zustand';
import { CubeCoordinates } from '../types/hexProps'; // Assuming hexProps defines PlayerColors too
import { computeGridCoordinates, cubeToKey, keyToCube, cubeToXY, xyToCube } from '../lib/coordinates';
import { WebSocketState } from '@/hooks/useGameWebSocket';

const BOARD_SIZE = 11;

// --- Helper Functions ---

/**
 * Initializes the board state map with all hexes set to empty (0).
 * @param size - The board size (e.g., 11).
 * @returns A Map where keys are "q,r,s" strings and values are 0, 1, or 2.
 */
const initializeBoardState = (size: number): Map<string, 0 | 1 | 2> => {
    const state = new Map<string, 0 | 1 | 2>();
    const initialCoords = computeGridCoordinates(size);
    initialCoords.forEach(coords => {
        state.set(cubeToKey(coords), 0); // 0 represents an empty hex
    });
    return state;
};

/**
 * Maps backend player identifiers ('human', 'AI', 'AI_1', 'AI_2', null, 'draw')
 * to frontend player representation (1 for Red, 2 for Blue, null for ongoing/draw).
 * @param backendPlayer - The player identifier string from the backend.
 * @returns 1, 2, or null.
 */
const mapBackendPlayerToFrontend = (backendPlayer: string | null): 1 | 2 | null => {
    // Mapping based on "backend_api_doc.pdf" and common game logic
    // Assuming Human/AI_1 is Player 1 (Red), AI/AI_2 is Player 2 (Blue)
    if (backendPlayer === 'human' || backendPlayer === 'AI_1') return 1; // Player 1 (Red)
    if (backendPlayer === 'AI' || backendPlayer === 'AI_2') return 2; // Player 2 (Blue)
    if (backendPlayer === null || backendPlayer === 'draw') return null; // Game ongoing, Draw, or explicitly null winner
    console.warn(`Unknown backend player identifier encountered: ${backendPlayer}`);
    return null; // Return null for unknown cases
};

/**
 * Maps the backend board representation (11x11 array) to the frontend board state map.
 * @param backendBoard - The 11x11 array from the backend (1=Red, -1=Blue, 0=Empty).
 * @returns A Map representing the frontend board state.
 */
const mapBackendBoard = (backendBoard: (0 | 1 | -1)[][]): Map<string, 0 | 1 | 2> => {
    // **ASSUMPTION:** Backend board is an 11x11 array where `backendBoard[r][q]` maps to
    // frontend cube coords (q, r, -q-r). This means backend y=r, x=q based on array indexing.
    // **CRITICAL:** This MUST match how the backend structures its board data AND how
    // `xyToCube` interprets backend coordinates in move history.
    // The current `xyToCube` assumes x=r, y=q. Let's align this mapping:
    // Backend `board[y][x]` (using conventional row=y, col=x) should map to `xyToCube(x,y)`.
    // If backend uses `board[r][q]`, then `xyToCube(q,r)` should be used.
    // Let's proceed assuming backend uses `board[y][x]` index access matching `xyToCube(x,y)`.

    if (!backendBoard || !Array.isArray(backendBoard) || backendBoard.length !== BOARD_SIZE) {
        console.error("Invalid backend board structure received. Expected 11x11 array.", backendBoard);
        return initializeBoardState(BOARD_SIZE); // Return empty board on error
    }

    const frontendBoard = new Map<string, 0 | 1 | 2>();
    for (let y = 0; y < BOARD_SIZE; y++) { // Corresponds to 'q' in our frontend cube if y=q
        if (!Array.isArray(backendBoard[y]) || backendBoard[y].length !== BOARD_SIZE) {
             console.error(`Invalid backend board row structure at index y=${y}.`, backendBoard[y]);
             // Potentially skip this row or return empty board
             continue; // Skip invalid row
        }
        for (let x = 0; x < BOARD_SIZE; x++) { // Corresponds to 'r' in our frontend cube if x=r
            const coords = xyToCube(x, y, BOARD_SIZE); // Convert backend x,y to frontend cube
            if (coords) {
                const backendValue = backendBoard[y][x];
                // Backend: 1=Red(P1), -1=Blue(P2), 0=Empty
                // Frontend: 1=P1, 2=P2, 0=Empty
                const frontendValue = backendValue === 1 ? 1 : backendValue === -1 ? 2 : 0;
                frontendBoard.set(cubeToKey(coords), frontendValue as 0 | 1 | 2);
            } else {
                 console.warn(`Could not map backend board coordinates x=${x}, y=${y} to valid CubeCoordinates.`);
            }
        }
    }
     // Verify all expected hexes are present
     const expectedKeys = computeGridCoordinates(BOARD_SIZE).map(cubeToKey);
     expectedKeys.forEach(key => {
         if (!frontendBoard.has(key)) {
             console.warn(`Frontend board state missing expected key after mapping: ${key}. Setting to empty.`);
             frontendBoard.set(key, 0);
         }
     });

    return frontendBoard;
};


// --- State Shape ---
type GameState = {
    gameId: string | null;
    boardState: Map<string, 0 | 1 | 2>; // Key: "q,r,s", Value: 0 (empty), 1 (P1), 2 (P2)
    playerTurn: 1 | 2 | null; // 1 (P1 Red), 2 (P2 Blue), null (Game Over?)
    humanPlayerColor: 'red' | 'blue' | null; // From backend 'human_color' field
    moves: number; // Total moves made in the game
    highlightedHexes: CubeCoordinates[]; // For visually highlighting the last move
    winner: 1 | 2 | null; // 1 (Red wins), 2 (Blue wins), null (Ongoing or Draw)
    isDraw: boolean; // Explicitly track draw state from backend 'winner' field
    winProbability: { [key: string]: number } | null; // e.g., { "human": 0.6, "AI": 0.4 }
    mode: 'HUMAN_AI' | 'AI_AI' | null; // Game mode
    connectionState: WebSocketState; // WebSocket connection status
    lastBackendError: string | null; // Store last error message from backend
    // Function provided by the WebSocket hook to send messages
    sendMessage: (payload: object) => void;
};

// Actions available in the store
interface GameStoreActions {
    handleGameStateUpdate: (backendData: any) => void; // Process message from backend
    setConnectionState: (state: WebSocketState) => void; // Update WS connection state
    setGameId: (gameId: string | null) => void; // Set the current game ID
    setLastError: (error: string | null) => void; // Store backend error message
    highlightLastMove: (coords: CubeCoordinates | null) => void; // Set hexes to highlight
    setSendMessage: (sender: (payload: object) => void) => void; // Receive sendMessage func from hook
    requestMove: (coords: CubeCoordinates) => void; // Request backend to make a move
    requestUndo: () => void; // Request backend to undo last move
    requestRedo: () => void; // (Not implemented in backend API doc)
    requestRestart: () => void; // Request backend to restart game
    requestAiMove: () => void; // Request backend for AI move (mainly for AI vs AI?)
    // requestNewGame: (mode: 'HUMAN_AI' | 'AI_AI') => void; // Handled by component logic now
    resetLocalState: () => void; // Reset store to initial state (except sendMessage)
}

// --- Store Definition ---
const initialState: GameState = {
    gameId: null,
    boardState: initializeBoardState(BOARD_SIZE),
    playerTurn: 1, // Default to Player 1 starting? Backend state will override.
    humanPlayerColor: null,
    moves: 0,
    highlightedHexes: [],
    winner: null,
    isDraw: false,
    winProbability: null,
    mode: null,
    connectionState: WebSocketState.CLOSED,
    lastBackendError: null,
    // Placeholder sendMessage function, will be replaced by the hook
    sendMessage: (payload) => {
        console.warn("sendMessage called before WebSocket was ready.", payload);
    },
};

export const useGameStore = create<GameState & GameStoreActions>((set, get) => ({
    ...initialState,

    // --- Actions ---

    setGameId: (gameId) => set({ gameId }),

    setConnectionState: (state) => set({ connectionState: state }),

    setLastError: (error) => set({ lastBackendError: error }),

    highlightLastMove: (coords) => set({ highlightedHexes: coords ? [coords] : [] }),

    // Called by the useGameWebSocket hook once the connection is open
    setSendMessage: (sender) => set({ sendMessage: sender }),

    /**
     * Processes game state updates received from the backend via WebSocket.
     * @param backendData - The 'data' object from the backend message (type 'game_state' or 'game_update').
     */
    handleGameStateUpdate: (backendData) => {
        console.log("Store: Handling backend game state update:", backendData);

        // Basic validation of received data structure based on backend_api_doc.pdf
        if (!backendData || !backendData.board || backendData.player_turn === undefined || !backendData.moves_history) {
            console.error("Store Error: Received incomplete game state data (missing board, player_turn, or moves_history):", backendData);
            set({ lastBackendError: "Received incomplete game state from server." });
            return;
        }

        try {
            const newBoardState = mapBackendBoard(backendData.board);
            const currentPlayer = mapBackendPlayerToFrontend(backendData.player_turn);
            const winnerPlayer = mapBackendPlayerToFrontend(backendData.winner); // Handles 'human', 'AI', null
            const isDraw = backendData.winner === 'draw'; // Check specifically for draw

            // Determine the last move coordinates from moves_history to highlight
            let lastMoveCoords: CubeCoordinates | null = null;
            if (Array.isArray(backendData.moves_history) && backendData.moves_history.length > 0) {
                const lastAction = backendData.moves_history[backendData.moves_history.length - 1];
                // Check if last action has x and y (as per PDF structure)
                if (lastAction && lastAction.x !== undefined && lastAction.y !== undefined) {
                    // Convert backend x,y to frontend CubeCoordinates using the store's board size
                    lastMoveCoords = xyToCube(lastAction.x, lastAction.y, BOARD_SIZE);
                    if (!lastMoveCoords) {
                        console.warn(`Store: Could not convert backend last move x=${lastAction.x}, y=${lastAction.y} to CubeCoordinates.`);
                    } else {
                         console.log(`Store: Highlighting last move at Cube (${lastMoveCoords.q}, ${lastMoveCoords.r}) from backend XY (${lastAction.x}, ${lastAction.y})`);
                    }
                }
            }

            // Update the store state
            set({
                boardState: newBoardState,
                playerTurn: currentPlayer,
                winner: winnerPlayer, // Store 1, 2, or null
                isDraw: isDraw, // Store draw state
                // Use moves_history length for move count, fallback to existing if history is missing/empty
                moves: Array.isArray(backendData.moves_history) ? backendData.moves_history.length : get().moves,
                mode: backendData.mode ?? get().mode, // Update mode if provided
                humanPlayerColor: backendData.human_color ?? get().humanPlayerColor, // Update human color if provided
                winProbability: backendData.win_probability ?? null, // Update win probability
                highlightedHexes: lastMoveCoords ? [lastMoveCoords] : [], // Highlight based on history
                lastBackendError: null, // Clear previous errors on successful update
                gameId: backendData.id ?? get().gameId, // Update gameId if present in message (e.g., initial game_state)
            });
             console.log("Store: State updated successfully.");

        } catch (error) {
             console.error("Store Error: Failed to process backend game state update:", error, "Data:", backendData);
             set({ lastBackendError: "Failed to process game state from server." });
        }
    },

    /**
     * Resets the store state to its initial values, preserving the sendMessage function.
     */
    resetLocalState: () => {
        console.log("Store: Resetting local state.");
        const currentSendMessage = get().sendMessage; // Preserve the sender function
        set({ ...initialState, sendMessage: currentSendMessage });
    },

    // --- Actions to trigger WS messages ---

    /**
     * Sends a 'move' action to the backend.
     * @param coords - The CubeCoordinates of the hex the player clicked.
     */
    requestMove: (coords) => {
        const { sendMessage, connectionState, winner, isDraw, boardState } = get();

        // Check if the move is allowed
        if (connectionState !== WebSocketState.OPEN) {
            console.warn("Store: Cannot send move - WebSocket not open.");
            return;
        }
        if (winner !== null || isDraw) {
            console.log("Store: Cannot send move - Game already over.");
            // Optionally set an error message for the UI
            // set({ lastBackendError: "Game is already over." });
            return;
        }
        // Check if the clicked hex is empty
        const hexKey = cubeToKey(coords);
        const currentHexState = boardState.get(hexKey);
        if (currentHexState !== 0) {
             console.log(`Store: Cannot send move - Hex (${coords.q}, ${coords.r}) is not empty (State: ${currentHexState}).`);
             // Optionally provide UI feedback
             // set({ lastBackendError: "You can only place a piece on an empty hex." });
             return;
        }
        // TODO: Add check for player's turn if needed (frontend validation)
        // const { playerTurn, humanPlayerColor, mode } = get();
        // if (mode === 'HUMAN_AI') {
        //    const humanPlayerNumber = humanPlayerColor === 'red' ? 1 : 2;
        //    if (playerTurn !== humanPlayerNumber) {
        //        console.log("Store: Cannot send move - Not your turn.");
        //        return;
        //    }
        // }


        // Convert frontend CubeCoordinates to backend XY format
        const xy = cubeToXY(coords, BOARD_SIZE);

        if (xy) {
            // Format the payload according to backend_api_doc.pdf
            const payload = {
                action: 'move',
                x: xy.x, // Corresponds to frontend 'r' based on cubeToXY
                y: xy.y  // Corresponds to frontend 'q' based on cubeToXY
            };
            console.log("Store: Sending 'move' action with payload:", payload);
            sendMessage(payload);
            // Clear any previous errors after attempting a valid move
            set({ lastBackendError: null });
        } else {
            console.error(`Store Error: Invalid coordinates for move - Cube: q=${coords.q}, r=${coords.r}, s=${coords.s}. Could not convert to XY.`);
            // Optionally set an error for the UI
            set({ lastBackendError: "Invalid move coordinates selected." });
        }
    },

    /**
     * Sends an 'undo' action to the backend.
     */
    requestUndo: () => {
        const { sendMessage, connectionState, winner, isDraw } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send undo - WebSocket not open.");
             return;
        }
        if (winner !== null || isDraw) {
             console.log("Store: Cannot send undo - Game already over.");
             return; // Cannot undo if game is over
        }
        const payload = { action: 'undo' };
        console.log("Store: Sending 'undo' action.");
        sendMessage(payload);
    },

    /**
     * Placeholder for 'redo' action (not in backend API doc).
     */
    requestRedo: () => {
        console.warn("Store: Redo action not implemented/supported by backend API.");
        // const { sendMessage, connectionState } = get();
        // if (connectionState !== WebSocketState.OPEN) return;
        // const payload = { action: 'redo' }; // Hypothetical
        // sendMessage(payload);
    },

    /**
     * Sends a 'restart' action to the backend.
     */
    requestRestart: () => {
        const { sendMessage, connectionState } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send restart - WebSocket not open.");
             return;
        }
        const payload = { action: 'restart' };
        console.log("Store: Sending 'restart' action.");
        sendMessage(payload);
    },

    /**
     * Sends an 'ai_move' action to the backend.
     * Primarily intended for AI vs AI mode or potentially specific scenarios in Human vs AI.
     */
    requestAiMove: () => {
        const { sendMessage, connectionState, winner, isDraw } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send ai_move - WebSocket not open.");
             return;
        }
        if (winner !== null || isDraw) {
             console.log("Store: Cannot send ai_move - Game already over.");
             return;
        }
        const payload = { action: 'ai_move' };
        console.log("Store: Sending 'ai_move' action.");
        sendMessage(payload);
    },

    // requestNewGame is removed as the logic is now handled in NewGameOptions component
}));

```


---


### <a name="srctypeshexpropsts"></a>types/hexProps.ts


```ts
/**
 * Type definitions for Hex game properties.
 */

/**
 * Represents Hex coordinates using the Cube coordinate system (q, r, s).
 * Ensures that q + r + s = 0.
 */
export interface CubeCoordinates {
  q: number;
  r: number;
  s: number;
}

/**
 * Defines the color scheme for the game board and players.
 * Colors can be hex codes, Tailwind class names, or CSS color keywords.
 */
export interface PlayerColors {
  p1: string;       // Color for Player 1
  p2: string;       // Color for Player 2
  empty: string;    // Color for empty hex tiles
  background: string; // Background color for the SVG canvas
}

/**
 * Props for the HexBoard component.
 */
export interface HexBoardProps {
  /**
   * 2D array representing the state of each hex tile on the board.
   * The mapping from array indices (row, col) to CubeCoordinates needs
   * to be handled internally or during generation.
   * Values typically: 0 (empty), 1 (Player 1), 2 (Player 2).
   *
   * NOTE: For an 11x11 grid, this might be simplified later to directly use
   * a Map or object keyed by stringified CubeCoordinates for easier lookup.
   * For now, we assume a mapping function exists or the boardState
   * is pre-processed to be easily accessible by CubeCoordinates.
   */
  boardState: Map<string, 0 | 1 | 2>; // Using a Map keyed by "q,r,s" string

  /** Color definitions for players and board elements. */
  playerColors: PlayerColors;

  /** Callback function invoked when a hexagon is clicked. */
  onHexClick: (coords: CubeCoordinates) => void;

  /** Optional array of hex coordinates to visually highlight (e.g., last move). */
  highlightedHexes?: CubeCoordinates[];

  /** Optional CSS class name for additional styling of the SVG container. */
  className?: string;

  /** The size of the hex board (e.g., 11 for an 11x11 grid). */
  boardSize: number;
}

/**
 * Props for the GameInfo component.
 */
export interface GameInfoProps {
  /** Static metadata about the current game. */
  gameMetadata: {
    size: number;       // e.g., 11
    created?: string;   // Optional: Date/time game started
    moves?: number;     // Optional: Total moves made
    // Add other relevant static info as needed
  };
  /** Optional CSS class name for additional styling. */
  className?: string;
}

/**
 * Props for the GameplayControls component.
 */
export interface GameplayControlsProps {
  /** The player whose turn it currently is (1 or 2). */
  playerTurn: number;

  /** The winner of the game (1 or 2), or null if ongoing. */
  winner: number | null;

  /** Callback function for the 'New Game' button. */
  onNewGameClick: () => void;

  /** Optional callback function for an 'Undo' action. */
  onUndoClick?: () => void;

  /** Optional callback function for a 'Resign' action. */
  onResignClick?: () => void;

  /** Flag to enable/disable controls (e.g., during AI thinking or game over). */
  isInteractionAllowed: boolean;

  /** Optional CSS class name for additional styling. */
  className?: string;
}


```


```

### <a id="hex-ai-frontend-src-app--app--dashboard-page-tsx"></a>hex-ai-frontend/src/app/(app)/dashboard/page.tsx

```plaintext
    import React from 'react';
    import UserStatsCard from '@/components/dashboard/UserStatsCard';
    import GameListTable from '@/components/dashboard/GameListTable';
    import NewGameOptions from '@/components/dashboard/NewGameOptions';

    export default function DashboardPage() {
      return (
        // Use padding defined in AppLayout or add here if needed
        <div className="p-6 space-y-6"> {/* Added space-y for vertical spacing */}
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Stats Card - Takes 1 column on medium screens */}
            <div className="md:col-span-1">
              <UserStatsCard />
            </div>
            {/* New Game Options - Takes 2 columns on medium screens */}
            <div className="md:col-span-2">
              <NewGameOptions />
            </div>
          </div>

          {/* Recent Games Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Games</h2>
            <GameListTable />
          </div>

        </div>
      );
    }
    
```

### <a id="hex-ai-frontend-src-app--app--game--gameid--page-tsx"></a>hex-ai-frontend/src/app/(app)/game/[gameId]/page.tsx

```plaintext
// src/app/(app)/game/[gameId]/page.tsx
'use client';

import React, { useEffect, useCallback, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Import Game Components
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import GameplayControls from "@/components/hex/GameplayControls";

// Import WebSocket Hook and State
import { useGameWebSocket, WebSocketState } from "@/hooks/useGameWebSocket";
// Import Zustand store hook and state/actions
import { useGameStore } from "@/store/gameStore";
// Import coordinate helpers
import { cubeToKey } from "@/lib/coordinates"; // Import cubeToKey
// Import types and helpers
import { CubeCoordinates, PlayerColors } from "@/types/hexProps";

// Default WebSocket URL (use environment variable preferably)
const WS_BASE_URL =
	process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://localhost:8000";
const BOARD_SIZE = 11; // Assuming standard size

// WebSocket configuration
const WS_CONFIG = {
	reconnectAttempts: 5,
	reconnectInterval: 2000,
	heartbeatInterval: 30000,
	debug: process.env.NODE_ENV === "development",
};

export default function GamePage() {
	const params = useParams();
	const router = useRouter();
	const gameId = params?.gameId as string | undefined;

	// Track connection attempts for UX messaging
	const [connectionAttempts, setConnectionAttempts] = useState(0);

	// Get state and actions from Zustand store
	const {
		// State...
		boardState,
		playerTurn,
		humanPlayerColor,
		moves,
		highlightedHexes,
		winner,
		isDraw,
		mode,
		winProbability,
		connectionState: storedConnectionState,
		lastBackendError,
		reconnectInProgress,
		messageQueue,
		// Actions...
		handleGameStateUpdate,
		handleErrorMessage,
		setConnectionState: setStoreConnectionState,
		setGameId: setStoreGameId,
		setLastError,
		resetLocalState,
		setSendMessage,
		setReconnect,
		requestMove,
		requestUndo,
		requestRedo,
		requestRestart,
		requestAiMove,
	} = useGameStore();

	// Ref to track the previous player turn (for AI trigger)
	const prevPlayerTurnRef = useRef<number | null>(playerTurn);

	// Callback to handle messages received from the WebSocket hook
	const handleWebSocketMessage = useCallback(
		(message: Record<string, any>) => {
			if (!message || !message.type) {
				console.warn(
					"Received invalid message structure from WebSocket:",
					message
				);
				return;
			}
			console.log(
				"GamePage: Received WebSocket message:",
				message.type,
				message.data
			);

			switch (message.type) {
				case "game_state":
				case "game_update":
					handleGameStateUpdate(message.data);
					break;
				case "error":
					console.error(
						"Received error message from backend:",
						message.data?.message
					);
					handleErrorMessage(message.data);
					break;
				case "game_created":
					// Handle game creation success
					console.log("Game created successfully:", message.data);
					if (message.data?.redirect) {
						router.push(message.data.redirect);
					}
					break;
				default:
					console.log(
						"Received unhandled message type:",
						message.type
					);
			}
		},
		[handleGameStateUpdate, handleErrorMessage, router]
	);

	// Initialize WebSocket hook with configuration
	const {
		connect,
		disconnect,
		sendMessage,
		reconnect,
		connectionState: hookConnectionState,
		error: wsError,
	} = useGameWebSocket(handleWebSocketMessage, WS_CONFIG);

	// Effect to connect WebSocket
	useEffect(() => {
		if (gameId) {
			console.log(
				`GamePage: Attempting to connect for game ID: ${gameId}`
			);
			resetLocalState();
			setStoreGameId(gameId);
			const wsUrl = `${WS_BASE_URL}/ws/game/${gameId}/`;
			connect(wsUrl);
			return () => {
				console.log(`GamePage: Disconnecting for game ID: ${gameId}`);
				disconnect();
				setStoreConnectionState(WebSocketState.CLOSED);
				setStoreGameId(null);
			};
		} else {
			console.error(
				"GamePage: Game ID is missing from route parameters."
			);
			setLastError("Game ID is missing.");
		}
	}, [
		gameId,
		connect,
		disconnect,
		resetLocalState,
		setStoreGameId,
		setStoreConnectionState,
		setLastError,
	]);

	// Effect to sync hook's connection state, errors, and reconnection status
	useEffect(() => {
		// Update the store with the current connection state
		setStoreConnectionState(hookConnectionState);

		// Track reconnection attempts for UI feedback
		if (hookConnectionState === WebSocketState.RECONNECTING) {
			setConnectionAttempts((prev) => prev + 1);
		} else if (hookConnectionState === WebSocketState.OPEN) {
			setConnectionAttempts(0);
		}

		// Handle websocket errors
		if (hookConnectionState === WebSocketState.ERROR && wsError) {
			const errorMsg =
				wsError instanceof Error
					? wsError.message
					: `WebSocket connection error: ${
							wsError?.type || "Unknown"
					  }`;
			console.error("GamePage: WebSocket hook reported error:", errorMsg);
			setLastError(errorMsg);
		} else if (hookConnectionState === WebSocketState.OPEN) {
			setLastError(null);
		}
	}, [hookConnectionState, wsError, setStoreConnectionState, setLastError]);

	// Effect to pass sendMessage and reconnect functions to store
	useEffect(() => {
		// Set the send function when connection is open
		if (hookConnectionState === WebSocketState.OPEN && sendMessage) {
			setSendMessage(sendMessage as (payload: object) => boolean);
			console.log("GamePage: sendMessage function set in store.");
		}

		// Always keep the reconnect function updated
		setReconnect(reconnect);
	}, [
		hookConnectionState,
		sendMessage,
		reconnect,
		setSendMessage,
		setReconnect,
	]);

	// Effect to automatically trigger AI move
	useEffect(() => {
		const humanPlayerNumber =
			humanPlayerColor === "red"
				? 1
				: humanPlayerColor === "blue"
				? 2
				: null;
		const aiPlayerNumber =
			humanPlayerNumber === 1 ? 2 : humanPlayerNumber === 2 ? 1 : null;

		const shouldTrigger =
			mode === "HUMAN_AI" &&
			winner === null &&
			!isDraw &&
			storedConnectionState === WebSocketState.OPEN &&
			humanPlayerNumber !== null &&
			playerTurn === aiPlayerNumber &&
			prevPlayerTurnRef.current === humanPlayerNumber;

		if (shouldTrigger) {
			console.log(
				`GamePage: Conditions met. Requesting AI move for player ${aiPlayerNumber}...`
			);
			const timerId = setTimeout(() => {
				requestAiMove();
			}, 500);
			return () => clearTimeout(timerId); // Cleanup
		}

		prevPlayerTurnRef.current = playerTurn;
	}, [
		playerTurn,
		winner,
		isDraw,
		mode,
		humanPlayerColor,
		storedConnectionState,
		requestAiMove,
	]);

	// --- Derived State & Constants ---
	const humanPlayerNumber =
		humanPlayerColor === "red" ? 1 : humanPlayerColor === "blue" ? 2 : null;
	const isInteractionAllowed =
		winner === null &&
		!isDraw &&
		storedConnectionState === WebSocketState.OPEN &&
		playerTurn === humanPlayerNumber;
	const canUndo = isInteractionAllowed && moves > 0;
	const playerColors: PlayerColors = {
		p1: "#E53E3E",
		p2: "#3182CE",
		empty: "#F7FAFC",
		background: "#ffffff",
	};
	const gameMetadata = { size: BOARD_SIZE, moves };

	// Click Handler that uses the store's requestMove action
	const handleHexClick = useCallback(
		(coords: CubeCoordinates) => {
			if (isInteractionAllowed) {
				requestMove(coords);
			} else {
				console.log(
					"GamePage: Interaction disabled (not player's turn or game ended)"
				);
			}
		},
		[isInteractionAllowed, requestMove]
	);

	// Manual reconnect handler
	const handleManualReconnect = useCallback(() => {
		console.log("GamePage: Manual reconnection requested");
		reconnect();
		setConnectionAttempts(0);
	}, [reconnect]);

	// --- Render Logic ---

	// Invalid game ID
	if (!gameId) {
		return (
			<div className="p-6 text-center text-red-600 font-semibold">
				Invalid Game ID provided.
			</div>
		);
	}

	// Initial connecting state
	if (
		storedConnectionState === WebSocketState.CONNECTING &&
		connectionAttempts === 0
	) {
		return (
			<div className="p-6 text-center text-gray-600">
				Connecting to game {gameId}...
			</div>
		);
	}

	// Reconnection in progress
	if (
		reconnectInProgress ||
		storedConnectionState === WebSocketState.RECONNECTING
	) {
		return (
			<div className="p-6 text-center text-yellow-600">
				<p>
					Reconnecting to game {gameId}... (Attempt{" "}
					{connectionAttempts})
				</p>
				{connectionAttempts > 3 && (
					<button
						onClick={handleManualReconnect}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Retry Connection
					</button>
				)}
			</div>
		);
	}

	// Connection error with retry option
	if (storedConnectionState === WebSocketState.ERROR) {
		return (
			<div className="p-6 text-center text-red-600">
				<p className="font-semibold">Connection Error:</p>
				<p>
					{lastBackendError ||
						"Failed to connect to the game server."}
				</p>
				<div className="mt-4 flex justify-center space-x-4">
					<button
						onClick={handleManualReconnect}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Retry Connection
					</button>
					<button
						onClick={() => router.push("/dashboard")}
						className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
					>
						Return to Dashboard
					</button>
				</div>
			</div>
		);
	}

	// Backend error (but connection is OK)
	if (lastBackendError && storedConnectionState === WebSocketState.OPEN) {
		return (
			<div className="p-6 text-center text-orange-600">
				<p className="font-semibold">Game Error:</p>
				<p>{lastBackendError}</p>
				<button
					onClick={() => setLastError(null)}
					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Dismiss
				</button>
			</div>
		);
	}

	// Connection closed unexpectedly
	if (storedConnectionState === WebSocketState.CLOSED && gameId) {
		return (
			<div className="p-6 text-center text-orange-600">
				<p>
					Connection Closed. Please try reconnecting or return to
					dashboard.
				</p>
				<div className="mt-4 flex justify-center space-x-4">
					<button
						onClick={handleManualReconnect}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Reconnect
					</button>
					<button
						onClick={() => router.push("/dashboard")}
						className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
					>
						Return to Dashboard
					</button>
				</div>
			</div>
		);
	}

	// Still waiting for connection
	if (storedConnectionState !== WebSocketState.OPEN) {
		return (
			<div className="p-6 text-center text-gray-600">
				Establishing connection...
			</div>
		);
	}

	// Main Game UI
	return (
		<div className="flex flex-col h-full">
			{/* Connection Status Bar */}
			<div className="bg-gray-100 py-2 px-4 text-sm flex justify-between items-center">
				<div className="flex items-center">
					<span
						className={`h-2 w-2 rounded-full mr-2 ${
							storedConnectionState === WebSocketState.OPEN
								? "bg-green-500"
								: "bg-red-500"
						}`}
					></span>
					<span>
						{storedConnectionState === WebSocketState.OPEN
							? "Connected"
							: "Disconnected"}
					</span>
				</div>
				{messageQueue.length > 0 && (
					<div className="text-yellow-600">
						Pending messages: {messageQueue.length}
					</div>
				)}
			</div>

			{/* Main Game Layout */}
			<div className="flex flex-col md:flex-row flex-1 p-4 gap-4">
				{/* Left Column: Hex Board */}
				<div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow md:h-full h-[60vh]">
					<HexBoard
						boardState={boardState}
						playerColors={playerColors}
						onHexClick={handleHexClick}
						className="max-w-full max-h-full"
						boardSize={BOARD_SIZE}
						highlightedHexes={highlightedHexes}
					/>
				</div>

				{/* Right Column: Info and Controls */}
				<div className="w-full md:w-1/3 flex-none flex flex-col gap-4 md:h-full h-auto">
					{/* Game Info Panel */}
					<div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
						<GameInfo
							gameMetadata={gameMetadata}
							className="text-gray-600"
						/>
						{winProbability && (
							<div className="mt-2 text-sm">
								<h3 className="font-medium text-gray-700">
									Win Probability:
								</h3>
								{Object.entries(winProbability).map(
									([player, prob]) => (
										<p key={player} className="capitalize">
											{player}: {(prob * 100).toFixed(1)}%
										</p>
									)
								)}
							</div>
						)}
					</div>

					{/* Player Turn Indicator */}
					<div className="flex-none p-4 bg-white rounded-lg shadow">
						<h3 className="font-medium text-gray-700 mb-2">
							{winner
								? `Game Over: ${
										winner === 1 ? "Red" : "Blue"
								  } Wins!`
								: isDraw
								? "Game Over: Draw!"
								: `Current Turn: ${
										playerTurn === 1 ? "Red" : "Blue"
								  }`}
						</h3>
						{playerTurn === humanPlayerNumber &&
							!winner &&
							!isDraw && (
								<p className="text-green-600">Your turn</p>
							)}
						{playerTurn !== humanPlayerNumber &&
							!winner &&
							!isDraw && (
								<p className="text-blue-600">
									Waiting for opponent...
								</p>
							)}
					</div>

					{/* Gameplay Controls Panel */}
					<div className="flex-1 min-h-0 p-4 bg-white rounded-lg shadow flex flex-col overflow-y-auto">
						<GameplayControls
							playerTurn={playerTurn}
							winner={winner}
							isDraw={isDraw}
							onNewGameClick={() => router.push("/dashboard")}
							onUndoClick={canUndo ? requestUndo : undefined}
							onRestartClick={requestRestart}
							onAiMoveClick={requestAiMove}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

```

### <a id="hex-ai-frontend-src-app--app--layout-tsx"></a>hex-ai-frontend/src/app/(app)/layout.tsx

```plaintext
import SidebarNav from '@/components/ui/SideBarNav'; // Adjust path if needed
import React from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Main container using flexbox to position sidebar and content
    <div className="flex h-screen overflow-hidden bg-gray-100"> {/* Base light background */}

      {/* Persistent Sidebar */}
      <SidebarNav />

      {/* Main content area */}
      {/* flex-1 allows it to take remaining width */}
      {/* overflow-y-auto enables scrolling ONLY for the content area */}
      <main className="flex-1 overflow-y-auto">
        {/* Page content from dashboard/page.tsx, game/page.tsx etc. renders here */}
        {children}
      </main>

    </div>
  );
}


```

### <a id="hex-ai-frontend-src-app--app--replay--gameid--page-tsx"></a>hex-ai-frontend/src/app/(app)/replay/[gameId]/page.tsx

```plaintext
"use client"; // Needed for state and effects

import React, { useState, useEffect, useCallback } from "react";
// Remove unused import
// import { usePathname } from "next/navigation";

// Import Game Components (assuming they are client components or compatible)
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import ReplayControlBar from "@/components/replay/ReplayControlBar"; // Import the new component

// Import types and helpers
import { CubeCoordinates, PlayerColors } from "@/types/hexProps";
import { computeGridCoordinates, cubeToKey, xyToCube } from "@/lib/coordinates";

const BOARD_SIZE = 11; // Assuming standard size

// Define structure for a single move in the history
interface ReplayMove {
	player: 1 | 2; // Or 'human'/'AI' if matching backend
	coords: CubeCoordinates;
	moveNumber: number;
}

// Define structure for the full game data fetched for replay
interface ReplayGameData {
	gameId: string;
	players: { p1: string; p2: string }; // Player names/identifiers
	movesHistory: ReplayMove[];
	winner?: number | null; // Or 'human'/'AI'
	// Add other static game metadata if needed
}

// Define backend API response type
interface BackendGameResponse {
	id: number;
	board: number[][];
	player_turn: string; // "human" or "AI"
	human_color: string; // "red" or "blue"
	last_moves: Array<[number, number]>; // Array of [x, y] coordinates
	winner: string | null; // "human", "AI", or null
	moves_history: Array<[number, number, string]>; // Array of [x, y, player] tuples
	win_probability: { human: number; ai: number } | null;
	mode: string; // "HUMAN_AI" or "AI_AI"
}

// Helper function to create board state at a specific move number
const getBoardStateAtMove = (
	history: ReplayMove[],
	moveNum: number,
	size: number
): Map<string, 0 | 1 | 2> => {
	const board = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => board.set(cubeToKey(coords), 0));

	for (let i = 0; i < moveNum && i < history.length; i++) {
		const move = history[i];
		board.set(cubeToKey(move.coords), move.player);
	}
	return board;
};

export default function ReplayPage({ params }: { params: { gameId: string } }) {
	const gameId = params.gameId;

	// --- State for Replay ---
	const [replayData, setReplayData] = useState<ReplayGameData | null>(null);
	const [currentMoveNumber, setCurrentMoveNumber] = useState<number>(0);
	const [boardState, setBoardState] = useState<Map<string, 0 | 1 | 2>>(() =>
		initializeBoardState(BOARD_SIZE)
	); // Initial empty board
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// --- Fetch Replay Data ---
	useEffect(() => {
		setIsLoading(true);
		setError(null);
		console.log(`Fetching replay data for game ID: ${gameId}`);

		fetch(`/games/${gameId}/`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(
						`Failed to fetch game: ${res.status} ${res.statusText}`
					);
				}
				return res.json();
			})
			.then((data: BackendGameResponse) => {
				// Convert backend data to our frontend format
				const convertedMoves: ReplayMove[] = data.moves_history
					.map((moveData, index) => {
						// moveData is [x, y, player]
						const [x, y, player] = moveData;
						const coords = xyToCube(x, y);

						// Skip moves with invalid coordinates
						if (coords === null) {
							console.warn(
								`Invalid coordinates for move ${
									index + 1
								}: [${x}, ${y}]`
							);
							return null;
						}

						return {
							player: player === "human" ? 1 : 2, // Convert string to number
							coords: coords, // Convert XY to Cube coordinates
							moveNumber: index + 1,
						};
					})
					.filter((move): move is ReplayMove => move !== null); // Filter out null moves

				const convertedData: ReplayGameData = {
					gameId: gameId,
					players: {
						p1: data.mode === "HUMAN_AI" ? "Human" : "AI 1",
						p2: data.mode === "HUMAN_AI" ? "AI" : "AI 2",
					},
					movesHistory: convertedMoves,
					winner:
						data.winner === "human"
							? 1
							: data.winner === "AI"
							? 2
							: null,
				};

				setReplayData(convertedData);
				setCurrentMoveNumber(0); // Start at beginning
				setBoardState(
					getBoardStateAtMove(
						convertedData.movesHistory,
						0,
						BOARD_SIZE
					)
				);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error("Failed to fetch replay data:", err);
				setError("Failed to load replay data. " + err.message);
				setIsLoading(false);
			});
	}, [gameId]); // Refetch if gameId changes

	// --- Update board state when move number changes ---
	useEffect(() => {
		if (replayData) {
			setBoardState(
				getBoardStateAtMove(
					replayData.movesHistory,
					currentMoveNumber,
					BOARD_SIZE
				)
			);
		}
	}, [currentMoveNumber, replayData]);

	// --- Playback Timer ---
	useEffect(() => {
		let timerId: NodeJS.Timeout | null = null;
		if (
			isPlaying &&
			replayData &&
			currentMoveNumber < replayData.movesHistory.length
		) {
			timerId = setTimeout(() => {
				setCurrentMoveNumber((prev) => prev + 1);
			}, 1000); // Adjust speed as needed (1 second per move)
		} else if (isPlaying) {
			setIsPlaying(false); // Stop playing if end is reached
		}
		return () => {
			// Cleanup timer on unmount or when isPlaying changes
			if (timerId) clearTimeout(timerId);
		};
	}, [isPlaying, currentMoveNumber, replayData]);

	// --- Control Handlers ---
	const handlePlayPause = useCallback(
		() => setIsPlaying((prev) => !prev),
		[]
	);
	const handleNext = useCallback(() => {
		if (replayData && currentMoveNumber < replayData.movesHistory.length) {
			setIsPlaying(false); // Stop playback if manually stepping
			setCurrentMoveNumber((prev) => prev + 1);
		}
	}, [replayData, currentMoveNumber]);
	const handlePrevious = useCallback(() => {
		if (currentMoveNumber > 0) {
			setIsPlaying(false);
			setCurrentMoveNumber((prev) => prev - 1);
		}
	}, [currentMoveNumber]);
	const handleGoToStart = useCallback(() => {
		setIsPlaying(false);
		setCurrentMoveNumber(0);
	}, []);
	const handleGoToEnd = useCallback(() => {
		if (replayData) {
			setIsPlaying(false);
			setCurrentMoveNumber(replayData.movesHistory.length);
		}
	}, [replayData]);
	const handleSeek = useCallback(
		(moveNumber: number) => {
			if (
				replayData &&
				moveNumber >= 0 &&
				moveNumber <= replayData.movesHistory.length
			) {
				setIsPlaying(false);
				setCurrentMoveNumber(moveNumber);
			}
		},
		[replayData]
	);

	// --- Render Logic ---
	if (isLoading) {
		return (
			<div className="p-6 text-center text-gray-600">
				Loading Replay...
			</div>
		);
	}
	if (error) {
		return <div className="p-6 text-center text-red-600">{error}</div>;
	}
	if (!replayData) {
		return (
			<div className="p-6 text-center text-gray-600">
				Replay data not found.
			</div>
		);
	}

	// Static player colors for replay board
	const playerColors: PlayerColors = {
		p1: "#E53E3E",
		p2: "#3182CE",
		empty: "#F7FAFC",
		background: "#ffffff",
	};

	// Static game info for replay
	const staticGameMetadata = {
		size: BOARD_SIZE,
		moves: replayData.movesHistory.length, // Total moves in game
		// Add players, date, winner etc. from replayData if needed
	};

	// Highlight the piece placed at the current move number (if applicable)
	const highlightedHexes =
		currentMoveNumber > 0 &&
		currentMoveNumber <= replayData.movesHistory.length
			? [replayData.movesHistory[currentMoveNumber - 1].coords]
			: [];

	return (
		// Reuse the two-column layout structure
		<div className="flex h-full p-4 gap-4">
			{/* Left Column: Board */}
			<div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow h-full">
				<HexBoard
					boardState={boardState} // Display board at current replay step
					playerColors={playerColors}
					onHexClick={() => {}} // Disable clicking on replay board
					className="max-w-full max-h-full"
					boardSize={BOARD_SIZE}
					highlightedHexes={highlightedHexes} // Highlight last move shown
				/>
			</div>
			{/* Right Column: Info + Controls */}
			<div className="w-1/3 flex-none flex flex-col gap-4 overflow-hidden h-full">
				{/* Static Game Info */}
				<div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
					<GameInfo
						gameMetadata={staticGameMetadata}
						className="text-gray-600"
					/>
					{/* Add more static info like players, winner */}
					<div className="mt-2 text-sm text-gray-600">
						<p>
							<span className="font-medium text-gray-700">
								Player 1:
							</span>{" "}
							{replayData.players.p1}
						</p>
						<p>
							<span className="font-medium text-gray-700">
								Player 2:
							</span>{" "}
							{replayData.players.p2}
						</p>
						<p>
							<span className="font-medium text-gray-700">
								Winner:
							</span>{" "}
							{replayData.winner === 1
								? replayData.players.p1
								: replayData.winner === 2
								? replayData.players.p2
								: "Game in progress"}
						</p>
					</div>
				</div>

				{/* Replay Controls */}
				<div className="flex-none bg-white rounded-lg shadow p-4">
					<ReplayControlBar
						currentMove={currentMoveNumber}
						totalMoves={replayData.movesHistory.length}
						isPlaying={isPlaying}
						onPlayPause={handlePlayPause}
						onNext={handleNext}
						onPrevious={handlePrevious}
						onGoToStart={handleGoToStart}
						onGoToEnd={handleGoToEnd}
						onSeek={handleSeek}
						rel="noopener" // Add the required prop
					/>
				</div>

				{/* Move List/History */}
				<div className="flex-grow bg-white rounded-lg shadow p-4 overflow-y-auto">
					<h3 className="text-base font-medium mb-2 text-gray-700">
						Move History
					</h3>
					<ul className="space-y-1">
						{replayData.movesHistory.map((move, index) => (
							<li
								key={`move-${index}`}
								className={`text-sm px-2 py-1 rounded ${
									index + 1 === currentMoveNumber
										? "bg-blue-100 text-blue-800"
										: ""
								}`}
								onClick={() => handleSeek(index + 1)}
								style={{ cursor: "pointer" }}
							>
								{index + 1}. Player{" "}
								{move.player === 1
									? replayData.players.p1
									: replayData.players.p2}{" "}
								({move.coords.q}, {move.coords.r})
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

// Helper to initialize board state (can be moved to utils)
const initializeBoardState = (size: number): Map<string, 0 | 1 | 2> => {
	const state = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => {
		state.set(cubeToKey(coords), 0);
	});
	return state;
};

```

### <a id="hex-ai-frontend-src-app--app--settings-page-tsx"></a>hex-ai-frontend/src/app/(app)/settings/page.tsx

```plaintext
"use client";
// Note: No 'use client' needed here if form state is managed within child components
import React from "react";
import UserProfileForm from "@/components/settings/UserProfileForm";
import ThemeSelector from "@/components/settings/ThemeSelector";
import GameOptionToggles from "@/components/settings/GameOptionToggles";

export default function SettingsPage() {
	// TODO: Add handler for form submission
	const handleSaveSettings = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Saving settings... (API call needed)");
		// Gather data from form state (likely managed within child components or lifted up)
		alert("Saving settings... (Not implemented)");
	};

	return (
		// Use padding defined in AppLayout or add here
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-semibold text-gray-900 mb-6">
				Settings
			</h1>

			{/* Form element wraps all settings sections */}
			<form
				className="bg-white p-6 rounded-lg shadow space-y-8"
				onSubmit={handleSaveSettings}
			>
				{/* Profile Section */}
				<section aria-labelledby="profile-heading">
					<h2
						id="profile-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Profile
					</h2>
					<UserProfileForm />
				</section>

				{/* Appearance Section */}
				<section aria-labelledby="appearance-heading">
					<h2
						id="appearance-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Appearance
					</h2>
					<ThemeSelector />
				</section>

				{/* Gameplay Section */}
				<section aria-labelledby="gameplay-heading">
					<h2
						id="gameplay-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Gameplay
					</h2>
					<GameOptionToggles />
				</section>

				{/* Save Button */}
				<div className="pt-4 border-t border-gray-200">
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Save Settings
					</button>
				</div>
			</form>
		</div>
	);
}

```

### <a id="hex-ai-frontend-src-app-globals-css"></a>hex-ai-frontend/src/app/globals.css

```plaintext
@import "tailwindcss";

:root {
  --foreground-rgb: 226, 232, 240; /* text-primary */
  --background-start-rgb: 26, 32, 44; /* background / board-bg */
  --background-end-rgb: 26, 32, 44; /* background / board-bg */
}

/* Light mode styles */
@media (prefers-color-scheme: light) {
  :root {
    --foreground-rgb: 26, 32, 44; /* Darker text for light mode */
    --background-start-rgb: 255, 255, 255; /* Light background */
    --background-end-rgb: 255, 255, 255; /* Light background */
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-start-rgb)); /* Single background color */
  /* Ensure body and html take full height for h-screen to work reliably */
  height: 100%;
}

html {
  height: 100%;
}

/* Optional: Apply global font if desired, e.g., Inter */
/* body {
  font-family: 'Inter', sans-serif;
} */

/* Ensure layers are defined if you add custom base styles */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### <a id="hex-ai-frontend-src-app-layout-tsx"></a>hex-ai-frontend/src/app/layout.tsx

```plaintext
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Example font
import "./globals.css";

// Optional: Load a font like Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hex AI Game",
  description: "Play Hex against an AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* Apply font class if using one */}
      <body className={`${inter.className} h-full bg-background text-text-primary`}>
        {/* The main container enforcing viewport height and no scroll */}
        {/* Using flex flex-col ensures children can correctly use flex-grow */}
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Optional Navbar could go here */}
          {/* <Navbar /> */}

          {/* Main content area that takes up remaining space */}
          {/* overflow-hidden here might be redundant if page.tsx handles it, but reinforces the constraint */}
          <main className="flex-grow overflow-hidden">
            {children} {/* page.tsx content will be rendered here */}
          </main>

          {/* Optional Footer could go here */}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}

```

### <a id="hex-ai-frontend-src-app-page-tsx"></a>hex-ai-frontend/src/app/page.tsx

```plaintext
// Using redirect requires this page to be a Client Component or used in Server Actions
// Let's make it a simple Client Component for redirection
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use useRouter for client-side redirect

export default function RootPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the dashboard page on component mount
		router.replace("/dashboard");
	}, [router]);

	// Optionally render a loading state or minimal content while redirecting
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<p className="text-gray-600">Loading Hex AI...</p>
			{/* Or a spinner component */}
		</div>
	);

	// Alternative using Next.js redirect function (works on server):
	// import { redirect } from 'next/navigation';
	// export default function RootPage() {
	//   redirect('/dashboard');
	// }
}

```

### <a id="hex-ai-frontend-src-components-dashboard-gamelisttable-tsx"></a>hex-ai-frontend/src/components/dashboard/GameListTable.tsx

```plaintext
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // For linking to game/replay pages

// Interface for the API response from /api/games/
interface ApiGame {
	id: number;
	player_turn: string; // "human" or "AI"
	winner: string | null; // "human", "AI", or null
	mode: string; // "HUMAN_AI" or "AI_AI"
	human_color: string; // "red" or "blue"
}

// Frontend representation of a game
interface Game {
	id: string;
	opponent: string;
	status: "Active" | "Completed" | "Waiting";
	outcome?: "Win" | "Loss" | "Draw";
	date: string; // We'll use "Recent" as we don't have actual date from API
	mode: "HUMAN_AI" | "AI_AI" | "HUMAN_HUMAN";
}

interface GameListTableProps {
	// No props needed
}

const GameListTable: React.FC<GameListTableProps> = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGames = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch("/api/games/");

				if (!response.ok) {
					throw new Error(
						`Failed to fetch games: ${response.status} ${response.statusText}`
					);
				}

				const apiGames: ApiGame[] = await response.json();

				// Map API response to frontend Game format
				const formattedGames: Game[] = apiGames.map((game) => {
					// Determine game status
					let status: "Active" | "Completed" | "Waiting";
					let outcome: "Win" | "Loss" | "Draw" | undefined;

					if (game.winner) {
						status = "Completed";
						outcome = game.winner === "human" ? "Win" : "Loss";
					} else {
						status = "Active";
					}

					// For opponent, use AI for HUMAN_AI mode
					const opponent =
						game.mode === "HUMAN_AI" ? "AI" : "AI vs AI Match";

					return {
						id: game.id.toString(),
						opponent,
						status,
						outcome,
						date: "Recent", // We don't have actual dates from the API
						mode: game.mode as "HUMAN_AI" | "AI_AI" | "HUMAN_HUMAN",
					};
				});

				setGames(formattedGames);
			} catch (err) {
				console.error("Error fetching games:", err);
				setError(
					err instanceof Error ? err.message : "Failed to fetch games"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGames();
	}, []);

	if (isLoading) {
		return (
			<div className="bg-white rounded-lg shadow p-6 text-center">
				<div className="animate-pulse">Loading games...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white rounded-lg shadow p-6 text-center text-red-500">
				Error: {error}
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow overflow-hidden">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Opponent
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Status
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Outcome
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Date
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
					{games.length === 0 && (
						<tr>
							<td
								colSpan={5}
								className="px-4 py-4 text-center text-gray-500"
							>
								No recent games found.
							</td>
						</tr>
					)}
					{games.map((game) => (
						<tr key={game.id}>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.opponent}
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{/* Add status indicators if desired */}
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
										game.status === "Active"
											? "bg-yellow-100 text-yellow-800"
											: game.status === "Completed"
											? "bg-green-100 text-green-800"
											: "bg-blue-100 text-blue-800"
									}`}
								>
									{game.status}
								</span>
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.outcome ?? "-"}
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.date}
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
								{game.status === "Active" && (
									<Link
										href={`/game/${game.id}`}
										className="text-indigo-600 hover:text-indigo-900"
									>
										Resume
									</Link>
								)}
								{game.status === "Completed" && (
									<Link
										href={`/replay/${game.id}`}
										className="text-indigo-600 hover:text-indigo-900"
									>
										Replay
									</Link>
								)}
								{/* Add other actions like 'View' if needed */}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GameListTable;

```

### <a id="hex-ai-frontend-src-components-dashboard-newgameoptions-tsx"></a>hex-ai-frontend/src/components/dashboard/NewGameOptions.tsx

```plaintext
// src/components/dashboard/NewGameOptions.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Define game modes explicitly based on backend expectations
type GameMode = "HUMAN_AI" | "AI_AI";

// Define difficulty levels (currently only used for display/selection)
type Difficulty = "easy" | "medium" | "hard";

interface NewGameOptionsProps {}

// Default WebSocket URL (use environment variable preferably)
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://localhost:8000";

const NewGameOptions: React.FC<NewGameOptionsProps> = () => {
	const router = useRouter(); // Initialize router
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	// State for AI difficulty selection (visual only for now, backend doesn't seem to use it yet)
	const [aiDifficulty, setAiDifficulty] = useState<Difficulty>("medium");

	/**
	 * Creates a new game by:
	 * 1. Connecting to the '/ws/game/new/' endpoint.
	 * 2. Sending the 'create_game' action with the selected mode.
	 * 3. Waiting for the 'game_created' response containing the new game ID.
	 * 4. Navigating the user to the game room URL '/game/[gameId]'.
	 * @param mode - The game mode ('HUMAN_AI' or 'AI_AI').
	 */
	const createGame = useCallback(
		async (mode: GameMode) => {
			setIsLoading(true); // Show loading state on the button
			setError(null); // Clear previous errors
			console.log(`Attempting to create game with mode: ${mode}`);

			// WebSocket URL for creating a new game
			const wsNewUrl = `${WS_BASE_URL}/ws/game/new/`;
			let ws: WebSocket | null = null; // Declare ws to access it in finally block

			try {
				// --- WebSocket Connection and Message Handling ---
				ws = new WebSocket(wsNewUrl);
				const currentWs = ws; // Capture ref for cleanup in promise callbacks

				// Wrap the message handling in a Promise to await the game_id
				const messagePromise = new Promise<string>(
					(resolve, reject) => {
						if (!currentWs) {
							reject(new Error("WebSocket instance is null."));
							return;
						}

						currentWs.onopen = () => {
							console.log(
								"WebSocket connection opened for game creation."
							);
							// Send the create_game action once connected
							const createPayload = {
								action: "create_game",
								mode: mode,
								// Add difficulty or other options here if backend supports them
							};
							currentWs.send(JSON.stringify(createPayload));
							console.log(
								"Sent create_game action:",
								createPayload
							);
						};

						currentWs.onerror = (event) => {
							console.error(
								"WebSocket error during game creation:",
								event
							);
							// Try to provide a more helpful error message
							let errorMsg = "WebSocket connection failed.";
							if (wsNewUrl.startsWith("ws://localhost")) {
								errorMsg += " Is the backend server running?";
							}
							reject(new Error(errorMsg));
							// Ensure closure on error (though browser might close it automatically)
							if (currentWs.readyState !== WebSocket.CLOSED) {
								currentWs.close();
							}
						};

						currentWs.onmessage = (event) => {
							try {
								const message = JSON.parse(event.data);
								console.log(
									"Received message during game creation:",
									message
								);

								// Check for the expected 'game_created' response type
								if (
									message.type === "game_created" &&
									message.data?.game_id
								) {
									console.log(
										`Game created successfully! Game ID: ${message.data.game_id}`
									);
									resolve(message.data.game_id); // Resolve the promise with the game ID
								} else if (message.type === "error") {
									console.error(
										"Backend error during game creation:",
										message.data?.message
									);
									reject(
										new Error(
											message.data?.message ||
												"Unknown backend error during creation."
										)
									);
								} else {
									// Handle unexpected message types
									console.warn(
										"Received unexpected message type during game creation:",
										message.type
									);
									// Optionally reject or just ignore, depending on desired strictness
									// reject(new Error(`Unexpected message type: ${message.type}`));
								}
							} catch (e) {
								console.error(
									"Failed to parse message during game creation:",
									e,
									"Raw data:", event.data
								);
								reject(
									new Error(
										"Failed to parse response from server."
									)
								);
							} finally {
								// Close the WebSocket connection once we have the game ID or an error
								if (
									currentWs.readyState === WebSocket.OPEN ||
									currentWs.readyState === WebSocket.CONNECTING
								) {
									console.log(
										"Closing WebSocket after game creation response/error."
									);
									currentWs.close();
								}
							}
						};

						currentWs.onclose = (event) => {
							console.log(
								`Game creation WebSocket closed. Code: ${event.code}, Clean: ${event.wasClean}, Reason: ${event.reason}`
							);
							// If the promise hasn't been resolved/rejected yet, it means the connection closed prematurely.
							// The 'reject' might have already been called by onerror or onmessage error handling.
							// This acts as a fallback.
							// reject(new Error("WebSocket closed before game ID was received.")); // Could cause unhandled rejection if already resolved/rejected
						};
					}
				);

				// --- Timeout for the Promise ---
				const timeoutPromise = new Promise<string>((_, reject) => {
					const id = setTimeout(() => {
						clearTimeout(id);
						// Ensure socket is closed on timeout
						if (currentWs && currentWs.readyState !== WebSocket.CLOSED) {
							console.warn("Closing WebSocket due to timeout.");
							currentWs.close();
						}
						reject(
							new Error(
								"Game creation timed out. Server did not respond in time."
							)
						);
					}, 10000); // 10-second timeout
				});

				// --- Wait for Game ID or Timeout ---
				// Race the message promise against the timeout
				const gameId = await Promise.race([
					messagePromise,
					timeoutPromise,
				]);

				// --- Navigation ---
				// If successful, navigate to the game page
				if (gameId) {
					console.log(`Navigating to /game/${gameId}`);
					router.push(`/game/${gameId}`); // Use Next.js router for navigation
					// Don't reset isLoading here, let the navigation unmount the component
				} else {
					// Should not happen if promise resolves correctly, but as a fallback:
					setError("Failed to retrieve game ID after creation.");
					setIsLoading(false);
				}

			} catch (err: any) {
				console.error("Error during game creation process:", err);
				setError(err.message || "An unexpected error occurred during game creation.");
				setIsLoading(false); // Stop loading on error
				// Ensure WebSocket is closed on error caught outside the promise
				if (ws && ws.readyState !== WebSocket.CLOSED) {
					console.log(
						"Closing WebSocket due to error during creation process."
					);
					ws.close();
				}
			}
			// No finally block needed here as isLoading is handled in success/error paths,
			// and navigation handles the success case cleanup by unmounting.
		},
		[router] // Add router to dependency array
	);

	// Handler for the "Start Game" (Human vs AI) button
	const handleStartHumanVsAi = () => {
		// Pass the selected difficulty if the backend supports it in the future
		createGame("HUMAN_AI");
	};

	// Handler for the "Start AI Match" button
	const handleStartAiVsAi = () => {
		createGame("AI_AI");
	};

	return (
		// Component Structure (Tailwind styled)
		<div className="bg-white p-4 rounded-lg shadow">
			<h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
				Start New Game
			</h3>
			{/* Display error message if any */}
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-3 text-sm" role="alert">
					<strong className="font-bold">Error: </strong>
					<span className="block sm:inline">{error}</span>
				</div>
			)}

			<div className="space-y-4">
				{/* Human vs AI Section */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">
						Human vs AI
					</span>
					<div className="flex items-center gap-2">
						{/* Difficulty Selector - currently visual only */}
						<select
							value={aiDifficulty}
							onChange={(e) =>
								setAiDifficulty(e.target.value as Difficulty)
							}
							className="block w-full sm:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-sm"
							disabled={isLoading} // Disable while loading
						>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
						{/* Start Button */}
						<button
							onClick={handleStartHumanVsAi} // Use the specific handler
							disabled={isLoading} // Disable button while loading
							className="px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait flex items-center justify-center min-w-[100px]" // Added min-width
						>
							{isLoading ? (
								<>
									<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Starting...
								</>
							) : (
								"Start Game"
							)}
						</button>
					</div>
				</div>

				{/* AI vs AI Section */}
				<div className="flex items-center justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">AI vs AI</span>
					{/* Start Button */}
					<button
						onClick={handleStartAiVsAi} // Use the specific handler
						disabled={isLoading} // Disable during loading
						className="px-4 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait flex items-center justify-center min-w-[130px]" // Added min-width
					>
						{isLoading ? (
							<>
								<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Starting...
							</>
						) : (
							"Start AI Match"
						)}
					</button>
				</div>

				{/* Placeholder for Human vs Human if needed later */}
			</div>
		</div>
	);
};

export default NewGameOptions;

```

### <a id="hex-ai-frontend-src-components-dashboard-userstatscard-tsx"></a>hex-ai-frontend/src/components/dashboard/UserStatsCard.tsx

```plaintext
import React from "react";

// TODO: Define props if data is passed down (e.g., stats object)
interface UserStatsCardProps {
	// Example: stats?: { wins: number; losses: number; rank?: string };
}

const UserStatsCard: React.FC<UserStatsCardProps> = (/*{ stats }*/) => {
	// Placeholder data
	const stats = { wins: 15, losses: 8, rank: "Gold III" };

	return (
		<div className="bg-white p-4 rounded-lg shadow">
			<h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
				Your Stats
			</h3>
			<div className="space-y-1 text-sm text-gray-600">
				<p>
					<span className="font-medium text-gray-700">Wins:</span>{" "}
					{stats.wins}
				</p>
				<p>
					<span className="font-medium text-gray-700">Losses:</span>{" "}
					{stats.losses}
				</p>
				{stats.rank && (
					<p>
						<span className="font-medium text-gray-700">Rank:</span>{" "}
						{stats.rank}
					</p>
				)}
				{/* Add more stats as needed */}
			</div>
		</div>
	);
};

export default UserStatsCard;

```

### <a id="hex-ai-frontend-src-components-hex-gameinfo-tsx"></a>hex-ai-frontend/src/components/hex/GameInfo.tsx

```plaintext
"use client";
import React from 'react';
import { GameInfoProps } from '../../types/hexProps'; // Import the correct props interface

// Use the GameInfoProps interface
const GameInfo: React.FC<GameInfoProps> = ({ className, gameMetadata }) => {
  // Function to format date/time nicely (optional)
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString(undefined, { // Use locale default format
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  };

  return (
    // Apply passed className, default text color is inherited
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
        Game Information
      </h2>
      <div className="space-y-1 text-sm"> {/* Add spacing between info items */}
        <p>
          <span className="font-medium text-gray-700">Board Size:</span> {gameMetadata.size}x{gameMetadata.size}
        </p>
        <p>
          <span className="font-medium text-gray-700">Moves:</span> {gameMetadata.moves ?? 0}
        </p>
        {/* Conditionally display created date if available */}
        {gameMetadata.created && (
           <p>
             <span className="font-medium text-gray-700">Started:</span> {formatDateTime(gameMetadata.created)}
           </p>
        )}
        {/* Add more metadata display as needed */}
      </div>

      {/* Remove placeholder text if desired */}
      {/* <p className="mt-4 text-xs text-gray-400">(GameInfo Placeholder Content)</p> */}
    </div>
  );
};

export default GameInfo;

```

### <a id="hex-ai-frontend-src-components-hex-gameplaycontrols-tsx"></a>hex-ai-frontend/src/components/hex/GameplayControls.tsx

```plaintext
// src/components/hex/GameplayControls.tsx
'use client'; // Keep this directive as it uses event handlers

import React from 'react';
// Ensure the path to your types is correct
import { GameplayControlsProps } from '../../types/hexProps';

// Use the updated GameplayControlsProps interface
const GameplayControls: React.FC<GameplayControlsProps> = ({
	className,
	playerTurn,
	winner,
	isDraw, // Added isDraw prop
	onNewGameClick,
	onUndoClick,
	onRedoClick, // Added redo handler prop
	onRestartClick, // Added restart handler prop
	onResignClick, // Kept resign handler prop (optional implementation)
	isInteractionAllowed,
	canUndo, // Added canUndo prop
	canRedo, // Added canRedo prop
	onAiMoveClick, // Added onAiMoveClick prop
}) => {
	// Determine text color for the current player's turn indicator
	const turnColorClass =
		playerTurn === 1
			? "text-red-600"
			: playerTurn === 2
			? "text-blue-600"
			: "text-gray-500"; // Match player colors

	// Determine status message
	let statusMessage: React.ReactNode;
	if (winner !== null) {
		statusMessage = (
			<p
				className={`text-lg font-bold ${
					winner === 1 ? "text-red-600" : "text-blue-600"
				}`}
			>
				Player {winner} Wins! 🎉
			</p>
		);
	} else if (isDraw) {
		statusMessage = (
			<p className="text-lg font-bold text-gray-700">Game Draw! 🤝</p>
		);
	} else if (playerTurn !== null) {
		statusMessage = (
			<p className="text-md">
				Turn:{" "}
				<span className={`font-semibold ${turnColorClass}`}>
					Player {playerTurn}
				</span>
			</p>
		);
	} else {
		statusMessage = <p className="text-md text-gray-500">Loading...</p>; // Handle null turn state
	}

	const isGameOver = winner !== null || isDraw;

	return (
		// Use flex flex-col h-full to make the container take full height and stack vertically
		// Apply passed className, default text color is inherited
		<div className={`flex flex-col h-full ${className}`}>
			<h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
				Controls
			</h2>

			{/* Game Status Area */}
			<div className="mb-4 flex-shrink-0">{statusMessage}</div>

			{/* Spacer to push buttons to the bottom */}
			<div className="flex-grow"></div>

			{/* Action Buttons Area */}
			{/* Use flex-shrink-0 to prevent buttons shrinking */}
			<div className="flex flex-col gap-2 flex-shrink-0">
				{/* New Game Button (Navigates to Dashboard) */}
				<button
					onClick={onNewGameClick}
					// Always enabled unless maybe mid-action? For now, always enabled.
					className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                       bg-indigo-600 text-white hover:bg-indigo-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
				>
					New Game / Dashboard
				</button>

				{/* Restart Button */}
				{onRestartClick && (
					<button
						onClick={onRestartClick}
						// Disable if interaction not allowed (e.g., connection issue)
						disabled={!isInteractionAllowed}
						className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                        bg-yellow-500 text-white
                        hover:bg-yellow-600
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                        disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						Restart Game
					</button>
				)}

				{/* Undo Button */}
				{onUndoClick && (
					<button
						onClick={onUndoClick}
						// Disable if interaction not allowed OR if undo is not possible
						disabled={!canUndo || !isInteractionAllowed}
						className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                        bg-gray-500 text-white
                        hover:bg-gray-600
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                        disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						Undo
					</button>
				)}

				{/* Redo Button (Optional - Backend likely doesn't support) */}
				{onRedoClick && (
					<button
						onClick={onRedoClick}
						// Disable if interaction not allowed OR if redo is not possible
						disabled={!canRedo || !isInteractionAllowed}
						className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                         bg-gray-400 text-white
                         hover:bg-gray-500
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
                         disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						Redo (N/A)
					</button>
				)}

				{/* Resign Button (Optional) */}
				{onResignClick && (
					<button
						onClick={onResignClick}
						// Disable if interaction not allowed (game over handled implicitly)
						disabled={!isInteractionAllowed}
						className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                        bg-red-600 text-white
                        hover:bg-red-700
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                        disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						Resign
					</button>
				)}

				{/* AI Move Button (if provided) */}
				{onAiMoveClick && (
					<button
						onClick={onAiMoveClick}
						disabled={isGameOver}
						className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                        bg-purple-600 text-white hover:bg-purple-700
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                        disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						Request AI Move
					</button>
				)}
			</div>
		</div>
	);
};

export default GameplayControls;

```

### <a id="hex-ai-frontend-src-components-hex-hexboard-tsx"></a>hex-ai-frontend/src/components/hex/HexBoard.tsx

```plaintext
"use client";

import React, { useMemo, useRef, useCallback } from "react";
import { HEX_SIZE } from "../../lib/constants";
import {
	cubeToPixelPointy,
	getHexagonVertices,
	formatVerticesForSVG,
	computeGridCoordinates,
	pixelToHex, // Import for later use
	cubeRound, // Import for later use
	cubeToKey,
} from "@/lib/coordinates";
import {
	HexBoardProps,
	CubeCoordinates,
	PlayerColors,
} from "../..//types/hexProps";

// --- calculateViewBoxPrecise function remains the same ---
const calculateViewBoxPrecise = (
	gridCoords: CubeCoordinates[],
	hexSize: number
): string => {
	if (gridCoords.length === 0) return "0 0 100 100";
	let minX = Infinity,
		minY = Infinity,
		maxX = -Infinity,
		maxY = -Infinity;
	gridCoords.forEach((coords) => {
		const center = cubeToPixelPointy(coords, hexSize);
		const vertices = getHexagonVertices(center.x, center.y, hexSize);
		vertices.forEach((vertex) => {
			minX = Math.min(minX, vertex.x);
			minY = Math.min(minY, vertex.y);
			maxX = Math.max(maxX, vertex.x);
			maxY = Math.max(maxY, vertex.y);
		});
	});
	const padding = hexSize * 0.5;
	minX -= padding;
	minY -= padding;
	maxX += padding;
	maxY += padding;
	const width = maxX - minX;
	const height = maxY - minY;
	return `${minX.toFixed(3)} ${minY.toFixed(3)} ${width.toFixed(
		3
	)} ${height.toFixed(3)}`;
};

// --- getFillColor function remains the same ---
const getFillColor = (
	state: 0 | 1 | 2 | undefined,
	playerColors: PlayerColors
): string => {
	switch (state) {
		case 1:
			return playerColors.p1;
		case 2:
			return playerColors.p2;
		case 0:
		default:
			return playerColors.empty;
	}
};

// --- generateBorderPaths function remains the same ---
const generateBorderPaths = (
	boardSize: number,
	hexSize: number
): { p1Top: string; p1Bottom: string; p2Left: string; p2Right: string } => {
	const pathData = { p1Top: "", p1Bottom: "", p2Left: "", p2Right: "" };
	const N = boardSize;

	// Player 1 Borders (Top: r=0, Bottom: r=N-1) - Correct
	let topPoints: { x: number; y: number }[] = [];
	let bottomPoints: { x: number; y: number }[] = [];
	for (let q = 0; q < N; q++) {
		// Top border (r=0)
		const topCoords: CubeCoordinates = { q, r: 0, s: -q };
		const topCenter = cubeToPixelPointy(topCoords, hexSize);
		const topVertices = getHexagonVertices(
			topCenter.x,
			topCenter.y,
			hexSize
		);
		// Vertices 0 (top-right) and 5 (top) trace the top edge
		if (q === 0) {
			// For the first hex, we need to include the top-left vertex
			topPoints.push(topVertices[4]); // Corrected from 1
		}
		topPoints.push(topVertices[5]);
		topPoints.push(topVertices[0]);

		// Bottom border (r=N-1)
		const bottomCoords: CubeCoordinates = { q, r: N - 1, s: -q - (N - 1) };
		const bottomCenter = cubeToPixelPointy(bottomCoords, hexSize);
		const bottomVertices = getHexagonVertices(
			bottomCenter.x,
			bottomCenter.y,
			hexSize
		);
		// Vertices 3 (bottom left) and 2 (bottom) trace the bottom edge
		bottomPoints.push(bottomVertices[3]);
		bottomPoints.push(bottomVertices[2]);
		if (q === N - 1) {
			// For the last hex, we need to include the bottom-right vertex
			bottomPoints.push(bottomVertices[1]); // Corrected from 0
		}
	}
	pathData.p1Top = `M ${topPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;
	pathData.p1Bottom = `M ${bottomPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;

	// Player 2 Borders (Left: q=0, Right: q=N-1) - Corrected Vertices
	let leftPoints: { x: number; y: number }[] = [];
	let rightPoints: { x: number; y: number }[] = [];
	for (let r = 0; r < N; r++) {
		// Left border (q=0)
		const leftCoords: CubeCoordinates = { q: 0, r, s: -r };
		const leftCenter = cubeToPixelPointy(leftCoords, hexSize);
		const leftVertices = getHexagonVertices(
			leftCenter.x,
			leftCenter.y,
			hexSize
		);
		// Vertices 1 (left) and 2 (bottom-left) trace the left edge
		leftPoints.push(leftVertices[4]); // Corrected from 0
		leftPoints.push(leftVertices[3]); // Corrected from 1

		// Right border (q=N-1)
		const rightCoords: CubeCoordinates = { q: N - 1, r, s: -(N - 1) - r };
		const rightCenter = cubeToPixelPointy(rightCoords, hexSize);
		const rightVertices = getHexagonVertices(
			rightCenter.x,
			rightCenter.y,
			hexSize
		);
		// Vertices 4 (right) and 3 (bottom-right) trace the right edge
		rightPoints.push(rightVertices[0]); // Corrected from 5
		rightPoints.push(rightVertices[1]); // Corrected from 4
	}
	pathData.p2Left = `M ${leftPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;
	pathData.p2Right = `M ${rightPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;

	return pathData;
};

const HexBoard: React.FC<HexBoardProps> = ({
	boardState,
	playerColors,
	onHexClick,
	className,
	boardSize,
	highlightedHexes = [],
}) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const gridCoords = useMemo(
		() => computeGridCoordinates(boardSize),
		[boardSize]
	);
	const viewBox = useMemo(
		() => calculateViewBoxPrecise(gridCoords, HEX_SIZE),
		[gridCoords]
	);
	const highlightedKeys = useMemo(
		() => new Set(highlightedHexes.map(cubeToKey)),
		[highlightedHexes]
	);
	const borderPaths = useMemo(
		() => generateBorderPaths(boardSize, HEX_SIZE),
		[boardSize]
	);

	// Store valid grid coordinate keys in a memoized Set for quick checking
	const validKeys = useMemo(
		() => new Set(gridCoords.map(cubeToKey)),
		[gridCoords]
	);

	// --- Updated handleSvgClick with Accurate Pixel-to-Hex Logic ---
	const handleSvgClick = useCallback(
		(event: React.MouseEvent<SVGSVGElement>) => {
			console.log("--- handleSvgClick (Custom Coords) ---");
			if (!svgRef.current) {
				console.error("SVG ref not available.");
				return;
			}
			const svgElement = svgRef.current;
			const svgRect = svgElement.getBoundingClientRect();
			const vb = svgElement.viewBox.baseVal;

			if (!vb || svgRect.width === 0 || svgRect.height === 0) {
				console.error("SVG dimensions or viewBox not available.");
				return;
			}
			console.log(
				`SVG Rect: { left: ${svgRect.left.toFixed(
					2
				)}, top: ${svgRect.top.toFixed(
					2
				)}, width: ${svgRect.width.toFixed(
					2
				)}, height: ${svgRect.height.toFixed(2)} }`
			);
			console.log(
				`ViewBox: { x: ${vb.x.toFixed(2)}, y: ${vb.y.toFixed(
					2
				)}, width: ${vb.width.toFixed(2)}, height: ${vb.height.toFixed(
					2
				)} }`
			);
			const clickXRelative = event.clientX - svgRect.left;
			const clickYRelative = event.clientY - svgRect.top;
			console.log(
				`Click Relative: { x: ${clickXRelative.toFixed(
					2
				)}, y: ${clickYRelative.toFixed(
					2
				)} } (Screen click: { clientX: ${event.clientX}, clientY: ${
					event.clientY
				} })`
			);
			const svgInternalX =
				vb.x + (clickXRelative * vb.width / svgRect.width);
			const svgInternalY =
				vb.y + (clickYRelative * vb.height / svgRect.height);
			console.log(
				`SVG Internal Coords: { x: ${svgInternalX.toFixed(
					3
				)}, y: ${svgInternalY.toFixed(3)} }`
			);
			const fractionalHex = pixelToHex(
				svgInternalX,
				svgInternalY,
				HEX_SIZE
			); // Use custom function
			console.log(
				`Fractional Hex: { q: ${fractionalHex.q.toFixed(
					3
				)}, r: ${fractionalHex.r.toFixed(
					3
				)}, s: ${fractionalHex.s.toFixed(3)} }`
			);
			const clickedCubeCoords = cubeRound(fractionalHex); // Use custom function
			console.log(
				`Rounded Cube Coords: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
			);
			const clickedKey = cubeToKey(clickedCubeCoords);
			if (validKeys.has(clickedKey)) {
				console.log(
					`VALID Click -> Calling onHexClick with: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
				);
				onHexClick(clickedCubeCoords);
			} else {
				console.log(
					`INVALID Click - Outside valid hex grid area. Coords: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
				);
			}
			console.log("--- handleSvgClick End ---");
		},
		[onHexClick, validKeys]
	);

	return (
		<svg
			ref={svgRef} // Assign the ref
			viewBox={viewBox}
			preserveAspectRatio="xMidYMid meet"
			className={`w-full h-auto ${className || ""}`}
			style={{ backgroundColor: playerColors.background }}
			onClick={handleSvgClick} // Attach click handler
		>
			<g>
				{" "}
				{/* Group for Hexagons */}
				{gridCoords.map((coords) => {
					const center = cubeToPixelPointy(coords, HEX_SIZE);
					const vertices = getHexagonVertices(
						center.x,
						center.y,
						HEX_SIZE
					);
					const points = formatVerticesForSVG(vertices);
					const key = cubeToKey(coords);
					const hexState = boardState.get(key);
					const fillColor = getFillColor(hexState, playerColors);
					const isHighlighted = highlightedKeys.has(key);
					const strokeColor = isHighlighted ? "black" : "#CBD5E0"; // gray-300
					const strokeWidth = isHighlighted
						? Math.max(1.5, 2.5 * (30 / HEX_SIZE))
						: 1;

					return (
						<polygon
							key={key}
							// Remove data attributes, no longer needed for click handling
							points={points}
							fill={fillColor}
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							// Add pointer-events: none if clicks should only register on SVG background
							// style={{ pointerEvents: 'none' }}
							className="cursor-pointer transition-opacity duration-150 hover:opacity-80"
						/>
					);
				})}
			</g>

			{/* Render Border Paths */}
			<g
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
				style={{ pointerEvents: "none" }}
			>
				{" "}
				{/* Make borders non-interactive */}
				<path
					d={borderPaths.p1Top}
					stroke={playerColors.p1}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p1Bottom}
					stroke={playerColors.p1}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p2Left}
					stroke={playerColors.p2}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p2Right}
					stroke={playerColors.p2}
					strokeWidth={HEX_SIZE * 0.15}
				/>
			</g>
		</svg>
	);
};

export default HexBoard;

```

### <a id="hex-ai-frontend-src-components-replay-replaycontrolbar-tsx"></a>hex-ai-frontend/src/components/replay/ReplayControlBar.tsx

```plaintext
"use client"; // Needs client component for state and interaction

import React from "react";
// Example icons
import {
	PlayIcon,
	PauseIcon,
	ForwardIcon,
	BackwardIcon,
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon,
	StopIcon,
	PlayPauseIcon,
} from "@heroicons/react/20/solid";

interface ReplayControlBarProps {
	rel;
	currentMove: number;
	totalMoves: number;
	isPlaying: boolean;
	onPlayPause: () => void;
	onNext: () => void;
	onPrevious: () => void;
	onGoToStart: () => void;
	onGoToEnd: () => void;
	onSeek?: (moveNumber: number) => void; // Optional seek functionality
}

const ReplayControlBar: React.FC<ReplayControlBarProps> = ({
	currentMove,
	totalMoves,
	isPlaying,
	onPlayPause,
	onNext,
	onPrevious,
	onGoToStart,
	onGoToEnd,
	onSeek,
}) => {
	const canGoBack = currentMove > 0;
	const canGoForward = currentMove < totalMoves;

	const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onSeek) {
			const value = parseInt(event.target.value, 10);
			onSeek(value);
		}
	};

	return (
		<div className="bg-gray-50 p-3 rounded-b-lg border-t border-gray-200">
			{" "}
			{/* Example styling */}
			{/* Optional Seek Slider */}
			{onSeek && totalMoves > 0 && (
				<div className="mb-2 px-2">
					<label htmlFor="replay-seek" className="sr-only">
						Seek Replay
					</label>
					<input
						type="range"
						id="replay-seek"
						min="0"
						max={totalMoves}
						value={currentMove}
						onChange={handleSeek}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
					/>
					<div className="flex justify-between text-xs text-gray-500 mt-1">
						<span>Move: {currentMove}</span>
						<span>Total: {totalMoves}</span>
					</div>
				</div>
			)}
			{/* Control Buttons */}
			<div className="flex items-center justify-center space-x-3">
				{/* Go to Start */}
				<button
					onClick={onGoToStart}
					disabled={!canGoBack}
					title="Go to Start"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<BackwardIcon className="h-5 w-5" />
				</button>
				{/* Previous */}
				<button
					onClick={onPrevious}
					disabled={!canGoBack}
					title="Previous Move"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ArrowUturnLeftIcon className="h-5 w-5" />
				</button>
				{/* Play/Pause */}
				<button
					onClick={onPlayPause}
					title={isPlaying ? "Pause" : "Play"}
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					{isPlaying ? (
						<PauseIcon className="h-6 w-6" />
					) : (
						<PlayIcon className="h-6 w-6" />
					)}
				</button>
				{/* Next */}
				<button
					onClick={onNext}
					disabled={!canGoForward}
					title="Next Move"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ArrowUturnRightIcon className="h-5 w-5" />
				</button>
				{/* Go to End */}
				<button
					onClick={onGoToEnd}
					disabled={!canGoForward}
					title="Go to End"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ForwardIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

export default ReplayControlBar;

```

### <a id="hex-ai-frontend-src-components-settings-gameoptiontoggles-tsx"></a>hex-ai-frontend/src/components/settings/GameOptionToggles.tsx

```plaintext
"use client"; // Needs client component for state

import React, { useState } from "react";

interface GameOptionTogglesProps {
	// Props for initial settings
}

const GameOptionToggles: React.FC<GameOptionTogglesProps> = () => {
	// Example state
	const [showHints, setShowHints] = useState(true);
	const [defaultDifficulty, setDefaultDifficulty] = useState("medium");

	return (
		<fieldset className="space-y-4">
			<legend className="text-sm font-medium text-gray-700 sr-only">
				Gameplay Options
			</legend>{" "}
			{/* Screen reader only legend */}
			{/* Example Toggle */}
			<div className="relative flex items-start">
				<div className="flex h-5 items-center">
					<input
						id="show-hints"
						aria-describedby="show-hints-description"
						name="show-hints"
						type="checkbox"
						checked={showHints}
						onChange={(e) => setShowHints(e.target.checked)}
						className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
				</div>
				<div className="ml-3 text-sm">
					<label
						htmlFor="show-hints"
						className="font-medium text-gray-700"
					>
						Show Gameplay Hints
					</label>
					<p id="show-hints-description" className="text-gray-500">
						Display helpful hints during your turn (vs AI).
					</p>
				</div>
			</div>
			{/* Example Radio Group */}
			<div>
				<label className="text-sm font-medium text-gray-700">
					Default AI Difficulty
				</label>
				<div className="mt-2 space-y-2">
					{(["easy", "medium", "hard"] as const).map((difficulty) => (
						<div className="flex items-center" key={difficulty}>
							<input
								id={`difficulty-${difficulty}`}
								name="difficulty-option"
								type="radio"
								value={difficulty}
								checked={defaultDifficulty === difficulty}
								onChange={() =>
									setDefaultDifficulty(difficulty)
								}
								className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label
								htmlFor={`difficulty-${difficulty}`}
								className="ml-2 block text-sm text-gray-900 capitalize"
							>
								{difficulty}
							</label>
						</div>
					))}
				</div>
			</div>
		</fieldset>
	);
};

export default GameOptionToggles;

```

### <a id="hex-ai-frontend-src-components-settings-themeselector-tsx"></a>hex-ai-frontend/src/components/settings/ThemeSelector.tsx

```plaintext
    'use client'; // Needs client component for state/interaction

    import React, { useState, useEffect } from 'react';

    interface ThemeSelectorProps {}

    const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
        // Example state - actual theme switching needs more logic (e.g., context, localStorage)
        const [theme, setTheme] = useState<'light' | 'dark'>('light');

        // TODO: Implement actual theme switching logic
        // This might involve updating a class on the <html> element
        // and saving the preference (e.g., in localStorage)
        useEffect(() => {
            console.log("Theme selected:", theme);
            // Example: document.documentElement.classList.toggle('dark', theme === 'dark');
        }, [theme]);


        return (
            <fieldset>
                 <legend className="text-sm font-medium text-gray-700 mb-1">Select Theme</legend>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <input
                            id="light-theme"
                            name="theme-option"
                            type="radio"
                            value="light"
                            checked={theme === 'light'}
                            onChange={() => setTheme('light')}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="light-theme" className="ml-2 block text-sm text-gray-900">
                            Light
                        </label>
                    </div>
                     <div className="flex items-center">
                        <input
                            id="dark-theme"
                            name="theme-option"
                            type="radio"
                            value="dark"
                            checked={theme === 'dark'}
                            onChange={() => setTheme('dark')}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="dark-theme" className="ml-2 block text-sm text-gray-900">
                            Dark
                        </label>
                    </div>
                 </div>
            </fieldset>
        );
    };

    export default ThemeSelector;
    
```

### <a id="hex-ai-frontend-src-components-settings-userprofileform-tsx"></a>hex-ai-frontend/src/components/settings/UserProfileForm.tsx

```plaintext
"use client"; // Forms typically need client components for state

import React, { useState } from "react";

interface UserProfileFormProps {
	// Props for initial data, e.g., initialUsername: string;
}

const UserProfileForm: React.FC<UserProfileFormProps> = () => {
	// Example state for form fields
	const [username, setUsername] = useState("CurrentUser"); // Replace with actual data later
	const [email, setEmail] = useState("user@example.com"); // Replace with actual data later

	return (
		<div className="space-y-4">
			<div>
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email (Read-only example)
				</label>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					readOnly // Example: Email might not be editable
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
				/>
			</div>
			{/* Add Avatar upload/display later */}
		</div>
	);
};

export default UserProfileForm;

```

### <a id="hex-ai-frontend-src-components-ui-sidebarnav-tsx"></a>hex-ai-frontend/src/components/ui/SideBarNav.tsx

```plaintext
'use client'; // Needs to be a client component to use usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // Import React

// Example icons, you might need different ones
import {
  HomeIcon, // For Dashboard
  // PuzzlePieceIcon, // For Game - REMOVED
  PlayCircleIcon, // For Replay (If added later)
  Cog6ToothIcon, // For Settings
  // QuestionMarkCircleIcon // Placeholder for other links
} from '@heroicons/react/24/outline';


// Define navigation items
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  // { name: 'Game', href: '/game', icon: PuzzlePieceIcon }, // <-- REMOVED THIS LINE
  // Add Replay link later if needed, maybe points to a list first
  // { name: 'Replays', href: '/replays', icon: PlayCircleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

// Helper function to apply conditional classes
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4 flex flex-col">
      {/* Logo/Brand Area */}
      <div className="mb-8 flex items-center justify-center h-16">
        {/* You can replace this with an actual logo component or image */}
        <span className="text-2xl font-bold text-white">Hex AI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              // Basic active check: true if pathname starts with item.href
              // More specific checks might be needed (e.g., exact match for dashboard)
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out'
            )}
            aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                pathname.startsWith(item.href) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                'mr-3 flex-shrink-0 h-5 w-5' // Adjusted icon size slightly
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Optional: User Profile/Logout section at bottom */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        {/* Placeholder for user info/logout */}
        <p className="text-xs text-gray-400 text-center">User Actions Area</p>
      </div>
    </aside>
  );
}


```

### <a id="hex-ai-frontend-src-hooks-usegamewebsocket-ts"></a>hex-ai-frontend/src/hooks/useGameWebSocket.ts

```plaintext
import { useState, useCallback, useRef, useEffect } from 'react';

// Enum for WebSocket connection states
export enum WebSocketState {
	CONNECTING = "CONNECTING",
	OPEN = "OPEN",
	CLOSING = "CLOSING",
	CLOSED = "CLOSED",
	ERROR = "ERROR",
	RECONNECTING = "RECONNECTING", // Add a reconnecting state
}

// Interface for the hook's return value
interface UseGameWebSocketReturn {
	connectionState: WebSocketState;
	sendMessage: (payload: object) => void;
	connect: (url: string) => void;
	disconnect: () => void;
	lastMessage: any | null;
	error: Event | Error | null; // Allow Error type for creation failures
	reconnect: () => void; // Add explicit reconnect method
}

// Configuration options interface
interface WebSocketOptions {
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  heartbeatMessage?: object;
  debug?: boolean;
}

const DEFAULT_OPTIONS: WebSocketOptions = {
  reconnectAttempts: 3,
  reconnectInterval: 2000,
  heartbeatInterval: 30000,
  heartbeatMessage: { action: 'ping' },
  debug: false,
};

/**
 * Custom hook to manage a WebSocket connection with improved error handling and reconnection.
 * @param onMessageCallback Optional callback function to handle incoming messages.
 * @param options Configuration options for the WebSocket behavior.
 */
export function useGameWebSocket(
	onMessageCallback?: (message: any) => void,
	options?: Partial<WebSocketOptions>
): UseGameWebSocketReturn {
	const [connectionState, setConnectionState] = useState<WebSocketState>(
		WebSocketState.CLOSED
	);
	const [lastMessage, setLastMessage] = useState<any | null>(null);
	const [error, setError] = useState<Event | Error | null>(null);

	const ws = useRef<WebSocket | null>(null);
	const reconnectCount = useRef<number>(0);
	const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
	const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
	const lastPongRef = useRef<number>(Date.now());
	const urlRef = useRef<string>("");

	// Merge default options with provided options
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
	const {
		reconnectAttempts,
		reconnectInterval,
		heartbeatInterval,
		heartbeatMessage,
		debug,
	} = mergedOptions;

	// Logger function that respects the debug option
	const log = useCallback(
		(type: "log" | "warn" | "error", ...args: any[]) => {
			if (debug || type === "error") {
				console[type](`[WebSocket]`, ...args);
			}
		},
		[debug]
	);

	// Setup heartbeat to keep connection alive
	const setupHeartbeat = useCallback(() => {
		if (heartbeatTimerRef.current) {
			clearInterval(heartbeatTimerRef.current);
		}

		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			lastPongRef.current = Date.now();

			heartbeatTimerRef.current = setInterval(() => {
				if (ws.current?.readyState === WebSocket.OPEN) {
					try {
						// Send heartbeat message
						ws.current.send(JSON.stringify(heartbeatMessage));
						log("log", "Heartbeat sent");

						// Check if we've missed too many pongs
						const timeSinceLastPong =
							Date.now() - lastPongRef.current;
						if (timeSinceLastPong > heartbeatInterval * 2) {
							log(
								"warn",
								"No pong received for too long, reconnecting"
							);
							attemptReconnect();
						}
					} catch (e) {
						log("error", "Failed to send heartbeat:", e);
						attemptReconnect();
					}
				} else {
					clearInterval(heartbeatTimerRef.current!);
					heartbeatTimerRef.current = null;
				}
			}, heartbeatInterval);
		}
	}, [heartbeatInterval, heartbeatMessage, log]);

	// Attempt to reconnect to the WebSocket
	const attemptReconnect = useCallback(() => {
		if (
			reconnectCount.current < reconnectAttempts! &&
			connectionState !== WebSocketState.CONNECTING &&
			connectionState !== WebSocketState.RECONNECTING
		) {
			log(
				"log",
				`Attempting to reconnect (${
					reconnectCount.current + 1
				}/${reconnectAttempts})`
			);
			setConnectionState(WebSocketState.RECONNECTING);

			if (reconnectTimerRef.current) {
				clearTimeout(reconnectTimerRef.current);
			}

			reconnectTimerRef.current = setTimeout(() => {
				reconnectCount.current += 1;
				connect(urlRef.current);
			}, reconnectInterval);
		} else if (reconnectCount.current >= reconnectAttempts!) {
			log(
				"error",
				`Max reconnect attempts (${reconnectAttempts}) reached`
			);
			setConnectionState(WebSocketState.ERROR);
			setError(
				new Error(
					`Failed to reconnect after ${reconnectAttempts} attempts`
				)
			);
			reconnectCount.current = 0;
		}
	}, [connectionState, reconnectAttempts, reconnectInterval, log]);

	// Function to connect to a WebSocket URL
	const connect = useCallback(
		(url: string) => {
			// Store the URL for potential reconnections
			urlRef.current = url;

			// Prevent multiple connections if already open or connecting
			if (
				ws.current &&
				(ws.current.readyState === WebSocket.OPEN ||
					ws.current.readyState === WebSocket.CONNECTING)
			) {
				log(
					"log",
					`WebSocket already ${
						ws.current.readyState === WebSocket.OPEN
							? "open"
							: "connecting"
					}.`
				);
				return;
			}

			// Clean up previous connection if any
			cleanup();

			log("log", `Connecting to ${url}...`);
			setConnectionState(WebSocketState.CONNECTING);
			setError(null);
			setLastMessage(null);

			try {
				ws.current = new WebSocket(url);

				ws.current.onopen = () => {
					log("log", "WebSocket connection opened.");
					setConnectionState(WebSocketState.OPEN);
					setError(null);
					reconnectCount.current = 0; // Reset reconnect counter on successful connection
					setupHeartbeat(); // Set up the heartbeat for this connection
				};

				ws.current.onmessage = (event) => {
					lastPongRef.current = Date.now(); // Update last pong time on any message

					try {
						const message = JSON.parse(event.data);
						log("log", "Message received:", message);
						setLastMessage(message);

						// Check if this is a pong response
						if (message.type === "pong") {
							log("log", "Pong received");
							return;
						}

						if (onMessageCallback) {
							onMessageCallback(message);
						}
					} catch (e) {
						log(
							"error",
							"Failed to parse WebSocket message:",
							e,
							"Raw data:",
							event.data
						);
					}
				};

				ws.current.onerror = (event) => {
					log("error", "WebSocket error:", event);
					// Don't override RECONNECTING state with ERROR
					if (connectionState !== WebSocketState.RECONNECTING) {
						setConnectionState(WebSocketState.ERROR);
						setError(event);
					}

					// Attempt to reconnect on error
					attemptReconnect();
				};

				ws.current.onclose = (event) => {
					log(
						"log",
						`WebSocket connection closed: Code=${event.code}, Reason=${event.reason}`
					);

					// Clean up heartbeat timer
					if (heartbeatTimerRef.current) {
						clearInterval(heartbeatTimerRef.current);
						heartbeatTimerRef.current = null;
					}

					// Only update state if it wasn't an intentional close
					if (
						connectionState !== WebSocketState.CLOSING &&
						connectionState !== WebSocketState.RECONNECTING
					) {
						setConnectionState(WebSocketState.CLOSED);

						// Attempt to reconnect on unintentional close
						if (event.code !== 1000) {
							// Normal closure
							attemptReconnect();
						}
					}

					// Null the ref only if it matches the current URL
					if (ws.current && ws.current.url === url) {
						ws.current = null;
					}
				};
			} catch (err) {
				log("error", "Failed to create WebSocket:", err);
				setConnectionState(WebSocketState.ERROR);
				setError(
					err instanceof Error
						? err
						: new Error("WebSocket creation failed")
				);
				ws.current = null;

				// Attempt to reconnect on creation failure
				attemptReconnect();
			}
		},
		[
			onMessageCallback,
			attemptReconnect,
			setupHeartbeat,
			log,
			connectionState,
		]
	);

	// Explicit reconnect function
	const reconnect = useCallback(() => {
		log("log", "Manual reconnect requested");
		reconnectCount.current = 0; // Reset counter for manual reconnect
		connect(urlRef.current);
	}, [connect, log]);

	// Cleanup function to handle disconnection
	const cleanup = useCallback(() => {
		if (ws.current) {
			log("log", "Cleaning up existing connection");

			// Clear timers
			if (heartbeatTimerRef.current) {
				clearInterval(heartbeatTimerRef.current);
				heartbeatTimerRef.current = null;
			}

			if (reconnectTimerRef.current) {
				clearTimeout(reconnectTimerRef.current);
				reconnectTimerRef.current = null;
			}

			// Close WebSocket if it's not already closed
			if (
				ws.current.readyState !== WebSocket.CLOSED &&
				ws.current.readyState !== WebSocket.CLOSING
			) {
				setConnectionState(WebSocketState.CLOSING);
				ws.current.close();
			}

			ws.current = null;
		}
	}, [log]);

	// Function to disconnect the WebSocket
	const disconnect = useCallback(() => {
		log("log", "Disconnect requested");
		cleanup();
		setConnectionState(WebSocketState.CLOSED);
	}, [cleanup, log]);

	// Function to send a JSON message with retry capability
	const sendMessage = useCallback(
		(payload: object) => {
			if (ws.current && ws.current.readyState === WebSocket.OPEN) {
				try {
					const messageString = JSON.stringify(payload);
					log("log", "Sending message:", messageString);
					ws.current.send(messageString);
					return true;
				} catch (e) {
					log("error", "Failed to stringify or send message:", e);
					return false;
				}
			} else {
				log(
					"warn",
					`Cannot send message: WebSocket is not open (State: ${ws.current?.readyState})`
				);

				// Attempt reconnection if not open
				if (
					connectionState !== WebSocketState.CONNECTING &&
					connectionState !== WebSocketState.RECONNECTING
				) {
					attemptReconnect();
				}

				return false;
			}
		},
		[connectionState, attemptReconnect, log]
	);

	// Effect to disconnect on component unmount
	useEffect(() => {
		return () => {
			log("log", "Cleaning up WebSocket on unmount");
			cleanup();
		};
	}, [cleanup, log]);

	return {
		connectionState,
		sendMessage,
		connect,
		disconnect,
		lastMessage,
		error,
		reconnect,
	};
}

```

### <a id="hex-ai-frontend-src-lib-constants-ts"></a>hex-ai-frontend/src/lib/constants.ts

```plaintext
/**
 * Defines the size (radius) of the hexagons in SVG coordinate units.
 * This value is fundamental for coordinate conversions and vertex calculations.
 */
export const HEX_SIZE: number = 30; // Example size, adjust as needed for visual appearance

```

### <a id="hex-ai-frontend-src-lib-coordinates-ts"></a>hex-ai-frontend/src/lib/coordinates.ts

```plaintext
import { CubeCoordinates } from '@/types/hexProps';
import { HEX_SIZE } from './constants'; // Import hex size

/**
 * Converts Cube coordinates {q, r, s} to pixel coordinates {x, y} for pointy-top hexagons.
 * Assumes the origin (0,0) of the SVG coordinate system corresponds to the center
 * of the hexagon at Cube coordinates (0, 0, 0). Adjustments might be needed based on
 * how the parallelogram grid is centered.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#hex-to-pixel
 * @param cube - The Cube coordinates {q, r, s}.
 * @param size - The size (radius) of the hexagon.
 * @returns The pixel coordinates {x, y}.
 */
export function cubeToPixelPointy(cube: CubeCoordinates, size: number): { x: number; y: number } {
  // Use q and r from Cube coordinates (s is redundant: s = -q -r)
  const q = cube.q;
  const r = cube.r;
  // Apply the pointy-top axial_to_pixel formula
  const x = size * Math.sqrt(3) * (q + r / 2);
  const y = size * (3 / 2) * r;
  return { x, y };
}

/**
 * Calculates the six vertex coordinates for a pointy-top hexagon relative to its center.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#basics
 * @param centerX - The x-coordinate of the hexagon's center.
 * @param centerY - The y-coordinate of the hexagon's center.
 * @param size - The size (radius) of the hexagon.
 * @returns An array of six {x, y} vertex coordinates.
 */
export function getHexagonVertices(centerX: number, centerY: number, size: number): { x: number; y: number }[] {
  const vertices: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    // Angle calculation for pointy-top vertices
    // Starts at -30 degrees (pointing upwards) and increments by 60 degrees.
    const angleRad = Math.PI / 180 * (60 * i - 30);
    const x = centerX + size * Math.cos(angleRad);
    const y = centerY + size * Math.sin(angleRad);
    vertices.push({ x, y });
  }
  return vertices;
}

/**
 * Formats an array of vertex coordinates into a string suitable for an SVG polygon's 'points' attribute.
 * @param vertices - An array of {x, y} vertex coordinates.
 * @returns A string like "x1,y1 x2,y2 ... x6,y6".
 */
export function formatVerticesForSVG(vertices: { x: number; y: number }[]): string {
  return vertices.map(v => `${v.x.toFixed(3)},${v.y.toFixed(3)}`).join(' '); // Use toFixed for cleaner output
}

/**
 * Converts pixel coordinates (within the SVG's internal coordinate system)
 * back to fractional Cube coordinates {q, r, s}.
 * This is the inverse of cubeToPixelPointy.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
 * @param pixelX - The x-coordinate within the SVG's internal system.
 * @param pixelY - The y-coordinate within the SVG's internal system.
 * @param size - The size (radius) of the hexagons used for rendering.
 * @returns Fractional Cube coordinates {q, r, s}.
 */
export function pixelToHex(pixelX: number, pixelY: number, size: number): CubeCoordinates {
  // Apply the inverse formula for pointy-top hexagons
  const q_frac = (Math.sqrt(3) / 3 * pixelX - 1 / 3 * pixelY) / size;
  const r_frac = (2 / 3 * pixelY) / size;
  const s_frac = -q_frac - r_frac; // Derive s from q and r
  return { q: q_frac, r: r_frac, s: s_frac };
}

/**
 * Rounds fractional Cube coordinates to the nearest integer Cube coordinates,
 * ensuring the constraint q + r + s = 0 is maintained.
 * Based on the rounding algorithm from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#rounding
 * @param fracCube - The fractional Cube coordinates {q, r, s}.
 * @returns The nearest integer Cube coordinates {q, r, s}.
 */
export function cubeRound(fracCube: CubeCoordinates): CubeCoordinates {
  let q = Math.round(fracCube.q);
  let r = Math.round(fracCube.r);
  let s = Math.round(fracCube.s);

  const q_diff = Math.abs(q - fracCube.q);
  const r_diff = Math.abs(r - fracCube.r);
  const s_diff = Math.abs(s - fracCube.s);

  // Reset the component with the largest rounding difference to maintain the constraint
  if (q_diff > r_diff && q_diff > s_diff) {
    q = -r - s;
  } else if (r_diff > s_diff) {
    r = -q - s;
  } else {
    s = -q - r;
  }

  return { q, r, s };
}

/**
 * Generates all valid CubeCoordinates for a standard NxN Hex game board,
 * which forms a parallelogram (rhombus) shape.
 * Uses Axial coordinates 0 <= q < N and 0 <= r < N internally.
 * @param boardSize - The size N of the board (e.g., 11 for 11x11).
 * @returns An array of CubeCoordinates representing all hexes on the board.
 */
export function computeGridCoordinates(boardSize: number): CubeCoordinates[] {
  const coordinates: CubeCoordinates[] = [];
  // Iterate q from 0 to N-1
  for (let q = 0; q < boardSize; q++) {
    // Iterate r from 0 to N-1
    for (let r = 0; r < boardSize; r++) {
      // Calculate s based on q and r to satisfy the Cube constraint q + r + s = 0
      const s = -q - r;
      coordinates.push({ q, r, s });
    }
  }
  return coordinates;
}


/**
 * Helper function to create a string key from CubeCoordinates, useful for Maps.
 * @param coords - The CubeCoordinates object.
 * @returns A string representation like "q,r,s".
 */
export function cubeToKey(coords: CubeCoordinates): string {
  return `${coords.q},${coords.r},${coords.s}`;
}

/**
 * Helper function to convert a string key back to CubeCoordinates.
 * @param key - The string representation like "q,r,s".
 * @returns A CubeCoordinates object. Returns null if key is invalid.
 */
export function keyToCube(key: string): CubeCoordinates | null {
    const parts = key.split(',');
    if (parts.length !== 3) return null;
    const q = parseInt(parts[0], 10);
    const r = parseInt(parts[1], 10);
    const s = parseInt(parts[2], 10);
    if (isNaN(q) || isNaN(r) || isNaN(s) || q + r + s !== 0) {
        return null; // Invalid key or doesn't satisfy constraint
    }
    return { q, r, s };
}

// --- Backend XY <-> Frontend Cube Conversion ---
// ** CRITICAL: Verify & Update based on Backend **

/**
 * Converts Frontend CubeCoordinates (q, r, s) to Backend XY coordinates (x, y).
 * **MUST** be updated to match the coordinate system used by the backend API.
 * The current implementation assumes the backend uses Axial coordinates (x=q, y=r).
 * Check backend code (e.g., consumers.py) to confirm how 'x' and 'y' are interpreted.
 *
 * @param coords Frontend CubeCoordinates.
 * @param boardSize The size of the board (e.g., 11).
 * @returns Object { x: number, y: number } or null if invalid/unconvertible.
 */
export function cubeToXY(coords: CubeCoordinates, boardSize: number = 11): { x: number; y: number } | null {
    // --- Active Implementation: Assuming Backend uses Axial x=q, y=r ---
    // VERIFY THIS ASSUMPTION WITH YOUR BACKEND CODE.
    const x_axial = coords.r;
    const y_axial = coords.q;

    // Validate if the resulting x, y are within the expected 0 to N-1 range.
    if (x_axial >= 0 && x_axial < boardSize && y_axial >= 0 && y_axial < boardSize) {
        return { x: x_axial, y: y_axial };
    }

    // --- Add other implementations (e.g., for Offset) below if needed, ---
    // --- but only activate the one that matches the backend. ---

    console.warn(`Cannot convert Cube coordinates (${coords.q}, ${coords.r}, ${coords.s}) to backend XY using the current implementation (Axial assumed). Verify backend coordinate system.`);
    return null; // Conversion failed or coords out of range for the chosen system
}

/**
 * Converts Backend XY coordinates (x, y) received from the API to Frontend CubeCoordinates (q, r, s).
 * **MUST** be updated to match the coordinate system used by the backend API.
 * This **MUST** be the exact inverse of the chosen `cubeToXY` implementation.
 * The current implementation assumes the backend uses Axial coordinates (x=q, y=r).
 *
 * @param x Backend x coordinate (0-10).
 * @param y Backend y coordinate (0-10).
 * @returns CubeCoordinates object or null if input is invalid.
 */
export function xyToCube(x: number, y: number): CubeCoordinates | null {
     // Basic validation for backend coordinates
     if (x === undefined || y === undefined || x < 0 || y < 0) {
         console.warn(`Invalid backend XY coordinates received: x=${x}, y=${y}`);
         return null;
     }

    // --- Active Implementation: Assuming Backend uses Axial x=q, y=r ---
    // VERIFY THIS ASSUMPTION WITH YOUR BACKEND CODE.
    const q_axial = y;
    const r_axial = x;
    const s_axial = -q_axial - r_axial; // Calculate s using the constraint q+r+s=0
    return { q: q_axial, r: r_axial, s: s_axial };

    // --- Add other implementations (e.g., for Offset) below if needed, ---
    // --- but only activate the one that matches the backend. ---

    // console.warn(`Cannot convert backend XY coordinates (${x}, ${y}) to Cube using the current implementation (Axial assumed). Verify backend coordinate system.`);
    // return null; // If no valid conversion matches
}

```

### <a id="hex-ai-frontend-src-store-gamestore-ts"></a>hex-ai-frontend/src/store/gameStore.ts

```plaintext
// src/store/gameStore.ts
import { create } from 'zustand';
import { CubeCoordinates } from '../types/hexProps'; // Assuming hexProps defines PlayerColors too
import {
	computeGridCoordinates,
	cubeToKey,
	cubeToXY,
	xyToCube,
} from "../lib/coordinates";
import { WebSocketState } from "@/hooks/useGameWebSocket";

const BOARD_SIZE = 11;

// --- Helper Functions ---

/**
 * Initializes the board state map with all hexes set to empty (0).
 * @param size - The board size (e.g., 11).
 * @returns A Map where keys are "q,r,s" strings and values are 0, 1, or 2.
 */
const initializeBoardState = (size: number): Map<string, 0 | 1 | 2> => {
	const state = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => {
		state.set(cubeToKey(coords), 0); // 0 represents an empty hex
	});
	return state;
};

/**
 * Maps backend player identifiers ('human', 'AI', 'AI_1', 'AI_2', null, 'draw')
 * to frontend player representation (1 for Red, 2 for Blue, null for ongoing/draw).
 * @param backendPlayer - The player identifier string from the backend.
 * @returns 1, 2, or null.
 */
const mapBackendPlayerToFrontend = (
	backendPlayer: string | null
): 1 | 2 | null => {
	// Mapping based on backend code (models.py, consumers.py)
	// Assuming Red is Player 1, Blue is Player 2
	// Human is assumed P1 if red, P2 if blue (handled by checking human_color later if needed)
	// AI is assumed P2 if human is red, P1 if human is blue
	// AI_1 is assumed P1 (Red), AI_2 is assumed P2 (Blue) in AI_AI mode
	if (backendPlayer === "human" || backendPlayer === "AI_1") return 1; // Player 1 (Red)
	if (backendPlayer === "AI" || backendPlayer === "AI_2") return 2; // Player 2 (Blue)
	if (backendPlayer === null || backendPlayer === "draw") return null; // Game ongoing, Draw, or explicitly null winner
	console.warn(
		`Unknown backend player identifier encountered: ${backendPlayer}`
	);
	return null; // Return null for unknown cases
};

/**
 * Maps the backend board representation (11x11 array) to the frontend board state map.
 * @param backendBoard - The 11x11 array from the backend (1=Red, -1=Blue, 0=Empty).
 * Assumes backendBoard[row][col] indexing.
 * @returns A Map representing the frontend board state.
 */
const mapBackendBoard = (
	backendBoard: (0 | 1 | -1)[][]
): Map<string, 0 | 1 | 2> => {
	// Validate backendBoard structure
	if (
		!backendBoard ||
		!Array.isArray(backendBoard) ||
		backendBoard.length !== BOARD_SIZE
	) {
		console.error(
			"Invalid backend board structure received. Expected 11x11 array.",
			backendBoard
		);
		return initializeBoardState(BOARD_SIZE); // Return empty board on error
	}

	const frontendBoard = new Map<string, 0 | 1 | 2>();
	// Use clearer variable names: 'row' for backend 'x', 'col' for backend 'y'
	for (let row = 0; row < BOARD_SIZE; row++) {
		if (
			!Array.isArray(backendBoard[row]) ||
			backendBoard[row].length !== BOARD_SIZE
		) {
			console.error(
				`Invalid backend board row structure at index row=${row}.`,
				backendBoard[row]
			);
			continue; // Skip invalid row
		}
		for (let col = 0; col < BOARD_SIZE; col++) {
			// Convert backend row, col indices to frontend CubeCoordinates
			// xyToCube expects (rowIndex, columnIndex)
			const coords = xyToCube(row, col); // Pass row index first, then column index

			if (coords) {
				const backendValue = backendBoard[row][col];
				// Backend: 1=Red(P1), -1=Blue(P2), 0=Empty
				// Frontend: 1=P1, 2=P2, 0=Empty
				const frontendValue =
					backendValue === 1 ? 1 : backendValue === -1 ? 2 : 0;
				frontendBoard.set(
					cubeToKey(coords),
					frontendValue as 0 | 1 | 2
				);
			} else {
				// This should ideally not happen if BOARD_SIZE is consistent
				console.warn(
					`Could not map backend board coordinates row=${row}, col=${col} to valid CubeCoordinates.`
				);
			}
		}
	}

	// Optional: Verify all expected hexes are present (good for debugging)
	const expectedKeys = computeGridCoordinates(BOARD_SIZE).map(cubeToKey);
	expectedKeys.forEach((key) => {
		if (!frontendBoard.has(key)) {
			console.warn(
				`Frontend board state missing expected key after mapping: ${key}. Setting to empty.`
			);
			frontendBoard.set(key, 0);
		}
	});

	return frontendBoard;
};

// --- New Message Queue Management ---
interface QueuedMessage {
	payload: object;
	timestamp: number;
	retries: number;
	id: string;
}

/**
 * Creates a unique ID for a queued message
 */
const createMessageId = (): string => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Define interfaces for expected backend data structures
interface BackendMoveHistoryItem {
	x: number;
	y: number;
	player: number; // Assuming backend uses 1/-1 or similar numeric representation
}

interface BackendGameState {
	board: (0 | 1 | -1)[][];
	player_turn: string | null; // 'human', 'AI', 'AI_1', 'AI_2', null
	moves_history: BackendMoveHistoryItem[];
	winner: string | null; // 'human', 'AI', 'AI_1', 'AI_2', 'draw', null
	mode?: "HUMAN_AI" | "AI_AI";
	human_color?: "red" | "blue";
	win_probability?: { [key: string]: number };
	id?: number | string; // Game ID
	// Add other potential fields if known
}

interface BackendErrorData {
	message: string;
	// Add other potential error fields if known
}

// --- State Shape ---
type GameState = {
	gameId: string | null;
	boardState: Map<string, 0 | 1 | 2>; // Key: "q,r,s", Value: 0 (empty), 1 (P1), 2 (P2)
	playerTurn: 1 | 2 | null; // 1 (P1 Red), 2 (P2 Blue), null (Game Over?)
	humanPlayerColor: "red" | "blue" | null; // From backend 'human_color' field
	moves: number; // Total moves made in the game
	highlightedHexes: CubeCoordinates[]; // For visually highlighting the last move
	winner: 1 | 2 | null; // 1 (Red wins), 2 (Blue wins), null (Ongoing or Draw)
	isDraw: boolean; // Explicitly track draw state from backend 'winner' field
	winProbability: { [key: string]: number } | null; // e.g., { "human": 0.6, "AI": 0.4 }
	mode: "HUMAN_AI" | "AI_AI" | null; // Game mode
	connectionState: WebSocketState; // WebSocket connection status
	lastBackendError: string | null; // Store last error message from backend
	reconnectInProgress: boolean; // Flag to track if a reconnection is in progress
	messageQueue: QueuedMessage[]; // Queue for messages that need to be sent
	isProcessingQueue: boolean; // Flag to prevent multiple queue processors
	// Function provided by the WebSocket hook to send messages
	sendMessage: (payload: object) => boolean;
	reconnect: () => void; // Function provided by WebSocket hook to reconnect
};

// Actions available in the store
interface GameStoreActions {
	handleGameStateUpdate: (backendData: BackendGameState) => void; // Process message from backend
	handleErrorMessage: (errorData: BackendErrorData) => void; // Process error from backend
	setConnectionState: (state: WebSocketState) => void; // Update WS connection state
	setGameId: (gameId: string | null) => void; // Set the current game ID
	setLastError: (error: string | null) => void; // Store backend error message
	setSendMessage: (sender: (payload: object) => boolean) => void; // Receive sendMessage func from hook
	setReconnect: (reconnectFunc: () => void) => void; // Set reconnect function

	// Message queueing functions
	enqueueMessage: (payload: object) => void; // Add message to queue
	processMessageQueue: () => void; // Process the message queue
	removeMessageFromQueue: (id: string) => void; // Remove message after successful send

	// Game action requests
	requestMove: (coords: CubeCoordinates) => void; // Request backend to make a move
	requestUndo: () => void; // Request backend to undo last move
	requestRedo: () => void; // (Not implemented in backend API doc)
	requestRestart: () => void; // Request backend to restart game
	requestAiMove: () => void; // Request backend for AI move (mainly for AI vs AI?)
	resetLocalState: () => void; // Reset store to initial state (except sendMessage)
}

// --- Store Definition ---
const initialState: GameState = {
	gameId: null,
	boardState: initializeBoardState(BOARD_SIZE),
	playerTurn: null, // Start as null, wait for first game_state
	humanPlayerColor: null,
	moves: 0,
	highlightedHexes: [],
	winner: null,
	isDraw: false,
	winProbability: null,
	mode: null,
	connectionState: WebSocketState.CLOSED,
	lastBackendError: null,
	reconnectInProgress: false,
	messageQueue: [],
	isProcessingQueue: false,
	// Placeholder sendMessage function, will be replaced by the hook
	sendMessage: (payload) => {
		console.warn("sendMessage called before WebSocket was ready.", payload);
		return false; // Indicate failure
	},
	reconnect: () => {
		console.warn("reconnect called before WebSocket was ready.");
	},
};

export const useGameStore = create<GameState & GameStoreActions>(
	(set, get) => ({
		...initialState,

		// --- Actions ---

		setGameId: (gameId) => set({ gameId }),

		setConnectionState: (state) => {
			// Update reconnect progress flag
			let reconnectInProgress = get().reconnectInProgress;
			if (state === WebSocketState.RECONNECTING) {
				reconnectInProgress = true;
			} else if (state === WebSocketState.OPEN) {
				reconnectInProgress = false;
				// Process queue when connection is established
				setTimeout(() => get().processMessageQueue(), 500);
			}

			set({
				connectionState: state,
				reconnectInProgress,
				// Clear error when connection is open
				lastBackendError:
					state === WebSocketState.OPEN
						? null
						: get().lastBackendError,
			});
		},

		setLastError: (error) => set({ lastBackendError: error }),

		// Called by the useGameWebSocket hook once the connection is open
		setSendMessage: (sender) => set({ sendMessage: sender }),

		// Set the reconnect function from the hook
		setReconnect: (reconnectFunc) => set({ reconnect: reconnectFunc }),

		// Handle messages coming from the backend
		handleGameStateUpdate: (backendData) => {
			console.log(
				"Store: Handling backend game state update:",
				backendData
			);

			// Basic validation of received data structure
			if (!backendData || typeof backendData !== "object") {
				console.error(
					"Store Error: Received invalid or non-object game state data:",
					backendData
				);
				set({
					lastBackendError:
						"Received invalid game state format from server.",
				});
				return;
			}
			// Check for essential fields
			if (
				!backendData.board ||
				backendData.player_turn === undefined ||
				!backendData.moves_history
			) {
				console.error(
					"Store Error: Received incomplete game state data (missing board, player_turn, or moves_history):",
					backendData
				);
				set({
					lastBackendError:
						"Received incomplete game state from server.",
				});
				return;
			}

			try {
				const newBoardState = mapBackendBoard(backendData.board);
				const currentPlayer = mapBackendPlayerToFrontend(
					backendData.player_turn
				);
				const winnerPlayer = mapBackendPlayerToFrontend(
					backendData.winner
				); // Handles 'human', 'AI', null, 'AI_1', 'AI_2'
				const isDraw = backendData.winner === "draw"; // Check specifically for draw

				// Determine the last move coordinates from moves_history to highlight
				let lastMoveCoords: CubeCoordinates | null = null;
				if (
					Array.isArray(backendData.moves_history) &&
					backendData.moves_history.length > 0
				) {
					const lastAction =
						backendData.moves_history[
							backendData.moves_history.length - 1
						];
					// Check if last action has x and y (as per backend model)
					if (
						lastAction &&
						lastAction.x !== undefined &&
						lastAction.y !== undefined
					) {
						// Convert backend x (row), y (col) to frontend CubeCoordinates
						lastMoveCoords = xyToCube(lastAction.x, lastAction.y);
						if (!lastMoveCoords) {
							console.warn(
								`Store: Could not convert backend last move x=${lastAction.x}, y=${lastAction.y} to CubeCoordinates.`
							);
						} else {
							console.log(
								`Store: Highlighting last move at Cube (${lastMoveCoords.q}, ${lastMoveCoords.r}, ${lastMoveCoords.s}) from backend XY (${lastAction.x}, ${lastAction.y})`
							);
						}
					}
				}

				// Update the store state
				set({
					boardState: newBoardState,
					playerTurn: currentPlayer,
					winner: winnerPlayer, // Store 1, 2, or null
					isDraw: isDraw, // Store draw state
					// Use moves_history length for move count
					moves: Array.isArray(backendData.moves_history)
						? backendData.moves_history.length
						: 0,
					mode: backendData.mode ?? get().mode, // Update mode if provided
					humanPlayerColor:
						backendData.human_color ?? get().humanPlayerColor, // Update human color if provided
					winProbability: backendData.win_probability ?? null, // Update win probability (handle null)
					highlightedHexes: lastMoveCoords ? [lastMoveCoords] : [], // Highlight based on history
					lastBackendError: null, // Clear previous errors on successful update
					gameId: backendData.id
						? String(backendData.id)
						: get().gameId, // Update gameId if present (ensure string)
				});
				console.log("Store: State updated successfully.");
			} catch (error) {
				console.error(
					"Store Error: Failed to process backend game state update:",
					error,
					"Data:",
					backendData
				);
				set({
					lastBackendError:
						"Failed to process game state from server.",
				});
			}
		},

		// Handle error messages from the backend
		handleErrorMessage: (errorData) => {
			if (errorData && errorData.message) {
				console.error(
					"Store: Received error from backend:",
					errorData.message
				);
				set({ lastBackendError: errorData.message });
			} else {
				console.error(
					"Store: Received malformed error from backend:",
					errorData
				);
				set({ lastBackendError: "Unknown error occurred." });
			}
		},

		/**
		 * Resets the store state to its initial values, preserving the sendMessage and reconnect functions.
		 */
		resetLocalState: () => {
			console.log("Store: Resetting local state.");
			const currentSendMessage = get().sendMessage; // Preserve the sender function
			const currentReconnect = get().reconnect; // Preserve the reconnect function
			set({
				...initialState,
				sendMessage: currentSendMessage,
				reconnect: currentReconnect,
			});
		},

		// --- Message Queue Management ---

		enqueueMessage: (payload) => {
			const messageQueue = [...get().messageQueue];
			const newMessage: QueuedMessage = {
				payload,
				timestamp: Date.now(),
				retries: 0,
				id: createMessageId(),
			};

			messageQueue.push(newMessage);
			set({ messageQueue });

			// Try to process the queue immediately if connection is open
			if (
				get().connectionState === WebSocketState.OPEN &&
				!get().isProcessingQueue
			) {
				get().processMessageQueue();
			} else if (
				get().connectionState !== WebSocketState.OPEN &&
				get().connectionState !== WebSocketState.CONNECTING &&
				get().connectionState !== WebSocketState.RECONNECTING &&
				!get().reconnectInProgress
			) {
				// Try to reconnect if not already doing so
				console.log(
					"Store: Connection not open, attempting to reconnect..."
				);
				get().reconnect();
			}
		},

		processMessageQueue: () => {
			const {
				messageQueue,
				connectionState,
				sendMessage,
				isProcessingQueue,
			} = get();

			// Don't process if already processing or no messages or connection not open
			if (
				isProcessingQueue ||
				messageQueue.length === 0 ||
				connectionState !== WebSocketState.OPEN
			) {
				return;
			}

			set({ isProcessingQueue: true });

			// Process each message in the queue
			const processQueue = async () => {
				const currentQueue = [...get().messageQueue];

				if (currentQueue.length === 0) {
					set({ isProcessingQueue: false });
					return;
				}

				const message = currentQueue[0];

				// Check if message is too old (over 2 minutes)
				const messageAge = Date.now() - message.timestamp;
				if (messageAge > 120000) {
					console.log(
						`Store: Dropping old message (${messageAge}ms old):`,
						message.payload
					);
					get().removeMessageFromQueue(message.id);
					setTimeout(processQueue, 0);
					return;
				}

				// Try to send the message
				const success = sendMessage(message.payload);

				if (success) {
					console.log(
						`Store: Successfully sent message:`,
						message.payload
					);
					get().removeMessageFromQueue(message.id);
					// Wait a short time before processing next message
					setTimeout(processQueue, 100);
				} else {
					// Failed to send, increment retry count
					message.retries++;

					if (message.retries >= 3) {
						console.error(
							`Store: Failed to send message after ${message.retries} attempts, dropping:`,
							message.payload
						);
						get().removeMessageFromQueue(message.id);
					} else {
						// Update the message in the queue
						const updatedQueue = get().messageQueue.map((m) =>
							m.id === message.id ? message : m
						);
						set({ messageQueue: updatedQueue });
						console.log(
							`Store: Failed to send message, will retry (attempt ${message.retries}/3):`,
							message.payload
						);
					}

					// Try again after a delay
					setTimeout(processQueue, 1000);
				}
			};

			// Start processing
			processQueue();
		},

		removeMessageFromQueue: (id) => {
			const updatedQueue = get().messageQueue.filter((m) => m.id !== id);
			set({ messageQueue: updatedQueue });
		},

		// --- Actions to trigger WS messages ---

		/**
		 * Sends a 'move' action to the backend.
		 * @param coords - The CubeCoordinates of the hex the player clicked.
		 */
		requestMove: (coords) => {
			const { connectionState, winner, isDraw, boardState } = get();

			// Check if the move is allowed based on game state
			if (winner !== null || isDraw) {
				console.warn("Store: Cannot make move - game is over.");
				return;
			}

			// Convert cube coordinates to row, col (x, y) for the backend
			const hexKey = cubeToKey(coords);
			const currentState = boardState.get(hexKey);
			if (currentState !== 0) {
				console.warn(
					`Store: Hex at (${coords.q}, ${coords.r}) is already occupied.`
				);
				return;
			}

			// Convert to backend coordinates
			const xyCoords = cubeToXY(coords);
			if (!xyCoords) {
				console.error(
					`Store: Failed to convert cube coordinates to XY coordinates.`
				);
				return;
			}
			const { x, y } = xyCoords;
			const payload = { action: "move", x, y };

			// Either send directly or enqueue
			if (connectionState === WebSocketState.OPEN) {
				console.log(
					`Store: Requesting move at backend coordinates (${x}, ${y})`
				);
				const success = get().sendMessage(payload);
				if (!success) {
					console.warn(
						"Store: Failed to send move request directly, enqueueing."
					);
					get().enqueueMessage(payload);
				}
			} else {
				console.log(
					`Store: WebSocket not open, enqueueing move request for (${x}, ${y})`
				);
				get().enqueueMessage(payload);
			}
		},

		/**
		 * Sends an 'undo' action to the backend.
		 */
		requestUndo: () => {
			const payload = { action: "undo" };
			if (get().connectionState === WebSocketState.OPEN) {
				console.log("Store: Requesting undo");
				const success = get().sendMessage(payload);
				if (!success) get().enqueueMessage(payload);
			} else {
				console.log(
					"Store: WebSocket not open, enqueueing undo request"
				);
				get().enqueueMessage(payload);
			}
		},

		/**
		 * Placeholder for 'redo' action (not implemented in backend API).
		 */
		requestRedo: () => {
			console.warn(
				"Store: Redo functionality not yet implemented in backend API."
			);
		},

		/**
		 * Sends a 'restart' action to the backend.
		 */
		requestRestart: () => {
			const payload = { action: "restart" };
			if (get().connectionState === WebSocketState.OPEN) {
				console.log("Store: Requesting game restart");
				const success = get().sendMessage(payload);
				if (!success) get().enqueueMessage(payload);
			} else {
				console.log(
					"Store: WebSocket not open, enqueueing restart request"
				);
				get().enqueueMessage(payload);
			}
		},

		/**
		 * Sends an 'ai_move' action to the backend.
		 */
		requestAiMove: () => {
			const {
				connectionState,
				winner,
				isDraw,
				playerTurn,
				humanPlayerColor,
			} = get();

			// Special check for AI moves: is it AI's turn? Game not over?
			if (winner !== null || isDraw) {
				console.warn("Store: Cannot request AI move - game is over.");
				return;
			}

			const humanPlayerNumber =
				humanPlayerColor === "red"
					? 1
					: humanPlayerColor === "blue"
					? 2
					: null;
			const aiPlayerNumber =
				humanPlayerNumber === 1
					? 2
					: humanPlayerNumber === 2
					? 1
					: null;

			if (playerTurn !== aiPlayerNumber) {
				console.warn(
					`Store: Cannot request AI move - not AI's turn (Current turn: ${playerTurn}, AI: ${aiPlayerNumber}).`
				);
				return;
			}

			const payload = { action: "ai_move" };
			if (connectionState === WebSocketState.OPEN) {
				console.log("Store: Requesting AI move");
				const success = get().sendMessage(payload);
				if (!success) get().enqueueMessage(payload);
			} else {
				console.log(
					"Store: WebSocket not open, enqueueing AI move request"
				);
				get().enqueueMessage(payload);
			}
		},
	})
);

```

### <a id="hex-ai-frontend-src-types-hexprops-ts"></a>hex-ai-frontend/src/types/hexProps.ts

```plaintext
// src/types/hexProps.ts

/**
 * Type definitions for Hex game properties.
 */

/**
 * Represents Hex coordinates using the Cube coordinate system (q, r, s).
 * Ensures that q + r + s = 0.
 */
export interface CubeCoordinates {
  q: number;
  r: number;
  s: number;
}

/**
 * Defines the color scheme for the game board and players.
 * Colors can be hex codes, Tailwind class names, or CSS color keywords.
 */
export interface PlayerColors {
  p1: string;       // Color for Player 1 (Red)
  p2: string;       // Color for Player 2 (Blue)
  empty: string;    // Color for empty hex tiles
  background: string; // Background color for the SVG canvas
}

/**
 * Props for the HexBoard component.
 */
export interface HexBoardProps {
  /** Map representing the state of each hex tile. Key: "q,r,s", Value: 0 (empty), 1 (P1), 2 (P2). */
  boardState: Map<string, 0 | 1 | 2>;

  /** Color definitions for players and board elements. */
  playerColors: PlayerColors;

  /** Callback function invoked when a hexagon is clicked. */
  onHexClick: (coords: CubeCoordinates) => void;

  /** Optional array of hex coordinates to visually highlight (e.g., last move). */
  highlightedHexes?: CubeCoordinates[];

  /** Optional CSS class name for additional styling of the SVG container. */
  className?: string;

  /** The size of the hex board (e.g., 11 for an 11x11 grid). */
  boardSize: number;
}

/**
 * Props for the GameInfo component.
 */
export interface GameInfoProps {
  /** Static metadata about the current game. */
  gameMetadata: {
    size: number;       // e.g., 11
    created?: string;   // Optional: Date/time game started
    moves?: number;     // Optional: Total moves made
    // Add other relevant static info as needed
  };
  /** Optional CSS class name for additional styling. */
  className?: string;
}

/**
 * Props for the GameplayControls component.
 */
export interface GameplayControlsProps {
  /** The player whose turn it currently is (1 or 2), or 0/null if loading/over. */
  playerTurn: number | null;

  /** The winner of the game (1 or 2), or null if ongoing. */
  winner: number | null;

  /** Flag indicating if the game ended in a draw. */
  isDraw?: boolean;

  /** Callback function for the 'New Game' button (likely navigates to dashboard). */
  onNewGameClick: () => void;

  /** Optional callback function for an 'Undo' action. */
  onUndoClick?: () => void;

  /** Optional callback function for a 'Redo' action. */
  onRedoClick?: () => void; // Note: Backend might not support redo

  /** Optional callback function for a 'Restart' action. */
  onRestartClick?: () => void;

  /** Optional callback function for a 'Resign' action (if implemented). */
  onResignClick?: () => void;

  /** Flag to enable/disable controls (e.g., during AI thinking or game over). */
  isInteractionAllowed: boolean;

  /** Flag indicating if the undo action is currently possible. */
  canUndo?: boolean;

  /** Flag indicating if the redo action is currently possible. */
  canRedo?: boolean;

  /** Optional CSS class name for additional styling. */
  className?: string;
}

```

### <a id="hex-ai-frontend-tailwind-config-ts"></a>hex-ai-frontend/tailwind.config.ts

```plaintext
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Players
				player1: "#E53E3E", // Red-500/600 equivalent
				player2: "#3182CE", // Blue-500/600 equivalent
				// Board
				"hex-empty": "#A0AEC0", // Gray-500 equivalent
				"hex-hover": "rgba(255, 255, 255, 0.2)", // Semi-transparent white overlay
				"board-bg": "#1A202C", // Gray-900 equivalent
				// UI Panels & General
				"panel-bg": "#2D3748", // Gray-800 equivalent
				"panel-bg-light": "#4A5568", // Gray-700 equivalent (e.g., button backgrounds)
				background: "#1A202C", // Gray-900 equivalent (Page background)
				"text-primary": "#E2E8F0", // Gray-200 equivalent
				"text-secondary": "#A0AEC0", // Gray-500 equivalent
				"border-subtle": "#4A5568", // Gray-700 equivalent
				// Accents & Interactions
				accent: "#3182CE", // Blue-500 (e.g., focused elements, links)
				"interactive-hover-bg": "#4A5568", // Gray-700 (Button hover)
				danger: "#E53E3E", // Red-500 (e.g., Resign button)
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;

```

### <a id="hex-ai-frontend-tsconfig-json"></a>hex-ai-frontend/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

### <a id="hex_game_refactoring_plan-md"></a>hex_game_refactoring_plan.md

```markdown
## RL Hex Game - Incremental Refactoring Plan

**Version:** 1.2
**Date:** April 16, 2025

### 1. Introduction

This document outlines a prioritized, incremental plan for refactoring and improving the RL Hex Game project, updated based on clarifications regarding the RL code structure and correctness. It leverages the capabilities of the Cursor AI code editor, including its rule system (`.cursor/rules/`) and context-aware features (`@` file/rule referencing), to guide the process.

### 2. Prerequisites

* Cursor AI Code Editor installed and operational.
* The RL Hex Game project codebase is open within Cursor.
* The `.cursor/rules/` directory is populated with the defined project rule files (`project-overview.mdc`, `frontend-standards.mdc`, `backend-standards.mdc`, `api-guidelines.mdc`, `coordinate-system.mdc`, `rl-agent-interaction.mdc`, `refactoring-goals.mdc`). **Ensure these files have been updated to reflect the clarification that `Hexgame/utils/` contains the *currently active but partially incorrect* RL code, and `algorithm/` contains the *correct* implementations.**

### 3. General Workflow

Each refactoring step should generally follow this iterative process:

1. **Define Task:** Clearly identify the specific goal for the current step based on the prioritized plan.
2. **Select Context:** In Cursor Chat or using Cmd-K, use the `@` symbol to reference the relevant code files (`@path/to/your/file.ext`) and rule documents (`@./.cursor/rules/rule-name.mdc`) that provide necessary context for the task.
3. **Prompt AI:** Formulate a clear, actionable prompt instructing the AI to perform the task (e.g., generate code, refactor, explain, identify issues) based on the provided context and relevant rules. Ask the AI to outline its plan first for complex changes.
4. **Review & Iterate:** Carefully examine the AI's output (code, suggestions, explanations). Verify correctness, ensure adherence to project rules and standards, and check alignment with the refactoring goal. Use follow-up prompts to refine the output if necessary.
5. **Test:** Implement or integrate the changes and perform thorough testing (unit tests, integration tests, manual testing as appropriate).
6. **Commit:** Once a logical step or phase is completed and verified, commit the changes to version control with a clear commit message.

### 4. Prioritized Refactoring Plan

Execute the following phases and steps in the specified order.

---

**Phase 1: Stabilize Config & Prepare for RL Implementation Switch**

* **Goal:** Fix critical configuration in the active RL code path (`Hexgame/utils/`) and ensure correct usage, preparing to switch to the proper implementations from `algorithm/`.
* **Git Branch:** `git checkout -b refactor/stabilize-config-prepare-switch`

    1. **Task: Make RL Model Path Configurable in `utils/` (Priority #1a)**
        * **Context:** `@./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py`, `@./backend/RL_Hex_game/Hex/Hex/settings.py`, `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py`, `@./.cursor/rules/backend-standards.mdc`, `@./.cursor/rules/rl-agent-interaction.mdc`, `@./.cursor/rules/refactoring-goals.mdc`
        * **Example Prompt:**

            ```
            Objective: Implement Priority #1a from `@./.cursor/rules/refactoring-goals.mdc`.
            Context: `@./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py`, `@./backend/RL_Hex_game/Hex/Hex/settings.py`, `@./.cursor/rules/rl-agent-interaction.mdc`
            Request: Refactor the `HexAI` class in `utils/Algorithm.py` to load the model path from a new Django setting `RL_MODEL_PATH` (add this setting definition to `settings.py`) instead of the current hardcoded path. Include error handling for missing setting/invalid path. Outline your steps first. Also, check if `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py` hardcodes the path and update it if necessary.
            ```

        * **Verification:** Add `RL_MODEL_PATH` to `settings.py`. Test AI move functionality relies on the setting using the `utils/Algorithm.py` code path.

    2. **Task: Verify `consumers.py` Imports from `utils/` (Priority #1b)**
        * **Context:** `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py`, `@./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py`, `@./.cursor/rules/backend-standards.mdc`, `@./.cursor/rules/rl-agent-interaction.mdc`
        * **Example Prompt:**

            ```
            Verify that `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py` currently imports `HexAI` and related components specifically from the `@./backend/RL_Hex_game/Hex/Hexgame/utils/` directory, as stated in `@./.cursor/rules/rl-agent-interaction.mdc`. List the relevant import statements.
            ```

        * **Verification:** Manually confirm the import paths in `consumers.py` point to `utils`.

* **Version Control:**

    ```bash
    git add .
    git commit -m "Phase 1: Make RL model path configurable targeting utils/"
    ```

---

**Phase 2: Switch to Correct RL Implementation (`algorithm/`)**

* **Goal:** Replace the incorrect/incomplete RL logic usage from `Hexgame/utils/` with the correct implementations from `algorithm/`, including MCTS with the specified parameters.
* **Git Branch:** `git checkout -b feature/switch-to-algorithm-rl` (branch from Phase 1 completion)

    1. **Task: Refactor Backend to Use `algorithm/` RL Code (Priority #2)**
        * **Context:** `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py`, `@./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py`, `@./backend/RL_Hex_game/algorithm/Algorithm.py`, `@./backend/RL_Hex_game/algorithm/GameLogic.py`, `@./backend/RL_Hex_game/algorithm/MCTS.py`, `@./backend/RL_Hex_game/algorithm/Hexmodel.py`, `@./.cursor/rules/backend-standards.mdc`, `@./.cursor/rules/rl-agent-interaction.mdc`, `@./.cursor/rules/refactoring-goals.mdc`
        * **Example Prompt:**

            ```
            Objective: Implement Priority #2 from `@./.cursor/rules/refactoring-goals.mdc`. Switch the backend to use the correct RL implementations from the `algorithm/` directory.
            Context: Relevant files from `consumers.py`, `utils/`, `algorithm/`, and rules `@./.cursor/rules/rl-agent-interaction.mdc`, `@./.cursor/rules/backend-standards.mdc`.
            Request:
            1. Outline the plan to modify `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py` and/or `@./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py` (or potentially replace `utils/Algorithm.py` entirely by having `consumers.py` use `algorithm/Algorithm.py`).
            2. The goal is to ensure that for AI move prediction:
                - The `HexGame` state is represented using `@./backend/RL_Hex_game/algorithm/GameLogic.py`.
                - MCTS search is performed using `@./backend/RL_Hex_game/algorithm/MCTS.py`, initialized with `simulations=200`.
                - The `HexNet` model used is from `@./backend/RL_Hex_game/algorithm/Hexmodel.py`.
                - Imports are updated accordingly.
            3. Propose the necessary code changes after I approve the plan.
            ```

        * **Verification:** Test `ai_move` extensively. Confirm MCTS is running (check logs/timing if possible). Assess AI performance. Ensure the configurable model path (from Phase 1) is still used correctly by the `algorithm/` code path.

    2. **Task: Cleanup `utils/` RL Code (Priority #2c)**
        * **Context:** `@./backend/RL_Hex_game/Hex/Hexgame/utils/`, `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py`, Result of previous step.
        * **Example Prompt:**

            ```
            Now that `consumers.py` has been refactored to use the RL implementations from the `algorithm/` directory, identify the RL-specific Python files (e.g., Algorithm.py, Hexmodel.py, MCTS.py, GameLogic.py if present) remaining in `@./backend/RL_Hex_game/Hex/Hexgame/utils/` that are now safe to delete. List the files for confirmation before deletion.
            ```

        * **Verification:** Delete the confirmed files. Ensure the application still runs correctly.

* **Version Control:**

    ```bash
    git add .
    git commit -m "Phase 2: Switch backend to use algorithm/ RL implementations (incl. MCTS)"
    ```

---

**Phase 3: Frontend Structure & Decoupling**

* **Goal:** Prepare the frontend for logic migration.
* **Git Branch:** `git checkout -b feature/frontend-structure`

    1. **Task: Refine UI Components, Add Tests & Mocks (Priority #3 - Initial)**
        * **Context:** `@./hex-ai-frontend/src/components/`, `@./hex-ai-frontend/src/app/(app)/`, `@./.cursor/rules/frontend-standards.mdc`, `@./.cursor/rules/refactoring-goals.mdc`, `@./.cursor/rules/react_component_template.mdc`
        * **Example Prompts:** (Same as previous plan)
            * (Component Analysis): `Analyze components in @./hex-ai-frontend/src/components/hex/. Suggest opportunities for simplification or creating smaller, reusable sub-components according to @./.cursor/rules/frontend-standards.mdc.`
            * (Test Structure): `Generate basic Jest/React Testing Library unit test structure for @./hex-ai-frontend/src/components/dashboard/NewGameOptions.tsx, covering button clicks and loading states, following goal #3 in @./.cursor/rules/refactoring-goals.mdc.`
            * (Mock Interface): `Define a TypeScript type/interface for a mock API function simulating the fetch of the game list (planned in goal #5 of @./.cursor/rules/refactoring-goals.mdc).`
        * **Verification:** Review structure. Implement tests. Define mocks.

* **Version Control:**

    ```bash
    git add .
    git commit -m "Phase 3: Refine frontend structure, add tests/mocks"
    ```

---

**Phase 4: Major Logic Refactoring**

* **Goal:** Move core game logic to the frontend.
* **Git Branch:** `git checkout -b refactor/frontend-logic`

    1. **Task: Move Core Game Logic to Frontend (Priority #4)**
        * **Context:** `@./hex-ai-frontend/src/store/gameStore.ts`, `@./hex-ai-frontend/src/lib/`, `@./backend/RL_Hex_game/Hex/Hexgame/utils/utils.py` (Win logic reference ONLY), `@./.cursor/rules/frontend-standards.mdc`, `@./.cursor/rules/coordinate-system.mdc`, `@./.cursor/rules/refactoring-goals.mdc`
        * **Example Prompts:** (Same as previous plan)
            * (Validation - Edit `gameStore.ts`): `Refactor the 'requestMove' action. Before calling sendMessage, add validation to check if the target hex 'coords' is empty based on the current 'boardState'. If not empty, set an error state/log warning and return.`
            * (Win Check - Chat): `Help create a function 'checkWinCondition' in @./hex-ai-frontend/src/lib/gameLogic.ts (create if needed). Implement the Hex win logic based on @./backend/RL_Hex_game/Hex/Hexgame/utils/utils.py's check_hex_connection (use this only as a reference for the logic, not for import), operating on the frontend's boardState Map and Cube coordinates. It should take boardState and player (1 or 2) and return boolean.`
            * (Win Check Integration - Edit `gameStore.ts`): `In 'handleGameStateUpdate', after updating boardState, call the new 'checkWinCondition'. If true, update the 'winner' state.`
        * **Verification:** Test frontend validation, win checks, undo/redo logic.

* **Version Control:**

    ```bash
    git add .
    git commit -m "Phase 4: Move core game logic (validation, win check) to frontend"
    ```

---

**Phase 5: API Finalization & Frontend Integration**

* **Goal:** Clean up backend APIs and connect the refined frontend.
* **Git Branch:** `git checkout -b feature/api-finalization`

    1. **Task: Refine API Strategy & Implement Game List API (Priority #5)**
        * **Context:** `@./backend/RL_Hex_game/Hex/Hexgame/views.py`, `@./backend/RL_Hex_game/Hex/Hexgame/urls.py`, `@./backend/RL_Hex_game/Hex/Hexgame/serializers.py`, `@./.cursor/rules/api-guidelines.mdc`, `@./.cursor/rules/backend-standards.mdc`, `@./.cursor/rules/refactoring-goals.mdc`
        * **Example Prompts:** (Same as previous plan)
            * (Deprecation - Chat): `Based on goal #5 in @./.cursor/rules/refactoring-goals.mdc and @./.cursor/rules/api-guidelines.mdc, identify REST endpoints in @./backend/RL_Hex_game/Hex/Hexgame/views.py and urls.py for move, ai_move, undo, restart that can be deprecated/removed.`
            * (New Endpoint - Chat): `Implement the GET /api/games/ endpoint in @./backend/RL_Hex_game/Hex/Hexgame/views.py as GameListView. Fetch all HexGame objects, serialize using HexGameSerializer (or a summary version), and return as JSON list. Register the URL.`
        * **Verification:** Test new API. Ensure deprecated endpoints removed/disabled.

    2. **Task: Final UI Integration (Priority #6 - Final)**
        * **Context:** `@./hex-ai-frontend/src/components/dashboard/GameListTable.tsx`, `@./hex-ai-frontend/src/app/(app)/game/[gameId]/page.tsx`, `@./hex-ai-frontend/src/store/gameStore.ts`, `@./.cursor/rules/frontend-standards.mdc`
        * **Example Prompts:** (Same as previous plan)
            * (Fetch Integration - Edit `GameListTable.tsx`): `Refactor this component. Remove placeholder data. Add logic to fetch data from the new GET /api/games/ endpoint on mount and display the fetched games.`
            * (Game Page Review - Chat): `Review @./hex-ai-frontend/src/app/(app)/game/[gameId]/page.tsx. Ensure it correctly uses state derived from the frontend game logic (Phase 4) and replaces mock API calls with actual gameStore actions connected to the backend.`
        * **Verification:** Test dashboard list. Test end-to-end game flow.

* **Version Control:**

    ```bash
    git add .
    git commit -m "Phase 5: Finalize API strategy and integrate frontend logic"
    # Optional: Merge branches if necessary
    ```

---

### 5. Conclusion

This updated plan prioritizes fixing configuration and switching to the correct RL implementations in `algorithm/` before proceeding with other major refactoring. Remember to commit frequently, test thoroughly, and always review the AI's output.

```

### <a id="---md"></a>进度.md

```markdown
- 4/16 17:52

创建 project rules and user rules 

prompt: 

Based on the provided deep research report about Cursor's project and user rules, please help me create a project rules and user rules for the project.

Firstly, analyze the report and make a plan on how to create the project rules and user rules. Which demo project will you use? How to utilize the RL hex game project's analysis to efficiently create the project rules and user rules? 

Secondly, create the project rules and user rules for the project.

Thirdly, create a demo project to test the project rules and user rules.

Fourthly, iterate on the project rules and user rules based on the test results.



```

