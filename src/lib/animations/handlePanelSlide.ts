import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

export const handlePanelSlide = (
	targetSlug: string,
	animateSlide: boolean,
	routerAction?: () => void
) => {
	const targetPanel =
		targetSlug === "/"
			? (document.querySelector("[data-id=panel-home]") as HTMLDivElement)
			: (document.querySelector(
					`[data-id=panel-${targetSlug.includes("/") ? targetSlug.split("/")[1] : targetSlug}]`
				) as HTMLDivElement)

	const panelParent = targetPanel?.parentElement as HTMLDivElement

	let y = targetPanel ? targetPanel.offsetLeft : 0

	gsap.to(window, {
		scrollTo: {
			y: y,
			autoKill: true,
		},
		duration: 0.1,
		onComplete: () => {
			window.history.pushState({}, "", `${targetSlug}`)

			routerAction && routerAction()
		},
	})
}
