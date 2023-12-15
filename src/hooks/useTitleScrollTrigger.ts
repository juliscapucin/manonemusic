import { useEffect } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { animateSplitText } from "@/animations"

export default function useTitleScrollTrigger(
	elementRef: React.RefObject<HTMLDivElement>
) {
	useEffect(() => {
		if (!elementRef.current) return

		gsap.registerPlugin(ScrollTrigger)
		const element = elementRef.current as HTMLDivElement
		const titleElement = element.querySelector("h1") as HTMLHeadingElement

		const offsetLeft = () => element.parentElement!.offsetLeft
		const width = () => element.parentElement!.offsetWidth

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: element,
				start: () => `${offsetLeft() - width() / 2}px 50%`,
				end: () => `+=${width()}`,
				invalidateOnRefresh: true,
				animation: animateSplitText(titleElement, 2000),
				toggleActions: "play none none reverse",
				// markers: true,
				// onUpdate: (self) => {
				// 	console.log(
				// 		"progress:",
				// 		self.progress.toFixed(3),
				// 		"direction:",
				// 		self.direction,
				// 		"velocity",
				// 		self.getVelocity()
				// 	)
				// },
			})
		})

		return () => ctx.revert()
	}, [elementRef])
}
