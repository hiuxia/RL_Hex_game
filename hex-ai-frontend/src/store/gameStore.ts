// src/store/gameStore.ts
import { create } from 'zustand';
import { CubeCoordinates } from "../types/hexProps";
import {
	computeGridCoordinates,
	cubeToKey,
	cubeToXY,
	xyToCube,
} from "../lib/coordinates";
import { checkWinCondition, updateWinStateToBackend } from "../lib/gameLogic";

const BOARD_SIZE = 11;
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

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
 * @param gameMode - The game mode ("HUMAN_AI" or "AI_AI")
 * @param humanColor - The human player color (in HUMAN_AI mode), either "red" or "blue"
 * @returns 1, 2, or null.
 */
const mapBackendPlayerToFrontend = (
	backendPlayer: string | null,
	gameMode: string = "HUMAN_AI",
	humanColor: string = "red"
): 1 | 2 | null => {
	// For AI_AI mode, handle AI_1 and AI_2
	if (gameMode === "AI_AI") {
		if (backendPlayer === "AI_1") return 1; // Player 1 (Red)
		if (backendPlayer === "AI_2") return 2; // Player 2 (Blue)
	}
	// For HUMAN_AI mode, use human_color to determine which player is which number
	else {
		// Default assumption: human is red (1) and AI is blue (2)
		if (humanColor === "red") {
			if (backendPlayer === "human") return 1; // Player 1 (Red)
			if (backendPlayer === "AI") return 2; // Player 2 (Blue)
		}
		// If human is blue, then human is player 2 and AI is player 1
		else if (humanColor === "blue") {
			if (backendPlayer === "human") return 2; // Player 2 (Blue)
			if (backendPlayer === "AI") return 1; // Player 1 (Red)
		}
	}

	// Handle null, "draw", or unknown values
	if (backendPlayer === null || backendPlayer === "draw") return null;

	console.warn(
		`Unknown backend player identifier encountered: ${backendPlayer} (mode: ${gameMode}, human color: ${humanColor})`
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

// Types for backend API responses
interface BackendMoveHistoryItem {
	player: string;
	x: number;
	y: number;
	step: number;
	color: string;
}

interface BackendGameState {
	id: string | number;
	board: (0 | 1 | -1)[][];
	player_turn: string;
	last_moves: number[][];
	moves_history: BackendMoveHistoryItem[];
	winner: string | null;
	human_color: "red" | "blue";
	win_probability: {
		human: number;
		AI?: number; // Backend uses uppercase AI
		ai?: number; // We check for lowercase version as well for resilience
	} | null;
	mode?: "HUMAN_AI" | "AI_AI";
}

// --- REST API Functions ---

/**
 * Fetches the current game state from the backend
 * @param gameId The ID of the game to fetch
 * @returns Promise resolving to the game state or null if error
 */
const fetchGameState = async (
	gameId: string
): Promise<BackendGameState | null> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/games/${gameId}/`);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch game: ${response.status} ${response.statusText}`
			);
		}
		return await response.json();
	} catch (err) {
		console.error(`Error fetching game state for game ${gameId}:`, err);
		return null;
	}
};

/**
 * Makes a move on the backend
 * @param gameId The ID of the game
 * @param x The x coordinate (backend format)
 * @param y The y coordinate (backend format)
 * @returns Promise resolving to the updated game state or null if error
 */
const makeMove = async (
	gameId: string,
	x: number,
	y: number
): Promise<BackendGameState | null> => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/api/games/${gameId}/move/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ x, y }),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to make move: ${response.status} ${response.statusText}`
			);
		}

		return await response.json();
	} catch (err) {
		console.error(`Error making move for game ${gameId}:`, err);
		return null;
	}
};

/**
 * Requests an AI move from the backend
 * @param gameId The ID of the game
 * @returns Promise resolving to the updated game state or null if error
 */
const requestAiMoveFromBackend = async (
	gameId: string
): Promise<BackendGameState | null> => {
	try {
		console.log(`Requesting AI move for game ${gameId}`);
		// Add a brief delay to give better UX during AI "thinking"
		await new Promise((resolve) => setTimeout(resolve, 500));

		const response = await fetch(
			`${API_BASE_URL}/api/games/${gameId}/ai_move/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({}), // Send empty object instead of no body
			}
		);

		if (!response.ok) {
			// Check if response is JSON
			const contentType = response.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				const errorData = await response.json();
				const errorMessage = errorData.error || "Unknown error";

				// Specially handle cell overlap errors
				if (errorMessage.includes("non-empty cell")) {
					console.warn(
						`AI move overlap detected: ${errorMessage} - Will try to fetch current state instead.`
					);
					// Return null to trigger retry of current state
					return null;
				}

				throw new Error(
					`Failed to request AI move: ${response.status} ${response.statusText} - ${errorMessage}`
				);
			} else {
				throw new Error(
					`Failed to request AI move: ${response.status} ${response.statusText}`
				);
			}
		}

		return await response.json();
	} catch (err) {
		console.error(`Error requesting AI move for game ${gameId}:`, err);
		return null;
	}
};

/**
 * Undoes the last move
 * @param gameId The ID of the game
 * @returns Promise resolving to the updated game state or null if error
 */
const undoMove = async (gameId: string): Promise<BackendGameState | null> => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/api/games/${gameId}/undo/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to undo move: ${response.status} ${response.statusText}`
			);
		}

		return await response.json();
	} catch (err) {
		console.error(`Error undoing move for game ${gameId}:`, err);
		return null;
	}
};

/**
 * Restarts the game
 * @param gameId The ID of the game
 * @returns Promise resolving to the updated game state or null if error
 */
const restartGame = async (
	gameId: string
): Promise<BackendGameState | null> => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/api/games/${gameId}/restart/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to restart game: ${response.status} ${response.statusText}`
			);
		}

		return await response.json();
	} catch (err) {
		console.error(`Error restarting game ${gameId}:`, err);
		return null;
	}
};

/**
 * Creates a new game
 * @param mode The game mode (HUMAN_AI or AI_AI)
 * @returns Promise resolving to the new game ID or null if error
 */
const createNewGame = async (
	mode: "HUMAN_AI" | "AI_AI"
): Promise<string | null> => {
	try {
		const endpoint =
			mode === "HUMAN_AI"
				? `${API_BASE_URL}/api/games/`
				: `${API_BASE_URL}/api/ai_games/`;

		const response = await fetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ mode }),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to create game: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();
		return data.id?.toString() || null;
	} catch (err) {
		console.error(`Error creating new game:`, err);
		return null;
	}
};

/**
 * Requests the next AI move in an AI vs AI game
 * @param gameId The ID of the game
 * @returns Promise resolving to the updated game state or null if error
 */
const requestNextAIMove = async (
	gameId: string
): Promise<BackendGameState | null> => {
	try {
		console.log(`Requesting next AI move for AI vs AI game ${gameId}`);

		// Add a brief delay to give better UX during AI "thinking"
		await new Promise((resolve) => setTimeout(resolve, 500));

		const response = await fetch(
			`${API_BASE_URL}/api/ai_games/${gameId}/next_move/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({}), // Send empty object
			}
		);

		if (!response.ok) {
			const contentType = response.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				const errorData = await response.json();
				throw new Error(
					`Failed to request next AI move: ${response.status} ${
						response.statusText
					} - ${errorData.error || "Unknown error"}`
				);
			} else {
				const errorText = await response.text();
				console.error("Error response content:", errorText);
				throw new Error(
					`Failed to request next AI move: ${response.status} ${response.statusText}`
				);
			}
		}

		return await response.json();
	} catch (err) {
		console.error(`Error requesting next AI move for game ${gameId}:`, err);
		return null;
	}
};

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
	winProbability: { human: number; ai: number } | null; // Win probabilities
	mode: "HUMAN_AI" | "AI_AI" | null; // Game mode
	isLoading: boolean; // Indicates an API request is in progress
	lastError: string | null; // Store last error message
};

// Actions available in the store
interface GameStoreActions {
	// Core state setters
	setGameId: (gameId: string | null) => void;
	setLastError: (error: string | null) => void;
	highlightLastMove: (coords: CubeCoordinates | null) => void;

	// Game data processing
	processGameState: (gameData: BackendGameState) => void;

	// API interaction functions
	fetchGame: (gameId: string) => Promise<void>;
	createGame: (mode: "HUMAN_AI" | "AI_AI") => Promise<string | null>;
	makeMove: (coords: CubeCoordinates) => Promise<void>;
	requestAiMove: () => Promise<void>;
	undoLastMove: () => Promise<void>;
	restartCurrentGame: () => Promise<void>;
	requestNextAIMove: () => Promise<void>;

	// UI state management
	setIsLoading: (isLoading: boolean) => void;
	resetGameState: () => void;
}

// --- Store Definition ---
const initialState: GameState = {
	gameId: null,
	boardState: initializeBoardState(BOARD_SIZE),
	playerTurn: null,
	humanPlayerColor: null,
	moves: 0,
	highlightedHexes: [],
	winner: null,
	isDraw: false,
	winProbability: null,
	mode: null,
	isLoading: false,
	lastError: null,
};

export const useGameStore = create<GameState & GameStoreActions>(
	(set, get) => ({
		...initialState,

		// --- Core state setters ---
		setGameId: (gameId) => set({ gameId }),
		setLastError: (error) => set({ lastError: error }),
		highlightLastMove: (coords) =>
			set({
				highlightedHexes: coords ? [coords] : [],
			}),
		setIsLoading: (isLoading) => set({ isLoading }),

		// --- Game data processing ---
		processGameState: (gameData) => {
			console.log("Processing game state:", {
				mode: gameData.mode,
				player_turn: gameData.player_turn,
				human_color: gameData.human_color,
				moves_history_length: gameData.moves_history?.length,
				last_move:
					gameData.moves_history?.length > 0
						? gameData.moves_history[
								gameData.moves_history.length - 1
						  ]
						: null,
			});

			// Map backend board to frontend format
			const boardState = mapBackendBoard(gameData.board);

			// Map player turn (pass mode and human_color for better mapping)
			const playerTurn = mapBackendPlayerToFrontend(
				gameData.player_turn,
				gameData.mode,
				gameData.human_color
			);

			// Map winner (pass mode and human_color for better mapping)
			const winner = mapBackendPlayerToFrontend(
				gameData.winner,
				gameData.mode,
				gameData.human_color
			);
			const isDraw = gameData.winner === "draw";

			// Handle last move highlighting
			let highlightedHexes: CubeCoordinates[] = [];
			if (gameData.last_moves && gameData.last_moves.length > 0) {
				const [x, y] =
					gameData.last_moves[gameData.last_moves.length - 1];
				const lastMoveCoords = xyToCube(x, y);
				if (lastMoveCoords) {
					highlightedHexes = [lastMoveCoords];
				}
			}

			// Process win probability - handle both uppercase AI and lowercase ai
			let normalizedWinProbability = null;
			if (gameData.win_probability) {
				normalizedWinProbability = {
					human: gameData.win_probability.human,
					ai:
						gameData.win_probability.AI ??
						gameData.win_probability.ai ??
						0.5,
				};
			}

			// Update state
			set({
				boardState,
				playerTurn,
				humanPlayerColor: gameData.human_color || null,
				moves: gameData.moves_history?.length || 0,
				highlightedHexes,
				winner,
				isDraw,
				winProbability: normalizedWinProbability,
				mode: gameData.mode || null,
				lastError: null, // Clear any previous errors
				isLoading: false, // API call completed
			});

			// Log state update for debugging
			console.log("Updated game state:", {
				playerTurn,
				moves: gameData.moves_history?.length || 0,
				winner,
				isDraw,
				mode: gameData.mode,
			});
		},

		// --- API interaction functions ---
		fetchGame: async (gameId) => {
			set({ isLoading: true, lastError: null });

			try {
				const gameData = await fetchGameState(gameId);
				if (gameData) {
					get().processGameState(gameData);
				} else {
					set({
						lastError: "Failed to fetch game data",
						isLoading: false,
					});
				}
			} catch (err) {
				console.error("Error fetching game:", err);
				set({
					lastError:
						err instanceof Error
							? err.message
							: "Unknown error fetching game",
					isLoading: false,
				});
			}
		},

		createGame: async (mode) => {
			set({ isLoading: true, lastError: null });

			try {
				const gameId = await createNewGame(mode);
				if (gameId) {
					set({ gameId, isLoading: false });
					return gameId;
				} else {
					set({
						lastError: "Failed to create game",
						isLoading: false,
					});
					return null;
				}
			} catch (err) {
				console.error("Error creating game:", err);
				set({
					lastError:
						err instanceof Error
							? err.message
							: "Unknown error creating game",
					isLoading: false,
				});
				return null;
			}
		},

		makeMove: async (coords) => {
			const { gameId } = get();
			if (!gameId) {
				set({ lastError: "No active game" });
				return;
			}

			set({ isLoading: true, lastError: null });

			// Convert frontend cube coordinates to backend XY
			const backendCoords = cubeToXY(coords);
			if (!backendCoords) {
				set({
					lastError: "Invalid move coordinates",
					isLoading: false,
				});
				return;
			}

			try {
				// Make the move on the backend
				const gameData = await makeMove(
					gameId,
					backendCoords.x,
					backendCoords.y
				);

				if (gameData) {
					// Update the frontend state with the backend response
					get().processGameState(gameData);

					// After updating the state, check for a win in the frontend
					const updatedBoardState = get().boardState;
					const currentPlayer = get().playerTurn;

					// If the game isn't already marked as won by the backend
					if (currentPlayer && !gameData.winner) {
						// Check if the current player has won
						const playerToCheck = currentPlayer === 1 ? 2 : 1; // We check previous player who just moved
						const hasWon = checkWinCondition(
							updatedBoardState,
							playerToCheck
						);

						if (hasWon) {
							console.log(
								`Frontend detected win for player ${playerToCheck}`
							);
							// Update win state locally first
							set({
								winner: playerToCheck,
								isDraw: false,
							});

							// Also notify the backend about the win
							await updateWinStateToBackend(
								gameId,
								playerToCheck
							);
						}
					}
				} else {
					set({ lastError: "Failed to make move", isLoading: false });
				}
			} catch (err) {
				console.error("Error making move:", err);
				set({
					lastError:
						err instanceof Error
							? err.message
							: "Unknown error making move",
					isLoading: false,
				});
			}
		},

		requestAiMove: async () => {
			const { gameId } = get();
			if (!gameId) {
				set({ lastError: "No active game" });
				return;
			}

			set({ isLoading: true, lastError: null });

			try {
				console.log("Requesting AI move...");
				const maxRetries = 2;
				let retryCount = 0;
				let gameData: BackendGameState | null = null;

				// Try the AI move with retries
				while (retryCount <= maxRetries && !gameData) {
					if (retryCount > 0) {
						console.log(
							`Retry attempt ${retryCount}/${maxRetries} for AI move...`
						);
					}

					gameData = await requestAiMoveFromBackend(gameId);
					retryCount++;

					// If still null after last retry, fall back to fetching current state
					if (!gameData && retryCount > maxRetries) {
						console.log(
							"All AI move retries failed, fetching current game state..."
						);
						gameData = await fetchGameState(gameId);
					}
				}

				if (gameData) {
					// Update the frontend state with the backend response
					get().processGameState(gameData);

					// After updating the state, check for a win in the frontend
					const updatedBoardState = get().boardState;
					const currentPlayer = get().playerTurn;

					// If the game isn't already marked as won by the backend
					if (currentPlayer && !gameData.winner) {
						// Check if the AI has won (we just made the AI move)
						const playerToCheck = 2; // AI is player 2
						const hasWon = checkWinCondition(
							updatedBoardState,
							playerToCheck
						);

						if (hasWon) {
							console.log(
								`Frontend detected win for AI (player ${playerToCheck})`
							);
							// Update win state locally first
							set({
								winner: playerToCheck,
								isDraw: false,
							});

							// Also notify the backend about the win
							await updateWinStateToBackend(
								gameId,
								playerToCheck
							);
						}
					}
				} else {
					set({
						lastError:
							"Failed to get AI move after multiple attempts",
						isLoading: false,
					});
				}
			} catch (err) {
				console.error("Error requesting AI move:", err);
				set({
					lastError:
						err instanceof Error
							? err.message
							: "Unknown error requesting AI move",
					isLoading: false,
				});

				// Try to recover by fetching current game state
				try {
					const currentState = await fetchGameState(gameId);
					if (currentState) {
						get().processGameState(currentState);
					}
				} catch (recoveryErr) {
					console.error(
						"Failed to recover game state after AI move error:",
						recoveryErr
					);
				}
			}
		},

		undoLastMove: async () => {
			const { gameId } = get();
			if (!gameId) {
				set({ lastError: "No active game" });
				return;
			}

			set({ isLoading: true, lastError: null });

			try {
				const gameData = await undoMove(gameId);
				if (gameData) {
					get().processGameState(gameData);
				} else {
					set({ lastError: "Failed to undo move", isLoading: false });
				}
			} catch (err) {
				console.error("Error undoing move:", err);
				set({
					lastError:
						err instanceof Error
							? err.message
							: "Unknown error undoing move",
					isLoading: false,
				});
			}
		},

		restartCurrentGame: async () => {
			const { gameId } = get();
			if (!gameId) {
				set({ lastError: "No active game" });
				return;
			}

			set({ isLoading: true, lastError: null });

			try {
				const gameData = await restartGame(gameId);
				if (gameData) {
					get().processGameState(gameData);
				} else {
					set({
						lastError: "Failed to restart game",
						isLoading: false,
					});
				}
			} catch (err) {
				console.error("Error restarting game:", err);
				set({
					lastError:
						err instanceof Error
							? err.message
							: "Unknown error restarting game",
					isLoading: false,
				});
			}
		},

		requestNextAIMove: async () => {
			const { gameId, mode } = get();
			if (!gameId) {
				set({ lastError: "No active game" });
				return;
			}

			if (mode !== "AI_AI") {
				set({ lastError: "This function is only for AI vs AI games" });
				return;
			}

			set({ isLoading: true, lastError: null });

			// Max retries and delay between retries
			const maxRetries = 2;
			const retryDelay = 1500; // 1.5 seconds between retries
			let retryCount = 0;

			const tryRequestNextAIMove =
				async (): Promise<BackendGameState | null> => {
					try {
						const gameData = await requestNextAIMove(gameId);
						return gameData;
					} catch (err) {
						console.error(
							`Error requesting next AI move (attempt ${
								retryCount + 1
							}/${maxRetries + 1}):`,
							err
						);

						if (retryCount < maxRetries) {
							retryCount++;
							console.log(
								`Retrying in ${retryDelay}ms... (attempt ${
									retryCount + 1
								}/${maxRetries + 1})`
							);
							await new Promise((resolve) =>
								setTimeout(resolve, retryDelay)
							);
							return tryRequestNextAIMove();
						}

						throw err;
					}
				};

			try {
				console.log("Requesting next AI move for AI vs AI game...");
				const gameData = await tryRequestNextAIMove();

				if (gameData) {
					// Update the frontend state with the backend response
					get().processGameState(gameData);
				} else {
					set({
						lastError:
							"Failed to request next AI move after multiple attempts",
						isLoading: false,
					});

					// Try to recover by fetching current game state
					try {
						console.log(
							"Attempting to recover by fetching current game state..."
						);
						const currentState = await fetchGameState(gameId);
						if (currentState) {
							get().processGameState(currentState);
						}
					} catch (recoveryErr) {
						console.error(
							"Failed to recover game state after next AI move error:",
							recoveryErr
						);
					}
				}
			} catch (err) {
				console.error("Error requesting next AI move:", err);
				set({
					lastError:
						err instanceof Error
							? err.message
							: "Unknown error requesting next AI move",
					isLoading: false,
				});

				// Try to recover by fetching current game state
				try {
					console.log(
						"Attempting to recover by fetching current game state..."
					);
					const currentState = await fetchGameState(gameId);
					if (currentState) {
						get().processGameState(currentState);
					}
				} catch (recoveryErr) {
					console.error(
						"Failed to recover game state after next AI move error:",
						recoveryErr
					);
				}
			}
		},

		// --- UI state management ---
		resetGameState: () => {
			const { gameId } = get();
			set({
				...initialState,
				gameId, // Preserve the game ID
			});
		},
	})
);
