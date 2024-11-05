import gsap from "gsap"

export const transitionOnClickBack = (
	ctx: gsap.Context,
	routerAction: () => void
) => {
	ctx.add(() => {
		gsap.set(".gsap-projects-page", { opacity: 0 })
		gsap.set(".gsap-projects-title", { opacity: 0 })

		const tl = gsap.timeline({ ease: "power4.out" })
		tl.to(".gsap-project-page", { opacity: 0, xPercent: -50, duration: 0.3 })

		tl.to(".gsap-projects-page", {
			opacity: 1,
			xPercent: 0,
			duration: 0.3,
			onComplete: routerAction,
		})
	})

	return () => {
		ctx.revert()
	}
}
