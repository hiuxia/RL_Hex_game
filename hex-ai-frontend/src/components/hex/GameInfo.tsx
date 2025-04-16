"use client";
import React from 'react';
import { GameInfoProps } from '../../types/hexProps'; // Import the correct props interface

// Use the GameInfoProps interface
const GameInfo: React.FC<GameInfoProps> = ({ className, gameMetadata }) => {
  // Function to format date/time nicely (optional)
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString(undefined, { // Use locale default format
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  };

  return (
    // Apply passed className, default text color is inherited
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
        Game Information
      </h2>
      <div className="space-y-1 text-sm"> {/* Add spacing between info items */}
        <p>
          <span className="font-medium text-gray-700">Board Size:</span> {gameMetadata.size}x{gameMetadata.size}
        </p>
        <p>
          <span className="font-medium text-gray-700">Moves:</span> {gameMetadata.moves ?? 0}
        </p>
        {/* Conditionally display created date if available */}
        {gameMetadata.created && (
           <p>
             <span className="font-medium text-gray-700">Started:</span> {formatDateTime(gameMetadata.created)}
           </p>
        )}
        {/* Add more metadata display as needed */}
      </div>

      {/* Remove placeholder text if desired */}
      {/* <p className="mt-4 text-xs text-gray-400">(GameInfo Placeholder Content)</p> */}
    </div>
  );
};

export default GameInfo;
