import gsap from "gsap"

export const handlePanelSlide = (
	targetSlug: string,
	animateSlide: boolean,
	routerAction?: () => void
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
			duration: 0.8,
			onComplete: () => {
				targetSlug === "/"
					? window.history.pushState(null, "", "/")
					: window.history.pushState(null, "", `/${targetSlug}`)
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
