import { useEffect } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { animateSplitText } from "@/animations"

export default function useTitleScrollTrigger(
	elementRef: React.RefObject<HTMLDivElement>,
	slug: string
) {
	const pathname = usePathname()

	useEffect(() => {
		console.log("pathname", pathname)
		console.log("slug", slug)
		if (!elementRef.current) return

		gsap.registerPlugin(ScrollTrigger)
		const element = elementRef.current as HTMLDivElement
		const titleElement = element.querySelector("h1") as HTMLHeadingElement
		const parentElement = element.closest("section") as HTMLDivElement

		const offsetLeft = () => parentElement!.offsetLeft
		const width = () => parentElement!.offsetWidth

		let fastScrollEnd = true

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: titleElement,
				start: () => `${offsetLeft()}px bottom`,
				end: () => `+=${width()}`,
				invalidateOnRefresh: true,
				animation: animateSplitText(titleElement, 2000),
				toggleActions: "play play play reverse",
				// fastScrollEnd: fastScrollEnd,
				// markers: true,
				onUpdate: (self) => {
					// define fastScrollEnd depending on scroll direction
					// self.direction === 1
					// 	? (fastScrollEnd = true)
					// 	: (fastScrollEnd = false)

					// console.log("progress", self.progress)

					let count = 0

					if (self.isActive && pathname !== slug && count === 0) {
						console.log("slug", slug)
						console.log("pathname", pathname)
						window.history.pushState(null, "", slug)
						count++
					} else {
						count = 0
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
	}, [elementRef])
}
