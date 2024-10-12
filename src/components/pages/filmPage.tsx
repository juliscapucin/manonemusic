"use client"

import { useLayoutEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import Flip from "gsap/Flip"

import { Logo, PageWrapper, TitleHeadline } from "@/components/ui"
import { Button } from "@/components/buttons"
import { FilmsPage } from "@/components/pages"
import { Film, PortfolioItem, PortfolioPage } from "@/types"

type filmPageProps = {
	filmPageData: Film
	filmsData: PortfolioItem[]
	filmsPageData: PortfolioPage
}

export default function FilmPage({
	filmPageData,
	filmsData,
	filmsPageData,
}: filmPageProps) {
	const router = useRouter()
	const containerRef = useRef<HTMLDivElement>(null)
	const filmPageRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})
	let stateCard: Flip.FlipState

	// TODO refactor to avoid repetition
	const transitionOnClickBack = (slug: string) => {
		gsap.registerPlugin(Flip)

		ctx.add(() => {
			gsap.set(".gsap-films-title", { opacity: 0 })
			gsap.to(".gsap-films-page", { xPercent: 0, duration: 0.3 })
			gsap.set(".gsap-film-image", { opacity: 0 })

			gsap.to(".gsap-film-content", {
				opacity: 0,
				duration: 0.3,
				onComplete: () => {
					router.push(slug)
				},
			})

			// TODO - delete if unused
			// Flip.fit(".gsap-flip-film-card", stateCard, {
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
			gsap.set(".gsap-film-content", { opacity: 0 })
			gsap.set(".gsap-film-image", { opacity: 0 })

			const state = Flip.getState(".gsap-flip-film-image")

			gsap.to(".gsap-films-page", {
				xPercent: () => {
					return -60 // margin-left 'left-[60%]' applied to filmsMenu
				},
				duration: 0.3,
				onComplete: () => {
					// Position the film card image on the page
					Flip.fit(".gsap-flip-project-card", state, {
						scale: true,
						absolute: true,
						duration: 0.3,
						ease: "power4.out",
						onComplete: () => {
							gsap.to(".gsap-film-image", {
								opacity: 1,
								duration: 0.3,
								ease: "power4.inOut",
							})
							gsap.to(".gsap-film-content", {
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
			{/* films Page copy for seamless page transition */}
			{filmsPageData && (
				<div className='gsap-films-page absolute top-0 left-8 pb-8'>
					<FilmsPage data={filmsPageData} titleScrollTrigger={false} />
				</div>
			)}
			{/* film Page */}
			<div
				ref={filmPageRef}
				className='gsap-film-page w-3/4 h-screen p-8 pt-32 ml-auto'
			>
				{/* Back Button */}
				<Button
					classes='absolute'
					action={() => transitionOnClickBack("/films")}
				>
					Back to films
				</Button>
				<TitleHeadline classes='mt-6'>{filmPageData.title}</TitleHeadline>
				<div className='relative w-full flex gap-8'>
					<div className='gsap-film-page flex flex-wrap gap-16'>
						<div className='gsap-flip-film-image relative w-1/4 min-w-[300px] aspect-square overflow-clip'>
							<Image
								{...{
									src: filmPageData.image.imageUrl,
									alt: `${filmPageData.title} album cover`,
									fill: true,
									className: "gsap-film-image object-cover",
									sizes: "50vw",
								}}
							/>
						</div>
						<div className='gsap-film-content w-1/3 min-w-[300px] space-y-8'>
							{filmPageData.description}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
