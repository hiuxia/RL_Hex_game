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
