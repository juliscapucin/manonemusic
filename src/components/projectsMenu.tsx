"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Observer } from "gsap/Observer"

import { PortfolioItem } from "@/types"
import { ProjectCard } from "@/components"
import { useWindowDimensions } from "@/hooks"
import { useRef, useState } from "react"
import { carouselLoop } from "@/lib/animations"
import { ButtonsCarousel } from "@/components/buttons"

type ProjectsMenuProps = {
	projects: PortfolioItem[]
	variant: "section" | "page"
	section: string
}

export default function ProjectsMenu({
	projects,
	section,
	variant,
}: ProjectsMenuProps) {
	const { isMobile } = useWindowDimensions()

	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const cardsContainerRef = useRef<HTMLDivElement | null>(null)
	const tlRef = useRef<gsap.core.Timeline | null>(null)

	const [timelineReady, setTimelineReady] = useState(false)
	const [activeCarouselImage, setActiveCarouselImage] = useState(0)

	// MOBILE: Carousel
	useGSAP(() => {
		if (!outerContainerRef.current || !cardsContainerRef.current || !isMobile)
			return

		const wrapper = outerContainerRef.current
		const cards = Array.from(cardsContainerRef.current.children)

		tlRef.current = carouselLoop(
			cards,
			{
				paused: true,
				paddingRight: 32,
				draggable: true,
				speed: 0.5,
			},
			wrapper,
			setActiveCarouselImage
		)

		setTimelineReady(true)
	}, [isMobile])

	// DESKTOP: Skew on scroll
	useGSAP(
		() => {
			if (!cardsContainerRef.current || isMobile || isMobile === null) return

			const container = cardsContainerRef.current

			if (!container) return

			gsap.registerPlugin(Observer)

			let proxy = { skew: 0 },
				skewSetter = gsap.quickSetter(container, "skewX", "deg"), // fast
				clamp = gsap.utils.clamp(-5, 5) // don't let the skew go beyond 5 degrees.

			Observer.create({
				target: window,
				type: "wheel,scroll,touch",
				onChange: (self) => {
					let skew = clamp(self.velocityY / -300)
					// only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
					if (Math.abs(skew) > Math.abs(proxy.skew)) {
						proxy.skew = skew
						gsap.to(proxy, {
							skew: 0,
							duration: 1,
							ease: "power3",
							overwrite: true,
							onUpdate: () => skewSetter(proxy.skew),
						})
					}
				},
				onStop: () => {
					gsap.to(container, {
						// opacity: 1,
						duration: 0.5,
						ease: "power4.out",
					})
				},
			})
		},
		{ dependencies: [isMobile, cardsContainerRef] }
	)

	return (
		<div
			ref={outerContainerRef}
			id='projects-menu'
			className={
				"gsap-projects-menu relative w-full portrait:overflow-x-visible landscape:w-fit portrait:pb-16 h-80 landscape:h-2/5"
			}>
			<div
				ref={cardsContainerRef}
				className='relative w-fit h-full flex items-start justify-start gap-8 landscape:gap-40'>
				{projects?.map((project: PortfolioItem, index) => {
					return (
						<ProjectCard
							key={project.slug}
							{...{
								variant,
								section,
								title: project.title,
								image: project.image,
								slug: project.slug,
								isMobile,
							}}
						/>
					)
				})}
			</div>
			{/* CAROUSEL ELEMENTS ON MOBILE */}
			{timelineReady && tlRef.current && (
				<ButtonsCarousel
					tl={tlRef.current}
					itemsCount={projects.length}
					activeCarouselImage={activeCarouselImage}
					setActiveCarouselImage={setActiveCarouselImage}
				/>
			)}
		</div>
	)
}
