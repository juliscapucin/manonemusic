"use client"

import { useRef } from "react"

import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ReleasesMenu } from "@/components"
import { Album } from "@/types"

type CommercialsPageProps = {
	data: {
		page: { title: string; text: string }
		albums: Album[]
	}
	titleScrollTrigger?: boolean
}

export default function CommercialsPage({
	data,
	titleScrollTrigger,
}: CommercialsPageProps) {
	const titleCommercialsRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(
		titleCommercialsRef,
		"/commercials",
		windowAspectRatio,
		titleScrollTrigger
	)

	return (
		<PageWrapper classes={"flex"}>
			<div>
				<TitleDisplay
					classes='gsap-commercials-title'
					ref={titleCommercialsRef}
				>
					{data.page.title}
				</TitleDisplay>
				<p className='max-w-prose'>{data.page.text}</p>
			</div>
			<ReleasesMenu albums={data.albums} />
		</PageWrapper>
	)
}
