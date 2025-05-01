"use client"

import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { PortfolioItem } from "@/types"
import { ProjectCard } from "@/components"
import { useWindowDimensions } from "@/hooks"
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react"
import { infiniteHorizontalLoop } from "@/lib/animations"
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
	const projectCardsContainerRef = useRef<HTMLDivElement | null>(null)
	const tlRef = useRef<gsap.core.Timeline | null>(null)
	const [timelineReady, setTimelineReady] = useState(false)

	// MOBILE: Create infinite horizontal scroll
	useGSAP(() => {
		if (!projectCardsContainerRef.current || !isMobile) return
		gsap.registerPlugin(Observer)

		const container = projectCardsContainerRef.current
		const cards = Array.from(container.children) as HTMLElement[]

		if (cards.length === 0) return

		// Create an infinite horizontal loop
		tlRef.current = infiniteHorizontalLoop(cards, {
			repeat: -1,
			paddingRight: "64px",
		})
		const loop = tlRef.current
		setTimelineReady(true)

		// create a tween that'll always decelerate the timeScale of the timeline back to 0 over the course of 2 seconds (or whatever)
		let slow = gsap.to(loop, { timeScale: 0, duration: 1 })
		// make the loop stopped initially.

		loop.timeScale(0)

		// Create an observer to detect touch and wheel events
		Observer.create({
			target: container,
			type: "pointer,touch,wheel",
			wheelSpeed: -1,
			onChange: (self) => {
				loop.timeScale(
					Math.abs(self.deltaX) > Math.abs(self.deltaY)
						? -self.deltaX
						: -self.deltaY
				) // whichever direction is bigger

				// Decelerate
				slow.invalidate().restart()
			},
		})
	}, [isMobile, projectCardsContainerRef])

	// DESKTOP: Skew on scroll
	useGSAP(
		() => {
			if (!projectCardsContainerRef.current || isMobile || isMobile === null)
				return

			const container = projectCardsContainerRef.current

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
		{ dependencies: [isMobile, projectCardsContainerRef] }
	)

	return (
		<div
			id='projects-menu'
			className={`gsap-projects-menu relative w-full portrait:overflow-x-clip landscape:w-fit portrait:pb-16 h-80 landscape:h-2/5`}>
			<div
				ref={projectCardsContainerRef}
				className='w-fit h-full flex items-start justify-start gap-8 landscape:gap-40'>
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
			{timelineReady && tlRef.current && <ButtonsCarousel tl={tlRef.current} />}
		</div>
	)
}
