"use client"; // Needed for state and effects

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

// Import Game Components (assuming they are client components or compatible)
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import ReplayControlBar from "@/components/replay/ReplayControlBar"; // Import the new component

// Import types and helpers
import { CubeCoordinates, PlayerColors } from "@/types/hexProps";
import { computeGridCoordinates, cubeToKey, xyToCube } from "@/lib/coordinates";

const BOARD_SIZE = 11; // Assuming standard size
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

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

// Define backend API response type
interface BackendGameResponse {
	id: number;
	board: number[][];
	player_turn: string; // "human" or "AI"
	human_color: string; // "red" or "blue"
	last_moves: Array<[number, number]>; // Array of [x, y] coordinates
	winner: string | null; // "human", "AI", or null
	moves_history: Array<[number, number, string]>; // Array of [x, y, player] tuples
	win_probability: { human: number; ai: number } | null;
	mode: string; // "HUMAN_AI" or "AI_AI"
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

// Helper function to initialize an empty board state
const initializeBoardState = (size: number): Map<string, 0 | 1 | 2> => {
	const state = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => {
		state.set(cubeToKey(coords), 0); // 0 represents an empty hex
	});
	return state;
};

export default function ReplayPage() {
	// Use the useParams hook from next/navigation
	const params = useParams();
	const gameId = params?.gameId as string;

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
		if (!gameId) {
			setError("Game ID is missing");
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);
		console.log(`Fetching replay data for game ID: ${gameId}`);

		fetch(`${API_BASE_URL}/api/games/${gameId}/`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(
						`Failed to fetch game: ${res.status} ${res.statusText}`
					);
				}
				return res.json();
			})
			.then((data: BackendGameResponse) => {
				// Debug the format of moves_history
				console.log("Backend moves_history:", data.moves_history);

				// Convert backend data to our frontend format
				const convertedMoves: ReplayMove[] = data.moves_history
					.map((moveData, index) => {
						// moveData is [x, y, player]
						const [x, y, player] = moveData;
						const coords = xyToCube(x, y);

						// Skip moves with invalid coordinates
						if (coords === null) {
							console.warn(
								`Invalid coordinates for move ${
									index + 1
								}: [${x}, ${y}]`
							);
							return null;
						}

						return {
							player: player === "human" ? 1 : 2, // Convert string to number
							coords: coords, // Convert XY to Cube coordinates
							moveNumber: index + 1,
						};
					})
					.filter((move): move is ReplayMove => move !== null); // Filter out null moves

				const convertedData: ReplayGameData = {
					gameId: gameId,
					players: {
						p1: data.mode === "HUMAN_AI" ? "Human" : "AI 1",
						p2: data.mode === "HUMAN_AI" ? "AI" : "AI 2",
					},
					movesHistory: convertedMoves,
					winner:
						data.winner === "human"
							? 1
							: data.winner === "AI"
							? 2
							: null,
				};

				setReplayData(convertedData);
				setCurrentMoveNumber(0); // Start at beginning
				setBoardState(
					getBoardStateAtMove(
						convertedData.movesHistory,
						0,
						BOARD_SIZE
					)
				);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error("Failed to fetch replay data:", err);
				setError("Failed to load replay data. " + err.message);
				setIsLoading(false);
			});
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
						<p>
							<span className="font-medium text-gray-700">
								Winner:
							</span>{" "}
							{replayData.winner === 1
								? replayData.players.p1
								: replayData.winner === 2
								? replayData.players.p2
								: "Game in progress"}
						</p>
					</div>
				</div>

				{/* Replay Controls */}
				<div className="flex-none bg-white rounded-lg shadow p-4">
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

				{/* Move List/History */}
				<div className="flex-grow bg-white rounded-lg shadow p-4 overflow-y-auto">
					<h3 className="text-base font-medium mb-2 text-gray-700">
						Move History
					</h3>
					<ul className="space-y-1">
						{replayData.movesHistory.map((move, index) => (
							<li
								key={`move-${index}`}
								className={`text-sm px-2 py-1 rounded ${
									index + 1 === currentMoveNumber
										? "bg-blue-100 text-blue-800"
										: ""
								}`}
								onClick={() => handleSeek(index + 1)}
								style={{ cursor: "pointer" }}
							>
								{index + 1}. Player{" "}
								{move.player === 1
									? replayData.players.p1
									: replayData.players.p2}{" "}
								({move.coords.q}, {move.coords.r})
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
