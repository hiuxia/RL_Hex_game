// src/app/(app)/game/[gameId]/page.tsx
'use client';

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Import Game Components
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import GameplayControls from "@/components/hex/GameplayControls";

// Import WebSocket Hook and State
import { useGameWebSocket, WebSocketState } from '@/hooks/useGameWebSocket';
// Import Zustand store hook and state/actions
import { useGameStore } from '@/store/gameStore';
// Import coordinate helpers
import { cubeToKey } from '@/lib/coordinates'; // Import cubeToKey
// Import types and helpers
import { CubeCoordinates, PlayerColors } from '@/types/hexProps';

// Default WebSocket URL (use environment variable preferably)
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://localhost:8000";
const BOARD_SIZE = 11; // Assuming standard size

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params?.gameId as string | undefined;

  // Get state and actions from Zustand store
  const {
    // State...
    boardState, // <-- Need boardState to check hex status
    playerTurn, humanPlayerColor, moves, highlightedHexes, winner, isDraw, mode, winProbability,
    connectionState: storedConnectionState,
    lastBackendError,
    // Actions...
    handleGameStateUpdate, setConnectionState: setStoreConnectionState, setGameId: setStoreGameId,
    setLastError, resetLocalState, setSendMessage,
    requestMove, requestUndo, requestRedo, requestRestart, requestAiMove,
  } = useGameStore();

  // Ref to track the previous player turn (for AI trigger)
  const prevPlayerTurnRef = useRef<number | null>(playerTurn);

  // Callback to handle messages received from the WebSocket hook
  const handleWebSocketMessage = useCallback((message: any) => {
    // (Keep the existing handleWebSocketMessage logic)
    if (!message || !message.type) {
        console.warn("Received invalid message structure from WebSocket:", message);
        return;
    }
    console.log("GamePage: Received WebSocket message:", message.type, message.data);
    switch (message.type) {
      case 'game_state':
      case 'game_update':
        handleGameStateUpdate(message.data);
        break;
      case 'error':
        console.error("Received error message from backend:", message.data?.message);
        setLastError(message.data?.message || "Unknown error from backend.");
        break;
      default:
        console.log("Received unhandled message type:", message.type);
    }
  }, [handleGameStateUpdate, setLastError]);

  // Initialize WebSocket hook
  const {
      connect, disconnect, sendMessage,
      connectionState: hookConnectionState,
      error: wsError
  } = useGameWebSocket(handleWebSocketMessage);


  // --- Effects ---
  // (Keep existing useEffect hooks for connection, state sync, sendMessage setup, and AI trigger)

  // Effect to connect WebSocket
  useEffect(() => {
    if (gameId) {
      console.log(`GamePage: Attempting to connect for game ID: ${gameId}`);
      resetLocalState();
      setStoreGameId(gameId);
      const wsUrl = `${WS_BASE_URL}/ws/game/${gameId}/`;
      connect(wsUrl);
      return () => {
        console.log(`GamePage: Disconnecting for game ID: ${gameId}`);
        disconnect();
        setStoreConnectionState(WebSocketState.CLOSED);
        setStoreGameId(null);
      };
    } else {
      console.error("GamePage: Game ID is missing from route parameters.");
      setLastError("Game ID is missing.");
    }
  }, [gameId, connect, disconnect, resetLocalState, setStoreGameId, setStoreConnectionState, setLastError, router]);


   // Effect to sync hook's connection state and errors
   useEffect(() => {
        setStoreConnectionState(hookConnectionState);
        if (hookConnectionState === WebSocketState.ERROR && wsError) {
            const errorMsg = wsError instanceof Error ? wsError.message : `WebSocket connection error: ${wsError?.type || 'Unknown'}`;
            console.error("GamePage: WebSocket hook reported error:", errorMsg);
            setLastError(errorMsg);
        } else if (hookConnectionState === WebSocketState.OPEN) {
             setLastError(null);
        }
   }, [hookConnectionState, wsError, setStoreConnectionState, setLastError]);

   // Effect to pass sendMessage function to store
   useEffect(() => {
       if (hookConnectionState === WebSocketState.OPEN && sendMessage) {
           setSendMessage(sendMessage);
           console.log("GamePage: sendMessage function set in store.");
       }
   }, [hookConnectionState, sendMessage, setSendMessage]);

   // Effect to automatically trigger AI move
   useEffect(() => {
        const humanPlayerNumber = humanPlayerColor === 'red' ? 1 : humanPlayerColor === 'blue' ? 2 : null;
        const aiPlayerNumber = humanPlayerNumber === 1 ? 2 : humanPlayerNumber === 2 ? 1 : null;
        // console.log(`AI Trigger Check: Turn=${playerTurn}, PrevTurn=${prevPlayerTurnRef.current}, Mode=${mode}, Winner=${winner}, Draw=${isDraw}, Conn=${storedConnectionState}, Human=${humanPlayerNumber}, AI=${aiPlayerNumber}`);
        const shouldTrigger =
            mode === 'HUMAN_AI' && winner === null && !isDraw &&
            storedConnectionState === WebSocketState.OPEN &&
            humanPlayerNumber !== null && playerTurn === aiPlayerNumber &&
            prevPlayerTurnRef.current === humanPlayerNumber;

        if (shouldTrigger) {
            console.log(`GamePage: Conditions met. Requesting AI move for player ${aiPlayerNumber}...`);
            const timerId = setTimeout(() => { requestAiMove(); }, 500);
            // return () => clearTimeout(timerId); // Consider cleanup implications
        }
        prevPlayerTurnRef.current = playerTurn;
   }, [ playerTurn, winner, isDraw, mode, humanPlayerColor, storedConnectionState, requestAiMove, gameId ]);


  // --- Derived State & Constants ---
  const humanPlayerNumber = humanPlayerColor === 'red' ? 1 : humanPlayerColor === 'blue' ? 2 : null;
  const isInteractionAllowed = winner === null && !isDraw && storedConnectionState === WebSocketState.OPEN && playerTurn === humanPlayerNumber;
  const canUndo = isInteractionAllowed && moves > 0;
  const canRedo = false;
  const playerColors: PlayerColors = { p1: '#E53E3E', p2: '#3182CE', empty: '#F7FAFC', background: '#ffffff' };
  const gameMetadata = { size: BOARD_SIZE, moves: moves };

  // --- NEW: Click Handler with Empty Hex Check ---
  const handleHexClick = useCallback((coords: CubeCoordinates) => {
    // Check if the hex is empty *before* calling requestMove
    const hexKey = cubeToKey(coords);
    const currentHexState = boardState.get(hexKey);

    if (currentHexState === 0) {
      console.log(`GamePage: Clicked empty hex (${coords.q}, ${coords.r}). Requesting move.`);
      requestMove(coords); // Call the store action only if empty
    } else {
      console.log(`GamePage: Clicked occupied hex (${coords.q}, ${coords.r}). State: ${currentHexState}. Move ignored.`);
      // Optionally provide brief feedback to the user, e.g., flash the hex or show a temporary message
      // setLastError("You can only place a piece on an empty hex."); // Or use a less intrusive feedback mechanism
    }
  }, [boardState, requestMove]); // Dependencies: boardState and the action


  // --- Render Logic ---
  // (Loading / Error States remain the same)
  if (!gameId) {
      return <div className="p-6 text-center text-red-600 font-semibold">Invalid Game ID provided.</div>;
  }
  if (storedConnectionState === WebSocketState.CONNECTING) {
      return <div className="p-6 text-center text-gray-600">Connecting to game {gameId}...</div>;
  }
  if (lastBackendError) {
      // Clear error after a delay? Or keep until next successful action?
      // For now, keep it displayed until cleared by a successful update or connection.
      return (
            <div className="p-6 text-center text-red-600">
                <p className="font-semibold">Error:</p>
                <p>{lastBackendError}</p>
                <button
                    onClick={() => { setLastError(null); router.push('/dashboard'); }} // Clear error on nav
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Return to Dashboard
                </button>
            </div>
      );
  }
   if (storedConnectionState === WebSocketState.CLOSED && gameId) {
        return (
            <div className="p-6 text-center text-orange-600">
                Connection Closed. Please try refreshing or return to dashboard.
                 <button
                    onClick={() => window.location.reload()}
                    className="ml-4 mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                    Refresh
                </button>
                 <button
                    onClick={() => router.push('/dashboard')}
                    className="ml-4 mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Return to Dashboard
                </button>
            </div>
        );
   }
   if (storedConnectionState !== WebSocketState.OPEN) {
        return <div className="p-6 text-center text-gray-600">Establishing connection...</div>;
   }

  // Main Game UI
  return (
    <div className="flex flex-col md:flex-row h-full p-4 gap-4">
      {/* Left Column: Hex Board */}
      <div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow md:h-full h-[60vh]">
        <HexBoard
          boardState={boardState}
          playerColors={playerColors}
          // Use the new handler which includes the empty check
          onHexClick={isInteractionAllowed ? handleHexClick : () => { console.log("Interaction currently disabled"); }}
          className="max-w-full max-h-full"
          boardSize={BOARD_SIZE}
          highlightedHexes={highlightedHexes}
        />
      </div>

      {/* Right Column: Info and Controls */}
      <div className="w-full md:w-1/3 flex-none flex flex-col gap-4 md:h-full h-auto">
        {/* Game Info Panel (no changes needed) */}
        <div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
          <GameInfo gameMetadata={gameMetadata} className="text-gray-600" />
           {winProbability && (
               <div className="mt-2 text-sm">
                   <h3 className="font-medium text-gray-700">Win Probability:</h3>
                   {Object.entries(winProbability).map(([player, prob]) => (
                       <p key={player} className="capitalize">{player}: {(prob * 100).toFixed(1)}%</p>
                   ))}
               </div>
           )}
        </div>

        {/* Gameplay Controls Panel (no changes needed from Phase 3 update) */}
        <div className="flex-1 min-h-0 p-4 bg-white rounded-lg shadow flex flex-col overflow-y-auto">
          <GameplayControls
            playerTurn={playerTurn}
            winner={winner}
            isDraw={isDraw}
            onNewGameClick={() => router.push('/dashboard')}
            onUndoClick={requestUndo}
            onRedoClick={requestRedo}
            onRestartClick={requestRestart}
            isInteractionAllowed={isInteractionAllowed}
            canUndo={canUndo}
            canRedo={canRedo}
            className="text-gray-600"
          />
           <p className="text-xs text-gray-400 mt-4 pt-2 border-t">Status: {storedConnectionState}</p>
           {!isInteractionAllowed && winner === null && !isDraw && playerTurn !== null && (
               <p className="text-sm text-center text-gray-500 mt-2">Waiting for Player {playerTurn}...</p>
           )}
        </div>
      </div>
    </div>
  );
}
