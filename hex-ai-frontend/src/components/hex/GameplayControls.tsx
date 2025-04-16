// src/components/hex/GameplayControls.tsx
'use client'; // Keep this directive as it uses event handlers

import React from 'react';
// Ensure the path to your types is correct
import { GameplayControlsProps } from '../../types/hexProps';

/**
 * Game controls component with buttons for various game actions.
 */
const GameplayControls: React.FC<GameplayControlsProps> = ({
	className = "",
	onUndo,
	onRestart,
	onNewGame,
	onRequestAiMove,
	disableUndo,
	disableRestart,
	disableRequestAiMove,
}) => {
	return (
		<div className={`flex flex-col gap-3 ${className}`}>
			{/* Game actions */}
			<div className="grid grid-cols-2 gap-2">
				{/* Undo button */}
				<button
					onClick={onUndo}
					disabled={disableUndo}
					className="px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 mr-1"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
							clipRule="evenodd"
						/>
					</svg>
					Undo
				</button>

				{/* Restart button */}
				<button
					onClick={onRestart}
					disabled={disableRestart}
					className="px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Restart
				</button>
			</div>

			{/* Request AI move (in Human vs AI mode) */}
			<button
				onClick={onRequestAiMove}
				disabled={disableRequestAiMove}
				className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Request AI Move
			</button>

			{/* New game button */}
			<button
				onClick={onNewGame}
				className="w-full px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors mt-2"
			>
				New Game
			</button>
		</div>
	);
};

export default GameplayControls;
