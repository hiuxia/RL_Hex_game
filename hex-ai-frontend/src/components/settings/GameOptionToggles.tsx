"use client"; // Needs client component for state

import React, { useState } from "react";

interface GameOptionTogglesProps {
	// Props for initial settings
}

const GameOptionToggles: React.FC<GameOptionTogglesProps> = () => {
	// Example state
	const [showHints, setShowHints] = useState(true);
	const [defaultDifficulty, setDefaultDifficulty] = useState("medium");

	return (
		<fieldset className="space-y-4">
			<legend className="text-sm font-medium text-gray-700 sr-only">
				Gameplay Options
			</legend>{" "}
			{/* Screen reader only legend */}
			{/* Example Toggle */}
			<div className="relative flex items-start">
				<div className="flex h-5 items-center">
					<input
						id="show-hints"
						aria-describedby="show-hints-description"
						name="show-hints"
						type="checkbox"
						checked={showHints}
						onChange={(e) => setShowHints(e.target.checked)}
						className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
				</div>
				<div className="ml-3 text-sm">
					<label
						htmlFor="show-hints"
						className="font-medium text-gray-700"
					>
						Show Gameplay Hints
					</label>
					<p id="show-hints-description" className="text-gray-500">
						Display helpful hints during your turn (vs AI).
					</p>
				</div>
			</div>
			{/* Example Radio Group */}
			<div>
				<label className="text-sm font-medium text-gray-700">
					Default AI Difficulty
				</label>
				<div className="mt-2 space-y-2">
					{(["easy", "medium", "hard"] as const).map((difficulty) => (
						<div className="flex items-center" key={difficulty}>
							<input
								id={`difficulty-${difficulty}`}
								name="difficulty-option"
								type="radio"
								value={difficulty}
								checked={defaultDifficulty === difficulty}
								onChange={() =>
									setDefaultDifficulty(difficulty)
								}
								className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label
								htmlFor={`difficulty-${difficulty}`}
								className="ml-2 block text-sm text-gray-900 capitalize"
							>
								{difficulty}
							</label>
						</div>
					))}
				</div>
			</div>
		</fieldset>
	);
};

export default GameOptionToggles;
