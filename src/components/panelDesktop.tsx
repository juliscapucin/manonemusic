"use client"

import { useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { AllData, NavLink } from "@/types"
import { PanelContent } from "@/components"

type PanelDesktopProps = {
	data: AllData
	sections: NavLink[]
}

export default function PanelDesktop({ data, sections }: PanelDesktopProps) {
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)

	// ScrollTrigger + Horizontal Panel animation
	useEffect(() => {
		if (!panelsContainerRef.current) return
		gsap.registerPlugin(ScrollTrigger)

		/* Panels */
		const container = panelsContainerRef.current
		const panels = gsap.utils.toArray(".gsap-panel")

		const ctx = gsap.context(() => {
			const tween = gsap.to(panels, {
				x: () => -1 * (container.scrollWidth - innerWidth),
				ease: "none",
				scrollTrigger: {
					trigger: container,
					pin: true,
					start: "top top",
					scrub: 1,
					end: () => "+=" + (container.scrollWidth - container.offsetWidth),
					invalidateOnRefresh: true,
					// markers: true,
				},
			})

			// Title Pin Animation on long sections
			const sectionTitles = container.querySelectorAll(".gsap-section-title")

			sectionTitles.forEach((title) => {
				const projectsMenu = title.nextElementSibling as HTMLDivElement
				const projectsMenuWidth = projectsMenu?.offsetWidth

				if (!projectsMenuWidth || projectsMenuWidth < window.innerWidth) return

				gsap.to(title, {
					scrollTrigger: {
						scrub: true,
						trigger: projectsMenu,
						start: "left-=20 left",
						end: () => "+=" + (projectsMenuWidth - window.innerWidth),
						invalidateOnRefresh: true,
						// markers: true,
						containerAnimation: tween,
					},
					x: () => "+=" + (projectsMenuWidth - window.innerWidth),
					ease: "none",
				})
			})
		}, container)

		return () => {
			ctx.revert()
		}
	}, [panelsContainerRef])

	return (
		<main>
			{/* Panels */}
			<div
				ref={panelsContainerRef}
				className='gsap-panels-container flex gap-32 opacity-0'
			>
				{sections.map((section) => {
					return (
						<section
							data-id={`panel-${section.slug === "/" ? "home" : section.slug}`}
							className='gsap-panel h-screen min-h-full pl-8 min-w-fit w-fit overflow-clip'
							key={`panel-${section.slug}`}
						>
							<PanelContent data={data} section={section.slug} />
						</section>
					)
				})}
			</div>
		</main>
	)
}
