"use client"

import { useWindowDimensions } from "@/hooks"
import { PanelDesktop, PanelMobile } from "@/components"

import { AllData } from "@/types"

type PanelsProps = {
	data: AllData
	index: number
}

export default function Panels({ data, index }: PanelsProps) {
	const { width, height } = useWindowDimensions()

	return (
		<>
			{width > height ? (
				<PanelDesktop data={data} index={index} />
			) : (
				<PanelMobile data={data} />
			)}
		</>
	)
}
