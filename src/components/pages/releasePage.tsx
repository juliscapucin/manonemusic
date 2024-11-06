"use client"

import { useRef } from "react"
import Image from "next/image"

import gsap from "gsap"

import {
	PlayerTrackList,
	ProjectInfo,
	ProjectPageContent,
	ProjectPageImage,
	ProjectsMenu,
	ProjectsMenuPage,
} from "@/components"
import { PageWrapper, TitleHeadline } from "@/components/ui"
import { ButtonBack } from "@/components/buttons"
import { ReleasesPage } from "@/components/pages"
import { PortfolioItem, PortfolioPage, Release } from "@/types"
import { useTransitionOnEnter } from "@/hooks"

type releasePageProps = {
	releasePageData: Release
	releasesData: PortfolioItem[]
	releasesPageData: PortfolioPage
}

export default function ReleasePage({
	releasePageData,
	releasesData,
	releasesPageData,
}: releasePageProps) {
	const containerReleaseRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div
			ref={containerReleaseRef}
			className='relative w-screen h-screen overflow-clip'
		>
			<PageWrapper hasMenu={true}>
				<ProjectsMenuPage
					projectsData={releasesData}
					pageData={releasesPageData}
				/>
				<div className='gsap-project-page opacity-0'>
					<ButtonBack ctx={ctx} slug={releasesPageData.slug} />
					<TitleHeadline>{releasePageData.title}</TitleHeadline>
					<ProjectInfo
						projectInfo={{
							releaseDate: releasePageData.releaseDate,
							info: releasePageData.releaseInfo,
						}}
					/>
					<ProjectPageContent
						img={{
							imgUrl: releasePageData.image.imageUrl,
							imgAlt: `${releasePageData.title} album cover`,
						}}
						tracklist={releasePageData.tracklist}
					/>
				</div>
			</PageWrapper>
		</div>
	)
}
