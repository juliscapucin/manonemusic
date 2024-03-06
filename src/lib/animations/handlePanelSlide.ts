import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

export const handlePanelSlide = (
	targetIndex: number,
	animateSlide: boolean
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
			duration: 1,
			onComplete: () => {
				targetIndex === 0 && window.history.pushState(null, "", "/")
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
