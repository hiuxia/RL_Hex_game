"use client";
import HexBoard from "../components/hex/HexBoard";
import GameInfo from "../components/hex/GameInfo";
import GameplayControls from "../components/hex/GameplayControls";

import { computeGridCoordinates, cubeToKey } from '../lib/coordinates'; // Added imports
import { CubeCoordinates } from '../types/hexProps'; // Added import



const BOARD_SIZE = 11; // Define board size constant

export default function Home() {
  // --- Placeholder Data ---
  // NOTE: In a real app, boardState, playerTurn, winner, etc. would be managed by React state (useState, useReducer)
  const placeholderBoardState = new Map<string, 0 | 1 | 2>();
  const initialCoords = computeGridCoordinates(BOARD_SIZE);
  initialCoords.forEach(coords => {
    placeholderBoardState.set(cubeToKey(coords), 0);
  });
  placeholderBoardState.set(cubeToKey({ q: 5, r: 5, s: -10 }), 1);
  placeholderBoardState.set(cubeToKey({ q: 4, r: 5, s: -9 }), 2);

  const placeholderPlayerColors = {
    p1: '#E53E3E', p2: '#3182CE', empty: '#F7FAFC', background: '#ffffff'
  };
  const placeholderGameMetadata = { size: BOARD_SIZE, moves: 2 }; // Simplified moves count
  const placeholderPlayerTurn = 1;
  const placeholderWinner = null;
  const placeholderHighlightedHexes: CubeCoordinates[] = [{ q: 4, r: 5, s: -9 }];
  const placeholderInteractionAllowed = true; // Example: Allow interaction

  // --- Placeholder Click Handlers ---
  const handleHexClick = (coords: CubeCoordinates) => {
    console.log('Hex clicked (Accurate):', coords);
    // TODO: Add logic to update boardState (will require state management)
    // Example: Check if hex is empty, update map, switch player turn etc.
    alert(`Hex clicked: q=${coords.q}, r=${coords.r}, s=${coords.s}`); // Simple alert for now
  };

  const handleNewGame = () => {
    console.log('New Game clicked (Placeholder)');
    // TODO: Add logic to reset boardState, playerTurn, winner etc.
    alert("New Game clicked!");
  };

  // --- Add Placeholder Functions for Optional Buttons ---
  const handleUndo = () => {
      console.log("Undo clicked (Placeholder)");
      alert("Undo clicked!");
      // TODO: Implement undo logic if desired
  };

  const handleResign = () => {
      console.log("Resign clicked (Placeholder)");
      alert("Resign clicked!");
      // TODO: Implement resign logic (e.g., set winner)
  };
  // --- End Placeholder Functions ---

  // --- Panel/Container Styles ---
  const panelBgColor = "bg-white";
  const panelShadow = "shadow-md";
  const containerBgColor = "bg-gray-100";
  const textColor = "text-gray-800";
  const secondaryTextColor = "text-gray-600";

  return (
    <div className={`flex h-full overflow-hidden p-4 gap-4 ${containerBgColor} ${textColor}`}>
      {/* Left Column */}
      <div className={`flex-grow flex items-center justify-center overflow-hidden p-2 ${panelBgColor} rounded-lg ${panelShadow}`}>
        <HexBoard
          boardState={placeholderBoardState}
          playerColors={placeholderPlayerColors}
          onHexClick={handleHexClick} // Pass the updated handler
          className="max-w-full max-h-full"
          boardSize={BOARD_SIZE}
          highlightedHexes={placeholderHighlightedHexes}
        />
      </div>

      {/* Right Column */}
      <div className="w-1/3 flex-none flex flex-col gap-4 overflow-hidden">
        {/* Game Info Panel */}
        <div className={`flex-none p-4 ${panelBgColor} rounded-lg ${panelShadow} overflow-y-auto`}>
          <GameInfo
            gameMetadata={placeholderGameMetadata}
            className={`${secondaryTextColor}`}
          />
        </div>

        {/* Gameplay Controls Panel */}
        <div className={`flex-1 min-h-0 p-4 ${panelBgColor} rounded-lg ${panelShadow} flex flex-col overflow-y-auto`}>
          <GameplayControls
            playerTurn={placeholderPlayerTurn}
            winner={placeholderWinner}
            onNewGameClick={handleNewGame}
            onUndoClick={handleUndo} // Pass the undo handler
            onResignClick={handleResign} // Pass the resign handler
            isInteractionAllowed={placeholderInteractionAllowed} // Pass interaction flag
            className={`${secondaryTextColor}`}
          />
        </div>
      </div>
    </div>
  );
}
