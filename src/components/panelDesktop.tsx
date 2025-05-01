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

		// let proxy = { skew: 0 },
		// 	skewSetter = gsap.quickSetter(panels, "skewX", "deg"), // fast
		// 	clamp = gsap.utils.clamp(-5, 5) // don't let the skew go beyond 5 degrees.

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

				// SKEW EFFECT
				// onUpdate: (self) => {
				// 	let skew = clamp(self.getVelocity() / -300)
				// 	// only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
				// 	if (Math.abs(skew) > Math.abs(proxy.skew)) {
				// 		proxy.skew = skew
				// 		gsap.to(proxy, {
				// 			skew: 0,
				// 			duration: 0.8,
				// 			ease: "power3",
				// 			overwrite: true,
				// 			onUpdate: () => skewSetter(proxy.skew),
				// 		})
				// 	}
				// },
			},
		})

		// set Ref value to pass to title animations
		setTween(tweenRef)
	}, [])

	// Title animations
	useGSAP(
		() => {
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
						end: "right center",
						invalidateOnRefresh: true,
						animation: animateSplitText(title, 2000),
						toggleActions: "play none none reverse",
						fastScrollEnd: true,
						horizontal: true,
						containerAnimation: tween,
						// markers: true,
						onToggle: (self) => {
							// Only update history if trigger is active and if new section
							if (self.isActive && window.location.pathname !== slug) {
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
