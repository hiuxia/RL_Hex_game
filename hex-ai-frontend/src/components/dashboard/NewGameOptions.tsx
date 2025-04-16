// src/components/dashboard/NewGameOptions.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Define game modes explicitly based on backend expectations
type GameMode = "HUMAN_AI" | "AI_AI";

// Define difficulty levels (currently only used for display/selection)
type Difficulty = "easy" | "medium" | "hard";

interface NewGameOptionsProps {}

// Default WebSocket URL (use environment variable preferably)
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://localhost:8000";

const NewGameOptions: React.FC<NewGameOptionsProps> = () => {
	const router = useRouter(); // Initialize router
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	// State for AI difficulty selection (visual only for now, backend doesn't seem to use it yet)
	const [aiDifficulty, setAiDifficulty] = useState<Difficulty>("medium");

	/**
	 * Creates a new game by:
	 * 1. Connecting to the '/ws/game/new/' endpoint.
	 * 2. Sending the 'create_game' action with the selected mode.
	 * 3. Waiting for the 'game_created' response containing the new game ID.
	 * 4. Navigating the user to the game room URL '/game/[gameId]'.
	 * @param mode - The game mode ('HUMAN_AI' or 'AI_AI').
	 */
	const createGame = useCallback(
		async (mode: GameMode) => {
			setIsLoading(true); // Show loading state on the button
			setError(null); // Clear previous errors
			console.log(`Attempting to create game with mode: ${mode}`);

			// WebSocket URL for creating a new game
			const wsNewUrl = `${WS_BASE_URL}/ws/game/new/`;
			let ws: WebSocket | null = null; // Declare ws to access it in finally block

			try {
				// --- WebSocket Connection and Message Handling ---
				ws = new WebSocket(wsNewUrl);
				const currentWs = ws; // Capture ref for cleanup in promise callbacks

				// Wrap the message handling in a Promise to await the game_id
				const messagePromise = new Promise<string>(
					(resolve, reject) => {
						if (!currentWs) {
							reject(new Error("WebSocket instance is null."));
							return;
						}

						currentWs.onopen = () => {
							console.log(
								"WebSocket connection opened for game creation."
							);
							// Send the create_game action once connected
							const createPayload = {
								action: "create_game",
								mode: mode,
								// Add difficulty or other options here if backend supports them
							};
							currentWs.send(JSON.stringify(createPayload));
							console.log(
								"Sent create_game action:",
								createPayload
							);
						};

						currentWs.onerror = (event) => {
							console.error(
								"WebSocket error during game creation:",
								event
							);
							// Try to provide a more helpful error message
							let errorMsg = "WebSocket connection failed.";
							if (wsNewUrl.startsWith("ws://localhost")) {
								errorMsg += " Is the backend server running?";
							}
							reject(new Error(errorMsg));
							// Ensure closure on error (though browser might close it automatically)
							if (currentWs.readyState !== WebSocket.CLOSED) {
								currentWs.close();
							}
						};

						currentWs.onmessage = (event) => {
							try {
								const message = JSON.parse(event.data);
								console.log(
									"Received message during game creation:",
									message
								);

								// Check for the expected 'game_created' response type
								if (
									message.type === "game_created" &&
									message.data?.game_id
								) {
									console.log(
										`Game created successfully! Game ID: ${message.data.game_id}`
									);
									resolve(message.data.game_id); // Resolve the promise with the game ID
								} else if (message.type === "error") {
									console.error(
										"Backend error during game creation:",
										message.data?.message
									);
									reject(
										new Error(
											message.data?.message ||
												"Unknown backend error during creation."
										)
									);
								} else {
									// Handle unexpected message types
									console.warn(
										"Received unexpected message type during game creation:",
										message.type
									);
									// Optionally reject or just ignore, depending on desired strictness
									// reject(new Error(`Unexpected message type: ${message.type}`));
								}
							} catch (e) {
								console.error(
									"Failed to parse message during game creation:",
									e,
									"Raw data:", event.data
								);
								reject(
									new Error(
										"Failed to parse response from server."
									)
								);
							} finally {
								// Close the WebSocket connection once we have the game ID or an error
								if (
									currentWs.readyState === WebSocket.OPEN ||
									currentWs.readyState === WebSocket.CONNECTING
								) {
									console.log(
										"Closing WebSocket after game creation response/error."
									);
									currentWs.close();
								}
							}
						};

						currentWs.onclose = (event) => {
							console.log(
								`Game creation WebSocket closed. Code: ${event.code}, Clean: ${event.wasClean}, Reason: ${event.reason}`
							);
							// If the promise hasn't been resolved/rejected yet, it means the connection closed prematurely.
							// The 'reject' might have already been called by onerror or onmessage error handling.
							// This acts as a fallback.
							// reject(new Error("WebSocket closed before game ID was received.")); // Could cause unhandled rejection if already resolved/rejected
						};
					}
				);

				// --- Timeout for the Promise ---
				const timeoutPromise = new Promise<string>((_, reject) => {
					const id = setTimeout(() => {
						clearTimeout(id);
						// Ensure socket is closed on timeout
						if (currentWs && currentWs.readyState !== WebSocket.CLOSED) {
							console.warn("Closing WebSocket due to timeout.");
							currentWs.close();
						}
						reject(
							new Error(
								"Game creation timed out. Server did not respond in time."
							)
						);
					}, 10000); // 10-second timeout
				});

				// --- Wait for Game ID or Timeout ---
				// Race the message promise against the timeout
				const gameId = await Promise.race([
					messagePromise,
					timeoutPromise,
				]);

				// --- Navigation ---
				// If successful, navigate to the game page
				if (gameId) {
					console.log(`Navigating to /game/${gameId}`);
					router.push(`/game/${gameId}`); // Use Next.js router for navigation
					// Don't reset isLoading here, let the navigation unmount the component
				} else {
					// Should not happen if promise resolves correctly, but as a fallback:
					setError("Failed to retrieve game ID after creation.");
					setIsLoading(false);
				}

			} catch (err: any) {
				console.error("Error during game creation process:", err);
				setError(err.message || "An unexpected error occurred during game creation.");
				setIsLoading(false); // Stop loading on error
				// Ensure WebSocket is closed on error caught outside the promise
				if (ws && ws.readyState !== WebSocket.CLOSED) {
					console.log(
						"Closing WebSocket due to error during creation process."
					);
					ws.close();
				}
			}
			// No finally block needed here as isLoading is handled in success/error paths,
			// and navigation handles the success case cleanup by unmounting.
		},
		[router] // Add router to dependency array
	);

	// Handler for the "Start Game" (Human vs AI) button
	const handleStartHumanVsAi = () => {
		// Pass the selected difficulty if the backend supports it in the future
		createGame("HUMAN_AI");
	};

	// Handler for the "Start AI Match" button
	const handleStartAiVsAi = () => {
		createGame("AI_AI");
	};

	return (
		// Component Structure (Tailwind styled)
		<div className="bg-white p-4 rounded-lg shadow">
			<h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
				Start New Game
			</h3>
			{/* Display error message if any */}
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-3 text-sm" role="alert">
					<strong className="font-bold">Error: </strong>
					<span className="block sm:inline">{error}</span>
				</div>
			)}

			<div className="space-y-4">
				{/* Human vs AI Section */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">
						Human vs AI
					</span>
					<div className="flex items-center gap-2">
						{/* Difficulty Selector - currently visual only */}
						<select
							value={aiDifficulty}
							onChange={(e) =>
								setAiDifficulty(e.target.value as Difficulty)
							}
							className="block w-full sm:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-sm"
							disabled={isLoading} // Disable while loading
						>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
						{/* Start Button */}
						<button
							onClick={handleStartHumanVsAi} // Use the specific handler
							disabled={isLoading} // Disable button while loading
							className="px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait flex items-center justify-center min-w-[100px]" // Added min-width
						>
							{isLoading ? (
								<>
									<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Starting...
								</>
							) : (
								"Start Game"
							)}
						</button>
					</div>
				</div>

				{/* AI vs AI Section */}
				<div className="flex items-center justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">AI vs AI</span>
					{/* Start Button */}
					<button
						onClick={handleStartAiVsAi} // Use the specific handler
						disabled={isLoading} // Disable during loading
						className="px-4 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait flex items-center justify-center min-w-[130px]" // Added min-width
					>
						{isLoading ? (
							<>
								<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Starting...
							</>
						) : (
							"Start AI Match"
						)}
					</button>
				</div>

				{/* Placeholder for Human vs Human if needed later */}
			</div>
		</div>
	);
};

export default NewGameOptions;
