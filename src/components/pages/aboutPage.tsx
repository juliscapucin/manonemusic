"use client"

import { useRef } from "react"

import { Copyright } from "@/components"
import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

type AboutData = {
	title: string
	text: string
}

export default function AboutPnel({ data }: { data: AboutData }) {
	const titleAboutRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleAboutRef, "/about", windowAspectRatio)

	return (
		<PageWrapper>
			<TitleDisplay ref={titleAboutRef}>{data.title}</TitleDisplay>
			<p className='max-w-prose'>{data.text}</p>
			<Copyright />
		</PageWrapper>
	)
}
