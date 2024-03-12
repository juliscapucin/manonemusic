import { useLayoutEffect, useEffect } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { animateSplitText } from "@/animations"

export default function useTitleScrollTrigger(
	elementRef: React.RefObject<HTMLDivElement>,
	slug: string,
	windowAspectRatio: string
) {
	let ctx = gsap.context(() => {})

	useLayoutEffect(() => {
		// Start ScrollTrigger when window is in landscape mode
		if (!elementRef.current || windowAspectRatio === "portrait") return

		gsap.registerPlugin(ScrollTrigger)
		const element = elementRef.current as HTMLDivElement
		const titleElement = element.querySelector("h1") as HTMLHeadingElement
		const parentElement = element.closest("section") as HTMLDivElement

		const offsetLeft = () => parentElement!.offsetLeft
		const width = () => parentElement!.offsetWidth

		let fastScrollEnd = true

		ctx.add(() => {
			ScrollTrigger.create({
				trigger: titleElement,
				start: () => `${offsetLeft()}px bottom`,
				end: () => `+=${width()}`,
				invalidateOnRefresh: true,
				animation: animateSplitText(titleElement, 2000),
				toggleActions: "play none none reverse",
				fastScrollEnd: fastScrollEnd,
				// markers: true,
				onUpdate: (self) => {
					// define fastScrollEnd depending on scroll direction
					self.direction === 1
						? (fastScrollEnd = true)
						: (fastScrollEnd = false)

					// console.log("progress", self.progress)

					if (self.isActive && window.location.pathname !== slug) {
						console.log(slug)
						window.history.pushState(null, "", slug)
					}

					// console.log("fastScrollEnd", fastScrollEnd)
					// console.log(
					// 	"progress:",
					// 	self.progress.toFixed(3),
					// 	"direction:",
					// 	self.direction,
					// 	"velocity",
					// 	self.getVelocity()
					// )
				},
			})
		})

		return () => ctx.revert()
	}, [elementRef, windowAspectRatio])

	// Revert ScrollTrigger when window is in portrait mode
	useEffect(() => {
		if (windowAspectRatio === "landscape") return
		ctx.revert()
	}, [windowAspectRatio])
}
