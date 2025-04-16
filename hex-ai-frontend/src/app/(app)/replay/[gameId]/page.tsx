"use client"; // Needed for state and effects

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation"; // Can use this or params prop

// Import Game Components (assuming they are client components or compatible)
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import ReplayControlBar from "@/components/replay/ReplayControlBar"; // Import the new component

// Import types and helpers
import { CubeCoordinates, PlayerColors } from "@/types/hexProps";
import { computeGridCoordinates, cubeToKey } from "@/lib/coordinates";

const BOARD_SIZE = 11; // Assuming standard size

// Define structure for a single move in the history
interface ReplayMove {
	player: 1 | 2; // Or 'human'/'AI' if matching backend
	coords: CubeCoordinates;
	moveNumber: number;
}

// Define structure for the full game data fetched for replay
interface ReplayGameData {
	gameId: string;
	players: { p1: string; p2: string }; // Player names/identifiers
	movesHistory: ReplayMove[];
	winner?: number | null; // Or 'human'/'AI'
	// Add other static game metadata if needed
}

// Helper function to create board state at a specific move number
const getBoardStateAtMove = (
	history: ReplayMove[],
	moveNum: number,
	size: number
): Map<string, 0 | 1 | 2> => {
	const board = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => board.set(cubeToKey(coords), 0));

	for (let i = 0; i < moveNum && i < history.length; i++) {
		const move = history[i];
		board.set(cubeToKey(move.coords), move.player);
	}
	return board;
};

export default function ReplayPage({ params }: { params: { gameId: string } }) {
	const gameId = params.gameId;

	// --- State for Replay ---
	const [replayData, setReplayData] = useState<ReplayGameData | null>(null);
	const [currentMoveNumber, setCurrentMoveNumber] = useState<number>(0);
	const [boardState, setBoardState] = useState<Map<string, 0 | 1 | 2>>(() =>
		initializeBoardState(BOARD_SIZE)
	); // Initial empty board
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// --- Fetch Replay Data ---
	useEffect(() => {
		setIsLoading(true);
		setError(null);
		console.log(`Fetching replay data for game ID: ${gameId}`);
		// TODO: Implement actual data fetching (e.g., using fetch API)
		// fetch(`/api/replays/${gameId}`) // Example API endpoint
		//   .then(res => res.json())
		//   .then(data => {
		//      setReplayData(data);
		//      setCurrentMoveNumber(0); // Start at beginning
		//      setBoardState(getBoardStateAtMove(data.movesHistory, 0, BOARD_SIZE));
		//      setIsLoading(false);
		//   })
		//   .catch(err => {
		//      console.error("Failed to fetch replay data:", err);
		//      setError("Failed to load replay.");
		//      setIsLoading(false);
		//   });

		// --- Placeholder Data ---
		setTimeout(() => {
			// Simulate fetch delay
			const placeholderMoves: ReplayMove[] = [
				{ player: 1, coords: { q: 5, r: 5, s: -10 }, moveNumber: 1 },
				{ player: 2, coords: { q: 4, r: 5, s: -9 }, moveNumber: 2 },
				{ player: 1, coords: { q: 6, r: 4, s: -10 }, moveNumber: 3 },
				{ player: 2, coords: { q: 3, r: 6, s: -9 }, moveNumber: 4 },
				{ player: 1, coords: { q: 7, r: 3, s: -10 }, moveNumber: 5 },
			];
			const placeholderData: ReplayGameData = {
				gameId: gameId,
				players: { p1: "Player 1", p2: "Player 2" },
				movesHistory: placeholderMoves,
				winner: null, // Example: Game not finished
			};
			setReplayData(placeholderData);
			setCurrentMoveNumber(0);
			setBoardState(
				getBoardStateAtMove(placeholderData.movesHistory, 0, BOARD_SIZE)
			);
			setIsLoading(false);
		}, 1000);
		// --- End Placeholder Data ---
	}, [gameId]); // Refetch if gameId changes

	// --- Update board state when move number changes ---
	useEffect(() => {
		if (replayData) {
			setBoardState(
				getBoardStateAtMove(
					replayData.movesHistory,
					currentMoveNumber,
					BOARD_SIZE
				)
			);
		}
	}, [currentMoveNumber, replayData]);

	// --- Playback Timer ---
	useEffect(() => {
		let timerId: NodeJS.Timeout | null = null;
		if (
			isPlaying &&
			replayData &&
			currentMoveNumber < replayData.movesHistory.length
		) {
			timerId = setTimeout(() => {
				setCurrentMoveNumber((prev) => prev + 1);
			}, 1000); // Adjust speed as needed (1 second per move)
		} else if (isPlaying) {
			setIsPlaying(false); // Stop playing if end is reached
		}
		return () => {
			// Cleanup timer on unmount or when isPlaying changes
			if (timerId) clearTimeout(timerId);
		};
	}, [isPlaying, currentMoveNumber, replayData]);

	// --- Control Handlers ---
	const handlePlayPause = useCallback(
		() => setIsPlaying((prev) => !prev),
		[]
	);
	const handleNext = useCallback(() => {
		if (replayData && currentMoveNumber < replayData.movesHistory.length) {
			setIsPlaying(false); // Stop playback if manually stepping
			setCurrentMoveNumber((prev) => prev + 1);
		}
	}, [replayData, currentMoveNumber]);
	const handlePrevious = useCallback(() => {
		if (currentMoveNumber > 0) {
			setIsPlaying(false);
			setCurrentMoveNumber((prev) => prev - 1);
		}
	}, [currentMoveNumber]);
	const handleGoToStart = useCallback(() => {
		setIsPlaying(false);
		setCurrentMoveNumber(0);
	}, []);
	const handleGoToEnd = useCallback(() => {
		if (replayData) {
			setIsPlaying(false);
			setCurrentMoveNumber(replayData.movesHistory.length);
		}
	}, [replayData]);
	const handleSeek = useCallback(
		(moveNumber: number) => {
			if (
				replayData &&
				moveNumber >= 0 &&
				moveNumber <= replayData.movesHistory.length
			) {
				setIsPlaying(false);
				setCurrentMoveNumber(moveNumber);
			}
		},
		[replayData]
	);

	// --- Render Logic ---
	if (isLoading) {
		return (
			<div className="p-6 text-center text-gray-600">
				Loading Replay...
			</div>
		);
	}
	if (error) {
		return <div className="p-6 text-center text-red-600">{error}</div>;
	}
	if (!replayData) {
		return (
			<div className="p-6 text-center text-gray-600">
				Replay data not found.
			</div>
		);
	}

	// Static player colors for replay board
	const playerColors: PlayerColors = {
		p1: "#E53E3E",
		p2: "#3182CE",
		empty: "#F7FAFC",
		background: "#ffffff",
	};

	// Static game info for replay
	const staticGameMetadata = {
		size: BOARD_SIZE,
		moves: replayData.movesHistory.length, // Total moves in game
		// Add players, date, winner etc. from replayData if needed
	};

	// Highlight the piece placed at the current move number (if applicable)
	const highlightedHexes =
		currentMoveNumber > 0 &&
		currentMoveNumber <= replayData.movesHistory.length
			? [replayData.movesHistory[currentMoveNumber - 1].coords]
			: [];

	return (
		// Reuse the two-column layout structure
		<div className="flex h-full p-4 gap-4">
			{/* Left Column: Board */}
			<div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow h-full">
				<HexBoard
					boardState={boardState} // Display board at current replay step
					playerColors={playerColors}
					onHexClick={() => {}} // Disable clicking on replay board
					className="max-w-full max-h-full"
					boardSize={BOARD_SIZE}
					highlightedHexes={highlightedHexes} // Highlight last move shown
				/>
			</div>
			{/* Right Column: Info + Controls */}
			<div className="w-1/3 flex-none flex flex-col gap-4 overflow-hidden h-full">
				{/* Static Game Info */}
				<div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
					<GameInfo
						gameMetadata={staticGameMetadata}
						className="text-gray-600"
					/>
					{/* Add more static info like players, winner */}
					<div className="mt-2 text-sm text-gray-600">
						<p>
							<span className="font-medium text-gray-700">
								Player 1:
							</span>{" "}
							{replayData.players.p1}
						</p>
						<p>
							<span className="font-medium text-gray-700">
								Player 2:
							</span>{" "}
							{replayData.players.p2}
						</p>
						{replayData.winner && (
							<p>
								<span className="font-medium text-gray-700">
									Winner:
								</span>{" "}
								Player {replayData.winner}
							</p>
						)}
					</div>
				</div>
				{/* Replay Controls */}
				{/* Use flex-1 so it takes remaining space */}
				<div className="flex-1 min-h-0 bg-white rounded-lg shadow flex flex-col overflow-y-auto">
					<div className="p-4 flex-grow">
						{" "}
						{/* Padding for potential future content */}
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Replay Controls
						</h3>
						<p className="text-sm text-gray-500">
							Step through the game.
						</p>
					</div>
					{/* Control bar at the bottom */}
					<ReplayControlBar
						currentMove={currentMoveNumber}
						totalMoves={replayData.movesHistory.length}
						isPlaying={isPlaying}
						onPlayPause={handlePlayPause}
						onNext={handleNext}
						onPrevious={handlePrevious}
						onGoToStart={handleGoToStart}
						onGoToEnd={handleGoToEnd}
						onSeek={handleSeek}
					/>
				</div>
			</div>
		</div>
	);
}

// Helper to initialize board state (can be moved to utils)
const initializeBoardState = (size: number): Map<string, 0 | 1 | 2> => {
	const state = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => {
		state.set(cubeToKey(coords), 0);
	});
	return state;
};
