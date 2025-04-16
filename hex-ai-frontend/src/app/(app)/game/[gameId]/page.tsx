// src/app/(app)/game/[gameId]/page.tsx
'use client';

import React, { useEffect, useCallback, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Import Game Components
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import GameplayControls from "@/components/hex/GameplayControls";

// Import Zustand store hook and state/actions
import { useGameStore } from "@/store/gameStore";
// Import coordinate helpers
import { cubeToKey } from "@/lib/coordinates";
// Import types and helpers
import { CubeCoordinates, PlayerColors } from "@/types/hexProps";
// Import game logic for frontend win detection
import { checkWinCondition, updateWinStateToBackend } from "@/lib/gameLogic";

const BOARD_SIZE = 11; // Assuming standard size
const AUTO_MOVE_DELAY = 1000; // Delay between automatic AI moves in AI vs AI mode (1 second)
const THINKING_INDICATOR_BUFFER = 1500; // Minimum time to show the AI thinking indicator (1.5 seconds)

export default function GamePage() {
	const params = useParams();
	const router = useRouter();
	const gameId = params?.gameId as string | undefined;

	// Add state to track initial loading vs action loading
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	// Add state to track AI thinking specifically
	const [aiThinking, setAiThinking] = useState(false);
	// Add state to track automatic AI moves
	const [autoMoveActive, setAutoMoveActive] = useState(false);
	const autoMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Get state and actions from Zustand store
	const {
		// State...
		boardState,
		playerTurn,
		humanPlayerColor,
		moves,
		highlightedHexes,
		winner,
		isDraw,
		mode,
		winProbability,
		isLoading,
		lastError,
		// Actions...
		fetchGame,
		makeMove,
		undoLastMove,
		restartCurrentGame,
		requestAiMove,
		requestNextAIMove,
		resetGameState,
		setGameId,
	} = useGameStore();

	// Ref to track the previous player turn (for AI trigger)
	const prevPlayerTurnRef = useRef<number | null>(playerTurn);
	// Ref to track previous moves count to detect updates
	const prevMovesRef = useRef<number>(0);

	// Effect to fetch game data when component mounts or gameId changes
	useEffect(() => {
		if (gameId) {
			console.log(`GamePage: Fetching game data for ID: ${gameId}`);
			resetGameState();
			setGameId(gameId);
			setIsInitialLoading(true);
			fetchGame(gameId).finally(() => {
				setIsInitialLoading(false);
			});

			return () => {
				console.log(`GamePage: Cleaning up game ID: ${gameId}`);
				setGameId(null);
				// Clean up timeouts
				if (autoMoveTimeoutRef.current) {
					clearTimeout(autoMoveTimeoutRef.current);
					autoMoveTimeoutRef.current = null;
				}
			};
		} else {
			console.error(
				"GamePage: Game ID is missing from route parameters."
			);
		}
	}, [gameId, fetchGame, resetGameState, setGameId]);

	// Effect to trigger AI move when it's AI's turn in HUMAN_AI mode
	useEffect(() => {
		// Check if the turn has changed to AI
		if (
			playerTurn !== prevPlayerTurnRef.current && // Turn has changed
			playerTurn === 2 && // It's player 2's turn (AI)
			mode === "HUMAN_AI" && // We're in Human vs AI mode
			humanPlayerColor === "red" && // Human is player 1 (red)
			!winner && // Game isn't over
			!isDraw // Game isn't a draw
		) {
			console.log("GamePage: AI's turn, requesting AI move");
			setAiThinking(true); // Set AI thinking state to true
			requestAiMove().finally(() => {
				// Ensure thinking indicator shows for at least THINKING_INDICATOR_BUFFER ms
				const thinkingStartTime = Date.now();
				const thinkingTime = Date.now() - thinkingStartTime;
				const remainingBuffer = Math.max(
					0,
					THINKING_INDICATOR_BUFFER - thinkingTime
				);

				setTimeout(() => {
					setAiThinking(false); // Reset AI thinking state when done
				}, remainingBuffer);
			});
		}

		// Update ref with current player turn
		prevPlayerTurnRef.current = playerTurn;
	}, [playerTurn, mode, humanPlayerColor, winner, isDraw, requestAiMove]);

	// Effect to track game state updates for debugging AI_AI mode
	useEffect(() => {
		if (mode === "AI_AI" && prevMovesRef.current !== moves) {
			console.log(
				`AI_AI game state updated: Moves ${prevMovesRef.current} -> ${moves}`
			);
			prevMovesRef.current = moves;
		}
	}, [mode, moves]);

	// Effect to handle automatic AI moves for AI_AI mode
	const triggerNextAIMove = useCallback(() => {
		if (!gameId || mode !== "AI_AI" || winner !== null || isDraw) {
			return;
		}

		const thinkingStartTime = Date.now();
		setAiThinking(true);

		requestNextAIMove().finally(() => {
			// Ensure thinking indicator shows for at least THINKING_INDICATOR_BUFFER ms
			const thinkingTime = Date.now() - thinkingStartTime;
			const remainingBuffer = Math.max(
				0,
				THINKING_INDICATOR_BUFFER - thinkingTime
			);

			setTimeout(() => {
				setAiThinking(false);
			}, remainingBuffer);
		});
	}, [gameId, mode, winner, isDraw, requestNextAIMove]);

	// Effect to handle auto-move in AI_AI mode
	useEffect(() => {
		// Clear any existing timeout when game state changes
		if (autoMoveTimeoutRef.current) {
			clearTimeout(autoMoveTimeoutRef.current);
			autoMoveTimeoutRef.current = null;
		}

		// Setup auto-move if feature is enabled
		if (
			autoMoveActive &&
			mode === "AI_AI" &&
			gameId &&
			!winner &&
			!isDraw &&
			!isLoading &&
			!aiThinking
		) {
			console.log("Setting up auto-move for AI vs AI game");
			autoMoveTimeoutRef.current = setTimeout(() => {
				console.log("Auto-triggering next AI move");
				triggerNextAIMove();
			}, AUTO_MOVE_DELAY);
		}

		return () => {
			if (autoMoveTimeoutRef.current) {
				clearTimeout(autoMoveTimeoutRef.current);
				autoMoveTimeoutRef.current = null;
			}
		};
	}, [
		mode,
		gameId,
		winner,
		isDraw,
		autoMoveActive,
		isLoading,
		aiThinking,
		moves,
		triggerNextAIMove,
	]);

	// Add a new effect to check for win conditions when the board state changes
	useEffect(() => {
		// Only run win detection if a game is active and not already won
		if (
			gameId &&
			boardState.size > 0 &&
			playerTurn &&
			winner === null &&
			!isDraw
		) {
			// Check for win conditions for both players after each board state change
			const player1Win = checkWinCondition(boardState, 1); // Check Red
			const player2Win = checkWinCondition(boardState, 2); // Check Blue

			if (player1Win || player2Win) {
				const winningPlayer = player1Win ? 1 : 2;
				console.log(
					`Frontend effect detected win for player ${winningPlayer}`
				);

				// Update local state first
				// This will be done automatically through the store if we sent the update to backend

				// Notify backend about the win if not already done
				updateWinStateToBackend(gameId, winningPlayer).catch((err) => {
					console.error(
						"Failed to update win state to backend:",
						err
					);
				});
			}
		}
	}, [gameId, boardState, playerTurn, winner, isDraw]);

	// Handle hex click for player moves
	const handleHexClick = useCallback(
		(coords: CubeCoordinates) => {
			const key = cubeToKey(coords);
			const currentValue = boardState.get(key);

			// Validate move: hex must be empty
			if (currentValue !== 0) {
				console.log("GamePage: Invalid move - hex is already occupied");
				return;
			}

			// Validate move: game must not be over
			if (winner !== null || isDraw) {
				console.log("GamePage: Invalid move - game is already over");
				return;
			}

			// Validate move: must be human's turn
			const isHumanTurn =
				(humanPlayerColor === "red" && playerTurn === 1) ||
				(humanPlayerColor === "blue" && playerTurn === 2);

			if (!isHumanTurn) {
				console.log("GamePage: Invalid move - not human's turn");
				return;
			}

			// Make the move
			makeMove(coords);
		},
		[boardState, winner, isDraw, playerTurn, humanPlayerColor, makeMove]
	);

	// Handle restart game
	const handleRestartGame = useCallback(() => {
		if (gameId) {
			restartCurrentGame();
		}
	}, [gameId, restartCurrentGame]);

	// Handle undo move
	const handleUndoMove = useCallback(() => {
		if (gameId) {
			undoLastMove();
		}
	}, [gameId, undoLastMove]);

	// Handle request AI move
	const handleRequestAiMove = useCallback(() => {
		if (gameId) {
			if (mode === "HUMAN_AI") {
				setAiThinking(true);
				requestAiMove().finally(() => {
					setAiThinking(false);
				});
			} else if (mode === "AI_AI") {
				triggerNextAIMove();
			}
		}
	}, [gameId, mode, requestAiMove, triggerNextAIMove]);

	// Handle auto-move toggle
	const handleToggleAutoMove = useCallback(() => {
		setAutoMoveActive((prev) => !prev);
	}, []);

	// Handle new game (redirect to home)
	const handleNewGame = useCallback(() => {
		router.push("/");
	}, [router]);

	// Create player colors object
	const playerColors: PlayerColors = {
		p1: "#E53E3E", // Red for Player 1
		p2: "#3182CE", // Blue for Player 2
		empty: "#F7FAFC", // Near white for empty hexes
		background: "#ffffff", // White background
	};

	// Main render
	if (!gameId) {
		return (
			<div className="p-6 text-center text-red-600">Missing game ID.</div>
		);
	}

	// Loading state for initial load
	if (isInitialLoading && !boardState.size) {
		return (
			<div className="p-6 text-center text-gray-600">Loading game...</div>
		);
	}

	// Error state
	if (lastError) {
		return (
			<div className="p-6 text-center text-red-600">
				Error: {lastError}
				<div className="mt-4">
					<button
						onClick={() => fetchGame(gameId)}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-full p-4 gap-4">
			{/* Game Board */}
			<div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow h-full relative">
				{/* Loading indicator that doesn't cover the entire board */}
				{(isLoading || aiThinking) && !isInitialLoading && (
					<div className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-lg shadow-md z-10">
						<div className="flex items-center">
							<svg
								className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							<span className="text-sm font-medium text-blue-500">
								{aiThinking
									? "AI thinking..."
									: "Processing..."}
							</span>
						</div>
					</div>
				)}

				<HexBoard
					boardState={boardState}
					playerColors={playerColors}
					onHexClick={handleHexClick}
					className="max-w-full max-h-full"
					boardSize={BOARD_SIZE}
					highlightedHexes={highlightedHexes}
				/>
			</div>

			{/* Info and Controls */}
			<div className="w-1/3 flex-none flex flex-col gap-4 overflow-hidden h-full">
				{/* Game Info */}
				<div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
					<GameInfo
						gameMetadata={{
							size: BOARD_SIZE,
							moves: moves || 0,
							mode: mode || "HUMAN_AI",
							created: new Date().toLocaleDateString(), // Default date
						}}
						className="text-gray-600"
					/>
					<div className="mt-4 flex flex-col gap-2">
						<div className="text-sm font-medium">
							{playerTurn === 1 ? "Red" : "Blue"}&apos;s turn
							{aiThinking && (
								<span className="ml-2 text-blue-500 animate-pulse">
									(AI thinking...)
								</span>
							)}
						</div>
						{winner !== null && (
							<div className="font-medium text-green-600">
								{winner === 1 ? "Red" : "Blue"} wins!
							</div>
						)}
						{isDraw && (
							<div className="font-medium text-yellow-600">
								Game ended in a draw!
							</div>
						)}
						{winProbability && mode === "HUMAN_AI" && (
							<div className="text-xs text-gray-500">
								Win probability: Human{" "}
								{Math.round(
									(winProbability.human || 0.5) * 100
								)}
								%, AI{" "}
								{Math.round((winProbability.ai || 0.5) * 100)}%
							</div>
						)}
						{winProbability && mode === "AI_AI" && (
							<div className="text-xs text-gray-500">
								Win probability: AI_1{" "}
								{Math.round(
									(winProbability.human || 0.5) * 100
								)}
								%, AI_2{" "}
								{Math.round((winProbability.ai || 0.5) * 100)}%
							</div>
						)}
						{mode === "AI_AI" && (
							<div className="mt-4 border-t pt-3 border-gray-200">
								<div className="font-medium text-sm mb-2">
									AI vs AI Controls
								</div>
								<button
									onClick={handleToggleAutoMove}
									className={`w-full px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center ${
										autoMoveActive
											? "bg-red-600 text-white hover:bg-red-700"
											: "bg-green-600 text-white hover:bg-green-700"
									}`}
								>
									{autoMoveActive ? (
										<>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5 mr-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
											Stop Auto Moves
										</>
									) : (
										<>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5 mr-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											Auto Play
										</>
									)}
								</button>

								<div className="text-xs mt-2 text-gray-500">
									{autoMoveActive
										? "AI moves automatically. Click to stop."
										: "Click to watch the AI players play automatically."}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Game Controls */}
				<div className="flex-none p-4 bg-white rounded-lg shadow">
					<GameplayControls
						onUndo={handleUndoMove}
						onRestart={handleRestartGame}
						onNewGame={handleNewGame}
						onRequestAiMove={handleRequestAiMove}
						disableUndo={
							isLoading || !moves || winner !== null || isDraw
						}
						disableRestart={isLoading}
						disableRequestAiMove={
							isLoading ||
							winner !== null ||
							isDraw ||
							(mode === "HUMAN_AI" && playerTurn === 1) ||
							autoMoveActive
						}
					/>
				</div>
			</div>
		</div>
	);
}
