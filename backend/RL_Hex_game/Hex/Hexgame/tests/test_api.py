from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from Hexgame.models import HexGame


class GameListViewTest(TestCase):
    """Test the game list view"""

    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        # Create some test games
        self.game1 = HexGame.objects.create(mode="HUMAN_AI")
        self.game1.initialize(new_game=True)

        self.game2 = HexGame.objects.create(mode="AI_AI")
        self.game2.initialize(new_game=True)

    def test_get_game_list(self):
        """Test retrieving the list of games"""
        url = "/api/games/"
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        # Verify the summary fields are included
        self.assertIn("id", response.data[0])
        self.assertIn("player_turn", response.data[0])
        self.assertIn("winner", response.data[0])
        self.assertIn("mode", response.data[0])

        # Verify the detailed fields are NOT included to confirm we're using the summary serializer
        self.assertNotIn("board", response.data[0])
        self.assertNotIn("last_moves", response.data[0])
        self.assertNotIn("moves_history", response.data[0])

    def test_games_are_ordered_by_id_desc(self):
        """Test that games are ordered by id in descending order (newest first)"""
        url = "/api/games/"
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["id"], self.game2.id)
        self.assertEqual(response.data[1]["id"], self.game1.id)


class WebSocketPreferredOverRESTTest(TestCase):
    """Tests to verify REST endpoints work but with a note that WebSocket is preferred"""

    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        self.game = HexGame.objects.create(mode="HUMAN_AI")
        self.game.initialize(new_game=True)

    def test_move_endpoint_works(self):
        """Test that the move endpoint still works but should be considered deprecated"""
        url = f"/games/{self.game.id}/move/"
        data = {"x": 5, "y": 5}
        response = self.client.post(url, data)

        # The endpoint should still function
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the documentation to ensure developers know this is deprecated
        from Hexgame.urls import urlpatterns

        move_path = next(p for p in urlpatterns if "move/" in str(p))
        self.assertIn("DEPRECATED", str(move_path))
