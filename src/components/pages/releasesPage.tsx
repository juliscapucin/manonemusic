"use client"

import { useRef } from "react"

import { PanelWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type ReleasesData = {
	title: string
	text: string
}

export default function ReleasesPage({ data }: { data: ReleasesData }) {
	const titleReleasesRef = useRef(null)

	useTitleScrollTrigger(titleReleasesRef, "/releases")

	return (
		<PanelWrapper>
			<Title ref={titleReleasesRef}>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
		</PanelWrapper>
	)
}
