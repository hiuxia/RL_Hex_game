import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Players
				player1: "#E53E3E", // Red-500/600 equivalent
				player2: "#3182CE", // Blue-500/600 equivalent
				// Board
				"hex-empty": "#A0AEC0", // Gray-500 equivalent
				"hex-hover": "rgba(255, 255, 255, 0.2)", // Semi-transparent white overlay
				"board-bg": "#1A202C", // Gray-900 equivalent
				// UI Panels & General
				"panel-bg": "#2D3748", // Gray-800 equivalent
				"panel-bg-light": "#4A5568", // Gray-700 equivalent (e.g., button backgrounds)
				background: "#1A202C", // Gray-900 equivalent (Page background)
				"text-primary": "#E2E8F0", // Gray-200 equivalent
				"text-secondary": "#A0AEC0", // Gray-500 equivalent
				"border-subtle": "#4A5568", // Gray-700 equivalent
				// Accents & Interactions
				accent: "#3182CE", // Blue-500 (e.g., focused elements, links)
				"interactive-hover-bg": "#4A5568", // Gray-700 (Button hover)
				danger: "#E53E3E", // Red-500 (e.g., Resign button)
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;
