import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

export const handlePanelSlide = (
	targetSlug: string,
	animateSlide: boolean,
	routerAction?: () => void
) => {
	const targetPanel =
		targetSlug === "/" || targetSlug === ""
			? (document.querySelector("[data-id=panel-home]") as HTMLDivElement)
			: (document.querySelector(
					`[data-id=panel-${targetSlug.includes("/") ? targetSlug.split("/")[1] : targetSlug}]`
				) as HTMLDivElement)

	const panelParent = targetPanel?.parentElement as HTMLDivElement

	let y = targetPanel ? targetPanel.offsetLeft : 0

	if (animateSlide === true) {
		gsap.to(window, {
			scrollTo: {
				y: y,
				autoKill: false,
			},
			duration: 0.5,
			onComplete: () => {
				routerAction && routerAction()
			},
		})
	} else {
		window.scrollTo({
			top: y,
		})
		// gsap.set(panelParent, { opacity: 0 })
		// gsap.to(window, {
		// 	duration: 0.2,
		// 	scrollTo: {
		// 		y: y,
		// 		autoKill: true,
		// 	},
		// 	onComplete: () => {
		// 		window.history.pushState({}, "", `${targetSlug}`)
		// 		gsap.to(panelParent, {
		// 			opacity: 1,
		// 			duration: 0.5,
		// 			ease: "power2.out",
		// 		})
		// 	},
		// })
	}
}
