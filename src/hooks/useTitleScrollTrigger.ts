import { useLayoutEffect, useEffect } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { animateSplitText } from "@/animations"
import { useWindowDimensions } from "./useWindowDimensions"

let ctx = gsap.context(() => {})

export default function useTitleScrollTrigger(
	elementRef: React.RefObject<HTMLDivElement>,
	slug: string
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

		if (!section || !titleElement) return

		const offsetLeft = () => section.offsetLeft
		const width = () => section.offsetWidth

		let fastScrollEnd = false

		ctx.add(() => {
			ScrollTrigger.create({
				trigger: titleElement,
				start: () => `${offsetLeft()}px bottom`,
				end: () => `+=${width()}`,
				invalidateOnRefresh: true,
				animation: animateSplitText(titleElement, 2000),
				toggleActions: "play none none reverse",
				fastScrollEnd: fastScrollEnd,
				onEnter: () => {
					console.log("entrou", slug)
					window.history.pushState(null, "", slug)
				},
				onEnterBack: () => {
					window.history.pushState(null, "", slug)
				},
			})
		})

		return () => ctx.revert()
	}, [elementRef, windowAspectRatio, pathname, slug])

	useEffect(() => {
		ctx.revert()
	}, [windowAspectRatio])
}
