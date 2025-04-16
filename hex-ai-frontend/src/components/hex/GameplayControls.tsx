// src/components/hex/GameplayControls.tsx
'use client'; // Keep this directive as it uses event handlers

import React from 'react';
// Ensure the path to your types is correct
import { GameplayControlsProps } from '../../types/hexProps';

// Use the updated GameplayControlsProps interface
const GameplayControls: React.FC<GameplayControlsProps> = ({
  className,
  playerTurn,
  winner,
  isDraw, // Added isDraw prop
  onNewGameClick,
  onUndoClick,
  onRedoClick, // Added redo handler prop
  onRestartClick, // Added restart handler prop
  onResignClick, // Kept resign handler prop (optional implementation)
  isInteractionAllowed,
  canUndo, // Added canUndo prop
  canRedo, // Added canRedo prop
}) => {

  // Determine text color for the current player's turn indicator
  const turnColorClass = playerTurn === 1 ? 'text-red-600' : playerTurn === 2 ? 'text-blue-600' : 'text-gray-500'; // Match player colors

  // Determine status message
  let statusMessage: React.ReactNode;
  if (winner !== null) {
    statusMessage = (
      <p className={`text-lg font-bold ${winner === 1 ? 'text-red-600' : 'text-blue-600'}`}>
        Player {winner} Wins! 🎉
      </p>
    );
  } else if (isDraw) {
    statusMessage = (
      <p className="text-lg font-bold text-gray-700">
        Game Draw! 🤝
      </p>
    );
  } else if (playerTurn !== null) {
    statusMessage = (
      <p className="text-md">
        Turn: <span className={`font-semibold ${turnColorClass}`}>
          Player {playerTurn}
        </span>
      </p>
    );
  } else {
     statusMessage = <p className="text-md text-gray-500">Loading...</p>; // Handle null turn state
  }


  return (
    // Use flex flex-col h-full to make the container take full height and stack vertically
    // Apply passed className, default text color is inherited
    <div className={`flex flex-col h-full ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
        Controls
      </h2>

      {/* Game Status Area */}
      <div className="mb-4 flex-shrink-0">
        {statusMessage}
      </div>

      {/* Spacer to push buttons to the bottom */}
      <div className="flex-grow"></div>

      {/* Action Buttons Area */}
      {/* Use flex-shrink-0 to prevent buttons shrinking */}
      <div className="flex flex-col gap-2 flex-shrink-0">
          {/* New Game Button (Navigates to Dashboard) */}
         <button
           onClick={onNewGameClick}
           // Always enabled unless maybe mid-action? For now, always enabled.
           className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                       bg-indigo-600 text-white hover:bg-indigo-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
         >
           New Game / Dashboard
         </button>

        {/* Restart Button */}
        {onRestartClick && (
          <button
            onClick={onRestartClick}
            // Disable if interaction not allowed (e.g., connection issue)
            disabled={!isInteractionAllowed}
            className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                        bg-yellow-500 text-white
                        hover:bg-yellow-600
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                        disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Restart Game
          </button>
        )}

        {/* Undo Button */}
        {onUndoClick && (
          <button
            onClick={onUndoClick}
            // Disable if interaction not allowed OR if undo is not possible
            disabled={!canUndo || !isInteractionAllowed}
            className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                        bg-gray-500 text-white
                        hover:bg-gray-600
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                        disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Undo
          </button>
        )}

        {/* Redo Button (Optional - Backend likely doesn't support) */}
        {onRedoClick && (
           <button
             onClick={onRedoClick}
             // Disable if interaction not allowed OR if redo is not possible
             disabled={!canRedo || !isInteractionAllowed}
             className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                         bg-gray-400 text-white
                         hover:bg-gray-500
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
                         disabled:opacity-50 disabled:cursor-not-allowed`}
           >
             Redo (N/A)
           </button>
         )}

        {/* Resign Button (Optional) */}
        {onResignClick && (
          <button
            onClick={onResignClick}
            // Disable if interaction not allowed (game over handled implicitly)
            disabled={!isInteractionAllowed}
            className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                        bg-red-600 text-white
                        hover:bg-red-700
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                        disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Resign
          </button>
        )}
      </div>
    </div>
  );
};

export default GameplayControls;
