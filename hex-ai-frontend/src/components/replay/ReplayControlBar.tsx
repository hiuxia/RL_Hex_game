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
