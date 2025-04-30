"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { AllData, NavLink } from "@/types"
import { PanelContent } from "@/components"
import { usePathname } from "next/navigation"
import { useWindowDimensions } from "@/hooks"
import { animateSplitText } from "@/animations"
import { handlePanelSlide, panelsEnter } from "@/lib/animations"

type PanelDesktopProps = {
	data: AllData
	sections: NavLink[]
}

export default function PanelDesktop({ data, sections }: PanelDesktopProps) {
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	const [tween, setTween] = useState<gsap.core.Tween | null>(null)
	const pathname = usePathname()
	const { windowAspectRatio } = useWindowDimensions()
	let ctx = gsap.context(() => {})

	// Horizontal Panel animation
	useEffect(() => {
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

		return () => {
			ctx.revert()
		}
	}, [])

	// Title animations
	useEffect(() => {
		// Start ScrollTrigger when window is in landscape mode
		if (windowAspectRatio === "portrait" || !tween) return

		gsap.registerPlugin(ScrollTrigger)

		// Wait for the panels to slide into position
		setTimeout(() => {
			ctx.add(() => {
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
						onToggle: (self) => {
							if (self.isActive) window.history.replaceState(null, "", slug)
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
			})
		}, 300)

		return () => ctx.revert()
	}, [windowAspectRatio, tween]) // eslint-disable-line react-hooks/exhaustive-deps

	// Fade in panels on load
	useEffect(() => {
		if (!panelsContainerRef.current) return
		panelsEnter(panelsContainerRef.current as HTMLDivElement)
	}, [panelsContainerRef])

	return (
		<main>
			<div
				ref={panelsContainerRef}
				className='gsap-panels-container flex gap-32 opacity-0'
			>
				{sections.map((section) => {
					return (
						<section
							data-id={`panel-${section.slug === "/" ? "home" : section.slug}`}
							className='gsap-panel h-screen min-h-full px-8 min-w-fit w-fit overflow-clip'
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
