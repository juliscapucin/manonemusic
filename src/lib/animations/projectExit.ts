import gsap from "gsap"

export const projectExit = (routerAction: () => void) => {
	const tl = gsap.timeline({ ease: "power4.out" })
	tl.to(".gsap-project-page", {
		opacity: 0,
		xPercent: -30,
		duration: 0.3,
		onComplete: routerAction,
	})
}
