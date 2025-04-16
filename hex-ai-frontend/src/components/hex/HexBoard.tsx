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
