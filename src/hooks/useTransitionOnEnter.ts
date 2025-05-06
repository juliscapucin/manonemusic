"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function useTransitionOnEnter() {
	useGSAP(() => {
		const content = document.querySelector(".gsap-project-content")
		const image = document.querySelector(".gsap-project-image")
		const page = document.querySelector(".gsap-project-page")

		if (!content || !image || !page) return

		gsap.set(content, { opacity: 0 })
		gsap.set(image, { opacity: 0 })
		gsap.set(page, { yPercent: 50, opacity: 0 })

		const tl = gsap.timeline({ ease: "power4.out" })

		// Bring the project page into view
		tl.to(page, {
			yPercent: 0,
			opacity: 1,
			duration: 0.3,
		})
			// Animate the project image
			.to(image, {
				opacity: 1,
				duration: 0.3,
			})
			// Fade in the project content with staggered timing
			.to(content, {
				opacity: 1,
				duration: 1,
				stagger: 0.1,
			})
	}, [])
}
