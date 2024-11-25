import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			colorBlack: "rgb(var(--color-black) / <alpha-value>)",
			colorWhite: "rgb(var(--color-white) / <alpha-value>)",
			primary: "rgb(var(--color-primary) / <alpha-value>)",
			secondary: "rgb(var(--color-secondary) / <alpha-value>)",
			"faded-5": "rgba(var(--color-secondary-rgb), 0.05)",
			"faded-10": "rgba(var(--color-secondary-rgb), 0.1)",
			"faded-30": "rgba(var(--color-secondary-rgb), 0.3)",
			"faded-70": "rgba(var(--color-secondary-rgb), 0.7)",
		},
		fontSize: {
			displayLarge: "147px",
			displayMedium: "103px",
			displaySmall: "72px",
			headlineLarge: "51px",
			headlineMedium: "40px",
			headlineSmall: "32px",
			titleLarge: "22px",
			titleMedium: "20px",
			titleSmall: "18px",
			bodyLarge: "18px",
			bodyMedium: "16px",
			bodySmall: "14px",
			labelLarge: "14px",
			labelMedium: "12px",
			labelSmall: "10px",
		},
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
				header: "1000",
				burger: "2000",
				mobile: "2500",
			},
			letterSpacing: { tightest: "-.075em" },
			lineHeight: { tightest: "0.1" },
			scale: {
				"20": "0.2",
			},
			rotate: {
				"270": "270deg",
			},
		},
	},
	plugins: [],
}
export default config
