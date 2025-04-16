// src/types/hexProps.ts

/**
 * Type definitions for Hex game properties.
 */

/**
 * Represents Hex coordinates using the Cube coordinate system (q, r, s).
 * Ensures that q + r + s = 0.
 */
export interface CubeCoordinates {
  q: number;
  r: number;
  s: number;
}

/**
 * Defines the color scheme for the game board and players.
 * Colors can be hex codes, Tailwind class names, or CSS color keywords.
 */
export interface PlayerColors {
  p1: string;       // Color for Player 1 (Red)
  p2: string;       // Color for Player 2 (Blue)
  empty: string;    // Color for empty hex tiles
  background: string; // Background color for the SVG canvas
}

/**
 * Props for the HexBoard component.
 */
export interface HexBoardProps {
  /** Map representing the state of each hex tile. Key: "q,r,s", Value: 0 (empty), 1 (P1), 2 (P2). */
  boardState: Map<string, 0 | 1 | 2>;

  /** Color definitions for players and board elements. */
  playerColors: PlayerColors;

  /** Callback function invoked when a hexagon is clicked. */
  onHexClick: (coords: CubeCoordinates) => void;

  /** Optional array of hex coordinates to visually highlight (e.g., last move). */
  highlightedHexes?: CubeCoordinates[];

  /** Optional CSS class name for additional styling of the SVG container. */
  className?: string;

  /** The size of the hex board (e.g., 11 for an 11x11 grid). */
  boardSize: number;
}

/**
 * Props for the GameInfo component.
 */
export interface GameInfoProps {
  /** Static metadata about the current game. */
  gameMetadata: {
    size: number;       // e.g., 11
    created?: string;   // Optional: Date/time game started
    moves?: number;     // Optional: Total moves made
    // Add other relevant static info as needed
  };
  /** Optional CSS class name for additional styling. */
  className?: string;
}

/**
 * Props for the GameplayControls component.
 */
export interface GameplayControlsProps {
  /** The player whose turn it currently is (1 or 2), or 0/null if loading/over. */
  playerTurn: number | null;

  /** The winner of the game (1 or 2), or null if ongoing. */
  winner: number | null;

  /** Flag indicating if the game ended in a draw. */
  isDraw?: boolean;

  /** Callback function for the 'New Game' button (likely navigates to dashboard). */
  onNewGameClick: () => void;

  /** Optional callback function for an 'Undo' action. */
  onUndoClick?: () => void;

  /** Optional callback function for a 'Redo' action. */
  onRedoClick?: () => void; // Note: Backend might not support redo

  /** Optional callback function for a 'Restart' action. */
  onRestartClick?: () => void;

  /** Optional callback function for a 'Resign' action (if implemented). */
  onResignClick?: () => void;

  /** Flag to enable/disable controls (e.g., during AI thinking or game over). */
  isInteractionAllowed: boolean;

  /** Flag indicating if the undo action is currently possible. */
  canUndo?: boolean;

  /** Flag indicating if the redo action is currently possible. */
  canRedo?: boolean;

  /** Optional CSS class name for additional styling. */
  className?: string;
}
