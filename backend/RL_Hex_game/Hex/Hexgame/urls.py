from django.urls import path

from .views import (
    AIGameStatusAPI,
    AIMoveAPI,
    CreateAIGameAPI,
    GameAPI,
    GameListView,
    MoveAPI,
    NextAIMoveAPI,
    RestartAPI,
    UndoAPI,
    UpdateWinStateAPI,
    test_api_view,
)

urlpatterns = [
    path("", test_api_view),
    # API endpoints with standardized /api/ prefix
    path("api/games/", GameListView.as_view()),  # GET to list all games
    path("api/games/", GameAPI.as_view()),  # POST create new game
    path("api/games/<int:game_id>/", GameAPI.as_view()),  # GET game status
    path("api/games/<int:game_id>/move/", MoveAPI.as_view()),  # POST make a move
    path(
        "api/games/<int:game_id>/ai_move/", AIMoveAPI.as_view()
    ),  # POST request AI move
    path("api/games/<int:game_id>/undo/", UndoAPI.as_view()),  # POST undo last move
    path("api/games/<int:game_id>/restart/", RestartAPI.as_view()),  # POST restart game
    path(
        "api/games/<int:game_id>/update_win_state/", UpdateWinStateAPI.as_view()
    ),  # POST update win state
    path("api/ai_games/", CreateAIGameAPI.as_view()),  # POST create AI vs AI game
    path(
        "api/ai_games/<int:game_id>/", AIGameStatusAPI.as_view()
    ),  # GET query AI game status
    path(
        "api/ai_games/<int:game_id>/next_move/", NextAIMoveAPI.as_view()
    ),  # POST request next AI move
    # Legacy non-prefixed routes for backward compatibility
    path("games/", GameAPI.as_view()),  # POST create new game
    path("games/<int:game_id>/", GameAPI.as_view()),  # GET game status
    path("games/<int:game_id>/move/", MoveAPI.as_view()),  # POST make a move
    path("games/<int:game_id>/ai_move/", AIMoveAPI.as_view()),  # POST request AI move
    path("games/<int:game_id>/undo/", UndoAPI.as_view()),  # POST undo last move
    path("games/<int:game_id>/restart/", RestartAPI.as_view()),  # POST restart game
    path(
        "games/<int:game_id>/update_win_state/", UpdateWinStateAPI.as_view()
    ),  # POST update win state
    path("ai_games/", CreateAIGameAPI.as_view()),  # POST create AI vs AI game
    path(
        "ai_games/<int:game_id>/", AIGameStatusAPI.as_view()
    ),  # GET query AI game status
    path(
        "ai_games/<int:game_id>/next_move/", NextAIMoveAPI.as_view()
    ),  # POST request next AI move for AI vs AI game
]
