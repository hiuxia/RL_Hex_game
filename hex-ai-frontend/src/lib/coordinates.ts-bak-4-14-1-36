import { CubeCoordinates } from '../types/hexProps';
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
