"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { animateSplitText } from "@/animations"
import { useWindowDimensions } from "./useWindowDimensions"

let ctx = gsap.context(() => {})

export default function useTitleScrollTrigger(
	elementRef: React.RefObject<HTMLDivElement>,
	slug: string,
	tween: gsap.core.Tween | null
) {
	const pathname = usePathname()
	const { windowAspectRatio } = useWindowDimensions()

	useEffect(() => {
		// Start ScrollTrigger when window is in landscape mode
		if (!elementRef.current || windowAspectRatio === "portrait") return

		gsap.registerPlugin(ScrollTrigger)
		const element = elementRef.current
		const titleElement = element.querySelector("h1")
		const projectsMenu = element?.nextElementSibling as HTMLDivElement

		if (!titleElement || !tween) return

		ctx.add(() => {
			ScrollTrigger.create({
				trigger: titleElement,
				start: "left center",
				end: "right center",
				invalidateOnRefresh: true,
				animation: animateSplitText(titleElement, 2000),
				toggleActions: "play none none reverse",
				// fastScrollEnd: true,
				horizontal: true,
				containerAnimation: tween,
				// markers: true,
				onEnter: () => {
					if (slug !== pathname) window.history.pushState(null, "", slug)
				},
				onEnterBack: () => {
					if (slug !== pathname) window.history.pushState(null, "", slug)
				},
			})

			// Title Pin Horizontal Animation on long sections
			const projectsMenuWidth = projectsMenu?.offsetWidth

			if (!projectsMenuWidth || projectsMenuWidth < window.innerWidth) return

			gsap.to(titleElement, {
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

		return () => ctx.revert()
	}, [elementRef, windowAspectRatio, tween]) // eslint-disable-line react-hooks/exhaustive-deps
}
