import { useLayoutEffect, useEffect } from "react"
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

	useLayoutEffect(() => {
		// Start ScrollTrigger when window is in landscape mode
		if (!elementRef.current || windowAspectRatio === "portrait") return

		gsap.registerPlugin(ScrollTrigger)
		const element = elementRef.current
		const titleElement = element.querySelector("h1")
		const section = element.closest("section")

		if (!section || !titleElement || !tween) return

		console.log(slug)

		ctx.add(() => {
			ScrollTrigger.create({
				trigger: titleElement,
				start: "left center",
				end: "right right",
				invalidateOnRefresh: true,
				animation: animateSplitText(titleElement, 2000),
				toggleActions: "play none none reverse",
				fastScrollEnd: true,
				containerAnimation: tween,
				// markers: true,
				onEnter: () => {
					window.history.pushState(null, "", slug)
				},
				onEnterBack: () => {
					window.history.pushState(null, "", slug)
				},
			})
		})

		return () => ctx.revert()
	}, [elementRef, windowAspectRatio, pathname, slug, tween])

	useEffect(() => {
		ctx.revert()
	}, [])
}
