import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

import { NavBar, RootLayout } from "@/components"
import { getHeaderNavLinks } from "@/sanity/sanity-queries"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

// Load custom font //
const font = localFont({
	variable: "--font-primary",
	src: [
		{
			path: "../../../public/fonts/PPSupplyMono-Regular.otf",
			weight: "400",
		},
		{
			path: "../../../public/fonts/PPSupplyMono-Ultralight.otf",
			weight: "200",
		},
	],
})

export const metadata: Metadata = {
	title: "ManOne Music & Sound Design",
	description:
		"We create tailored sound design and audio identities that captures the spirit of your brand and resonate with your audience. Let's elevate your identity through sound.",
}

export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	const navLinks = await getHeaderNavLinks()
	return (
		<RootLayout>
			<body
				className={`${font.className} relative w-screen max-w-desktop md:h-screen custom-min-h-screen overflow-x-clip`}
			>
				<NavBar navLinks={navLinks} />
				{children}
			</body>
		</RootLayout>
	)
}
