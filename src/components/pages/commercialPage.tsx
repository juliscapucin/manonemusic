"use client"

import { useLayoutEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import Flip from "gsap/Flip"

import { Logo, PageWrapper, TitleHeadline } from "@/components/ui"
import { Button } from "@/components/buttons"
import { CommercialsPage } from "@/components/pages"
import { Commercial, PortfolioItem, PortfolioPage } from "@/types"

type commercialPageProps = {
	commercialPageData: Commercial
	commercialsData: PortfolioItem[]
	commercialsPageData: PortfolioPage
}

export default function CommercialPage({
	commercialPageData,
	commercialsData,
	commercialsPageData,
}: commercialPageProps) {
	const router = useRouter()
	const containerRef = useRef<HTMLDivElement>(null)
	const commercialPageRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})
	let stateCard: Flip.FlipState

	// TODO refactor to avoid repetition
	const transitionOnClickBack = (slug: string) => {
		gsap.registerPlugin(Flip)

		ctx.add(() => {
			gsap.set(".gsap-commercials-title", { opacity: 0 })
			gsap.to(".gsap-commercials-page", { xPercent: 0, duration: 0.3 })
			gsap.set(".gsap-commercial-image", { opacity: 0 })

			gsap.to(".gsap-commercial-content", {
				opacity: 0,
				duration: 0.3,
				onComplete: () => {
					router.push(slug)
				},
			})

			// TODO - delete if unused
			// Flip.fit(".gsap-flip-commercial-card", stateCard, {
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

	// TODO refactor to avoid repetition
	// TODO implement a way to avoid this animation on page reload
	// Transition on enter
	useLayoutEffect(() => {
		gsap.registerPlugin(Flip)

		const container = containerRef.current

		if (!container) return

		ctx.add(() => {
			gsap.set(".gsap-commercial-content", { opacity: 0 })
			gsap.set(".gsap-commercial-image", { opacity: 0 })

			const state = Flip.getState(".gsap-flip-commercial-image")

			gsap.to(".gsap-commercials-page", {
				xPercent: () => {
					return -60 // margin-left 'left-[60%]' applied to commercialsMenu
				},
				duration: 0.3,
				onComplete: () => {
					// Position the commercial card image on the page
					Flip.fit(".gsap-flip-project-card", state, {
						scale: true,
						absolute: true,
						duration: 0.3,
						ease: "power4.out",
						onComplete: () => {
							gsap.to(".gsap-commercial-image", {
								opacity: 1,
								duration: 0.3,
								ease: "power4.inOut",
							})
							gsap.to(".gsap-commercial-content", {
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
			{/* commercials Page copy for seamless page transition */}
			{commercialsPageData && (
				<div className='gsap-commercials-page absolute top-0 left-8 pb-8'>
					<CommercialsPage
						data={commercialsPageData}
						titleScrollTrigger={false}
					/>
				</div>
			)}
			{/* commercial Page */}
			<div
				ref={commercialPageRef}
				className='gsap-commercial-page w-3/4 h-screen p-8 pt-32 ml-auto'
			>
				{/* Back Button */}
				<Button
					classes='absolute'
					action={() => transitionOnClickBack("/commercials")}
				>
					Back to commercials
				</Button>
				<TitleHeadline classes='mt-6'>{commercialPageData.title}</TitleHeadline>
				<div className='relative w-full flex gap-8'>
					<div className='gsap-commercial-page flex flex-wrap gap-16'>
						<div className='gsap-flip-commercial-image relative w-1/4 min-w-[300px] aspect-square overflow-clip'>
							<Image
								{...{
									src: commercialPageData.image.imageUrl,
									alt: `${commercialPageData.title} album cover`,
									fill: true,
									className: "gsap-commercial-image object-cover",
									sizes: "50vw",
								}}
							/>
						</div>
						<div className='gsap-commercial-content w-1/3 min-w-[300px] space-y-8'>
							{commercialPageData.description}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
