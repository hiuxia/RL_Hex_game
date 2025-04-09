from rest_framework import serializers
from .models import HexGame

class HexGameSerializer(serializers.ModelSerializer):
    human_color = serializers.CharField(read_only=True)  # 新增字段
    winner = serializers.CharField(allow_null=True)  # 明确允许null
    win_probability = serializers.JSONField(read_only=True)  # 新增字段
    mode = serializers.ChoiceField(choices=HexGame.MODE_CHOICES)   # 新增
    current_ai_player = serializers.CharField(read_only=True)  # 新增

    class Meta:
        model = HexGame
        fields = [
            'id', 'board', 'player_turn', 'human_color', 
            'last_moves', 'winner', 'moves_history',
            'win_probability', 'mode', 'current_ai_player'  # 新增字段
        ]