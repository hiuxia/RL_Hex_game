// src/components/dashboard/NewGameOptions.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Define game modes explicitly based on backend expectations
type GameMode = "HUMAN_AI" | "AI_AI";

// Define difficulty levels (currently only used for display/selection)
type Difficulty = "easy" | "medium" | "hard";

// Use type alias instead of empty interface
type NewGameOptionsProps = Record<never, never>;

// Default API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const NewGameOptions: React.FC<NewGameOptionsProps> = () => {
	const router = useRouter(); // Initialize router
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	// State for AI difficulty selection (visual only for now)
	const [aiDifficulty, setAiDifficulty] = useState<Difficulty>("medium");

	/**
	 * Creates a new game using REST API
	 * @param mode - The game mode ('HUMAN_AI' or 'AI_AI').
	 */
	const createGame = useCallback(
		async (mode: GameMode) => {
			setIsLoading(true); // Show loading state on the button
			setError(null); // Clear previous errors
			console.log(`Attempting to create game with mode: ${mode}`);

			try {
				// Determine the API endpoint based on game mode
				const endpoint =
					mode === "AI_AI" ? "api/ai_games/" : "api/games/";
				const url = `${API_BASE_URL}/${endpoint}`;

				console.log(`Making request to: ${url}`);

				// Make REST API call to create new game
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ mode }),
				});

				// Check content type before parsing
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					// Not JSON response, log the text for debugging
					const text = await response.text();
					console.error("Server returned non-JSON response:", text);
					throw new Error(
						`Server returned non-JSON response: ${response.status}`
					);
				}

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.error || `Server error: ${response.status}`
					);
				}

				const gameData = await response.json();
				console.log("Game created successfully:", gameData);

				// Extract game ID from response
				const gameId = gameData.id;
				if (!gameId) {
					throw new Error("Game ID not found in response");
				}

				console.log(
					`Game created successfully! Navigating to game/${gameId}`
				);
				router.push(`/game/${gameId}`);
			} catch (err) {
				console.error("Error during game creation process:", err);
				const errorMessage =
					err instanceof Error
						? err.message
						: "An unexpected error occurred during game creation.";
				setError(errorMessage);
				setIsLoading(false);
			} finally {
				// Reset loading state if not navigating away
				setIsLoading(false);
			}
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
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-3 text-sm"
					role="alert"
				>
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
									<svg
										className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
									<span>Creating...</span>
								</>
							) : (
								"Start Game"
							)}
						</button>
					</div>
				</div>

				{/* AI vs AI Section */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">AI vs AI</span>
					<button
						onClick={handleStartAiVsAi} // Use the specific handler
						disabled={isLoading} // Disable button while loading
						className="px-4 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait flex items-center justify-center min-w-[100px]" // Added min-width
					>
						{isLoading ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
								<span>Creating...</span>
							</>
						) : (
							"Watch AI Match"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewGameOptions;
