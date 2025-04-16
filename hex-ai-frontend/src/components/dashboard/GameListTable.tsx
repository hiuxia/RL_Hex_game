"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // For linking to game/replay pages

// Interface for the API response from /api/games/
interface ApiGame {
	id: number;
	player_turn: string; // "human" or "AI"
	winner: string | null; // "human", "AI", or null
	mode: string; // "HUMAN_AI" or "AI_AI"
	human_color: string; // "red" or "blue"
}

// Frontend representation of a game
interface Game {
	id: string;
	opponent: string;
	status: "Active" | "Completed" | "Waiting";
	outcome?: "Win" | "Loss" | "Draw";
	date: string; // We'll use "Recent" as we don't have actual date from API
	mode: "HUMAN_AI" | "AI_AI" | "HUMAN_HUMAN";
}

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const GameListTable = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGames = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(`${API_BASE_URL}/api/games/`);

				if (!response.ok) {
					throw new Error(
						`Failed to fetch games: ${response.status} ${response.statusText}`
					);
				}

				const apiGames: ApiGame[] = await response.json();

				// Map API response to frontend Game format
				const formattedGames: Game[] = apiGames.map((game) => {
					// Determine game status
					let status: "Active" | "Completed" | "Waiting";
					let outcome: "Win" | "Loss" | "Draw" | undefined;

					if (game.winner) {
						status = "Completed";
						outcome = game.winner === "human" ? "Win" : "Loss";
					} else {
						status = "Active";
					}

					// For opponent, use AI for HUMAN_AI mode
					const opponent =
						game.mode === "HUMAN_AI" ? "AI" : "AI vs AI Match";

					return {
						id: game.id.toString(),
						opponent,
						status,
						outcome,
						date: "Recent", // We don't have actual dates from the API
						mode: game.mode as "HUMAN_AI" | "AI_AI" | "HUMAN_HUMAN",
					};
				});

				setGames(formattedGames);
			} catch (err) {
				console.error("Error fetching games:", err);
				setError(
					err instanceof Error ? err.message : "Failed to fetch games"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGames();
	}, []);

	if (isLoading) {
		return (
			<div className="bg-white rounded-lg shadow p-6 text-center">
				<div className="animate-pulse">Loading games...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white rounded-lg shadow p-6 text-center text-red-500">
				Error: {error}
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow overflow-hidden">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Opponent
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Status
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Outcome
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Date
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
					{games.length === 0 && (
						<tr>
							<td
								colSpan={5}
								className="px-4 py-4 text-center text-gray-500"
							>
								No recent games found.
							</td>
						</tr>
					)}
					{games.map((game) => (
						<tr key={game.id}>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.opponent}
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{/* Add status indicators if desired */}
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
										game.status === "Active"
											? "bg-yellow-100 text-yellow-800"
											: game.status === "Completed"
											? "bg-green-100 text-green-800"
											: "bg-blue-100 text-blue-800"
									}`}
								>
									{game.status}
								</span>
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.outcome ?? "-"}
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{game.date}
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
								{game.status === "Active" && (
									<Link
										href={`/game/${game.id}`}
										className="text-indigo-600 hover:text-indigo-900"
									>
										Resume
									</Link>
								)}
								{game.status === "Completed" && (
									<Link
										href={`/replay/${game.id}`}
										className="text-indigo-600 hover:text-indigo-900"
									>
										Replay
									</Link>
								)}
								{/* Add other actions like 'View' if needed */}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GameListTable;
