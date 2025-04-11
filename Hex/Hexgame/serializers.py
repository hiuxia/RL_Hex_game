from rest_framework import serializers
from .models import HexGame

class HexGameSerializer(serializers.ModelSerializer):

    class Meta:
        model = HexGame
        fields = [
            'id', 'board', 'player_turn', 'human_color',
            'last_moves', 'winner', 'moves_history',
            'win_probability', 'mode'
        ]
        extra_kwargs = {
            'board': {'read_only': True},
            'last_moves': {'read_only': True}
        }