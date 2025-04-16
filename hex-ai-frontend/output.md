# RL_Hex_game Project Documentation

_Generated on 4/15/2025_

This document contains code files from the RL_Hex_game project.


## Table of Contents

- 📁 **app/**
  - 📁 **(app)/**
    - 📁 **dashboard/**
      - [📄 page.tsx](#srcappappdashboardpagetsx)
    - 📁 **game/**
      - 📁 **[gameId]/**
        - [📄 page.tsx](#srcappappgamegameidpagetsx)
    - [📄 layout.tsx](#srcappapplayouttsx)
    - 📁 **replay/**
      - 📁 **[gameId]/**
        - [📄 page.tsx](#srcappappreplaygameidpagetsx)
    - 📁 **settings/**
      - [📄 page.tsx](#srcappappsettingspagetsx)
  - [📄 layout.tsx](#srcapplayouttsx)
  - [📄 page.tsx](#srcapppagetsx)
- 📁 **components/**
  - 📁 **dashboard/**
    - [📄 GameListTable.tsx](#srccomponentsdashboardgamelisttabletsx)
    - [📄 NewGameOptions.tsx](#srccomponentsdashboardnewgameoptionstsx)
    - [📄 UserStatsCard.tsx](#srccomponentsdashboarduserstatscardtsx)
  - 📁 **hex/**
    - [📄 GameInfo.tsx](#srccomponentshexgameinfotsx)
    - [📄 GameplayControls.tsx](#srccomponentshexgameplaycontrolstsx)
    - [📄 HexBoard.tsx](#srccomponentshexhexboardtsx)
  - 📁 **replay/**
    - [📄 ReplayControlBar.tsx](#srccomponentsreplayreplaycontrolbartsx)
  - 📁 **settings/**
    - [📄 GameOptionToggles.tsx](#srccomponentssettingsgameoptiontogglestsx)
    - [📄 ThemeSelector.tsx](#srccomponentssettingsthemeselectortsx)
    - [📄 UserProfileForm.tsx](#srccomponentssettingsuserprofileformtsx)
  - 📁 **ui/**
    - [📄 SideBarNav.tsx](#srccomponentsuisidebarnavtsx)
- 📁 **hooks/**
  - [📄 useGameWebSocket.ts](#srchooksusegamewebsocketts)
- 📁 **lib/**
  - [📄 constants.ts](#srclibconstantsts)
  - [📄 coordinates.ts](#srclibcoordinatests)
- 📁 **store/**
  - [📄 gameStore.ts](#srcstoregamestorets)
- 📁 **types/**
  - [📄 hexProps.ts](#srctypeshexpropsts)

---


### <a name="srcappappdashboardpagetsx"></a>app/(app)/dashboard/page.tsx


```tsx
    import React from 'react';
    import UserStatsCard from '@/components/dashboard/UserStatsCard';
    import GameListTable from '@/components/dashboard/GameListTable';
    import NewGameOptions from '@/components/dashboard/NewGameOptions';

    export default function DashboardPage() {
      return (
        // Use padding defined in AppLayout or add here if needed
        <div className="p-6 space-y-6"> {/* Added space-y for vertical spacing */}
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Stats Card - Takes 1 column on medium screens */}
            <div className="md:col-span-1">
              <UserStatsCard />
            </div>
            {/* New Game Options - Takes 2 columns on medium screens */}
            <div className="md:col-span-2">
              <NewGameOptions />
            </div>
          </div>

          {/* Recent Games Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Games</h2>
            <GameListTable />
          </div>

        </div>
      );
    }
    
```


---


### <a name="srcappappgamegameidpagetsx"></a>app/(app)/game/[gameId]/page.tsx


```tsx
'use client';

import React, { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation'; // Hook to get route parameters

// Import Game Components
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import GameplayControls from "@/components/hex/GameplayControls";

// Import WebSocket Hook and State
import { useGameWebSocket, WebSocketState } from '@/hooks/useGameWebSocket';
import { useGameStore } from '@/store/gameStore';

// Import types and helpers
import { CubeCoordinates, PlayerColors } from '@/types/hexProps';

const BOARD_SIZE = 11; // Assuming standard size

export default function GamePage() {
  const params = useParams();
  const gameId = params?.gameId as string | undefined; // Extract gameId

  // Get state and actions from Zustand store
  const {
    // State...
    boardState, playerTurn, humanPlayerColor, moves, highlightedHexes, winner, mode, winProbability,
    connectionState: storedConnectionState,
    // Actions...
    handleGameStateUpdate, setConnectionState: setStoreConnectionState, setGameId: setStoreGameId,
    setLastError, resetLocalState, setSendMessage, // <-- Get setSendMessage action
    requestMove, requestUndo, requestRedo, requestRestart, requestAiMove,
  } = useGameStore();

  // Callback to handle messages received from the WebSocket hook
  const handleWebSocketMessage = useCallback((message: any) => {
    if (!message || !message.type) return;

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
      connect, disconnect, sendMessage, // <-- Get sendMessage from hook
      connectionState: hookConnectionState,
      error: wsError
  } = useGameWebSocket(handleWebSocketMessage);


  // --- Effects ---

  // Effect to connect WebSocket when gameId is available
  useEffect(() => {
    if (gameId) {
      resetLocalState();
      setStoreGameId(gameId);
      const wsUrl = `ws://localhost:8000/ws/game/${gameId}/`;
      connect(wsUrl);
      return () => {
        disconnect();
        setStoreConnectionState(WebSocketState.CLOSED);
        setStoreGameId(null);
      };
    } else {
      console.error("Game ID is missing from route parameters.");
      setLastError("Game ID is missing.");
    }
  }, [gameId, connect, disconnect, setStoreGameId, setStoreConnectionState, resetLocalState]);

   // Effect to sync hook's connection state and errors to the Zustand store
   useEffect(() => {
        setStoreConnectionState(hookConnectionState);
        if (hookConnectionState === WebSocketState.ERROR && wsError) {
            setLastError(`WebSocket connection error: ${wsError.type}`);
        }
        if (hookConnectionState === WebSocketState.OPEN) {
             setLastError(null);
        }
   }, [hookConnectionState, wsError, setStoreConnectionState, setLastError]);

   // Effect to pass the actual sendMessage function to the Zustand store once available
   useEffect(() => {
       if (hookConnectionState === WebSocketState.OPEN && sendMessage) {
           setSendMessage(sendMessage);
       }
       // Optional: Clear sendMessage in store on disconnect?
       // return () => {
       //     setSendMessage((payload) => { console.warn("Attempted to send message after disconnect.", payload); });
       // }
   }, [hookConnectionState, sendMessage, setSendMessage]);


  // --- Derived State & Constants ---
  // Determine if interaction is allowed (game not over, connection open)
  const isInteractionAllowed = winner === null && storedConnectionState === WebSocketState.OPEN;
  // Determine if undo/redo are possible (requires backend state info, e.g., history length > 1)
  // Placeholder logic - needs refinement based on actual state available from backend
  const canUndo = isInteractionAllowed && moves > 0; // Simple example: can undo if moves > 0
  const canRedo = false; // Placeholder: Requires tracking history index

  const playerColors: PlayerColors = { p1: '#E53E3E', p2: '#3182CE', empty: '#F7FAFC', background: '#ffffff' };
  const gameMetadata = { size: BOARD_SIZE, moves: moves };

  // --- Render Logic ---
  if (storedConnectionState === WebSocketState.CONNECTING && !gameId) {
       return <div className="p-6 text-center text-red-600">Invalid Game ID.</div>;
  }
  if (storedConnectionState === WebSocketState.CONNECTING) {
      return <div className="p-6 text-center">Connecting to game {gameId}...</div>;
  }
  if (storedConnectionState === WebSocketState.ERROR) {
       return <div className="p-6 text-center text-red-600">Connection Error. Please try refreshing.</div>;
  }
  // Handle case where connection closes unexpectedly after initial connection attempt
   if (storedConnectionState === WebSocketState.CLOSED && gameId) {
        return <div className="p-6 text-center text-orange-600">Connection Closed. Please try refreshing.</div>;
   }


  return (
    <div className="flex h-full p-4 gap-4">
      {/* Left Column: Hex Board */}
      <div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow h-full">
        <HexBoard
          boardState={boardState}
          playerColors={playerColors}
          // Pass requestMove directly - it checks interaction allowed internally (via store state)
          onHexClick={requestMove}
          className="max-w-full max-h-full"
          boardSize={BOARD_SIZE}
          highlightedHexes={highlightedHexes}
        />
      </div>

      {/* Right Column: Info and Controls */}
      <div className="w-1/3 flex-none flex flex-col gap-4 overflow-hidden h-full">
        {/* Game Info Panel */}
        <div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
          <GameInfo gameMetadata={gameMetadata} className="text-gray-600" />
           {winProbability && (
                <div className="mt-2 text-sm">
                    <h3 className="font-medium text-gray-700">Win Probability:</h3>
                    {Object.entries(winProbability).map(([player, prob]) => (
                        <p key={player}>{player}: {(prob * 100).toFixed(1)}%</p>
                    ))}
                </div>
            )}
        </div>

        {/* Gameplay Controls Panel */}
        <div className="flex-1 min-h-0 p-4 bg-white rounded-lg shadow flex flex-col overflow-y-auto">
          <GameplayControls
            playerTurn={playerTurn ?? 0}
            winner={winner}
            onNewGameClick={() => { console.log("New Game clicked - Navigating to dashboard might be appropriate"); /* router.push('/dashboard'); */ }}
            onUndoClick={requestUndo}
            onRedoClick={requestRedo}
            // onResignClick={requestResign}
            isInteractionAllowed={isInteractionAllowed} // Pass derived flag
            canUndo={canUndo} // Pass derived flag
            canRedo={canRedo} // Pass derived flag
            className="text-gray-600"
          />
           <p className="text-xs text-gray-400 mt-4">Status: {storedConnectionState}</p>
        </div>
      </div>
    </div>
  );
}


```


---


### <a name="srcappapplayouttsx"></a>app/(app)/layout.tsx


```tsx
import SidebarNav from '@/components/ui/SideBarNav'; // Adjust path if needed
import React from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Main container using flexbox to position sidebar and content
    <div className="flex h-screen overflow-hidden bg-gray-100"> {/* Base light background */}

      {/* Persistent Sidebar */}
      <SidebarNav />

      {/* Main content area */}
      {/* flex-1 allows it to take remaining width */}
      {/* overflow-y-auto enables scrolling ONLY for the content area */}
      <main className="flex-1 overflow-y-auto">
        {/* Page content from dashboard/page.tsx, game/page.tsx etc. renders here */}
        {children}
      </main>

    </div>
  );
}


```


---


### <a name="srcappappreplaygameidpagetsx"></a>app/(app)/replay/[gameId]/page.tsx


```tsx
"use client"; // Needed for state and effects

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation"; // Can use this or params prop

// Import Game Components (assuming they are client components or compatible)
import HexBoard from "@/components/hex/HexBoard";
import GameInfo from "@/components/hex/GameInfo";
import ReplayControlBar from "@/components/replay/ReplayControlBar"; // Import the new component

// Import types and helpers
import { CubeCoordinates, PlayerColors } from "@/types/hexProps";
import { computeGridCoordinates, cubeToKey } from "@/lib/coordinates";

const BOARD_SIZE = 11; // Assuming standard size

// Define structure for a single move in the history
interface ReplayMove {
	player: 1 | 2; // Or 'human'/'AI' if matching backend
	coords: CubeCoordinates;
	moveNumber: number;
}

// Define structure for the full game data fetched for replay
interface ReplayGameData {
	gameId: string;
	players: { p1: string; p2: string }; // Player names/identifiers
	movesHistory: ReplayMove[];
	winner?: number | null; // Or 'human'/'AI'
	// Add other static game metadata if needed
}

// Helper function to create board state at a specific move number
const getBoardStateAtMove = (
	history: ReplayMove[],
	moveNum: number,
	size: number
): Map<string, 0 | 1 | 2> => {
	const board = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => board.set(cubeToKey(coords), 0));

	for (let i = 0; i < moveNum && i < history.length; i++) {
		const move = history[i];
		board.set(cubeToKey(move.coords), move.player);
	}
	return board;
};

export default function ReplayPage({ params }: { params: { gameId: string } }) {
	const gameId = params.gameId;

	// --- State for Replay ---
	const [replayData, setReplayData] = useState<ReplayGameData | null>(null);
	const [currentMoveNumber, setCurrentMoveNumber] = useState<number>(0);
	const [boardState, setBoardState] = useState<Map<string, 0 | 1 | 2>>(() =>
		initializeBoardState(BOARD_SIZE)
	); // Initial empty board
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// --- Fetch Replay Data ---
	useEffect(() => {
		setIsLoading(true);
		setError(null);
		console.log(`Fetching replay data for game ID: ${gameId}`);
		// TODO: Implement actual data fetching (e.g., using fetch API)
		// fetch(`/api/replays/${gameId}`) // Example API endpoint
		//   .then(res => res.json())
		//   .then(data => {
		//      setReplayData(data);
		//      setCurrentMoveNumber(0); // Start at beginning
		//      setBoardState(getBoardStateAtMove(data.movesHistory, 0, BOARD_SIZE));
		//      setIsLoading(false);
		//   })
		//   .catch(err => {
		//      console.error("Failed to fetch replay data:", err);
		//      setError("Failed to load replay.");
		//      setIsLoading(false);
		//   });

		// --- Placeholder Data ---
		setTimeout(() => {
			// Simulate fetch delay
			const placeholderMoves: ReplayMove[] = [
				{ player: 1, coords: { q: 5, r: 5, s: -10 }, moveNumber: 1 },
				{ player: 2, coords: { q: 4, r: 5, s: -9 }, moveNumber: 2 },
				{ player: 1, coords: { q: 6, r: 4, s: -10 }, moveNumber: 3 },
				{ player: 2, coords: { q: 3, r: 6, s: -9 }, moveNumber: 4 },
				{ player: 1, coords: { q: 7, r: 3, s: -10 }, moveNumber: 5 },
			];
			const placeholderData: ReplayGameData = {
				gameId: gameId,
				players: { p1: "Player 1", p2: "Player 2" },
				movesHistory: placeholderMoves,
				winner: null, // Example: Game not finished
			};
			setReplayData(placeholderData);
			setCurrentMoveNumber(0);
			setBoardState(
				getBoardStateAtMove(placeholderData.movesHistory, 0, BOARD_SIZE)
			);
			setIsLoading(false);
		}, 1000);
		// --- End Placeholder Data ---
	}, [gameId]); // Refetch if gameId changes

	// --- Update board state when move number changes ---
	useEffect(() => {
		if (replayData) {
			setBoardState(
				getBoardStateAtMove(
					replayData.movesHistory,
					currentMoveNumber,
					BOARD_SIZE
				)
			);
		}
	}, [currentMoveNumber, replayData]);

	// --- Playback Timer ---
	useEffect(() => {
		let timerId: NodeJS.Timeout | null = null;
		if (
			isPlaying &&
			replayData &&
			currentMoveNumber < replayData.movesHistory.length
		) {
			timerId = setTimeout(() => {
				setCurrentMoveNumber((prev) => prev + 1);
			}, 1000); // Adjust speed as needed (1 second per move)
		} else if (isPlaying) {
			setIsPlaying(false); // Stop playing if end is reached
		}
		return () => {
			// Cleanup timer on unmount or when isPlaying changes
			if (timerId) clearTimeout(timerId);
		};
	}, [isPlaying, currentMoveNumber, replayData]);

	// --- Control Handlers ---
	const handlePlayPause = useCallback(
		() => setIsPlaying((prev) => !prev),
		[]
	);
	const handleNext = useCallback(() => {
		if (replayData && currentMoveNumber < replayData.movesHistory.length) {
			setIsPlaying(false); // Stop playback if manually stepping
			setCurrentMoveNumber((prev) => prev + 1);
		}
	}, [replayData, currentMoveNumber]);
	const handlePrevious = useCallback(() => {
		if (currentMoveNumber > 0) {
			setIsPlaying(false);
			setCurrentMoveNumber((prev) => prev - 1);
		}
	}, [currentMoveNumber]);
	const handleGoToStart = useCallback(() => {
		setIsPlaying(false);
		setCurrentMoveNumber(0);
	}, []);
	const handleGoToEnd = useCallback(() => {
		if (replayData) {
			setIsPlaying(false);
			setCurrentMoveNumber(replayData.movesHistory.length);
		}
	}, [replayData]);
	const handleSeek = useCallback(
		(moveNumber: number) => {
			if (
				replayData &&
				moveNumber >= 0 &&
				moveNumber <= replayData.movesHistory.length
			) {
				setIsPlaying(false);
				setCurrentMoveNumber(moveNumber);
			}
		},
		[replayData]
	);

	// --- Render Logic ---
	if (isLoading) {
		return (
			<div className="p-6 text-center text-gray-600">
				Loading Replay...
			</div>
		);
	}
	if (error) {
		return <div className="p-6 text-center text-red-600">{error}</div>;
	}
	if (!replayData) {
		return (
			<div className="p-6 text-center text-gray-600">
				Replay data not found.
			</div>
		);
	}

	// Static player colors for replay board
	const playerColors: PlayerColors = {
		p1: "#E53E3E",
		p2: "#3182CE",
		empty: "#F7FAFC",
		background: "#ffffff",
	};

	// Static game info for replay
	const staticGameMetadata = {
		size: BOARD_SIZE,
		moves: replayData.movesHistory.length, // Total moves in game
		// Add players, date, winner etc. from replayData if needed
	};

	// Highlight the piece placed at the current move number (if applicable)
	const highlightedHexes =
		currentMoveNumber > 0 &&
		currentMoveNumber <= replayData.movesHistory.length
			? [replayData.movesHistory[currentMoveNumber - 1].coords]
			: [];

	return (
		// Reuse the two-column layout structure
		<div className="flex h-full p-4 gap-4">
			{/* Left Column: Board */}
			<div className="flex-grow flex items-center justify-center overflow-hidden p-2 bg-white rounded-lg shadow h-full">
				<HexBoard
					boardState={boardState} // Display board at current replay step
					playerColors={playerColors}
					onHexClick={() => {}} // Disable clicking on replay board
					className="max-w-full max-h-full"
					boardSize={BOARD_SIZE}
					highlightedHexes={highlightedHexes} // Highlight last move shown
				/>
			</div>
			{/* Right Column: Info + Controls */}
			<div className="w-1/3 flex-none flex flex-col gap-4 overflow-hidden h-full">
				{/* Static Game Info */}
				<div className="flex-none p-4 bg-white rounded-lg shadow overflow-y-auto">
					<GameInfo
						gameMetadata={staticGameMetadata}
						className="text-gray-600"
					/>
					{/* Add more static info like players, winner */}
					<div className="mt-2 text-sm text-gray-600">
						<p>
							<span className="font-medium text-gray-700">
								Player 1:
							</span>{" "}
							{replayData.players.p1}
						</p>
						<p>
							<span className="font-medium text-gray-700">
								Player 2:
							</span>{" "}
							{replayData.players.p2}
						</p>
						{replayData.winner && (
							<p>
								<span className="font-medium text-gray-700">
									Winner:
								</span>{" "}
								Player {replayData.winner}
							</p>
						)}
					</div>
				</div>
				{/* Replay Controls */}
				{/* Use flex-1 so it takes remaining space */}
				<div className="flex-1 min-h-0 bg-white rounded-lg shadow flex flex-col overflow-y-auto">
					<div className="p-4 flex-grow">
						{" "}
						{/* Padding for potential future content */}
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Replay Controls
						</h3>
						<p className="text-sm text-gray-500">
							Step through the game.
						</p>
					</div>
					{/* Control bar at the bottom */}
					<ReplayControlBar
						currentMove={currentMoveNumber}
						totalMoves={replayData.movesHistory.length}
						isPlaying={isPlaying}
						onPlayPause={handlePlayPause}
						onNext={handleNext}
						onPrevious={handlePrevious}
						onGoToStart={handleGoToStart}
						onGoToEnd={handleGoToEnd}
						onSeek={handleSeek}
					/>
				</div>
			</div>
		</div>
	);
}

// Helper to initialize board state (can be moved to utils)
const initializeBoardState = (size: number): Map<string, 0 | 1 | 2> => {
	const state = new Map<string, 0 | 1 | 2>();
	const initialCoords = computeGridCoordinates(size);
	initialCoords.forEach((coords) => {
		state.set(cubeToKey(coords), 0);
	});
	return state;
};

```


---


### <a name="srcappappsettingspagetsx"></a>app/(app)/settings/page.tsx


```tsx
"use client";
// Note: No 'use client' needed here if form state is managed within child components
import React from "react";
import UserProfileForm from "@/components/settings/UserProfileForm";
import ThemeSelector from "@/components/settings/ThemeSelector";
import GameOptionToggles from "@/components/settings/GameOptionToggles";

export default function SettingsPage() {
	// TODO: Add handler for form submission
	const handleSaveSettings = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Saving settings... (API call needed)");
		// Gather data from form state (likely managed within child components or lifted up)
		alert("Saving settings... (Not implemented)");
	};

	return (
		// Use padding defined in AppLayout or add here
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-semibold text-gray-900 mb-6">
				Settings
			</h1>

			{/* Form element wraps all settings sections */}
			<form
				className="bg-white p-6 rounded-lg shadow space-y-8"
				onSubmit={handleSaveSettings}
			>
				{/* Profile Section */}
				<section aria-labelledby="profile-heading">
					<h2
						id="profile-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Profile
					</h2>
					<UserProfileForm />
				</section>

				{/* Appearance Section */}
				<section aria-labelledby="appearance-heading">
					<h2
						id="appearance-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Appearance
					</h2>
					<ThemeSelector />
				</section>

				{/* Gameplay Section */}
				<section aria-labelledby="gameplay-heading">
					<h2
						id="gameplay-heading"
						className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4"
					>
						Gameplay
					</h2>
					<GameOptionToggles />
				</section>

				{/* Save Button */}
				<div className="pt-4 border-t border-gray-200">
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Save Settings
					</button>
				</div>
			</form>
		</div>
	);
}

```


---


### <a name="srcapplayouttsx"></a>app/layout.tsx


```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Example font
import "./globals.css";

// Optional: Load a font like Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hex AI Game",
  description: "Play Hex against an AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* Apply font class if using one */}
      <body className={`${inter.className} h-full bg-background text-text-primary`}>
        {/* The main container enforcing viewport height and no scroll */}
        {/* Using flex flex-col ensures children can correctly use flex-grow */}
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Optional Navbar could go here */}
          {/* <Navbar /> */}

          {/* Main content area that takes up remaining space */}
          {/* overflow-hidden here might be redundant if page.tsx handles it, but reinforces the constraint */}
          <main className="flex-grow overflow-hidden">
            {children} {/* page.tsx content will be rendered here */}
          </main>

          {/* Optional Footer could go here */}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}

```


---


### <a name="srcapppagetsx"></a>app/page.tsx


```tsx
// Using redirect requires this page to be a Client Component or used in Server Actions
// Let's make it a simple Client Component for redirection
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use useRouter for client-side redirect

export default function RootPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the dashboard page on component mount
		router.replace("/dashboard");
	}, [router]);

	// Optionally render a loading state or minimal content while redirecting
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<p className="text-gray-600">Loading Hex AI...</p>
			{/* Or a spinner component */}
		</div>
	);

	// Alternative using Next.js redirect function (works on server):
	// import { redirect } from 'next/navigation';
	// export default function RootPage() {
	//   redirect('/dashboard');
	// }
}

```


---


### <a name="srccomponentsdashboardgamelisttabletsx"></a>components/dashboard/GameListTable.tsx


```tsx
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

```


---


### <a name="srccomponentsdashboardnewgameoptionstsx"></a>components/dashboard/NewGameOptions.tsx


```tsx
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Define game modes explicitly based on backend expectations
type GameMode = "HUMAN_AI" | "AI_AI";

// Define difficulty levels (currently only used for display/selection)
type Difficulty = "easy" | "medium" | "hard";

interface NewGameOptionsProps {}

const NewGameOptions: React.FC<NewGameOptionsProps> = () => {
	const router = useRouter(); // Initialize router
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	// State for AI difficulty selection (visual only for now)
	const [aiDifficulty, setAiDifficulty] = useState<Difficulty>("medium");

	/**
	 * Creates a new game by connecting to the WebSocket endpoint,
	 * sending the create_game action, and handling the response.
	 * @param mode - The game mode ('HUMAN_AI' or 'AI_AI').
	 */
	const createGame = useCallback(
		async (mode: GameMode) => {
			setIsLoading(true); // Show loading state on the button
			setError(null); // Clear previous errors
			console.log(`Attempting to create game with mode: ${mode}`);

			// WebSocket URL for creating a new game (from backend_api_doc.pdf)
			const wsUrl = "ws://localhost:8000/ws/game/new/";
			let ws: WebSocket | null = null; // Declare ws to access it in the finally block

			try {
				// --- WebSocket Connection and Message Handling ---
				ws = new WebSocket(wsUrl);

				// Wrap the message handling in a Promise to await the game_id
				const messagePromise = new Promise<string>(
					(resolve, reject) => {
						if (!ws) {
							reject(new Error("WebSocket instance is null."));
							return;
						}

						ws.onopen = () => {
							console.log(
								"WebSocket connection opened for game creation."
							);
							// Send the create_game action once connected
							const createPayload = {
								action: "create_game",
								mode: mode,
								// Add difficulty or other options here if backend supports them
							};
							ws?.send(JSON.stringify(createPayload));
							console.log(
								"Sent create_game action:",
								createPayload
							);
						};

						ws.onerror = (event) => {
							console.error(
								"WebSocket error during game creation:",
								event
							);
							reject(
								new Error(
									"WebSocket connection failed. Check if the backend server is running."
								)
							);
							ws?.close(); // Ensure closure on error
						};

						ws.onmessage = (event) => {
							try {
								const message = JSON.parse(event.data);
								console.log(
									"Received message during game creation:",
									message
								);

								// Check for the expected 'game_created' response type
								if (
									message.type === "game_created" &&
									message.data?.game_id
								) {
									console.log(
										`Game created successfully! Game ID: ${message.data.game_id}`
									);
									resolve(message.data.game_id); // Resolve the promise with the game ID
								} else if (message.type === "error") {
									console.error(
										"Backend error during game creation:",
										message.data?.message
									);
									reject(
										new Error(
											message.data?.message ||
												"Unknown backend error during creation."
										)
									);
								} else {
									// Handle unexpected message types
									console.warn(
										"Received unexpected message type during game creation:",
										message.type
									);
									// Optionally reject or just ignore
								}
							} catch (e) {
								console.error(
									"Failed to parse message during game creation:",
									e
								);
								reject(
									new Error(
										"Failed to parse response from server."
									)
								);
							} finally {
								// Close the WebSocket connection once we have the game ID or an error
								if (
									ws?.readyState === WebSocket.OPEN ||
									ws?.readyState === WebSocket.CONNECTING
								) {
									console.log(
										"Closing WebSocket after game creation response."
									);
									ws?.close();
								}
							}
						};

						ws.onclose = (event) => {
							console.log(
								`Game creation WebSocket closed. Code: ${event.code}, Clean: ${event.wasClean}`
							);
							// If the promise hasn't been resolved/rejected yet, it means the connection closed prematurely.
							// Note: The 'reject' might have already been called by onerror or onmessage error handling.
							// This is a fallback. A robust implementation might use a flag.
							// reject(new Error("WebSocket closed before game ID was received."));
						};
					}
				);

				// --- Timeout for the Promise ---
				const timeoutPromise = new Promise<string>((_, reject) => {
					const id = setTimeout(() => {
						clearTimeout(id);
						reject(
							new Error(
								"Game creation timed out after 10 seconds."
							)
						);
					}, 5000); // 5-second timeout
				});

				// --- Wait for Game ID or Timeout ---
				// Race the message promise against the timeout
				const gameId = await Promise.race([
					messagePromise,
					timeoutPromise,
				]);

				// --- Navigation ---
				// If successful, navigate to the game page
				if (gameId) {
					console.log(`Navigating to /game/${gameId}`);
					router.push(`/game/${gameId}`); // Use Next.js router for navigation
				}
				// setIsLoading(false) will be handled in the finally block
			} catch (err: any) {
				console.error("Error during game creation process:", err);
				setError(err.message || "An unexpected error occurred.");
				setIsLoading(false); // Stop loading on error
				// Ensure WebSocket is closed on error
				if (ws && ws.readyState !== WebSocket.CLOSED) {
					console.log(
						"Closing WebSocket due to error during creation process."
					);
					ws.close();
				}
			} finally {
				// Ensure loading state is reset *unless* navigation is happening
				// Navigation might unmount the component, so resetting state might not be necessary
				// or could cause a brief flicker. If navigation is successful, let the unmount handle cleanup.
				// We already set isLoading to false in the catch block.
				// If successful, the component might unmount before this finally runs fully.
				console.log("Game creation process finished.");
			}
		},
		[router] // Add router to dependency array
	);

	// Handler for the "Start Game" (Human vs AI) button
	const handleStartHumanVsAi = () => {
		// Pass the selected difficulty if the backend supports it in the future
		createGame("HUMAN_AI");
	};

	// Handler for the "Start AI Match" button
	const handleStartAiVsAi = () => {
		createGame("AI_AI");
	};

	return (
		// Component Structure (Tailwind styled)
		<div className="bg-white p-4 rounded-lg shadow">
			<h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
				Start New Game
			</h3>
			{/* Display error message if any */}
			{error && (
				<p className="text-red-500 text-sm mb-2">Error: {error}</p>
			)}

			<div className="space-y-4">
				{/* Human vs AI Section */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">
						Human vs AI
					</span>
					<div className="flex items-center gap-2">
						{/* Difficulty Selector - currently visual only */}
						<select
							value={aiDifficulty}
							onChange={(e) =>
								setAiDifficulty(e.target.value as Difficulty)
							}
							className="block w-full sm:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-sm"
							disabled={isLoading} // Disable while loading
						>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
						{/* Start Button */}
						<button
							onClick={handleStartHumanVsAi} // Use the specific handler
							disabled={isLoading} // Disable button while loading
							className="px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait"
						>
							{isLoading ? "Starting..." : "Start Game"}
						</button>
					</div>
				</div>

				{/* AI vs AI Section */}
				<div className="flex items-center justify-between gap-2 p-3 border rounded-md">
					<span className="font-medium text-gray-700">AI vs AI</span>
					{/* Start Button */}
					<button
						onClick={handleStartAiVsAi} // Use the specific handler
						disabled={isLoading} // Disable during loading
						className="px-4 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait"
					>
						{isLoading ? "Starting..." : "Start AI Match"}
					</button>
				</div>

				{/* Placeholder for Human vs Human if needed later */}
			</div>
		</div>
	);
};

export default NewGameOptions;

```


---


### <a name="srccomponentsdashboarduserstatscardtsx"></a>components/dashboard/UserStatsCard.tsx


```tsx
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

```


---


### <a name="srccomponentshexgameinfotsx"></a>components/hex/GameInfo.tsx


```tsx
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

```


---


### <a name="srccomponentshexgameplaycontrolstsx"></a>components/hex/GameplayControls.tsx


```tsx
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


```


---


### <a name="srccomponentshexhexboardtsx"></a>components/hex/HexBoard.tsx


```tsx
"use client";

import React, { useMemo, useRef, useCallback } from "react";
import { HEX_SIZE } from "../../lib/constants";
import {
	cubeToPixelPointy,
	getHexagonVertices,
	formatVerticesForSVG,
	computeGridCoordinates,
	pixelToHex, // Import for later use
	cubeRound, // Import for later use
	cubeToKey,
} from "@/lib/coordinates";
import {
	HexBoardProps,
	CubeCoordinates,
	PlayerColors,
} from "../..//types/hexProps";

// --- calculateViewBoxPrecise function remains the same ---
const calculateViewBoxPrecise = (
	gridCoords: CubeCoordinates[],
	hexSize: number
): string => {
	if (gridCoords.length === 0) return "0 0 100 100";
	let minX = Infinity,
		minY = Infinity,
		maxX = -Infinity,
		maxY = -Infinity;
	gridCoords.forEach((coords) => {
		const center = cubeToPixelPointy(coords, hexSize);
		const vertices = getHexagonVertices(center.x, center.y, hexSize);
		vertices.forEach((vertex) => {
			minX = Math.min(minX, vertex.x);
			minY = Math.min(minY, vertex.y);
			maxX = Math.max(maxX, vertex.x);
			maxY = Math.max(maxY, vertex.y);
		});
	});
	const padding = hexSize * 0.5;
	minX -= padding;
	minY -= padding;
	maxX += padding;
	maxY += padding;
	const width = maxX - minX;
	const height = maxY - minY;
	return `${minX.toFixed(3)} ${minY.toFixed(3)} ${width.toFixed(
		3
	)} ${height.toFixed(3)}`;
};

// --- getFillColor function remains the same ---
const getFillColor = (
	state: 0 | 1 | 2 | undefined,
	playerColors: PlayerColors
): string => {
	switch (state) {
		case 1:
			return playerColors.p1;
		case 2:
			return playerColors.p2;
		case 0:
		default:
			return playerColors.empty;
	}
};

// --- generateBorderPaths function remains the same ---
const generateBorderPaths = (
	boardSize: number,
	hexSize: number
): { p1Top: string; p1Bottom: string; p2Left: string; p2Right: string } => {
	const pathData = { p1Top: "", p1Bottom: "", p2Left: "", p2Right: "" };
	const N = boardSize;

	// Player 1 Borders (Top: r=0, Bottom: r=N-1) - Correct
	let topPoints: { x: number; y: number }[] = [];
	let bottomPoints: { x: number; y: number }[] = [];
	for (let q = 0; q < N; q++) {
		// Top border (r=0)
		const topCoords: CubeCoordinates = { q, r: 0, s: -q };
		const topCenter = cubeToPixelPointy(topCoords, hexSize);
		const topVertices = getHexagonVertices(
			topCenter.x,
			topCenter.y,
			hexSize
		);
		// Vertices 0 (top-right) and 5 (top) trace the top edge
		if (q === 0) {
			// For the first hex, we need to include the top-left vertex
			topPoints.push(topVertices[4]); // Corrected from 1
		}
		topPoints.push(topVertices[5]);
		topPoints.push(topVertices[0]);

		// Bottom border (r=N-1)
		const bottomCoords: CubeCoordinates = { q, r: N - 1, s: -q - (N - 1) };
		const bottomCenter = cubeToPixelPointy(bottomCoords, hexSize);
		const bottomVertices = getHexagonVertices(
			bottomCenter.x,
			bottomCenter.y,
			hexSize
		);
		// Vertices 3 (bottom left) and 2 (bottom) trace the bottom edge
		bottomPoints.push(bottomVertices[3]);
		bottomPoints.push(bottomVertices[2]);
		if (q === N - 1) {
			// For the last hex, we need to include the bottom-right vertex
			bottomPoints.push(bottomVertices[1]); // Corrected from 0
		}
	}
	pathData.p1Top = `M ${topPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;
	pathData.p1Bottom = `M ${bottomPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;

	// Player 2 Borders (Left: q=0, Right: q=N-1) - Corrected Vertices
	let leftPoints: { x: number; y: number }[] = [];
	let rightPoints: { x: number; y: number }[] = [];
	for (let r = 0; r < N; r++) {
		// Left border (q=0)
		const leftCoords: CubeCoordinates = { q: 0, r, s: -r };
		const leftCenter = cubeToPixelPointy(leftCoords, hexSize);
		const leftVertices = getHexagonVertices(
			leftCenter.x,
			leftCenter.y,
			hexSize
		);
		// Vertices 1 (left) and 2 (bottom-left) trace the left edge
		leftPoints.push(leftVertices[4]); // Corrected from 0
		leftPoints.push(leftVertices[3]); // Corrected from 1

		// Right border (q=N-1)
		const rightCoords: CubeCoordinates = { q: N - 1, r, s: -(N - 1) - r };
		const rightCenter = cubeToPixelPointy(rightCoords, hexSize);
		const rightVertices = getHexagonVertices(
			rightCenter.x,
			rightCenter.y,
			hexSize
		);
		// Vertices 4 (right) and 3 (bottom-right) trace the right edge
		rightPoints.push(rightVertices[0]); // Corrected from 5
		rightPoints.push(rightVertices[1]); // Corrected from 4
	}
	pathData.p2Left = `M ${leftPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;
	pathData.p2Right = `M ${rightPoints
		.map((p) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
		.join(" L ")}`;

	return pathData;
};

const HexBoard: React.FC<HexBoardProps> = ({
	boardState,
	playerColors,
	onHexClick,
	className,
	boardSize,
	highlightedHexes = [],
}) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const gridCoords = useMemo(
		() => computeGridCoordinates(boardSize),
		[boardSize]
	);
	const viewBox = useMemo(
		() => calculateViewBoxPrecise(gridCoords, HEX_SIZE),
		[gridCoords]
	);
	const highlightedKeys = useMemo(
		() => new Set(highlightedHexes.map(cubeToKey)),
		[highlightedHexes]
	);
	const borderPaths = useMemo(
		() => generateBorderPaths(boardSize, HEX_SIZE),
		[boardSize]
	);

	// Store valid grid coordinate keys in a memoized Set for quick checking
	const validKeys = useMemo(
		() => new Set(gridCoords.map(cubeToKey)),
		[gridCoords]
	);

	// --- Updated handleSvgClick with Accurate Pixel-to-Hex Logic ---
	const handleSvgClick = useCallback(
		(event: React.MouseEvent<SVGSVGElement>) => {
			console.log("--- handleSvgClick (Custom Coords) ---");
			if (!svgRef.current) {
				console.error("SVG ref not available.");
				return;
			}
			const svgElement = svgRef.current;
			const svgRect = svgElement.getBoundingClientRect();
			const vb = svgElement.viewBox.baseVal;

			if (!vb || svgRect.width === 0 || svgRect.height === 0) {
				console.error("SVG dimensions or viewBox not available.");
				return;
			}
			console.log(
				`SVG Rect: { left: ${svgRect.left.toFixed(
					2
				)}, top: ${svgRect.top.toFixed(
					2
				)}, width: ${svgRect.width.toFixed(
					2
				)}, height: ${svgRect.height.toFixed(2)} }`
			);
			console.log(
				`ViewBox: { x: ${vb.x.toFixed(2)}, y: ${vb.y.toFixed(
					2
				)}, width: ${vb.width.toFixed(2)}, height: ${vb.height.toFixed(
					2
				)} }`
			);
			const clickXRelative = event.clientX - svgRect.left;
			const clickYRelative = event.clientY - svgRect.top;
			console.log(
				`Click Relative: { x: ${clickXRelative.toFixed(
					2
				)}, y: ${clickYRelative.toFixed(
					2
				)} } (Screen click: { clientX: ${event.clientX}, clientY: ${
					event.clientY
				} })`
			);
			const svgInternalX =
				vb.x + (clickXRelative * vb.width / svgRect.width);
			const svgInternalY =
				vb.y + (clickYRelative * vb.height / svgRect.height);
			console.log(
				`SVG Internal Coords: { x: ${svgInternalX.toFixed(
					3
				)}, y: ${svgInternalY.toFixed(3)} }`
			);
			const fractionalHex = pixelToHex(
				svgInternalX,
				svgInternalY,
				HEX_SIZE
			); // Use custom function
			console.log(
				`Fractional Hex: { q: ${fractionalHex.q.toFixed(
					3
				)}, r: ${fractionalHex.r.toFixed(
					3
				)}, s: ${fractionalHex.s.toFixed(3)} }`
			);
			const clickedCubeCoords = cubeRound(fractionalHex); // Use custom function
			console.log(
				`Rounded Cube Coords: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
			);
			const clickedKey = cubeToKey(clickedCubeCoords);
			if (validKeys.has(clickedKey)) {
				console.log(
					`VALID Click -> Calling onHexClick with: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
				);
				onHexClick(clickedCubeCoords);
			} else {
				console.log(
					`INVALID Click - Outside valid hex grid area. Coords: { q: ${clickedCubeCoords.q}, r: ${clickedCubeCoords.r}, s: ${clickedCubeCoords.s} }`
				);
			}
			console.log("--- handleSvgClick End ---");
		},
		[onHexClick, validKeys]
	);

	return (
		<svg
			ref={svgRef} // Assign the ref
			viewBox={viewBox}
			preserveAspectRatio="xMidYMid meet"
			className={`w-full h-auto ${className || ""}`}
			style={{ backgroundColor: playerColors.background }}
			onClick={handleSvgClick} // Attach click handler
		>
			<g>
				{" "}
				{/* Group for Hexagons */}
				{gridCoords.map((coords) => {
					const center = cubeToPixelPointy(coords, HEX_SIZE);
					const vertices = getHexagonVertices(
						center.x,
						center.y,
						HEX_SIZE
					);
					const points = formatVerticesForSVG(vertices);
					const key = cubeToKey(coords);
					const hexState = boardState.get(key);
					const fillColor = getFillColor(hexState, playerColors);
					const isHighlighted = highlightedKeys.has(key);
					const strokeColor = isHighlighted ? "black" : "#CBD5E0"; // gray-300
					const strokeWidth = isHighlighted
						? Math.max(1.5, 2.5 * (30 / HEX_SIZE))
						: 1;

					return (
						<polygon
							key={key}
							// Remove data attributes, no longer needed for click handling
							points={points}
							fill={fillColor}
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							// Add pointer-events: none if clicks should only register on SVG background
							// style={{ pointerEvents: 'none' }}
							className="cursor-pointer transition-opacity duration-150 hover:opacity-80"
						/>
					);
				})}
			</g>

			{/* Render Border Paths */}
			<g
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
				style={{ pointerEvents: "none" }}
			>
				{" "}
				{/* Make borders non-interactive */}
				<path
					d={borderPaths.p1Top}
					stroke={playerColors.p1}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p1Bottom}
					stroke={playerColors.p1}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p2Left}
					stroke={playerColors.p2}
					strokeWidth={HEX_SIZE * 0.15}
				/>
				<path
					d={borderPaths.p2Right}
					stroke={playerColors.p2}
					strokeWidth={HEX_SIZE * 0.15}
				/>
			</g>
		</svg>
	);
};

export default HexBoard;

```


---


### <a name="srccomponentsreplayreplaycontrolbartsx"></a>components/replay/ReplayControlBar.tsx


```tsx
"use client"; // Needs client component for state and interaction

import React from "react";
// Example icons
import {
	PlayIcon,
	PauseIcon,
	ForwardIcon,
	BackwardIcon,
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon,
	StopIcon,
	PlayPauseIcon,
} from "@heroicons/react/20/solid";

interface ReplayControlBarProps {
	rel;
	currentMove: number;
	totalMoves: number;
	isPlaying: boolean;
	onPlayPause: () => void;
	onNext: () => void;
	onPrevious: () => void;
	onGoToStart: () => void;
	onGoToEnd: () => void;
	onSeek?: (moveNumber: number) => void; // Optional seek functionality
}

const ReplayControlBar: React.FC<ReplayControlBarProps> = ({
	currentMove,
	totalMoves,
	isPlaying,
	onPlayPause,
	onNext,
	onPrevious,
	onGoToStart,
	onGoToEnd,
	onSeek,
}) => {
	const canGoBack = currentMove > 0;
	const canGoForward = currentMove < totalMoves;

	const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onSeek) {
			const value = parseInt(event.target.value, 10);
			onSeek(value);
		}
	};

	return (
		<div className="bg-gray-50 p-3 rounded-b-lg border-t border-gray-200">
			{" "}
			{/* Example styling */}
			{/* Optional Seek Slider */}
			{onSeek && totalMoves > 0 && (
				<div className="mb-2 px-2">
					<label htmlFor="replay-seek" className="sr-only">
						Seek Replay
					</label>
					<input
						type="range"
						id="replay-seek"
						min="0"
						max={totalMoves}
						value={currentMove}
						onChange={handleSeek}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
					/>
					<div className="flex justify-between text-xs text-gray-500 mt-1">
						<span>Move: {currentMove}</span>
						<span>Total: {totalMoves}</span>
					</div>
				</div>
			)}
			{/* Control Buttons */}
			<div className="flex items-center justify-center space-x-3">
				{/* Go to Start */}
				<button
					onClick={onGoToStart}
					disabled={!canGoBack}
					title="Go to Start"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<BackwardIcon className="h-5 w-5" />
				</button>
				{/* Previous */}
				<button
					onClick={onPrevious}
					disabled={!canGoBack}
					title="Previous Move"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ArrowUturnLeftIcon className="h-5 w-5" />
				</button>
				{/* Play/Pause */}
				<button
					onClick={onPlayPause}
					title={isPlaying ? "Pause" : "Play"}
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					{isPlaying ? (
						<PauseIcon className="h-6 w-6" />
					) : (
						<PlayIcon className="h-6 w-6" />
					)}
				</button>
				{/* Next */}
				<button
					onClick={onNext}
					disabled={!canGoForward}
					title="Next Move"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ArrowUturnRightIcon className="h-5 w-5" />
				</button>
				{/* Go to End */}
				<button
					onClick={onGoToEnd}
					disabled={!canGoForward}
					title="Go to End"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
				>
					<ForwardIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

export default ReplayControlBar;

```


---


### <a name="srccomponentssettingsgameoptiontogglestsx"></a>components/settings/GameOptionToggles.tsx


```tsx
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

```


---


### <a name="srccomponentssettingsthemeselectortsx"></a>components/settings/ThemeSelector.tsx


```tsx
    'use client'; // Needs client component for state/interaction

    import React, { useState, useEffect } from 'react';

    interface ThemeSelectorProps {}

    const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
        // Example state - actual theme switching needs more logic (e.g., context, localStorage)
        const [theme, setTheme] = useState<'light' | 'dark'>('light');

        // TODO: Implement actual theme switching logic
        // This might involve updating a class on the <html> element
        // and saving the preference (e.g., in localStorage)
        useEffect(() => {
            console.log("Theme selected:", theme);
            // Example: document.documentElement.classList.toggle('dark', theme === 'dark');
        }, [theme]);


        return (
            <fieldset>
                 <legend className="text-sm font-medium text-gray-700 mb-1">Select Theme</legend>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <input
                            id="light-theme"
                            name="theme-option"
                            type="radio"
                            value="light"
                            checked={theme === 'light'}
                            onChange={() => setTheme('light')}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="light-theme" className="ml-2 block text-sm text-gray-900">
                            Light
                        </label>
                    </div>
                     <div className="flex items-center">
                        <input
                            id="dark-theme"
                            name="theme-option"
                            type="radio"
                            value="dark"
                            checked={theme === 'dark'}
                            onChange={() => setTheme('dark')}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="dark-theme" className="ml-2 block text-sm text-gray-900">
                            Dark
                        </label>
                    </div>
                 </div>
            </fieldset>
        );
    };

    export default ThemeSelector;
    
```


---


### <a name="srccomponentssettingsuserprofileformtsx"></a>components/settings/UserProfileForm.tsx


```tsx
"use client"; // Forms typically need client components for state

import React, { useState } from "react";

interface UserProfileFormProps {
	// Props for initial data, e.g., initialUsername: string;
}

const UserProfileForm: React.FC<UserProfileFormProps> = () => {
	// Example state for form fields
	const [username, setUsername] = useState("CurrentUser"); // Replace with actual data later
	const [email, setEmail] = useState("user@example.com"); // Replace with actual data later

	return (
		<div className="space-y-4">
			<div>
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email (Read-only example)
				</label>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					readOnly // Example: Email might not be editable
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
				/>
			</div>
			{/* Add Avatar upload/display later */}
		</div>
	);
};

export default UserProfileForm;

```


---


### <a name="srccomponentsuisidebarnavtsx"></a>components/ui/SideBarNav.tsx


```tsx
'use client'; // Needs to be a client component to use usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // Import React

// Example icons, you might need different ones
import {
  HomeIcon, // For Dashboard
  // PuzzlePieceIcon, // For Game - REMOVED
  PlayCircleIcon, // For Replay (If added later)
  Cog6ToothIcon, // For Settings
  // QuestionMarkCircleIcon // Placeholder for other links
} from '@heroicons/react/24/outline';


// Define navigation items
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  // { name: 'Game', href: '/game', icon: PuzzlePieceIcon }, // <-- REMOVED THIS LINE
  // Add Replay link later if needed, maybe points to a list first
  // { name: 'Replays', href: '/replays', icon: PlayCircleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

// Helper function to apply conditional classes
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4 flex flex-col">
      {/* Logo/Brand Area */}
      <div className="mb-8 flex items-center justify-center h-16">
        {/* You can replace this with an actual logo component or image */}
        <span className="text-2xl font-bold text-white">Hex AI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              // Basic active check: true if pathname starts with item.href
              // More specific checks might be needed (e.g., exact match for dashboard)
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out'
            )}
            aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                pathname.startsWith(item.href) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                'mr-3 flex-shrink-0 h-5 w-5' // Adjusted icon size slightly
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Optional: User Profile/Logout section at bottom */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        {/* Placeholder for user info/logout */}
        <p className="text-xs text-gray-400 text-center">User Actions Area</p>
      </div>
    </aside>
  );
}


```


---


### <a name="srchooksusegamewebsocketts"></a>hooks/useGameWebSocket.ts


```ts
import { useState, useCallback, useRef, useEffect } from 'react';

// Enum for WebSocket connection states
export enum WebSocketState {
  CONNECTING = 'CONNECTING',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
  ERROR = 'ERROR',
}

// Interface for the hook's return value
interface UseGameWebSocketReturn {
  connectionState: WebSocketState;
  sendMessage: (payload: object) => void;
  connect: (url: string) => void;
  disconnect: () => void;
  lastMessage: any | null;
  error: Event | Error | null; // Allow Error type for creation failures
}

/**
 * Custom hook to manage a WebSocket connection.
 * @param onMessageCallback Optional callback function to handle incoming messages.
 */
export function useGameWebSocket(onMessageCallback?: (message: any) => void): UseGameWebSocketReturn {
  const [connectionState, setConnectionState] = useState<WebSocketState>(WebSocketState.CLOSED);
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const [error, setError] = useState<Event | Error | null>(null); // Allow Error type
  const ws = useRef<WebSocket | null>(null);

  // Function to connect to a WebSocket URL
  const connect = useCallback((url: string) => {
    // Prevent multiple connections if already open or connecting
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
      console.log(`WebSocket already ${ws.current.readyState === WebSocket.OPEN ? 'open' : 'connecting'}.`);
      return;
    }

    // Clean up previous connection if any (ensures disconnect logic runs)
    if (ws.current) {
       // Set state to CLOSING before explicitly closing
       setConnectionState(WebSocketState.CLOSING);
       ws.current.close();
       ws.current = null; // Clear ref immediately after calling close
       console.log("Cleaned up previous WebSocket connection before reconnecting.");
    }


    console.log(`Connecting to ${url}...`);
    setConnectionState(WebSocketState.CONNECTING);
    setError(null);
    setLastMessage(null);

    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connection opened.');
        setConnectionState(WebSocketState.OPEN);
        setError(null);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('WebSocket message received:', message);
          setLastMessage(message);
          if (onMessageCallback) {
            onMessageCallback(message);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e, 'Raw data:', event.data);
        }
      };

      ws.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        // Check if connection is already closing/closed to avoid overwriting state
        if (connectionState !== WebSocketState.CLOSING && connectionState !== WebSocketState.CLOSED) {
             setConnectionState(WebSocketState.ERROR);
             setError(event);
        }
      };

      ws.current.onclose = (event) => {
        console.log(`WebSocket connection closed: Code=${event.code}, Reason=${event.reason}`);
        // Only update state if it wasn't an intentional close initiated by disconnect() or a reconnect attempt
         if (connectionState !== WebSocketState.CLOSING) {
             setConnectionState(WebSocketState.CLOSED);
             setError(null); // Clear error on close unless it was an error state already
         }
        // Check if ws.current still points to the closing socket before nulling
        // This check might be less critical now due to immediate nulling in disconnect/reconnect
        if (ws.current && ws.current.url === url) {
             ws.current = null;
        }
      };

    } catch (err) {
        console.error("Failed to create WebSocket:", err);
        setConnectionState(WebSocketState.ERROR);
        // Store the actual error object
        setError(err instanceof Error ? err : new Error('WebSocket creation failed'));
        ws.current = null;
    }
    // ** THE FIX IS HERE **
    // Removed `connectionState` from the dependency array.
    // `connect` should only be recreated if `onMessageCallback` changes.
  }, [onMessageCallback]); // <--- FIXED DEPENDENCY ARRAY

  // Function to disconnect the WebSocket
  const disconnect = useCallback(() => {
    if (ws.current) {
      console.log('Closing WebSocket connection intentionally...');
      setConnectionState(WebSocketState.CLOSING); // Set state *before* closing
      ws.current.close();
      ws.current = null; // Clear ref immediately
    }
  }, []); // No dependencies needed

  // Function to send a JSON message
  const sendMessage = useCallback((payload: object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const messageString = JSON.stringify(payload);
        console.log('Sending WebSocket message:', messageString);
        ws.current.send(messageString);
      } catch (e) {
        console.error('Failed to stringify or send WebSocket message:', e);
      }
    } else {
      console.warn(`Cannot send message: WebSocket is not open (State: ${ws.current?.readyState})`);
    }
  }, []); // No dependencies needed

   // Effect to disconnect on component unmount
   useEffect(() => {
    // Store the current WebSocket ref in a variable accessible by the cleanup function
    const currentWs = ws.current;
    return () => {
      // Use the captured ref in the cleanup
      if (currentWs) {
        console.log("Disconnecting WebSocket on component unmount");
        // No need to set state here as the component is unmounting
        currentWs.close();
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount


  return { connectionState, sendMessage, connect, disconnect, lastMessage, error };
}

```


---


### <a name="srclibconstantsts"></a>lib/constants.ts


```ts
/**
 * Defines the size (radius) of the hexagons in SVG coordinate units.
 * This value is fundamental for coordinate conversions and vertex calculations.
 */
export const HEX_SIZE: number = 30; // Example size, adjust as needed for visual appearance

```


---


### <a name="srclibcoordinatests"></a>lib/coordinates.ts


```ts
import { CubeCoordinates } from '@/types/hexProps';
import { HEX_SIZE } from './constants'; // Import hex size

/**
 * Converts Cube coordinates {q, r, s} to pixel coordinates {x, y} for pointy-top hexagons.
 * Assumes the origin (0,0) of the SVG coordinate system corresponds to the center
 * of the hexagon at Cube coordinates (0, 0, 0). Adjustments might be needed based on
 * how the parallelogram grid is centered.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#hex-to-pixel
 * @param cube - The Cube coordinates {q, r, s}.
 * @param size - The size (radius) of the hexagon.
 * @returns The pixel coordinates {x, y}.
 */
export function cubeToPixelPointy(cube: CubeCoordinates, size: number): { x: number; y: number } {
  // Use q and r from Cube coordinates (s is redundant: s = -q -r)
  const q = cube.q;
  const r = cube.r;
  // Apply the pointy-top axial_to_pixel formula
  const x = size * Math.sqrt(3) * (q + r / 2);
  const y = size * (3 / 2) * r;
  return { x, y };
}

/**
 * Calculates the six vertex coordinates for a pointy-top hexagon relative to its center.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#basics
 * @param centerX - The x-coordinate of the hexagon's center.
 * @param centerY - The y-coordinate of the hexagon's center.
 * @param size - The size (radius) of the hexagon.
 * @returns An array of six {x, y} vertex coordinates.
 */
export function getHexagonVertices(centerX: number, centerY: number, size: number): { x: number; y: number }[] {
  const vertices: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    // Angle calculation for pointy-top vertices
    // Starts at -30 degrees (pointing upwards) and increments by 60 degrees.
    const angleRad = Math.PI / 180 * (60 * i - 30);
    const x = centerX + size * Math.cos(angleRad);
    const y = centerY + size * Math.sin(angleRad);
    vertices.push({ x, y });
  }
  return vertices;
}

/**
 * Formats an array of vertex coordinates into a string suitable for an SVG polygon's 'points' attribute.
 * @param vertices - An array of {x, y} vertex coordinates.
 * @returns A string like "x1,y1 x2,y2 ... x6,y6".
 */
export function formatVerticesForSVG(vertices: { x: number; y: number }[]): string {
  return vertices.map(v => `${v.x.toFixed(3)},${v.y.toFixed(3)}`).join(' '); // Use toFixed for cleaner output
}

/**
 * Converts pixel coordinates (within the SVG's internal coordinate system)
 * back to fractional Cube coordinates {q, r, s}.
 * This is the inverse of cubeToPixelPointy.
 * Based on formulas from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
 * @param pixelX - The x-coordinate within the SVG's internal system.
 * @param pixelY - The y-coordinate within the SVG's internal system.
 * @param size - The size (radius) of the hexagons used for rendering.
 * @returns Fractional Cube coordinates {q, r, s}.
 */
export function pixelToHex(pixelX: number, pixelY: number, size: number): CubeCoordinates {
  // Apply the inverse formula for pointy-top hexagons
  const q_frac = (Math.sqrt(3) / 3 * pixelX - 1 / 3 * pixelY) / size;
  const r_frac = (2 / 3 * pixelY) / size;
  const s_frac = -q_frac - r_frac; // Derive s from q and r
  return { q: q_frac, r: r_frac, s: s_frac };
}

/**
 * Rounds fractional Cube coordinates to the nearest integer Cube coordinates,
 * ensuring the constraint q + r + s = 0 is maintained.
 * Based on the rounding algorithm from Red Blob Games: https://www.redblobgames.com/grids/hexagons/#rounding
 * @param fracCube - The fractional Cube coordinates {q, r, s}.
 * @returns The nearest integer Cube coordinates {q, r, s}.
 */
export function cubeRound(fracCube: CubeCoordinates): CubeCoordinates {
  let q = Math.round(fracCube.q);
  let r = Math.round(fracCube.r);
  let s = Math.round(fracCube.s);

  const q_diff = Math.abs(q - fracCube.q);
  const r_diff = Math.abs(r - fracCube.r);
  const s_diff = Math.abs(s - fracCube.s);

  // Reset the component with the largest rounding difference to maintain the constraint
  if (q_diff > r_diff && q_diff > s_diff) {
    q = -r - s;
  } else if (r_diff > s_diff) {
    r = -q - s;
  } else {
    s = -q - r;
  }

  return { q, r, s };
}

/**
 * Generates all valid CubeCoordinates for a standard NxN Hex game board,
 * which forms a parallelogram (rhombus) shape.
 * Uses Axial coordinates 0 <= q < N and 0 <= r < N internally.
 * @param boardSize - The size N of the board (e.g., 11 for 11x11).
 * @returns An array of CubeCoordinates representing all hexes on the board.
 */
export function computeGridCoordinates(boardSize: number): CubeCoordinates[] {
  const coordinates: CubeCoordinates[] = [];
  // Iterate q from 0 to N-1
  for (let q = 0; q < boardSize; q++) {
    // Iterate r from 0 to N-1
    for (let r = 0; r < boardSize; r++) {
      // Calculate s based on q and r to satisfy the Cube constraint q + r + s = 0
      const s = -q - r;
      coordinates.push({ q, r, s });
    }
  }
  return coordinates;
}


/**
 * Helper function to create a string key from CubeCoordinates, useful for Maps.
 * @param coords - The CubeCoordinates object.
 * @returns A string representation like "q,r,s".
 */
export function cubeToKey(coords: CubeCoordinates): string {
  return `${coords.q},${coords.r},${coords.s}`;
}

/**
 * Helper function to convert a string key back to CubeCoordinates.
 * @param key - The string representation like "q,r,s".
 * @returns A CubeCoordinates object. Returns null if key is invalid.
 */
export function keyToCube(key: string): CubeCoordinates | null {
    const parts = key.split(',');
    if (parts.length !== 3) return null;
    const q = parseInt(parts[0], 10);
    const r = parseInt(parts[1], 10);
    const s = parseInt(parts[2], 10);
    if (isNaN(q) || isNaN(r) || isNaN(s) || q + r + s !== 0) {
        return null; // Invalid key or doesn't satisfy constraint
    }
    return { q, r, s };
}

// --- Backend XY <-> Frontend Cube Conversion ---
// ** CRITICAL: Verify & Update based on Backend **

/**
 * Converts Frontend CubeCoordinates (q, r, s) to Backend XY coordinates (x, y).
 * **MUST** be updated to match the coordinate system used by the backend API.
 * The current implementation assumes the backend uses Axial coordinates (x=q, y=r).
 * Check backend code (e.g., consumers.py) to confirm how 'x' and 'y' are interpreted.
 *
 * @param coords Frontend CubeCoordinates.
 * @param boardSize The size of the board (e.g., 11).
 * @returns Object { x: number, y: number } or null if invalid/unconvertible.
 */
export function cubeToXY(coords: CubeCoordinates, boardSize: number = 11): { x: number; y: number } | null {
    // --- Active Implementation: Assuming Backend uses Axial x=q, y=r ---
    // VERIFY THIS ASSUMPTION WITH YOUR BACKEND CODE.
    const x_axial = coords.r;
    const y_axial = coords.q;

    // Validate if the resulting x, y are within the expected 0 to N-1 range.
    if (x_axial >= 0 && x_axial < boardSize && y_axial >= 0 && y_axial < boardSize) {
        return { x: x_axial, y: y_axial };
    }

    // --- Add other implementations (e.g., for Offset) below if needed, ---
    // --- but only activate the one that matches the backend. ---

    console.warn(`Cannot convert Cube coordinates (${coords.q}, ${coords.r}, ${coords.s}) to backend XY using the current implementation (Axial assumed). Verify backend coordinate system.`);
    return null; // Conversion failed or coords out of range for the chosen system
}

/**
 * Converts Backend XY coordinates (x, y) received from the API to Frontend CubeCoordinates (q, r, s).
 * **MUST** be updated to match the coordinate system used by the backend API.
 * This **MUST** be the exact inverse of the chosen `cubeToXY` implementation.
 * The current implementation assumes the backend uses Axial coordinates (x=q, y=r).
 *
 * @param x Backend x coordinate (0-10).
 * @param y Backend y coordinate (0-10).
 * @returns CubeCoordinates object or null if input is invalid.
 */
export function xyToCube(x: number, y: number): CubeCoordinates | null {
     // Basic validation for backend coordinates
     if (x === undefined || y === undefined || x < 0 || y < 0) {
         console.warn(`Invalid backend XY coordinates received: x=${x}, y=${y}`);
         return null;
     }

    // --- Active Implementation: Assuming Backend uses Axial x=q, y=r ---
    // VERIFY THIS ASSUMPTION WITH YOUR BACKEND CODE.
    const q_axial = y;
    const r_axial = x;
    const s_axial = -q_axial - r_axial; // Calculate s using the constraint q+r+s=0
    return { q: q_axial, r: r_axial, s: s_axial };

    // --- Add other implementations (e.g., for Offset) below if needed, ---
    // --- but only activate the one that matches the backend. ---

    // console.warn(`Cannot convert backend XY coordinates (${x}, ${y}) to Cube using the current implementation (Axial assumed). Verify backend coordinate system.`);
    // return null; // If no valid conversion matches
}

```


---


### <a name="srcstoregamestorets"></a>store/gameStore.ts


```ts
import { create } from 'zustand';
import { CubeCoordinates } from '../types/hexProps'; // Assuming hexProps defines PlayerColors too
import { computeGridCoordinates, cubeToKey, keyToCube, cubeToXY, xyToCube } from '../lib/coordinates';
import { WebSocketState } from '@/hooks/useGameWebSocket';

const BOARD_SIZE = 11;

// --- Helper Functions ---

/**
 * Initializes the board state map with all hexes set to empty (0).
 * @param size - The board size (e.g., 11).
 * @returns A Map where keys are "q,r,s" strings and values are 0, 1, or 2.
 */
const initializeBoardState = (size: number): Map<string, 0 | 1 | 2> => {
    const state = new Map<string, 0 | 1 | 2>();
    const initialCoords = computeGridCoordinates(size);
    initialCoords.forEach(coords => {
        state.set(cubeToKey(coords), 0); // 0 represents an empty hex
    });
    return state;
};

/**
 * Maps backend player identifiers ('human', 'AI', 'AI_1', 'AI_2', null, 'draw')
 * to frontend player representation (1 for Red, 2 for Blue, null for ongoing/draw).
 * @param backendPlayer - The player identifier string from the backend.
 * @returns 1, 2, or null.
 */
const mapBackendPlayerToFrontend = (backendPlayer: string | null): 1 | 2 | null => {
    // Mapping based on "backend_api_doc.pdf" and common game logic
    // Assuming Human/AI_1 is Player 1 (Red), AI/AI_2 is Player 2 (Blue)
    if (backendPlayer === 'human' || backendPlayer === 'AI_1') return 1; // Player 1 (Red)
    if (backendPlayer === 'AI' || backendPlayer === 'AI_2') return 2; // Player 2 (Blue)
    if (backendPlayer === null || backendPlayer === 'draw') return null; // Game ongoing, Draw, or explicitly null winner
    console.warn(`Unknown backend player identifier encountered: ${backendPlayer}`);
    return null; // Return null for unknown cases
};

/**
 * Maps the backend board representation (11x11 array) to the frontend board state map.
 * @param backendBoard - The 11x11 array from the backend (1=Red, -1=Blue, 0=Empty).
 * @returns A Map representing the frontend board state.
 */
const mapBackendBoard = (backendBoard: (0 | 1 | -1)[][]): Map<string, 0 | 1 | 2> => {
    // **ASSUMPTION:** Backend board is an 11x11 array where `backendBoard[r][q]` maps to
    // frontend cube coords (q, r, -q-r). This means backend y=r, x=q based on array indexing.
    // **CRITICAL:** This MUST match how the backend structures its board data AND how
    // `xyToCube` interprets backend coordinates in move history.
    // The current `xyToCube` assumes x=r, y=q. Let's align this mapping:
    // Backend `board[y][x]` (using conventional row=y, col=x) should map to `xyToCube(x,y)`.
    // If backend uses `board[r][q]`, then `xyToCube(q,r)` should be used.
    // Let's proceed assuming backend uses `board[y][x]` index access matching `xyToCube(x,y)`.

    if (!backendBoard || !Array.isArray(backendBoard) || backendBoard.length !== BOARD_SIZE) {
        console.error("Invalid backend board structure received. Expected 11x11 array.", backendBoard);
        return initializeBoardState(BOARD_SIZE); // Return empty board on error
    }

    const frontendBoard = new Map<string, 0 | 1 | 2>();
    for (let y = 0; y < BOARD_SIZE; y++) { // Corresponds to 'q' in our frontend cube if y=q
        if (!Array.isArray(backendBoard[y]) || backendBoard[y].length !== BOARD_SIZE) {
             console.error(`Invalid backend board row structure at index y=${y}.`, backendBoard[y]);
             // Potentially skip this row or return empty board
             continue; // Skip invalid row
        }
        for (let x = 0; x < BOARD_SIZE; x++) { // Corresponds to 'r' in our frontend cube if x=r
            const coords = xyToCube(x, y, BOARD_SIZE); // Convert backend x,y to frontend cube
            if (coords) {
                const backendValue = backendBoard[y][x];
                // Backend: 1=Red(P1), -1=Blue(P2), 0=Empty
                // Frontend: 1=P1, 2=P2, 0=Empty
                const frontendValue = backendValue === 1 ? 1 : backendValue === -1 ? 2 : 0;
                frontendBoard.set(cubeToKey(coords), frontendValue as 0 | 1 | 2);
            } else {
                 console.warn(`Could not map backend board coordinates x=${x}, y=${y} to valid CubeCoordinates.`);
            }
        }
    }
     // Verify all expected hexes are present
     const expectedKeys = computeGridCoordinates(BOARD_SIZE).map(cubeToKey);
     expectedKeys.forEach(key => {
         if (!frontendBoard.has(key)) {
             console.warn(`Frontend board state missing expected key after mapping: ${key}. Setting to empty.`);
             frontendBoard.set(key, 0);
         }
     });

    return frontendBoard;
};


// --- State Shape ---
type GameState = {
    gameId: string | null;
    boardState: Map<string, 0 | 1 | 2>; // Key: "q,r,s", Value: 0 (empty), 1 (P1), 2 (P2)
    playerTurn: 1 | 2 | null; // 1 (P1 Red), 2 (P2 Blue), null (Game Over?)
    humanPlayerColor: 'red' | 'blue' | null; // From backend 'human_color' field
    moves: number; // Total moves made in the game
    highlightedHexes: CubeCoordinates[]; // For visually highlighting the last move
    winner: 1 | 2 | null; // 1 (Red wins), 2 (Blue wins), null (Ongoing or Draw)
    isDraw: boolean; // Explicitly track draw state from backend 'winner' field
    winProbability: { [key: string]: number } | null; // e.g., { "human": 0.6, "AI": 0.4 }
    mode: 'HUMAN_AI' | 'AI_AI' | null; // Game mode
    connectionState: WebSocketState; // WebSocket connection status
    lastBackendError: string | null; // Store last error message from backend
    // Function provided by the WebSocket hook to send messages
    sendMessage: (payload: object) => void;
};

// Actions available in the store
interface GameStoreActions {
    handleGameStateUpdate: (backendData: any) => void; // Process message from backend
    setConnectionState: (state: WebSocketState) => void; // Update WS connection state
    setGameId: (gameId: string | null) => void; // Set the current game ID
    setLastError: (error: string | null) => void; // Store backend error message
    highlightLastMove: (coords: CubeCoordinates | null) => void; // Set hexes to highlight
    setSendMessage: (sender: (payload: object) => void) => void; // Receive sendMessage func from hook
    requestMove: (coords: CubeCoordinates) => void; // Request backend to make a move
    requestUndo: () => void; // Request backend to undo last move
    requestRedo: () => void; // (Not implemented in backend API doc)
    requestRestart: () => void; // Request backend to restart game
    requestAiMove: () => void; // Request backend for AI move (mainly for AI vs AI?)
    // requestNewGame: (mode: 'HUMAN_AI' | 'AI_AI') => void; // Handled by component logic now
    resetLocalState: () => void; // Reset store to initial state (except sendMessage)
}

// --- Store Definition ---
const initialState: GameState = {
    gameId: null,
    boardState: initializeBoardState(BOARD_SIZE),
    playerTurn: 1, // Default to Player 1 starting? Backend state will override.
    humanPlayerColor: null,
    moves: 0,
    highlightedHexes: [],
    winner: null,
    isDraw: false,
    winProbability: null,
    mode: null,
    connectionState: WebSocketState.CLOSED,
    lastBackendError: null,
    // Placeholder sendMessage function, will be replaced by the hook
    sendMessage: (payload) => {
        console.warn("sendMessage called before WebSocket was ready.", payload);
    },
};

export const useGameStore = create<GameState & GameStoreActions>((set, get) => ({
    ...initialState,

    // --- Actions ---

    setGameId: (gameId) => set({ gameId }),

    setConnectionState: (state) => set({ connectionState: state }),

    setLastError: (error) => set({ lastBackendError: error }),

    highlightLastMove: (coords) => set({ highlightedHexes: coords ? [coords] : [] }),

    // Called by the useGameWebSocket hook once the connection is open
    setSendMessage: (sender) => set({ sendMessage: sender }),

    /**
     * Processes game state updates received from the backend via WebSocket.
     * @param backendData - The 'data' object from the backend message (type 'game_state' or 'game_update').
     */
    handleGameStateUpdate: (backendData) => {
        console.log("Store: Handling backend game state update:", backendData);

        // Basic validation of received data structure based on backend_api_doc.pdf
        if (!backendData || !backendData.board || backendData.player_turn === undefined || !backendData.moves_history) {
            console.error("Store Error: Received incomplete game state data (missing board, player_turn, or moves_history):", backendData);
            set({ lastBackendError: "Received incomplete game state from server." });
            return;
        }

        try {
            const newBoardState = mapBackendBoard(backendData.board);
            const currentPlayer = mapBackendPlayerToFrontend(backendData.player_turn);
            const winnerPlayer = mapBackendPlayerToFrontend(backendData.winner); // Handles 'human', 'AI', null
            const isDraw = backendData.winner === 'draw'; // Check specifically for draw

            // Determine the last move coordinates from moves_history to highlight
            let lastMoveCoords: CubeCoordinates | null = null;
            if (Array.isArray(backendData.moves_history) && backendData.moves_history.length > 0) {
                const lastAction = backendData.moves_history[backendData.moves_history.length - 1];
                // Check if last action has x and y (as per PDF structure)
                if (lastAction && lastAction.x !== undefined && lastAction.y !== undefined) {
                    // Convert backend x,y to frontend CubeCoordinates using the store's board size
                    lastMoveCoords = xyToCube(lastAction.x, lastAction.y, BOARD_SIZE);
                    if (!lastMoveCoords) {
                        console.warn(`Store: Could not convert backend last move x=${lastAction.x}, y=${lastAction.y} to CubeCoordinates.`);
                    } else {
                         console.log(`Store: Highlighting last move at Cube (${lastMoveCoords.q}, ${lastMoveCoords.r}) from backend XY (${lastAction.x}, ${lastAction.y})`);
                    }
                }
            }

            // Update the store state
            set({
                boardState: newBoardState,
                playerTurn: currentPlayer,
                winner: winnerPlayer, // Store 1, 2, or null
                isDraw: isDraw, // Store draw state
                // Use moves_history length for move count, fallback to existing if history is missing/empty
                moves: Array.isArray(backendData.moves_history) ? backendData.moves_history.length : get().moves,
                mode: backendData.mode ?? get().mode, // Update mode if provided
                humanPlayerColor: backendData.human_color ?? get().humanPlayerColor, // Update human color if provided
                winProbability: backendData.win_probability ?? null, // Update win probability
                highlightedHexes: lastMoveCoords ? [lastMoveCoords] : [], // Highlight based on history
                lastBackendError: null, // Clear previous errors on successful update
                gameId: backendData.id ?? get().gameId, // Update gameId if present in message (e.g., initial game_state)
            });
             console.log("Store: State updated successfully.");

        } catch (error) {
             console.error("Store Error: Failed to process backend game state update:", error, "Data:", backendData);
             set({ lastBackendError: "Failed to process game state from server." });
        }
    },

    /**
     * Resets the store state to its initial values, preserving the sendMessage function.
     */
    resetLocalState: () => {
        console.log("Store: Resetting local state.");
        const currentSendMessage = get().sendMessage; // Preserve the sender function
        set({ ...initialState, sendMessage: currentSendMessage });
    },

    // --- Actions to trigger WS messages ---

    /**
     * Sends a 'move' action to the backend.
     * @param coords - The CubeCoordinates of the hex the player clicked.
     */
    requestMove: (coords) => {
        const { sendMessage, connectionState, winner, isDraw, boardState } = get();

        // Check if the move is allowed
        if (connectionState !== WebSocketState.OPEN) {
            console.warn("Store: Cannot send move - WebSocket not open.");
            return;
        }
        if (winner !== null || isDraw) {
            console.log("Store: Cannot send move - Game already over.");
            // Optionally set an error message for the UI
            // set({ lastBackendError: "Game is already over." });
            return;
        }
        // Check if the clicked hex is empty
        const hexKey = cubeToKey(coords);
        const currentHexState = boardState.get(hexKey);
        if (currentHexState !== 0) {
             console.log(`Store: Cannot send move - Hex (${coords.q}, ${coords.r}) is not empty (State: ${currentHexState}).`);
             // Optionally provide UI feedback
             // set({ lastBackendError: "You can only place a piece on an empty hex." });
             return;
        }
        // TODO: Add check for player's turn if needed (frontend validation)
        // const { playerTurn, humanPlayerColor, mode } = get();
        // if (mode === 'HUMAN_AI') {
        //    const humanPlayerNumber = humanPlayerColor === 'red' ? 1 : 2;
        //    if (playerTurn !== humanPlayerNumber) {
        //        console.log("Store: Cannot send move - Not your turn.");
        //        return;
        //    }
        // }


        // Convert frontend CubeCoordinates to backend XY format
        const xy = cubeToXY(coords, BOARD_SIZE);

        if (xy) {
            // Format the payload according to backend_api_doc.pdf
            const payload = {
                action: 'move',
                x: xy.x, // Corresponds to frontend 'r' based on cubeToXY
                y: xy.y  // Corresponds to frontend 'q' based on cubeToXY
            };
            console.log("Store: Sending 'move' action with payload:", payload);
            sendMessage(payload);
            // Clear any previous errors after attempting a valid move
            set({ lastBackendError: null });
        } else {
            console.error(`Store Error: Invalid coordinates for move - Cube: q=${coords.q}, r=${coords.r}, s=${coords.s}. Could not convert to XY.`);
            // Optionally set an error for the UI
            set({ lastBackendError: "Invalid move coordinates selected." });
        }
    },

    /**
     * Sends an 'undo' action to the backend.
     */
    requestUndo: () => {
        const { sendMessage, connectionState, winner, isDraw } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send undo - WebSocket not open.");
             return;
        }
        if (winner !== null || isDraw) {
             console.log("Store: Cannot send undo - Game already over.");
             return; // Cannot undo if game is over
        }
        const payload = { action: 'undo' };
        console.log("Store: Sending 'undo' action.");
        sendMessage(payload);
    },

    /**
     * Placeholder for 'redo' action (not in backend API doc).
     */
    requestRedo: () => {
        console.warn("Store: Redo action not implemented/supported by backend API.");
        // const { sendMessage, connectionState } = get();
        // if (connectionState !== WebSocketState.OPEN) return;
        // const payload = { action: 'redo' }; // Hypothetical
        // sendMessage(payload);
    },

    /**
     * Sends a 'restart' action to the backend.
     */
    requestRestart: () => {
        const { sendMessage, connectionState } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send restart - WebSocket not open.");
             return;
        }
        const payload = { action: 'restart' };
        console.log("Store: Sending 'restart' action.");
        sendMessage(payload);
    },

    /**
     * Sends an 'ai_move' action to the backend.
     * Primarily intended for AI vs AI mode or potentially specific scenarios in Human vs AI.
     */
    requestAiMove: () => {
        const { sendMessage, connectionState, winner, isDraw } = get();
        if (connectionState !== WebSocketState.OPEN) {
             console.warn("Store: Cannot send ai_move - WebSocket not open.");
             return;
        }
        if (winner !== null || isDraw) {
             console.log("Store: Cannot send ai_move - Game already over.");
             return;
        }
        const payload = { action: 'ai_move' };
        console.log("Store: Sending 'ai_move' action.");
        sendMessage(payload);
    },

    // requestNewGame is removed as the logic is now handled in NewGameOptions component
}));

```


---


### <a name="srctypeshexpropsts"></a>types/hexProps.ts


```ts
/**
 * Type definitions for Hex game properties.
 */

/**
 * Represents Hex coordinates using the Cube coordinate system (q, r, s).
 * Ensures that q + r + s = 0.
 */
export interface CubeCoordinates {
  q: number;
  r: number;
  s: number;
}

/**
 * Defines the color scheme for the game board and players.
 * Colors can be hex codes, Tailwind class names, or CSS color keywords.
 */
export interface PlayerColors {
  p1: string;       // Color for Player 1
  p2: string;       // Color for Player 2
  empty: string;    // Color for empty hex tiles
  background: string; // Background color for the SVG canvas
}

/**
 * Props for the HexBoard component.
 */
export interface HexBoardProps {
  /**
   * 2D array representing the state of each hex tile on the board.
   * The mapping from array indices (row, col) to CubeCoordinates needs
   * to be handled internally or during generation.
   * Values typically: 0 (empty), 1 (Player 1), 2 (Player 2).
   *
   * NOTE: For an 11x11 grid, this might be simplified later to directly use
   * a Map or object keyed by stringified CubeCoordinates for easier lookup.
   * For now, we assume a mapping function exists or the boardState
   * is pre-processed to be easily accessible by CubeCoordinates.
   */
  boardState: Map<string, 0 | 1 | 2>; // Using a Map keyed by "q,r,s" string

  /** Color definitions for players and board elements. */
  playerColors: PlayerColors;

  /** Callback function invoked when a hexagon is clicked. */
  onHexClick: (coords: CubeCoordinates) => void;

  /** Optional array of hex coordinates to visually highlight (e.g., last move). */
  highlightedHexes?: CubeCoordinates[];

  /** Optional CSS class name for additional styling of the SVG container. */
  className?: string;

  /** The size of the hex board (e.g., 11 for an 11x11 grid). */
  boardSize: number;
}

/**
 * Props for the GameInfo component.
 */
export interface GameInfoProps {
  /** Static metadata about the current game. */
  gameMetadata: {
    size: number;       // e.g., 11
    created?: string;   // Optional: Date/time game started
    moves?: number;     // Optional: Total moves made
    // Add other relevant static info as needed
  };
  /** Optional CSS class name for additional styling. */
  className?: string;
}

/**
 * Props for the GameplayControls component.
 */
export interface GameplayControlsProps {
  /** The player whose turn it currently is (1 or 2). */
  playerTurn: number;

  /** The winner of the game (1 or 2), or null if ongoing. */
  winner: number | null;

  /** Callback function for the 'New Game' button. */
  onNewGameClick: () => void;

  /** Optional callback function for an 'Undo' action. */
  onUndoClick?: () => void;

  /** Optional callback function for a 'Resign' action. */
  onResignClick?: () => void;

  /** Flag to enable/disable controls (e.g., during AI thinking or game over). */
  isInteractionAllowed: boolean;

  /** Optional CSS class name for additional styling. */
  className?: string;
}


```

