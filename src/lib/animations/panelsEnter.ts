import gsap from "gsap"

export const panelsEnter = (element: HTMLElement) => {
	gsap.fromTo(
		element,
		{
			opacity: 0,
			yPercent: 50,
		},
		{
			opacity: 1,
			yPercent: 0,
			duration: 0.3,
		}
	)
}
