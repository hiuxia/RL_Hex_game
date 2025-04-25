from django.test import TestCase
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
import os
from pathlib import Path
import unittest
from unittest.mock import patch

class SettingsTestCase(TestCase):

    def test_rl_model_path_setting_exists(self):
        """
        Tests that the RL_MODEL_PATH setting is defined.
        """
        self.assertTrue(hasattr(settings, 'RL_MODEL_PATH'), "RL_MODEL_PATH setting is missing.")

    def test_rl_model_path_is_accessible_and_correct_type(self):
        """
        Tests that the RL_MODEL_PATH setting can be accessed and is a string.
        """
        try:
            model_path = settings.RL_MODEL_PATH
            self.assertIsInstance(model_path, str, "RL_MODEL_PATH should be a string.")
            self.assertTrue(len(model_path) > 0, "RL_MODEL_PATH should not be an empty string.")
            # Optional: You could add more specific checks, like if the path format looks valid
            # print(f"RL_MODEL_PATH value: {model_path}") # For debugging during test run
        except AttributeError:
            self.fail("RL_MODEL_PATH setting could not be accessed.")
        except ImproperlyConfigured:
             self.fail("Django settings are not configured correctly during test.")

    def test_rl_model_file_exists(self):
        """
        Tests if the file specified by RL_MODEL_PATH exists relative to BASE_DIR.
        """
        settings_dir = Path(settings.BASE_DIR)

        # First try direct path (might be absolute)
        if os.path.isabs(settings.RL_MODEL_PATH):
            model_path_abs = Path(settings.RL_MODEL_PATH)
        else:
            # Try different ways to resolve the path
            possible_paths = [
                settings_dir / settings.RL_MODEL_PATH,  # Direct relative to BASE_DIR
                settings_dir.parent / settings.RL_MODEL_PATH.lstrip('./'),  # Relative to project root
                settings_dir / 'Hexgame' / settings.RL_MODEL_PATH.lstrip('./'),  # Relative to app
            ]

            for path in possible_paths:
                if path.exists():
                    model_path_abs = path
                    break
            else:
                model_path_abs = None

        self.assertIsNotNone(model_path_abs, f"Could not resolve path for RL_MODEL_PATH: {settings.RL_MODEL_PATH}")
        self.assertTrue(model_path_abs.exists(), f"Model file does not exist at resolved path: {model_path_abs}")

class AlgorithmTestCase(TestCase):
    """Test cases for the Algorithm module using RL_MODEL_PATH setting"""

    @patch('Hexgame.utils.Algorithm.torch.load')
    @patch('Hexgame.utils.Algorithm.os.path.exists')
    def test_hexai_uses_settings_path(self, mock_exists, mock_load):
        """Test that HexAI correctly loads the model from Django settings"""
        # Setup mocks
        mock_exists.return_value = True
        mock_load.return_value = {"model_state": {}}

        # Import here to avoid premature loading before mocks are in place
        from Hexgame.utils.Algorithm import HexAI

        # Create instance with no path (should use settings)
        with patch('Hexgame.utils.Algorithm.HexNet') as mock_hexnet:
            # Mock the model
            mock_model = mock_hexnet.return_value
            mock_model.load_state_dict.return_value = None
            mock_model.to.return_value = mock_model
            mock_model.eval.return_value = None

            # Create HexAI instance - should use settings.RL_MODEL_PATH
            hex_ai = HexAI()

            # Verify the settings path was used
            mock_exists.assert_called_with(settings.RL_MODEL_PATH)
            mock_load.assert_called_once()

    @patch('Hexgame.utils.Algorithm.settings')
    def test_hexai_handles_missing_setting(self, mock_settings):
        """Test that HexAI properly handles missing settings"""
        # Delete the RL_MODEL_PATH attribute
        del mock_settings.RL_MODEL_PATH

        # Import HexAI class
        from Hexgame.utils.Algorithm import HexAI

        # Attempting to create an instance without a path should raise ValueError
        with self.assertRaises(ValueError):
            hex_ai = HexAI()

```

**To run this test:**

1.  Navigate to the directory containing `manage.py` (which is `backend/RL_Hex_game/Hex/` based on your `run_django_server.sh` script).
2.  Run the command:
    ```bash
    python manage.py test Hexgame
    ```
    (Replace `Hexgame` with the specific app name if your `tests.py` is in a different app, or run `python manage.py test` to run all tests).

This backend test directly verifies that the Django settings are configured correctly and that your specific `RL_MODEL_PATH` setting is available when the Django application runs.
