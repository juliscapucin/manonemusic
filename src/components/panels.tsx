"use client"

import { useWindowDimensions } from "@/hooks"
import { PanelDesktop, PanelMobile } from "@/components"

import { AllData } from "@/types"

export default function Panels({ data }: { data: AllData }) {
	const { width, height } = useWindowDimensions()
	return (
		<>
			{width > height ? (
				<PanelDesktop data={data} />
			) : (
				<PanelMobile data={data} />
			)}
		</>
	)
}
