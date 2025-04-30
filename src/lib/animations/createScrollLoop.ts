import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { infiniteHorizontalLoop } from "./infiniteHorizontalLoop"

// SCROLL LOOP
export function createScrollLoop(container: HTMLDivElement) {
	gsap.registerPlugin(Observer)

	const cards = Array.from(container.children) as HTMLElement[]

	if (cards.length === 0) return

	// Create an infinite vertical loop
	const loop = infiniteHorizontalLoop(cards, {
		repeat: -1,
		paddingRight: "64px",
	})

	// create a tween that'll always decelerate the timeScale of the timeline back to 0 over the course of 2 seconds (or whatever)
	let slow = gsap.to(loop, { timeScale: 0, duration: 1 })
	// make the loop stopped initially.
	loop.timeScale(0)

	// Create an observer to detect touch and wheel events
	Observer.create({
		target: container,
		type: "pointer,touch,wheel",
		wheelSpeed: -1,
		onStop: () => {},
		onChange: (self) => {
			loop.timeScale(
				Math.abs(self.deltaX) > Math.abs(self.deltaY)
					? -self.deltaX
					: -self.deltaY
			) // whichever direction is bigger

			// Check if the element is in the middle of the viewport if the user is not scrolling fast
			// if (isMobile && (self.velocityY! < -200 || self.velocityY! > 200)) {
			// 	loop.eventCallback("onUpdate", () => {
			// 		items.forEach((item) => {
			// 			const position = getViewportPosition(item)
			// 			position.isMiddle &&
			// 				item.dataset.name &&
			// 				setIsHovered(item.dataset.name)
			// 		})
			// 	})
			// }

			// Decelerate
			slow.invalidate().restart()
		},
	})
}
