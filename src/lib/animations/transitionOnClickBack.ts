import gsap from "gsap"

export const transitionOnClickBack = (
	ctx: gsap.Context,
	routerAction: () => void
) => {
	ctx.add(() => {
		const tl = gsap.timeline({ ease: "power4.out" })
		tl.to(".gsap-project-page", {
			opacity: 0,
			xPercent: -50,
			duration: 0.3,
			onComplete: routerAction,
		})
	})

	return () => {
		ctx.revert()
	}
}
