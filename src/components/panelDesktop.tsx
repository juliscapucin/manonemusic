"use client"

import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

import { AllData, NavLink } from "@/types"
import { PanelContent } from "@/components"
import { usePathname } from "next/navigation"
import { useWindowDimensions } from "@/hooks"
import { animateSplitText } from "@/animations"
import { panelsEnter } from "@/lib/animations"

type PanelDesktopProps = {
	data: AllData
	sections: NavLink[]
}

export default function PanelDesktop({ data, sections }: PanelDesktopProps) {
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	const [tween, setTween] = useState<gsap.core.Tween | null>(null)
	const pathname = usePathname()
	const { windowAspectRatio } = useWindowDimensions()

	// Horizontal Panel animation
	useGSAP(() => {
		if (!panelsContainerRef.current) return
		gsap.registerPlugin(ScrollTrigger)

		/* Panels */
		const container = panelsContainerRef.current
		const panels = gsap.utils.toArray(".gsap-panel")

		const ctx = gsap.context(() => {
			const tweenRef = gsap.to(panels, {
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

			// set Ref value to pass to title animations
			setTween(tweenRef)
		}, container)
	}, [])

	// Title animations
	useGSAP(
		() => {
			console.log("useEffect animations ran again")
			let ctx = gsap.context(() => {})

			// Start ScrollTrigger when window is in landscape mode
			if (windowAspectRatio === "portrait" || !tween) return

			gsap.registerPlugin(ScrollTrigger)

			// Wait for the panels to slide into position
			setTimeout(() => {
				const titles = panelsContainerRef.current?.querySelectorAll("h1")

				if (!titles) return

				// Title ScrollTrigger + route handler
				titles.forEach((title, index) => {
					if (!title) return
					let slug = `/${title.innerText.toLowerCase().replace(/\s+/g, "-")}`
					if (!slug) return

					if (slug.includes("man")) slug = "/"

					ScrollTrigger.create({
						trigger: title,
						start: "left center",
						end: index === 0 ? "right center" : "right right",
						invalidateOnRefresh: true,
						animation: animateSplitText(title, 2000),
						toggleActions: "play none none reverse",
						fastScrollEnd: true,
						horizontal: true,
						containerAnimation: tween,
						// markers: true,
						onEnter: (self) => {
							// Only update history if trigger is active and if new section
							if (self.isActive && !window.location.href.includes(slug)) {
								window.history.pushState(null, "", slug)
							}
						},
						onEnterBack: (self) => {
							// Only update history if trigger is active and if new section
							if (self.isActive && !window.location.href.includes(slug)) {
								window.history.pushState(null, "", slug)
							}
						},
					})

					// Pin Title Horizontally on long sections
					const projectsMenu = title.parentElement
						?.nextElementSibling as HTMLElement

					const projectsMenuWidth = projectsMenu?.offsetWidth

					if (!projectsMenuWidth || projectsMenuWidth < window.innerWidth)
						return

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
				}, panelsContainerRef.current)
			}, 400)

			return () => ScrollTrigger.killAll()
		},
		{ dependencies: [tween], scope: panelsContainerRef }
	)

	// Fade in panels on load
	useEffect(() => {
		if (!panelsContainerRef.current) return
		panelsEnter(panelsContainerRef.current as HTMLDivElement)
	}, [panelsContainerRef])

	return (
		<main>
			<div
				ref={panelsContainerRef}
				className='gsap-panels-container flex gap-32 opacity-0'>
				{sections.map((section) => {
					return (
						<section
							data-id={`panel-${section.slug === "/" ? "home" : section.slug}`}
							className='gsap-panel h-screen min-h-full px-8 min-w-fit w-fit overflow-clip'
							key={`panel-${section.slug}`}>
							<PanelContent data={data} section={section.slug} />
						</section>
					)
				})}
			</div>
		</main>
	)
}
