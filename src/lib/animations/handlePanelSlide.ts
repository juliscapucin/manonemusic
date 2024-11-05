import gsap from "gsap"

export const handlePanelSlide = (
	targetSlug: string,
	animateSlide: boolean,
	routerAction?: () => void,
	panelsContainer?: HTMLDivElement
) => {
	const targetPanel =
		targetSlug === "/"
			? null
			: (document.querySelector(
					`[data-id=panel-${targetSlug.includes("/") ? targetSlug.split("/")[1] : targetSlug}]`
				) as HTMLDivElement)
	let y = targetPanel?.offsetLeft || 0

	if (animateSlide === true) {
		gsap.to(window, {
			scrollTo: {
				y: y,
				autoKill: false,
			},
			duration: 0.5,
			onComplete: () => {
				targetSlug === "/"
					? window.history.pushState(null, "", "/")
					: window.history.pushState(null, "", `/${targetSlug}`)
				if (panelsContainer) {
					gsap.to(panelsContainer, {
						yPercent: -50,
						duration: 0.5,
					})
				}
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
