"use client"

import { useLayoutEffect, useRef, useTransition } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"

import { PlayerTrackList } from "@/components"
import { Logo, PageWrapper, TitleHeadline } from "@/components/ui"
import { Button } from "@/components/buttons"
import { ReleasesPage } from "@/components/pages"
import { PortfolioItem, PortfolioPage, Release } from "@/types"
import { transitionOnClickBack } from "@/lib/animations"
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
	const router = useRouter()
	const containerReleaseRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div
			ref={containerReleaseRef}
			className='relative w-screen h-screen overflow-clip'
		>
			{/* releases Page copy for seamless page transition */}
			{releasesPageData && (
				<div className='gsap-projects-page absolute top-0 left-8 pb-8'>
					<ReleasesPage
						releasesPageData={releasesPageData}
						releases={releasesData}
						titleScrollTrigger={false}
					/>
				</div>
			)}
			{/* release Page */}
			<div className='gsap-project-page h-screen p-8 pt-32 opacity-0'>
				<PageWrapper>
					{/* Back Button */}
					<Button
						classes='absolute'
						action={() => transitionOnClickBack(ctx, () => router.back())}
					>
						Back to releases
					</Button>
					<TitleHeadline classes='gsap-projects-title mt-6 gsap-project-content'>
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
							<div className='w-1/3 min-w-[300px] space-y-8 opacity-0'></div>
						</div>
						<PlayerTrackList tracks={releasePageData.tracklist} />
					</div>
				</PageWrapper>
			</div>
		</div>
	)
}
