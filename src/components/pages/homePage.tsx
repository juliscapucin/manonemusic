"use client"

import { useRef } from "react"

import { Copyright } from "@/components"
import { PageWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type HomeData = {
	title: string
	text: string
}

export default function HomePage({ data }: { data: HomeData }) {
	const titleHomeRef = useRef(null)

	useTitleScrollTrigger(titleHomeRef)

	return (
		<PageWrapper>
			<Title ref={titleHomeRef}>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
			<Copyright />
		</PageWrapper>
	)
}
