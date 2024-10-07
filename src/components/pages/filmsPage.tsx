"use client"

import { useRef } from "react"

import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ReleasesMenu } from "@/components"
import { Album } from "@/types"

type FilmsPageProps = {
	data: {
		page: { title: string; text: string }
		albums: Album[]
	}
	titleScrollTrigger?: boolean
}

export default function FilmsPage({
	data,
	titleScrollTrigger,
}: FilmsPageProps) {
	const titleFilmsRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(
		titleFilmsRef,
		"/Films",
		windowAspectRatio,
		titleScrollTrigger
	)

	return (
		<PageWrapper classes={"flex"}>
			<div>
				<TitleDisplay classes='gsap-films-title' ref={titleFilmsRef}>
					{data.page.title}
				</TitleDisplay>
				<p className='max-w-prose'>{data.page.text}</p>
			</div>
			<ReleasesMenu albums={data.albums} />
		</PageWrapper>
	)
}
