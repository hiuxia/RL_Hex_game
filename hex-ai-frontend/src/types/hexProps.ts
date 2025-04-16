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
		size: number; // e.g., 11
		created?: string; // Optional: Date/time game started
		moves?: number; // Optional: Total moves made
		mode?: "HUMAN_AI" | "AI_AI" | "HUMAN_HUMAN"; // Game mode
		// Add other relevant static info as needed
	};
	/** Optional CSS class name for additional styling. */
	className?: string;
}

/**
 * Props for the GameplayControls component.
 */
export interface GameplayControlsProps {
	/** Optional CSS class name for additional styling. */
	className?: string;

	/** Callback for undo action */
	onUndo: () => void;

	/** Callback for restart action */
	onRestart: () => void;

	/** Callback for new game action */
	onNewGame: () => void;

	/** Callback for requesting an AI move */
	onRequestAiMove: () => void;

	/** Flag to disable undo button */
	disableUndo: boolean;

	/** Flag to disable restart button */
	disableRestart: boolean;

	/** Flag to disable AI move request button */
	disableRequestAiMove: boolean;
}
