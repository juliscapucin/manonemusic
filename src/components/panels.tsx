"use client"

import { PanelDesktop, PanelMobile } from "@/components"
import { Footer, Header, MenuMobile } from "@/components/ui"

import { useWindowDimensions } from "@/hooks"

import { AllData } from "@/types"

export default function Panels({ data }: { data: AllData }) {
	const navLinksWithHome = [
		{ title: "Home", slug: "/", order: 0 },
		...data.headerNavLinks,
	]

	const { windowAspectRatio } = useWindowDimensions()

	return (
		<main>
			{windowAspectRatio && windowAspectRatio === "landscape" ? (
				<>
					<Header navLinks={navLinksWithHome} />
					<PanelDesktop data={data} sections={navLinksWithHome} />
					<Footer navLinks={navLinksWithHome} />
				</>
			) : (
				<>
					<MenuMobile navLinks={navLinksWithHome} />
					<PanelMobile data={data} />
				</>
			)}
		</main>
	)
}
