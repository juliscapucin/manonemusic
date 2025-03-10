import gsap from "gsap"

export const transitionOnClickBack = (routerAction: () => void) => {
	const tl = gsap.timeline()
	tl.to(".gsap-project-page", {
		opacity: 0,
		// yPercent: -50,
		duration: 0.4,
	}).to(
		".gsap-projects-menu-page",
		{
			xPercent: 500,
			duration: 0.4,
			ease: "power2.in",
			onComplete: routerAction,
		},
		"<"
	)
}
