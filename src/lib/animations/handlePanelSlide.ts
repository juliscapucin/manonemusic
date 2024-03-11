import gsap from "gsap"

export const handlePanelSlide = (
	targetIndex: number,
	animateSlide: boolean,
	routerAction?: () => void
) => {
	const targetPanel = document.querySelector(
		`[data-id=panel-${targetIndex}]`
	) as HTMLDivElement
	let y = targetPanel?.offsetLeft || 0

	if (animateSlide === true) {
		gsap.to(window, {
			scrollTo: {
				y: y,
				autoKill: false,
			},
			duration: 0.8,
			onComplete: () => {
				targetIndex === 0 && window.history.pushState(null, "", "/")
				routerAction && routerAction()
			},
		})
	} else {
		gsap.set(window, {
			scrollTo: {
				y: y,
				autoKill: false,
			},
		})
	}
}
