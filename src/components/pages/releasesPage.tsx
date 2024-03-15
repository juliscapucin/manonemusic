"use client"

import { useRef } from "react"

import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ReleasesMenu } from "@/components"
import { Album } from "@/types"

type ReleasesPageProps = {
	data: {
		page: { title: string; text: string }
		albums: Album[]
	}
	titleScrollTrigger?: boolean
}

export default function ReleasesPage({
	data,
	titleScrollTrigger,
}: ReleasesPageProps) {
	const titleReleasesRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(
		titleReleasesRef,
		"/releases",
		windowAspectRatio,
		titleScrollTrigger
	)

	return (
		<PageWrapper classes={"flex"}>
			<div>
				<TitleDisplay classes='gsap-releases-title' ref={titleReleasesRef}>
					{data.page.title}
				</TitleDisplay>
				<p className='mt-16 max-w-sm lg:max-w-lg'>{data.page.text}</p>
			</div>
			<ReleasesMenu albums={data.albums} />
		</PageWrapper>
	)
}
