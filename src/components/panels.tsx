"use client"

import { PanelDesktop, PanelMobile } from "@/components"
import { Footer, Header } from "@/components/ui"

import { useWindowDimensions } from "@/hooks"

import { AllData } from "@/types"

export default function Panels({ data }: { data: AllData }) {
	const headerNavLinks = [
		{ title: "Home", slug: "/", order: 0 },
		...data.headerNavLinks,
	]

	const { windowAspectRatio } = useWindowDimensions()

	return (
		<>
			<Header navLinks={headerNavLinks} />
			<PanelDesktop data={data} sections={headerNavLinks} />
			<Footer navLinks={headerNavLinks} />
		</>
	)

	// return windowAspectRatio === "landscape" ? (
	// 	<PanelDesktop data={data} />
	// ) : (
	// 	<PanelMobile data={data} />
	// )
}
