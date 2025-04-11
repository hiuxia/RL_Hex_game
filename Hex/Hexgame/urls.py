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