"use client"

import { useRef } from "react"

import { PageWrapper, Title } from "@/components/ui"

type ReleasesData = {
	title: string
	text: string
}

export default function ReleasesPage({ data }: { data: ReleasesData }) {
	const titleRef = useRef(null)

	return (
		<PageWrapper>
			<Title ref={titleRef}>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
		</PageWrapper>
	)
}
