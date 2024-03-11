"use client"

import { useRef } from "react"

import { PageWrapperDesktop, PageWrapperMobile, Title } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ReleasesMenu } from ".."
import { Album } from "@/types"

type ReleasesData = {
	title: string
	text: string
}

type ReleasesPageProps = {
	data: ReleasesData
	albums: Album[]
}

export default function ReleasesPage({ data, albums }: ReleasesPageProps) {
	const titleReleasesRef = useRef(null)
	const { width, height } = useWindowDimensions()

	useTitleScrollTrigger(titleReleasesRef, "/releases")

	const isLandscape = width > height
	const PageWrapper = isLandscape ? PageWrapperDesktop : PageWrapperMobile

	return (
		<PageWrapper>
			<Title ref={isLandscape ? titleReleasesRef : null}>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
			<ReleasesMenu albums={albums} />
		</PageWrapper>
	)
}
