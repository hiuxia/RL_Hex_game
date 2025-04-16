import React from "react";

// TODO: Define props if data is passed down (e.g., stats object)
interface UserStatsCardProps {
	// Example: stats?: { wins: number; losses: number; rank?: string };
}

const UserStatsCard: React.FC<UserStatsCardProps> = (/*{ stats }*/) => {
	// Placeholder data
	const stats = { wins: 15, losses: 8, rank: "Gold III" };

	return (
		<div className="bg-white p-4 rounded-lg shadow">
			<h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
				Your Stats
			</h3>
			<div className="space-y-1 text-sm text-gray-600">
				<p>
					<span className="font-medium text-gray-700">Wins:</span>{" "}
					{stats.wins}
				</p>
				<p>
					<span className="font-medium text-gray-700">Losses:</span>{" "}
					{stats.losses}
				</p>
				{stats.rank && (
					<p>
						<span className="font-medium text-gray-700">Rank:</span>{" "}
						{stats.rank}
					</p>
				)}
				{/* Add more stats as needed */}
			</div>
		</div>
	);
};

export default UserStatsCard;
