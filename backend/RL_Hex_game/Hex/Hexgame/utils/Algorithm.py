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

            print(f"Loading AI model from {model_path}...")
            # Load the state dictionary with map_location to ensure compatibility
            state_dict = torch.load(model_path, map_location=device)

            # Check if the state_dict is nested (e.g., contains 'model_state')
            if "model_state" in state_dict:
                model.load_state_dict(state_dict["model_state"])
                print("Successfully loaded model state from nested state dictionary")
            else:
                # Assume the loaded object is directly the state_dict
                # model.load_state_dict(state_dict)
                raise ValueError("Invalid model state dictionary format.")

            model.to(device)  # Move the model to the selected device
            model.eval()
            print("Model loaded successfully and set to evaluation mode")
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
            print("=== AI Move Input Debug Info ===")
            print(
                f"Input board structure: {len(input_dict['board'])}x{len(input_dict['board'][0])}"
            )
            print(
                f"Board values count: 0={sum(row.count(0) for row in input_dict['board'])}, 1={sum(row.count(1) for row in input_dict['board'])}, -1={sum(row.count(-1) for row in input_dict['board'])}"
            )
            print(f"Player turn: {input_dict.get('player_turn', 'Not provided')}")

            # Double-check that the board has empty cells
            empty_cells_count = sum(row.count(0) for row in input_dict["board"])
            if empty_cells_count == 0:
                print("ERROR: No empty cells on the board!")
                return None

            current_player, input_tensor = self.preprocess_input(input_dict)
            print(f"Current player value: {current_player}")
            print(f"Input tensor shape: {input_tensor.shape}")

            # Get the device that the model is on
            device = next(self.model.parameters()).device
            print(f"Using device: {device}")

            # Move input tensor to the same device as the model
            input_tensor = input_tensor.to(device)

            # DIRECTLY find valid empty cells from the original board, not from legal_moves calculation
            # This ensures we're using the most up-to-date board state
            original_board = np.array(input_dict["board"])
            valid_empty_cells = np.argwhere(original_board == 0).tolist()

            print(f"Total valid empty cells: {len(valid_empty_cells)}")
            if len(valid_empty_cells) == 0:
                print("ERROR: No valid empty cells found in original board!")
                return None

            # Model prediction
            if self.model:
                with torch.no_grad():
                    try:
                        policy_logits, value = self.model(input_tensor)
                        print(f"Policy logits shape: {policy_logits.shape}")
                        print(f"Value: {value.item()}")
                    except Exception as model_error:
                        print(f"Model prediction error: {str(model_error)}")
                        # Fall back to random selection if model fails
                        random_idx = np.random.randint(0, len(valid_empty_cells))
                        optimal_move = valid_empty_cells[random_idx]
                        print(f"Using random fallback move: {optimal_move}")
                        # Double-check the move is valid
                        if original_board[optimal_move[0]][optimal_move[1]] != 0:
                            print(
                                f"ERROR: Random fallback move is not valid! Trying another cell."
                            )
                            # Find another random empty cell
                            for _ in range(10):  # Try up to 10 times
                                random_idx = np.random.randint(
                                    0, len(valid_empty_cells)
                                )
                                optimal_move = valid_empty_cells[random_idx]
                                if (
                                    original_board[optimal_move[0]][optimal_move[1]]
                                    == 0
                                ):
                                    break
                        return {
                            "optimal_move": optimal_move,
                            "winning_rate": 0.5,  # Default value
                        }

                # Process policy output
                probs_device = torch.softmax(policy_logits, dim=-1)

                # Convert valid empty cells to indices based on current player
                if current_player == 1:
                    legal_moves = valid_empty_cells
                    legal_indices = [lst[0] * 11 + lst[1] for lst in legal_moves]
                    move_probs = probs_device.flatten()
                else:
                    # For player -1, we need to transpose the board
                    legal_moves = (
                        valid_empty_cells  # These are already from original board
                    )
                    legal_indices = [lst[1] * 11 + lst[0] for lst in legal_moves]
                    move_probs = probs_device.reshape(11, 11).T.flatten()
            else:
                # 若无模型，随机选择合法动作
                print("Notice: No model loaded, using random selection.")
                random_idx = np.random.randint(0, len(valid_empty_cells))
                optimal_move = valid_empty_cells[random_idx]
                # Verify the move is valid
                if original_board[optimal_move[0]][optimal_move[1]] != 0:
                    print(
                        f"ERROR: Random move {optimal_move} is not valid! Board value: {original_board[optimal_move[0]][optimal_move[1]]}. Trying another cell."
                    )
                    for cell in valid_empty_cells:
                        if original_board[cell[0]][cell[1]] == 0:
                            optimal_move = cell
                            break
                return {
                    "optimal_move": optimal_move,
                    "winning_rate": 0.5,  # Default value for random move
                }

            # Ensure indices are within bounds
            valid_indices = [
                idx for idx in legal_indices if 0 <= idx < 121
            ]  # 11*11=121
            if not valid_indices:
                print("ERROR: No valid move indices!")
                # Fall back to direct random selection from valid_empty_cells
                random_idx = np.random.randint(0, len(valid_empty_cells))
                optimal_move = valid_empty_cells[random_idx]
                return {"optimal_move": optimal_move, "winning_rate": 0.5}

            # Get legal probabilities
            legal_probs = move_probs[valid_indices]
            print(f"Legal probs shape: {legal_probs.shape}")

            # Ensure legal_probs is a tensor before calling torch.argmax
            if isinstance(legal_probs, np.ndarray):
                legal_probs = torch.from_numpy(legal_probs)

            # If tensor is empty or has NaN values, fall back to random
            if legal_probs.nelement() == 0 or torch.isnan(legal_probs).any():
                print(
                    "WARNING: Empty or NaN probabilities, falling back to random selection"
                )
                random_idx = np.random.randint(0, len(valid_empty_cells))
                optimal_move = valid_empty_cells[random_idx]
            else:
                # Sort moves by probability and try them in order
                sorted_indices = torch.argsort(legal_probs, descending=True)

                # Try the top 5 moves (or all if less than 5)
                found_valid_move = False
                for i in range(min(5, len(sorted_indices))):
                    optimal_idx = sorted_indices[i].item()
                    candidate_move = legal_moves[optimal_idx]

                    # Double check this cell is actually empty in the original board
                    if original_board[candidate_move[0]][candidate_move[1]] == 0:
                        optimal_move = candidate_move
                        found_valid_move = True
                        print(f"Selected valid move (rank {i + 1}): {optimal_move}")
                        break
                    else:
                        print(
                            f"WARNING: AI's {i + 1}th choice at {candidate_move} is not empty! Board value: {original_board[candidate_move[0]][candidate_move[1]]}"
                        )

                # If none of the top moves are valid, fall back to a random valid empty cell
                if not found_valid_move:
                    print(
                        "ERROR: None of the top moves are valid! Falling back to random selection."
                    )
                    random_idx = np.random.randint(0, len(valid_empty_cells))
                    optimal_move = valid_empty_cells[random_idx]

            # Final verification - make absolutely sure this is an empty cell
            if original_board[optimal_move[0]][optimal_move[1]] != 0:
                print(
                    f"FINAL ERROR CHECK: Selected move {optimal_move} is not valid! Board value: {original_board[optimal_move[0]][optimal_move[1]]}. Falling back to first empty cell search."
                )
                # Last resort - scan the board for the first empty cell
                for i in range(len(original_board)):
                    for j in range(len(original_board[0])):
                        if original_board[i][j] == 0:
                            optimal_move = [i, j]
                            print(f"Using first empty cell found: {optimal_move}")
                            break
                    if original_board[optimal_move[0]][optimal_move[1]] == 0:
                        break

            print(f"Final selected move: {optimal_move}")

            # Calculate winning rate
            winning_rate = ((value.item() + 1) / 2) if self.model else 0.5

            return {
                "optimal_move": optimal_move,
                "winning_rate": round(winning_rate, 2),
            }
        except Exception as e:
            print(f"Critical error in prediction: {str(e)}")
            # Emergency fallback - just return a random valid move
            try:
                board_array = np.array(input_dict["board"])
                valid_empty_cells = np.argwhere(board_array == 0).tolist()
                if valid_empty_cells:
                    random_move = valid_empty_cells[
                        np.random.randint(0, len(valid_empty_cells))
                    ]
                    return {
                        "optimal_move": random_move,
                        "winning_rate": 0.5,  # Default value
                    }
            except Exception as fallback_error:
                print(f"Even emergency fallback failed: {str(fallback_error)}")
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
