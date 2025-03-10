import gsap from "gsap"

export const projectExit = (routerAction: () => void) => {
	console.log("project exit")
	const tl = gsap.timeline()
	tl.to(".gsap-project-page", {
		opacity: 0,
		yPercent: -50,
		duration: 0.3,
		onComplete: routerAction,
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
