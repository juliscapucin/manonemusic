"use client"

import { useWindowDimensions } from "@/hooks"
import { PanelDesktop, PanelMobile } from "@/components"

import { AllData } from "@/types"

type PanelsProps = {
	data: AllData
}

export default function Panels({ data }: PanelsProps) {
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
