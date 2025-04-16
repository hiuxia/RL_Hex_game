// src/store/gameStore.ts
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
    // Mapping based on backend code (models.py, consumers.py)
    // Assuming Red is Player 1, Blue is Player 2
    // Human is assumed P1 if red, P2 if blue (handled by checking human_color later if needed)
    // AI is assumed P2 if human is red, P1 if human is blue
    // AI_1 is assumed P1 (Red), AI_2 is assumed P2 (Blue) in AI_AI mode
    if (backendPlayer === 'human' || backendPlayer === 'AI_1') return 1; // Player 1 (Red)
    if (backendPlayer === 'AI' || backendPlayer === 'AI_2') return 2; // Player 2 (Blue)
    if (backendPlayer === null || backendPlayer === 'draw') return null; // Game ongoing, Draw, or explicitly null winner
    console.warn(`Unknown backend player identifier encountered: ${backendPlayer}`);
    return null; // Return null for unknown cases
};

/**
 * Maps the backend board representation (11x11 array) to the frontend board state map.
 * @param backendBoard - The 11x11 array from the backend (1=Red, -1=Blue, 0=Empty).
 * Assumes backendBoard[row][col] indexing.
 * @returns A Map representing the frontend board state.
 */
const mapBackendBoard = (backendBoard: (0 | 1 | -1)[][]): Map<string, 0 | 1 | 2> => {
    // Validate backendBoard structure
    if (!backendBoard || !Array.isArray(backendBoard) || backendBoard.length !== BOARD_SIZE) {
        console.error("Invalid backend board structure received. Expected 11x11 array.", backendBoard);
        return initializeBoardState(BOARD_SIZE); // Return empty board on error
    }

    const frontendBoard = new Map<string, 0 | 1 | 2>();
    // Use clearer variable names: 'row' for backend 'x', 'col' for backend 'y'
    for (let row = 0; row < BOARD_SIZE; row++) {
        if (!Array.isArray(backendBoard[row]) || backendBoard[row].length !== BOARD_SIZE) {
            console.error(`Invalid backend board row structure at index row=${row}.`, backendBoard[row]);
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
                const frontendValue = backendValue === 1 ? 1 : backendValue === -1 ? 2 : 0;
                frontendBoard.set(cubeToKey(coords), frontendValue as 0 | 1 | 2);
            } else {
                // This should ideally not happen if BOARD_SIZE is consistent
                console.warn(`Could not map backend board coordinates row=${row}, col=${col} to valid CubeCoordinates.`);
            }
        }
    }

    // Optional: Verify all expected hexes are present (good for debugging)
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
    // highlightLastMove: (coords: CubeCoordinates | null) => void; // Highlight logic is now inside handleGameStateUpdate
    setSendMessage: (sender: (payload: object) => void) => void; // Receive sendMessage func from hook
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

    // Called by the useGameWebSocket hook once the connection is open
    setSendMessage: (sender) => set({ sendMessage: sender }),

    /**
     * Processes game state updates received from the backend via WebSocket.
     * @param backendData - The 'data' object from the backend message (type 'game_state' or 'game_update').
     * Expected fields based on HexGameSerializer.
     */
    handleGameStateUpdate: (backendData) => {
        console.log("Store: Handling backend game state update:", backendData);

        // Basic validation of received data structure
        if (!backendData || typeof backendData !== 'object') {
             console.error("Store Error: Received invalid or non-object game state data:", backendData);
             set({ lastBackendError: "Received invalid game state format from server." });
             return;
        }
        // Check for essential fields (can add more checks as needed)
         if (!backendData.board || backendData.player_turn === undefined || !backendData.moves_history) {
             console.error("Store Error: Received incomplete game state data (missing board, player_turn, or moves_history):", backendData);
             set({ lastBackendError: "Received incomplete game state from server." });
             return;
         }


        try {
            const newBoardState = mapBackendBoard(backendData.board);
            const currentPlayer = mapBackendPlayerToFrontend(backendData.player_turn);
            const winnerPlayer = mapBackendPlayerToFrontend(backendData.winner); // Handles 'human', 'AI', null, 'AI_1', 'AI_2'
            const isDraw = backendData.winner === 'draw'; // Check specifically for draw

            // Determine the last move coordinates from moves_history to highlight
            let lastMoveCoords: CubeCoordinates | null = null;
            if (Array.isArray(backendData.moves_history) && backendData.moves_history.length > 0) {
                const lastAction = backendData.moves_history[backendData.moves_history.length - 1];
                // Check if last action has x and y (as per backend model)
                if (lastAction && lastAction.x !== undefined && lastAction.y !== undefined) {
                    // Convert backend x (row), y (col) to frontend CubeCoordinates
                    lastMoveCoords = xyToCube(lastAction.x, lastAction.y);
                    if (!lastMoveCoords) {
                        console.warn(`Store: Could not convert backend last move x=${lastAction.x}, y=${lastAction.y} to CubeCoordinates.`);
                    } else {
                         console.log(`Store: Highlighting last move at Cube (${lastMoveCoords.q}, ${lastMoveCoords.r}, ${lastMoveCoords.s}) from backend XY (${lastAction.x}, ${lastAction.y})`);
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
                moves: Array.isArray(backendData.moves_history) ? backendData.moves_history.length : 0,
                mode: backendData.mode ?? get().mode, // Update mode if provided
                humanPlayerColor: backendData.human_color ?? get().humanPlayerColor, // Update human color if provided
                winProbability: backendData.win_probability ?? null, // Update win probability (handle null)
                highlightedHexes: lastMoveCoords ? [lastMoveCoords] : [], // Highlight based on history
                lastBackendError: null, // Clear previous errors on successful update
                gameId: backendData.id ? String(backendData.id) : get().gameId, // Update gameId if present (ensure string)
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
            set({ lastBackendError: "Not connected to server." });
            return;
        }
        if (winner !== null || isDraw) {
            console.log("Store: Cannot send move - Game already over.");
            set({ lastBackendError: "Game is already over." });
            return;
        }
        // Check if the clicked hex is empty
        const hexKey = cubeToKey(coords);
        const currentHexState = boardState.get(hexKey);
        if (currentHexState !== 0) {
             console.log(`Store: Cannot send move - Hex (${coords.q}, ${coords.r}) is not empty (State: ${currentHexState}).`);
             set({ lastBackendError: "You can only place a piece on an empty hex." });
             return;
        }
        // TODO: Add frontend check for player's turn if desired (backend also validates)

        // Convert frontend CubeCoordinates to backend XY format
        const xy = cubeToXY(coords); // BOARD_SIZE is implicitly 11 here

        if (xy) {
            // Format the payload according to backend API
            const payload = {
                action: 'move',
                x: xy.x, // Corresponds to frontend 'r' (row)
                y: xy.y  // Corresponds to frontend 'q' (col)
            };
            console.log("Store: Sending 'move' action with payload:", payload);
            sendMessage(payload);
            // Clear any previous errors after attempting a valid move
            set({ lastBackendError: null });
        } else {
            console.error(`Store Error: Invalid coordinates for move - Cube: q=${coords.q}, r=${coords.r}, s=${coords.s}. Could not convert to XY.`);
            set({ lastBackendError: "Invalid move coordinates selected." });
        }
    },

    /**
     * Sends an 'undo' action to the backend.
     */
    requestUndo: () => {
        const { sendMessage, connectionState, winner, isDraw, moves } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send undo - WebSocket not open.");
             set({ lastBackendError: "Not connected to server." });
             return;
        }
        if (winner !== null || isDraw) {
             console.log("Store: Cannot send undo - Game already over.");
             set({ lastBackendError: "Cannot undo, game is over." });
             return;
        }
        if (moves === 0) {
            console.log("Store: Cannot send undo - No moves made yet.");
            set({ lastBackendError: "No moves to undo." });
            return;
        }
        const payload = { action: 'undo' };
        console.log("Store: Sending 'undo' action.");
        sendMessage(payload);
        set({ lastBackendError: null }); // Clear errors on request
    },

    /**
     * Placeholder for 'redo' action (not in backend API doc).
     */
    requestRedo: () => {
        console.warn("Store: Redo action not implemented/supported by backend API.");
        set({ lastBackendError: "Redo action is not available." });
    },

    /**
     * Sends a 'restart' action to the backend.
     */
    requestRestart: () => {
        const { sendMessage, connectionState } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send restart - WebSocket not open.");
              set({ lastBackendError: "Not connected to server." });
             return;
        }
        const payload = { action: 'restart' };
        console.log("Store: Sending 'restart' action.");
        sendMessage(payload);
        set({ lastBackendError: null }); // Clear errors on request
    },

    /**
     * Sends an 'ai_move' action to the backend.
     * Primarily intended for AI vs AI mode or potentially specific scenarios in Human vs AI.
     */
    requestAiMove: () => {
        const { sendMessage, connectionState, winner, isDraw } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send ai_move - WebSocket not open.");
             set({ lastBackendError: "Not connected to server." });
             return;
        }
        if (winner !== null || isDraw) {
             console.log("Store: Cannot send ai_move - Game already over.");
             set({ lastBackendError: "Game is already over." });
             return;
        }
        const payload = { action: 'ai_move' };
        console.log("Store: Sending 'ai_move' action.");
        sendMessage(payload);
        set({ lastBackendError: null }); // Clear errors on request
    },

}));
