"use client"

import { useRef } from "react"
import Image from "next/image"

import gsap from "gsap"

import { PlayerTrackList, ProjectsMenu, ProjectsMenuPage } from "@/components"
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
					<TitleHeadline classes='gsap-projects-title mt-4 gsap-project-content'>
						{releasePageData.title}
					</TitleHeadline>
					<div className='relative w-full flex gap-8'>
						<div className='gsap-project-page flex flex-wrap gap-16'>
							<div className='gsap-project-image relative w-1/4 min-w-[300px] aspect-square overflow-clip opacity-0'>
								<Image
									{...{
										src: releasePageData.image.imageUrl,
										alt: `${releasePageData.title} album cover`,
										fill: true,
										className: "gsap-release-image object-cover",
										sizes: "50vw",
									}}
								/>
							</div>
						</div>
						<PlayerTrackList tracks={releasePageData.tracklist} />
					</div>
				</div>
			</PageWrapper>
		</div>
	)
}
