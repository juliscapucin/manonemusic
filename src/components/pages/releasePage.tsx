"use client"

import { useLayoutEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import Flip from "gsap/Flip"

import { PlayerTrackList } from "@/components"
import { Logo, PageWrapper, TitleHeadline } from "@/components/ui"
import { Button } from "@/components/buttons"
import { ReleasesPage } from "@/components/pages"

import { Album } from "@/types"

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

	// TODO refactor to avoid repetition
	const transitionOnClickBack = (slug: string) => {
		gsap.registerPlugin(Flip)

		ctx.add(() => {
			gsap.set(".gsap-releases-title", { opacity: 0 })
			gsap.to(".gsap-releases-page", { xPercent: 0, duration: 0.3 })
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

	// TODO refactor to avoid repetition
	// TODO implement a way to avoid this animation on page reload
	// Transition on enter
	useLayoutEffect(() => {
		gsap.registerPlugin(Flip)

		const container = containerRef.current

		if (!container) return

		ctx.add(() => {
			gsap.set(".gsap-release-content", { opacity: 0 })
			gsap.set(".gsap-release-image", { opacity: 0 })

			const state = Flip.getState(".gsap-flip-release-image")
			stateCard = Flip.getState(".gsap-flip-release-card")

			gsap.to(".gsap-releases-page", {
				xPercent: () => {
					return -70
				},
				duration: 0.3,
				onComplete: () => {
					// Position the release card image on the page
					Flip.fit(".gsap-flip-release-card", state, {
						scale: true,
						absolute: true,
						duration: 0.3,
						ease: "power4.out",
						onComplete: () => {
							gsap.to(".gsap-release-image", {
								opacity: 1,
								duration: 0.3,
								ease: "power4.inOut",
							})
							gsap.to(".gsap-release-content", {
								opacity: 1,
								duration: 1,
								stagger: 0.1,
								ease: "power4.inOut",
							})
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
						titleScrollTrigger={false}
					/>
				</div>
			)}
			{/* release Page */}
			<div className='gsap-release-page w-3/4 h-screen p-8 pt-32 ml-auto'>
				{/* Back Button */}
				<Button action={() => transitionOnClickBack("/releases")}>
					Back to releases
				</Button>
				<TitleHeadline>{releaseData.title}</TitleHeadline>
				<div className='relative w-full flex gap-8'>
					<div className='gsap-release-page flex flex-wrap gap-16'>
						<div className='gsap-flip-release-image relative w-1/4 min-w-[300px] aspect-square overflow-clip'>
							<Image
								{...{
									src: releaseData.coverImage.url,
									alt: `${releaseData.title} album cover`,
									fill: true,
									className: "gsap-release-image object-cover",
									sizes: "50vw",
								}}
							/>
						</div>
						<div className='gsap-release-content w-1/3 min-w-[300px] space-y-8'></div>
					</div>
					<PlayerTrackList tracks={releaseData.tracksCollection.items} />
				</div>
			</div>
		</div>
	)
}
