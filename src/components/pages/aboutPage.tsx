"use client"

import { useRef } from "react"

import { Copyright } from "@/components"
import { PanelWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type AboutData = {
	title: string
	text: string
}

export default function AboutPnel({ data }: { data: AboutData }) {
	const titleAboutRef = useRef(null)

	useTitleScrollTrigger(titleAboutRef, "/about")

	return (
		<PanelWrapper>
			<Title ref={titleAboutRef}>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
			<Copyright />
		</PanelWrapper>
	)
}
