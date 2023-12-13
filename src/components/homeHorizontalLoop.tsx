"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"

export default function HomeHorizontalLoop() {
	useEffect(() => {
		gsap.registerPlugin(Observer)

		// create an infinite loop
		let loop = horizontalLoop(".cards li", { repeat: -1 })
		// create a tween that'll always decelerate the timeScale of the timeline back to 0 over the course of 0.5 seconds (or whatever)
		let slow = gsap.to(loop, { timeScale: 0, duration: 0.5 })
		// make the loop stopped initially.
		loop.timeScale(0)

		// now use an Observer to listen to pointer/touch/wheel events and set the timeScale of the infinite looping timeline accordingly.
		Observer.create({
			target: ".cards",
			type: "pointer,touch,wheel",
			wheelSpeed: -1,
			onChange: (self) => {
				loop.timeScale(
					Math.abs(self.deltaX) > Math.abs(self.deltaY)
						? -self.deltaX
						: -self.deltaY
				) // whichever direction is bigger
				slow.invalidate().restart() // now decelerate
			},
		})

		/*
      This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
      
      Features:
       - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
       - When each item animates to the left or right enough, it will loop back to the other side
       - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
       - The returned timeline will have the following methods added to it:
         - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
         - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
         - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
         - current() - returns the current index (if an animation is in-progress, it reflects the final index)
         - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
       */
		function horizontalLoop(items: any, config: any) {
			items = gsap.utils.toArray(items)
			config = config || {}
			let tl = gsap.timeline({
					repeat: config.repeat,
					paused: config.paused,
					defaults: { ease: "none" },
					onReverseComplete: () => {
						tl.totalTime(tl.rawTime() + tl.duration() * 100)
					},
				}),
				length = items.length,
				startX = items[0].offsetLeft,
				times: number[] = [],
				widths: number[] = [],
				xPercents: number[] = [],
				curIndex = 0,
				pixelsPerSecond = (config.speed || 1) * 100,
				snap =
					config.snap === false
						? (v: any) => v
						: gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
				totalWidth,
				curX,
				distanceToStart,
				distanceToLoop,
				item,
				i
			gsap.set(items, {
				// convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
				xPercent: (i, el) => {
					let w = (widths[i] = parseFloat(
						`${gsap.getProperty(el, "width", "px")}`
					))
					xPercents[i] = snap(
						(parseFloat(`${gsap.getProperty(el, "x", "px")}`) / w) * 100 +
							parseFloat(`${gsap.getProperty(el, "xPercent")}`)
					)
					return xPercents[i]
				},
			})
			gsap.set(items, { x: 0 })
			totalWidth =
				items[length - 1].offsetLeft +
				(xPercents[length - 1] / 100) * widths[length - 1] -
				startX +
				items[length - 1].offsetWidth *
					parseFloat(`${gsap.getProperty(items[length - 1], "scaleX")}`) +
				(parseFloat(config.paddingRight) || 0)
			for (i = 0; i < length; i++) {
				item = items[i]
				curX = (xPercents[i] / 100) * widths[i]
				distanceToStart = item.offsetLeft + curX - startX
				distanceToLoop =
					distanceToStart +
					widths[i] * parseFloat(`${gsap.getProperty(item, "scaleX")}`)
				tl.to(
					item,
					{
						xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
						duration: distanceToLoop / pixelsPerSecond,
					},
					0
				)
					.fromTo(
						item,
						{
							xPercent: snap(
								((curX - distanceToLoop + totalWidth) / widths[i]) * 100
							),
						},
						{
							xPercent: xPercents[i],
							duration:
								(curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
							immediateRender: false,
						},
						distanceToLoop / pixelsPerSecond
					)
					.add("label" + i, distanceToStart / pixelsPerSecond)
				times[i] = distanceToStart / pixelsPerSecond
			}
			function toIndex(index: number, vars: any) {
				vars = vars || {}
				Math.abs(index - curIndex) > length / 2 &&
					(index += index > curIndex ? -length : length) // always go in the shortest direction
				let newIndex = gsap.utils.wrap(0, length, index),
					time = times[newIndex]
				if (time > tl.time() !== index > curIndex) {
					// if we're wrapping the timeline's playhead, make the proper adjustments
					vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
					time += tl.duration() * (index > curIndex ? 1 : -1)
				}
				curIndex = newIndex
				vars.overwrite = true
				return tl.tweenTo(time, vars)
			}
			tl.next = (vars) => toIndex(curIndex + 1, vars)
			tl.previous = (vars) => toIndex(curIndex - 1, vars)
			tl.current = () => curIndex
			tl.toIndex = (index, vars) => toIndex(index, vars)
			tl.times = times
			tl.progress(1, true).progress(0, true) // pre-render for performance
			if (config.reversed) {
				tl.vars.onReverseComplete()
				tl.reverse()
			}
			return tl
		}
	}, [])

	return (
		<div className='gallery absolute overflow-clip'>
			<ul className='cards flex flex-nowrap'>
				<li>0</li>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
				<li>9</li>
			</ul>
		</div>
	)
}
