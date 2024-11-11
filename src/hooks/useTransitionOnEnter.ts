import { useLayoutEffect } from "react"

import gsap from "gsap"

export default function useTransitionOnEnter(ctx: gsap.Context) {
	useLayoutEffect(() => {
		ctx.add(() => {
			gsap.set(".gsap-project-content", { opacity: 0 })
			gsap.set(".gsap-project-image", { opacity: 0 })
			gsap.set(".gsap-project-page", { yPercent: 50, opacity: 0 })

			const tl = gsap.timeline({ ease: "power4.out" })

			// Bring the project page into view
			tl.to(".gsap-project-page", {
				yPercent: 0,
				opacity: 1,
				duration: 0.3,
			})
				// Animate the project image
				.to(".gsap-project-image", {
					opacity: 1,
					duration: 0.3,
				})
				// Fade in the project content with staggered timing
				.to(".gsap-project-content", {
					opacity: 1,
					duration: 1,
					stagger: 0.1,
				})
		})

		return () => {
			ctx.revert()
		}
	}, [])
}
