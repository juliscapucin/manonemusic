"use client"

import { useRef } from "react"

import { Copyright } from "@/components"
import { PageWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type AboutData = {
	title: string
	text: string
}

export default function AboutPage({ data }: { data: AboutData }) {
	const titleAboutRef = useRef(null)

	useTitleScrollTrigger(titleAboutRef)

	return (
		<PageWrapper>
			<Title ref={titleAboutRef}>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
			<Copyright />
		</PageWrapper>
	)
}
