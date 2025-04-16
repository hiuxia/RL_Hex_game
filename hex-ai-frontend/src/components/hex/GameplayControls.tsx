'use client'; // Keep this directive as it uses event handlers

import React from 'react';
import { GameplayControlsProps } from '../../types/hexProps'; // Import the correct props interface

// Use the GameplayControlsProps interface
const GameplayControls: React.FC<GameplayControlsProps> = ({
  className,
  playerTurn,
  winner,
  onNewGameClick,
  onUndoClick, // Added optional undo handler
  onResignClick, // Added optional resign handler
  isInteractionAllowed
}) => {

  // Determine text color for the current player's turn indicator
  const turnColorClass = playerTurn === 1 ? 'text-red-600' : 'text-blue-600'; // Match player colors

  return (
    // Use flex flex-col h-full to make the container take full height and stack vertically
    // Apply passed className, default text color is inherited
    <div className={`flex flex-col h-full ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
        Controls
      </h2>

      {/* Game Status Area */}
      <div className="mb-4 flex-shrink-0"> {/* Prevent status area from shrinking excessively */}
        {winner !== null ? (
          // Display winner message
          <p className={`text-lg font-bold ${winner === 1 ? 'text-red-600' : 'text-blue-600'}`}>
            Player {winner} Wins! 🎉
          </p>
        ) : (
          // Display current turn
          <p className="text-md">
            Turn: <span className={`font-semibold ${turnColorClass}`}>
              Player {playerTurn}
            </span>
          </p>
        )}
      </div>

      {/* Spacer to push buttons to the bottom */}
      <div className="flex-grow"></div>

      {/* Action Buttons Area */}
      {/* Use flex-shrink-0 to prevent buttons shrinking */}
      <div className="flex flex-col gap-2 flex-shrink-0">
         <button
           onClick={onNewGameClick}
           // Disable button if interaction is not allowed
           disabled={!isInteractionAllowed}
           className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                       bg-blue-600 text-white
                       hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed`}
         >
           New Game
         </button>

         {/* Optional Undo Button */}
         {onUndoClick && (
            <button
              onClick={onUndoClick}
              // Disable if interaction not allowed or game is over
              disabled={!isInteractionAllowed || winner !== null}
              className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                          bg-gray-500 text-white
                          hover:bg-gray-600
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Undo (Placeholder)
            </button>
         )}

         {/* Optional Resign Button */}
         {onResignClick && (
            <button
              onClick={onResignClick}
              // Disable if interaction not allowed or game is over
              disabled={!isInteractionAllowed || winner !== null}
              className={`w-full px-4 py-2 rounded font-semibold transition-colors duration-150
                          bg-red-600 text-white
                          hover:bg-red-700
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Resign (Placeholder)
            </button>
         )}
      </div>
       {/* Remove placeholder text if desired */}
       {/* <p className="mt-4 text-xs text-gray-400 text-center">(GameplayControls Placeholder)</p> */}
    </div>
  );
};

export default GameplayControls;

