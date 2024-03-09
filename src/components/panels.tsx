"use client"

import { useWindowDimensions } from "@/hooks"
import { HorizontalPanel, VerticalPanel } from "@/components"

import { AllData } from "@/types"

export default function Panels({ data }: { data: AllData }) {
	const { width, height } = useWindowDimensions()
	return (
		<>
			{width > height ? (
				<HorizontalPanel data={data} />
			) : (
				<VerticalPanel data={data} />
			)}
		</>
	)
}
