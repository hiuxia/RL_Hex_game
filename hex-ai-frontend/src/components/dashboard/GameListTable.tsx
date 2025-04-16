import React from "react";
import Link from "next/link"; // For linking to game/replay pages

// TODO: Define props (e.g., list of game objects)
interface Game {
	id: string;
	opponent: string;
	status: "Active" | "Completed" | "Waiting";
	outcome?: "Win" | "Loss" | "Draw";
	date: string;
	mode: "HUMAN_AI" | "AI_AI" | "HUMAN_HUMAN"; // Example modes
}

interface GameListTableProps {
	// games?: Game[];
}

const GameListTable: React.FC<GameListTableProps> = (/*{ games = [] }*/) => {
	// Placeholder data
	const games: Game[] = [
		{
			id: "123",
			opponent: "AI (Medium)",
			status: "Active",
			date: "Today",
			mode: "HUMAN_AI",
		},
		{
			id: "456",
			opponent: "AI (Hard)",
			status: "Completed",
			outcome: "Win",
			date: "Yesterday",
			mode: "HUMAN_AI",
		},
		{
			id: "789",
			opponent: "PlayerX",
			status: "Completed",
			outcome: "Loss",
			date: "2 days ago",
			mode: "HUMAN_HUMAN",
		},
	];

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
