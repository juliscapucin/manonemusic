import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(ScrollTrigger, Draggable)

type CarouselLoopProps = {
	cards: HTMLElement[]
	containerSelector: string
	dragProxySelector: string
	nextButtonSelector: string
	prevButtonSelector: string
}

export function carouselLoop({
	cards,
	containerSelector,
	dragProxySelector,
	nextButtonSelector,
	prevButtonSelector,
}: CarouselLoopProps) {
	let iteration = 0 // Tracks the iteration count for seamless looping

	// Set the initial state of the cards
	gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 })

	const spacing = 0.15 // Spacing between cards (stagger)
	const snapTime = gsap.utils.snap(spacing) // Snap time for seamless looping

	// Animation function for each card
	const animateFunc = (element: HTMLElement): gsap.core.Timeline => {
		const tl = gsap.timeline()
		tl.fromTo(
			element,
			{ scale: 1, opacity: 1 },
			{
				scale: 1,
				opacity: 1,
				zIndex: 100,
				duration: 0.5,
				repeat: 1,
				ease: "power1.in",
				immediateRender: false,
			}
		).fromTo(
			element,
			{ xPercent: 400 },
			{ xPercent: -400, duration: 1, ease: "none", immediateRender: false },
			0
		)
		return tl
	}

	// Build the seamless loop
	const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc)
	const playhead = { offset: 0 } // Proxy object for the playhead position
	const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()) // Wrap time for seamless looping

	// Scrub tween for smooth playhead scrubbing
	const scrub = gsap.to(playhead, {
		offset: 0,
		onUpdate() {
			seamlessLoop.time(wrapTime(playhead.offset)) // Convert the offset to a "safe" corresponding time on the seamlessLoop timeline
		},
		duration: 0.5,
		ease: "power3",
		paused: true,
	})

	// ScrollTrigger for seamless looping
	const trigger = ScrollTrigger.create({
		start: 0,
		onUpdate(self) {
			const scroll = self.scroll()
			if (scroll > self.end - 1) {
				wrap(1, 2)
			} else if (scroll < 1 && self.direction < 0) {
				wrap(-1, self.end - 2)
			} else {
				scrub.vars.offset =
					(iteration + self.progress) * seamlessLoop.duration()
				scrub.invalidate().restart() // To improve performance, we just invalidate and restart the same tween
			}
		},
		end: "+=3000",
		pin: containerSelector,
	})

	// Converts progress to a safe scroll value
	const progressToScroll = (progress: number): number =>
		gsap.utils.clamp(
			1,
			trigger.end - 1,
			gsap.utils.wrap(0, 1, progress) * trigger.end
		)

	// Wraps the scroll position for seamless looping
	const wrap = (iterationDelta: number, scrollTo: number): void => {
		iteration += iterationDelta
		trigger.scroll(scrollTo)
		trigger.update() // By default, when we trigger.scroll(), it waits 1 tick to update
	}

	// Scroll to a specific offset
	const scrollToOffset = (offset: number): void => {
		const snappedTime = snapTime(offset)
		const progress =
			(snappedTime - seamlessLoop.duration() * iteration) /
			seamlessLoop.duration()
		const scroll = progressToScroll(progress)
		if (progress >= 1 || progress < 0) {
			return wrap(Math.floor(progress), scroll)
		}
		trigger.scroll(scroll)
	}

	// Snap to the closest item when scrolling stops
	ScrollTrigger.addEventListener("scrollEnd", () =>
		scrollToOffset(scrub.vars.offset as number)
	)

	// Build the seamless loop
	function buildSeamlessLoop(
		items: HTMLElement[],
		spacing: number,
		animateFunc: (element: HTMLElement) => gsap.core.Timeline
	): gsap.core.Timeline {
		const rawSequence = gsap.timeline({ paused: true }) // This is where all the "real" animations live
		const seamlessLoop = gsap.timeline({
			paused: true,
			repeat: -1, // To accommodate infinite scrolling/looping
			onRepeat() {
				if (this._time === this._dur) {
					this._tTime += this._dur - 0.01
				}
			},
			onReverseComplete() {
				this.totalTime(this.rawTime() + this.duration() * 100) // Seamless looping backwards
			},
		})
		const cycleDuration = spacing * items.length
		let dur: number | undefined

		// Loop through 3 times so we can have an extra cycle at the start and end
		items
			.concat(items)
			.concat(items)
			.forEach((item, i) => {
				const anim = animateFunc(items[i % items.length])
				rawSequence.add(anim, i * spacing)
				dur ||= anim.duration()
			})

		// Animate the playhead linearly from the start of the 2nd cycle to its end
		seamlessLoop.fromTo(
			rawSequence,
			{
				time: cycleDuration + (dur || 0) / 2,
			},
			{
				time: `+=${cycleDuration}`,
				duration: cycleDuration,
				ease: "none",
			}
		)
		return seamlessLoop
	}

	// Draggable functionality for mobile-friendly interaction
	Draggable.create(dragProxySelector, {
		type: "x",
		trigger: cards,
		onPress() {
			this.startOffset = scrub.vars.offset as number
		},
		onDrag() {
			scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001
			scrub.invalidate().restart()
		},
		onDragEnd() {
			scrollToOffset(scrub.vars.offset as number)
		},
	})

	// Add click listeners for next and previous buttons
	document
		.querySelector(nextButtonSelector)
		?.addEventListener("click", () =>
			scrollToOffset((scrub.vars.offset as number) + spacing)
		)
	document
		.querySelector(prevButtonSelector)
		?.addEventListener("click", () =>
			scrollToOffset((scrub.vars.offset as number) - spacing)
		)
}
