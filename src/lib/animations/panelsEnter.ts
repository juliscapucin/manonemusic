import gsap from "gsap"

export const panelsEnter = (element: HTMLElement) => {
	gsap.fromTo(
		element,
		{
			opacity: 0,
			xPercent: 50,
		},
		{
			opacity: 1,
			xPercent: 0,
			duration: 0.5,
		}
	)
}
