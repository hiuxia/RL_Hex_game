import { CubeCoordinates } from "@/types/hexProps";
import { cubeToKey, keyToCube } from "./coordinates";

const BOARD_SIZE = 11;

/**
 * Checks if a player has won by connecting from their starting edge
 * to their opposite edge. For red (player 1), this means connecting
 * top to bottom (min r to max r). For blue (player 2), this means
 * connecting left to right (min q to max q).
 *
 * @param boardState - The current board state as a Map
 * @param player - The player to check (1 for red, 2 for blue)
 * @returns True if the player has won, false otherwise
 */
export function checkWinCondition(
	boardState: Map<string, 0 | 1 | 2>,
	player: 1 | 2
): boolean {
	// Create a set of all hex coordinates occupied by the player
	const playerCells = new Set<string>();
	boardState.forEach((value, key) => {
		if (value === player) {
			playerCells.add(key);
		}
	});

	// If player has no cells, they haven't won
	if (playerCells.size === 0) {
		return false;
	}

	// For player 1 (red), check connection from top to bottom (min r to max r)
	if (player === 1) {
		const startCells: CubeCoordinates[] = [];

		// Find all red cells on the top edge (r=0)
		for (let q = 0; q < BOARD_SIZE; q++) {
			const coords = { q, r: 0, s: -q };
			const key = cubeToKey(coords);
			if (playerCells.has(key)) {
				startCells.push(coords);
			}
		}

		// If no start cells, no win
		if (startCells.length === 0) {
			return false;
		}

		// Check if any of the start cells can reach the bottom edge
		return startCells.some((cell) => {
			const visited = new Set<string>();
			return dfs(
				cell,
				playerCells,
				visited,
				(coords) => coords.r === BOARD_SIZE - 1
			);
		});
	}

	// For player 2 (blue), check connection from left to right (min q to max q)
	else {
		const startCells: CubeCoordinates[] = [];

		// Find all blue cells on the left edge (q=0)
		for (let r = 0; r < BOARD_SIZE; r++) {
			const coords = { q: 0, r, s: -r };
			const key = cubeToKey(coords);
			if (playerCells.has(key)) {
				startCells.push(coords);
			}
		}

		// If no start cells, no win
		if (startCells.length === 0) {
			return false;
		}

		// Check if any of the start cells can reach the right edge
		return startCells.some((cell) => {
			const visited = new Set<string>();
			return dfs(
				cell,
				playerCells,
				visited,
				(coords) => coords.q === BOARD_SIZE - 1
			);
		});
	}
}

/**
 * Performs a depth-first search from the start cell through all connected
 * cells belonging to the player, checking if any cell satisfies the target condition.
 *
 * @param current - The current cell being examined
 * @param playerCells - Set of all cells belonging to the player
 * @param visited - Set of cells already visited in this search
 * @param isTarget - Function that returns true if a cell satisfies the win condition
 * @returns True if a path to a target cell is found, false otherwise
 */
function dfs(
	current: CubeCoordinates,
	playerCells: Set<string>,
	visited: Set<string>,
	isTarget: (coords: CubeCoordinates) => boolean
): boolean {
	const currentKey = cubeToKey(current);

	// If already visited, avoid cycles
	if (visited.has(currentKey)) {
		return false;
	}

	// If this is not a player's cell, can't continue
	if (!playerCells.has(currentKey)) {
		return false;
	}

	// Mark as visited
	visited.add(currentKey);

	// Check if this is a target cell
	if (isTarget(current)) {
		return true;
	}

	// Get all six adjacent hexagons
	const neighbors = getNeighbors(current);

	// Check all neighbors recursively
	for (const neighbor of neighbors) {
		if (dfs(neighbor, playerCells, visited, isTarget)) {
			return true;
		}
	}

	// No path found from this cell
	return false;
}

/**
 * Gets all six neighboring hexes of a given hex in cube coordinates.
 *
 * @param coords - The coordinates of the hex
 * @returns Array of coordinates for all neighboring hexes
 */
function getNeighbors(coords: CubeCoordinates): CubeCoordinates[] {
	const { q, r, s } = coords;
	return [
		{ q: q + 1, r: r, s: s - 1 },
		{ q: q + 1, r: r - 1, s: s },
		{ q: q, r: r + 1, s: s - 1 },
		{ q: q, r: r - 1, s: s + 1 },
		{ q: q - 1, r: r + 1, s: s },
		{ q: q - 1, r: r, s: s + 1 },
	].filter((coord) => {
		// Ensure coordinates are within the board bounds
		return (
			coord.q >= 0 &&
			coord.q < BOARD_SIZE &&
			coord.r >= 0 &&
			coord.r < BOARD_SIZE
		);
	});
}

/**
 * Converts the board state to a backend-compatible 2D array format.
 * This is useful when sending the frontend state to the backend.
 *
 * @param boardState - The frontend board state
 * @returns A 2D array representation of the board state (0=empty, 1=red, -1=blue)
 */
export function convertBoardStateToBackendFormat(
	boardState: Map<string, 0 | 1 | 2>
): (0 | 1 | -1)[][] {
	// Create an empty 11x11 board filled with zeros
	const backendBoard: (0 | 1 | -1)[][] = Array(BOARD_SIZE)
		.fill(0)
		.map(() => Array(BOARD_SIZE).fill(0));

	// Fill in the board with player pieces
	boardState.forEach((value, key) => {
		const coords = keyToCube(key);
		if (coords) {
			// Convert cube coordinates to xy coordinates for backend
			// In backend format, x is row and y is column
			const x = coords.r;
			const y = coords.q;

			// Map frontend values (0, 1, 2) to backend values (0, 1, -1)
			const backendValue = value === 0 ? 0 : value === 1 ? 1 : -1;

			// Set the value in the backend board
			if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
				backendBoard[x][y] = backendValue;
			}
		}
	});

	return backendBoard;
}

/**
 * Updates the frontend-detected win state to the backend.
 * This should be called when a win is detected on the frontend.
 *
 * @param gameId - The ID of the current game
 * @param winner - The winning player (1 for red, 2 for blue)
 * @returns Promise resolving to success/failure
 */
export async function updateWinStateToBackend(
	gameId: string,
	winner: 1 | 2
): Promise<boolean> {
	const API_BASE_URL =
		process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

	try {
		// Convert winner to backend format
		const backendWinner = winner === 1 ? "human" : "AI";

		// Send the update to the backend
		const response = await fetch(
			`${API_BASE_URL}/api/games/${gameId}/update_win_state/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ winner: backendWinner }),
			}
		);

		if (!response.ok) {
			console.error(
				`Failed to update win state: ${response.status} ${response.statusText}`
			);
			return false;
		}

		return true;
	} catch (err) {
		console.error(`Error updating win state to backend:`, err);
		return false;
	}
}
