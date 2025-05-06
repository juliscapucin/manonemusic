import gsap from "gsap"

export const projectExit = (routerAction: () => void, exitSection: boolean) => {
	const page = document.querySelector(".gsap-project-page")
	const menu = document.querySelector(".gsap-projects-menu-page")

	if (!page || !menu) return

	const tl = gsap.timeline()

	// If navigating to other section, animate menu exiting
	if (exitSection) {
		tl.to(".gsap-project-page", {
			opacity: 0,
			yPercent: -50,
			duration: 0.3,
		}).to(
			".gsap-projects-menu-page",
			{
				xPercent: 200,
				duration: 0.4,
				ease: "power2.in",
				onComplete: routerAction,
			},
			"<"
		)
		// If navigating to another project in the same section, keep menu in place
	} else {
		tl.to(".gsap-project-page", {
			opacity: 0,
			yPercent: -50,
			duration: 0.3,
			onComplete: routerAction,
		})
	}
}
