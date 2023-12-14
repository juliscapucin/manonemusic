"use client"

import { useRef } from "react"

import { PageWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type ReleasesData = {
	title: string
	text: string
}

export default function ReleasesPage({ data }: { data: ReleasesData }) {
	const titleReleasesRef = useRef(null)

	useTitleScrollTrigger(titleReleasesRef)

	return (
		<PageWrapper>
			<Title ref={titleReleasesRef}>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
		</PageWrapper>
	)
}
