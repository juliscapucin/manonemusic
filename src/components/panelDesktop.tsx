"use client"

import React, { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { AllData } from "@/types"
import { PanelContent } from "@/components"
import { handlePanelSlide, panelsEnter } from "@/lib/animations"

type PanelDesktopProps = {
	data: AllData
}

export default function PanelDesktop({ data }: PanelDesktopProps) {
	const pathname = usePathname()
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	let tween: gsap.core.Tween

	const headerNavLinks = [
		{ title: "Home", slug: "/", order: 0 },
		...data.headerNavLinks,
	]

	// ScrollTrigger + Horizontal Panel animation
	useEffect(() => {
		if (!panelsContainerRef.current) return
		gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

		/* Panels */
		const container = panelsContainerRef.current
		const panels = gsap.utils.toArray(".gsap-panel")

		let ctx = gsap.context(() => {
			tween = gsap.to(panels, {
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
					onUpdate: (self) => {
						// TODO fix this!
						// if (self.progress <= 0.12 && !isHome) {
						// 	window.history.pushState(null, "", "/")
						// 	setIsHome(true)
						// }
						// console.log("end", self.end)
						// console.log(self.progress, "/1")
						// console.log(
						// 	window.scrollY,
						// 	`/${document.body.scrollHeight - window.innerHeight}`
						// )
					},
				},
			})

			// Title Animation on long sections
			const sectionTitles = container.querySelectorAll(".gsap-section-title")

			sectionTitles.forEach((title) => {
				const projectsMenu = title.nextElementSibling as HTMLDivElement
				const projectsMenuWidth = projectsMenu?.offsetWidth

				if (!projectsMenuWidth || projectsMenuWidth < window.innerWidth) return

				gsap.to(title, {
					scrollTrigger: {
						scrub: true,
						trigger: projectsMenu,
						start: "left-=30 left",
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

	// Jump to panel on internal page load
	useEffect(() => {
		if (!pathname || !panelsContainerRef.current) return

		if (pathname !== "/") {
			handlePanelSlide(pathname, false)
		}
		panelsEnter(panelsContainerRef.current)
	}, [])

	return (
		<main>
			{/* Panels */}
			<div
				ref={panelsContainerRef}
				className='gsap-panels-container opacity-0 flex gap-32'
			>
				{headerNavLinks.map((section, index) => {
					return (
						<section
							data-id={`panel-${section.slug}`}
							className='gsap-panel h-screen min-h-full pl-8 min-w-fit w-fit'
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
