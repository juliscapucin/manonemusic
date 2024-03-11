"use client"

import { useRef } from "react"

import { PageWrapperDesktop, PageWrapperMobile, Title } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ReleasesMenu } from ".."
import { Album } from "@/types"

type ReleasesPageProps = {
	data: { page: { title: string; text: string }; albums: Album[] }
}

export default function ReleasesPage({ data }: ReleasesPageProps) {
	const titleReleasesRef = useRef(null)
	const { width, height } = useWindowDimensions()

	useTitleScrollTrigger(titleReleasesRef, "/releases")

	const isLandscape = width > height
	const PageWrapper = isLandscape ? PageWrapperDesktop : PageWrapperMobile

	return (
		<PageWrapper>
			<Title ref={isLandscape ? titleReleasesRef : null}>
				{data.page.title}
			</Title>
			<p className='max-w-prose'>{data.page.text}</p>
			<ReleasesMenu albums={data.albums} />
		</PageWrapper>
	)
}
