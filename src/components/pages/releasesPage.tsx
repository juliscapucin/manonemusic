"use client"

import { useRef } from "react"

import {
	PageWrapperDesktop,
	PageWrapperMobile,
	PageWrapper,
	Title,
} from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ReleasesMenu } from "@/components"
import { Album } from "@/types"

type ReleasesPageProps = {
	data: { page: { title: string; text: string }; albums: Album[] }
}

export default function ReleasesPage({ data }: ReleasesPageProps) {
	const titleReleasesRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	console.log(windowAspectRatio)

	useTitleScrollTrigger(titleReleasesRef, "/releases", windowAspectRatio)

	return (
		<PageWrapper classes={"flex justify-between"}>
			<div>
				<Title classes='gsap-releases-title' ref={titleReleasesRef}>
					{data.page.title}
				</Title>
				<p className='max-w-prose'>{data.page.text}</p>
			</div>
			<ReleasesMenu albums={data.albums} />
		</PageWrapper>
	)
}
