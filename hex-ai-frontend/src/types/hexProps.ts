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
  p1: string;       // Color for Player 1
  p2: string;       // Color for Player 2
  empty: string;    // Color for empty hex tiles
  background: string; // Background color for the SVG canvas
}

/**
 * Props for the HexBoard component.
 */
export interface HexBoardProps {
  /**
   * 2D array representing the state of each hex tile on the board.
   * The mapping from array indices (row, col) to CubeCoordinates needs
   * to be handled internally or during generation.
   * Values typically: 0 (empty), 1 (Player 1), 2 (Player 2).
   *
   * NOTE: For an 11x11 grid, this might be simplified later to directly use
   * a Map or object keyed by stringified CubeCoordinates for easier lookup.
   * For now, we assume a mapping function exists or the boardState
   * is pre-processed to be easily accessible by CubeCoordinates.
   */
  boardState: Map<string, 0 | 1 | 2>; // Using a Map keyed by "q,r,s" string

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
  /** The player whose turn it currently is (1 or 2). */
  playerTurn: number;

  /** The winner of the game (1 or 2), or null if ongoing. */
  winner: number | null;

  /** Callback function for the 'New Game' button. */
  onNewGameClick: () => void;

  /** Optional callback function for an 'Undo' action. */
  onUndoClick?: () => void;

  /** Optional callback function for a 'Resign' action. */
  onResignClick?: () => void;

  /** Flag to enable/disable controls (e.g., during AI thinking or game over). */
  isInteractionAllowed: boolean;

  /** Optional CSS class name for additional styling. */
  className?: string;
}

