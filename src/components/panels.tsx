"use client"

import { PanelDesktop, PanelMobile } from "@/components"

import { useWindowDimensions } from "@/hooks"

import { AllData } from "@/types"

export default function panels({ data }: { data: AllData }) {
	const { windowAspectRatio } = useWindowDimensions()

	return windowAspectRatio === "landscape" ? (
		<PanelDesktop data={data} />
	) : (
		<PanelMobile data={data} />
	)
}
