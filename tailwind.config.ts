import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				"fade-in": "fadeIn 1s linear forwards",
			},
			maxWidth: {
				desktop: "2000px",
			},
			minHeight: {
				"1/2": "50vh",
			},
			fontFamily: {
				headline: ["var(--font-primary) sans-serif"],
				text: ["var(--font-secondary)"],
			},
			zIndex: {
				5: "5",
				8: "8",
				15: "15",
				100: "100",
			},
			letterSpacing: { tightest: "-.075em" },
			colors: {
				colorBlack: "rgb(var(--color-black) / <alpha-value>)",
				colorWhite: "rgb(var(--color-white) / <alpha-value>)",
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				secondary: "rgb(var(--color-secondary) / <alpha-value>)",
				colorFaded: "rgba(var(--color-secondary-rgb), 0.3)",
			},
			fontSize: {
				displayLarge: "12rem",
				displayMedium: "10.3rem",
				displaySmall: "5.7rem",
				headlineLarge: "3.2rem",
				headlineMedium: "2.8rem",
				headlineSmall: "2.4rem",
				titleLarge: "2rem",
				titleMedium: "1.4rem",
				titleSmall: "1.2rem",
				bodyLarge: "18px",
				bodyMedium: "16px",
				bodySmall: "14px",
				labelLarge: "1.4rem",
				labelMedium: "1.2rem",
				labelSmall: "1.1rem",
			},
		},
	},
	plugins: [],
}
export default config
