"use client"

import { useLayoutEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import Flip from "gsap/Flip"

import { PlayerTrackList } from "@/components"
import { Logo, PageWrapper, TitleHeadline } from "@/components/ui"
import { Button } from "@/components/buttons"
import { ReleasesPage } from "@/components/pages"
import { PortfolioItem, PortfolioPage, Release } from "@/types"

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
	const containerRef = useRef<HTMLDivElement>(null)
	const releasePageRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})
	let stateCard: Flip.FlipState

	// TODO refactor to avoid repetition
	const transitionOnClickBack = (slug: string) => {
		gsap.registerPlugin(Flip)

		ctx.add(() => {
			gsap.set(".gsap-releases-title", { opacity: 0 })
			gsap.to(".gsap-releases-page", { xPercent: 0, duration: 0.3 })
			gsap.set(".gsap-release-image", { opacity: 0 })

			gsap.to(".gsap-release-content", {
				opacity: 0,
				duration: 0.3,
				onComplete: () => {
					router.push(slug)
				},
			})

			// TODO - delete if unused
			// Flip.fit(".gsap-flip-release-card", stateCard, {
			// 	scale: true,
			// 	absolute: true,
			// 	duration: 0.6,
			// 	ease: "power4.out",
			// 	onComplete: () => {
			// 		router.push(slug)
			// 	},
			// })
		})
	}

	return (
		<div
			ref={containerRef}
			className='relative w-screen h-screen overflow-clip'
		>
			{/* releases Page copy for seamless page transition */}
			{releasesPageData && (
				<div className='gsap-releases-page absolute top-0 left-8 pb-8'>
					<ReleasesPage
						releasesPageData={releasesPageData}
						releases={releasesData}
						titleScrollTrigger={false}
					/>
				</div>
			)}
			{/* release Page */}
			<div
				ref={releasePageRef}
				className='gsap-release-page w-3/4 h-screen p-8 pt-32 ml-auto'
			>
				{/* Back Button */}
				<Button
					classes='absolute'
					action={() => transitionOnClickBack("/releases")}
				>
					Back to releases
				</Button>
				<TitleHeadline classes='mt-6'>{releasePageData.title}</TitleHeadline>
				<div className='relative w-full flex gap-8'>
					<div className='gsap-release-page flex flex-wrap gap-16'>
						<div className='gsap-flip-release-image relative w-1/4 min-w-[300px] aspect-square overflow-clip'>
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
						<div className='gsap-release-content w-1/3 min-w-[300px] space-y-8'></div>
					</div>
					<PlayerTrackList tracks={releasePageData.tracklist} />
				</div>
			</div>
		</div>
	)
}
