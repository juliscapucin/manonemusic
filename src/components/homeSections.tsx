"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"
import { SplitText } from "gsap/SplitText"

const sections = [
	{ index: "first", bg: "one", heading: "Scroll down" },
	{ index: "second", bg: "two", heading: "Scroll down" },
	{ index: "third", bg: "three", heading: "Scroll down" },
	{ index: "fourth", bg: "four", heading: "Scroll down" },
	{ index: "fifth", bg: "five", heading: "Scroll down" },
]

export default function HomeSections() {
	useEffect(() => {
		gsap.registerPlugin(Observer)
		gsap.registerPlugin(SplitText)

		let sections = document.querySelectorAll("section"),
			images = document.querySelectorAll(".bg"),
			headings: HTMLElement[] = gsap.utils.toArray(".section-heading"),
			outerWrappers = gsap.utils.toArray(".outer"),
			innerWrappers = gsap.utils.toArray(".inner"),
			splitHeadings = headings.map(
				(heading) =>
					new SplitText(heading, {
						type: "chars,words,lines",
						linesClass: "clip-text",
					})
			),
			currentIndex = -1,
			wrap = gsap.utils.wrap(0, sections.length - 1),
			animating: boolean

		gsap.set(outerWrappers, { xPercent: 100 })
		gsap.set(innerWrappers, { xPercent: -100 })

		function gotoSection(index: number, direction: number) {
			index = wrap(index) // make sure it's valid
			animating = true
			let fromTop = direction === -1,
				dFactor = fromTop ? -1 : 1,
				tl = gsap.timeline({
					defaults: { duration: 1.25, ease: "power1.inOut" },
					onComplete: () => {
						animating = false
					},
				})
			if (currentIndex >= 0) {
				// The first time this function runs, current is -1
				gsap.set(sections[currentIndex], { zIndex: 0 })
				tl.to(images[currentIndex], { xPercent: -15 * dFactor }).set(
					sections[currentIndex],
					{ autoAlpha: 0 }
				)
			}
			gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 })
			tl.fromTo(
				[outerWrappers[index], innerWrappers[index]],
				{ xPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
				{ xPercent: 0 },
				0
			)
				.fromTo(images[index], { xPercent: 15 * dFactor }, { xPercent: 0 }, 0)
				.fromTo(
					splitHeadings[index].chars,
					{ autoAlpha: 0, xPercent: 150 * dFactor },
					{
						autoAlpha: 1,
						xPercent: 0,
						duration: 1,
						ease: "power2",
						stagger: {
							each: 0.02,
							from: "random",
						},
					},
					0.2
				)

			currentIndex = index
		}

		Observer.create({
			type: "wheel,touch,pointer",
			wheelSpeed: -1,
			onDown: () => {
				!animating && gotoSection(currentIndex - 1, -1)
			},
			onUp: () => {
				!animating && gotoSection(currentIndex + 1, 1)
			},
			tolerance: 10,
			preventDefault: true,
		})

		gotoSection(0, 1)

		// vertical version: https://codepen.io/GreenSock/pen/XWzRraJ
		// original vertical version without Observer: https://codepen.io/BrianCross/pen/PoWapLP
	}, [])

	return (
		<div>
			{sections.map((section) => (
				<section
					className={`${section.index} fixed top-0 w-full min-w-full h-full invisible`}
					key={section.index}
				>
					<div className='outer w-full h-full overflow-clip'>
						<div className='inner w-full h-full overflow-clip'>
							<div className='bg absolute flex justify-center items-center w-full h-full bg-primary'>
								<h2 className='section-heading text-displayLarge'>
									{section.index} {section.index} {section.index}{" "}
									{section.index} {section.index} {section.index}{" "}
								</h2>
							</div>
						</div>
					</div>
				</section>
			))}
		</div>
	)
}
