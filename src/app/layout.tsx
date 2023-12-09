import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Header, RootLayout } from "@/components"

// Load custom font //
const font = localFont({
	variable: "--font-primary",
	src: [
		{
			path: "../../public/fonts/PPSupplySans-Regular.otf",
			weight: "400",
		},
		{
			path: "../../public/fonts/PPSupplySans-Ultralight.otf",
			weight: "200",
		},
	],
})

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<RootLayout>
			<body
				className={`${font.className} max-width-wrapper min-h-full h-full bg-colorFaded`}
			>
				<Header />
				{children}
			</body>
		</RootLayout>
	)
}
