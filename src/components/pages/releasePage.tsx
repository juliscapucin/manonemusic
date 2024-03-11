"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import Flip from "gsap/Flip"

import { Logo, PageWrapper, Title } from "@/components/ui"
import { Album } from "@/types"
import { Button } from "@/components/buttons"
import { ReleasesPage } from "@/components/pages"
import { useLayoutEffect, useRef } from "react"

type releasePageProps = {
	releaseData: Album
	releasesData: Album[]
	releasesPageData: { title: string; text: string }
}

export default function ReleasePage({
	releaseData,
	releasesData,
	releasesPageData,
}: releasePageProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const containerRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})
	let stateCard: Flip.FlipState

	const transitionOnClickBack = (slug: string) => {
		gsap.registerPlugin(Flip)

		ctx.add(() => {
			gsap.set(".gsap-releases-page", { display: "block" })
			gsap.set(".gsap-releases-title", { opacity: 0 })
			gsap.to(".gsap-releases-page", { opacity: 1, duration: 0.3 })
			gsap.set(".gsap-release-image", { opacity: 0 })

			gsap.to(".gsap-release-content", { opacity: 0, duration: 0.3 })

			Flip.fit(".gsap-flip-release-card", stateCard, {
				scale: true,
				absolute: true,
				duration: 0.6,
				ease: "power4.out",
				onComplete: () => {
					router.push(slug)
				},
			})
		})
	}

	// Transition on enter
	useLayoutEffect(() => {
		gsap.registerPlugin(Flip)

		const container = containerRef.current

		if (!container) return

		ctx.add(() => {
			const state = Flip.getState(".gsap-flip-release-image")
			stateCard = Flip.getState(".gsap-flip-release-card")

			// Position the release card image on the page
			Flip.fit(".gsap-flip-release-card", state, {
				scale: true,
				absolute: true,
				duration: 0.3,
				ease: "power4.out",
				onComplete: () => {
					gsap.set(".gsap-release-image", { opacity: 1 })
					gsap.to(".gsap-release-content", {
						opacity: 1,
						duration: 0.6,
						delay: 0.2,
						stagger: 0.3,
					})
					gsap.to(".gsap-releases-page", {
						opacity: 0,
						duration: 0.3,
						onComplete: () => {
							gsap.set(".gsap-releases-page", { display: "none" })
						},
					})
				},
			})
		}, [container])

		return () => {
			ctx.revert()
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className='relative w-screen h-screen overflow-clip'
		>
			{/* releases Page copy for seamless page transition */}
			{releasesPageData && (
				<div className='gsap-releases-page absolute top-0 left-8 pb-8'>
					<ReleasesPage
						data={{ page: releasesPageData, albums: releasesData }}
					/>
				</div>
			)}
			{/* release Page */}
			<div className='gsap-release-page w-fit h-screen flex flex-nowrap'>
				<PageWrapper>
					{/* Back Button */}
					<Button
						classes='absolute z-30'
						action={() => transitionOnClickBack("/releases")}
					>
						Back to releases
					</Button>
					<Title classes='gsap-release-content opacity-0'>
						{releaseData.title}
					</Title>
					<div className='gsap-release-page flex flex-wrap gap-16'>
						<div className='gsap-flip-release-image relative w-1/4 min-w-[300px] aspect-square overflow-clip'>
							<Image
								{...{
									src: releaseData.coverImage.url,
									alt: `${releaseData.title} album cover`,
									fill: true,
									className: "gsap-release-image opacity-0 object-cover",
									sizes: "50vw",
								}}
							/>
						</div>
						<div className='gsap-release-content opacity-0 w-1/3 min-w-[300px] space-y-8'></div>
					</div>
				</PageWrapper>
			</div>
		</div>
	)
}
