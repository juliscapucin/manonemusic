import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

import { RootLayout } from "@/components"

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
	title: "ManOne Music & Sound Design",
	description:
		"We create tailored sound design and audio identities that captures the spirit of your brand and resonate with your audience. Let's elevate your identity through sound.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<RootLayout>
			<body
				className={`${font.className} relative w-screen lg:h-screen custom-min-h-screen overflow-x-clip`}
			>
				{children}
			</body>
		</RootLayout>
	)
}
