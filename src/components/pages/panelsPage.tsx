"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"
import { SplitText } from "gsap/SplitText"

import { navLinks } from "@/constants"
import {
	AboutPage,
	ContactPage,
	ReleasesPage,
	WorkPage,
} from "@/components/pages"

const sectionsContent = [
	{ index: 1, heading: "Home" },
	{ index: 2, heading: "Work" },
	{ index: 3, heading: "Releases" },
	{ index: 4, heading: "About" },
	{ index: 5, heading: "Contact" },
]

export default function PanelsPage({ data }: { data: any }) {
	let sections: NodeListOf<HTMLElement>,
		images: NodeListOf<HTMLElement>,
		headings: HTMLElement[],
		outerWrappers: HTMLElement[],
		innerWrappers: HTMLElement[],
		splitHeadings: SplitText[],
		currentIndex = -1,
		wrap: (index: number) => number,
		animating: boolean

	function gotoSection(index: number, direction: number) {
		index = wrap(index)
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
			tl.to(images[currentIndex], { xPercent: -150 * dFactor }).set(
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

	useEffect(() => {
		gsap.registerPlugin(Observer)
		gsap.registerPlugin(SplitText)
		;(sections = document.querySelectorAll("section")),
			(images = document.querySelectorAll(".bg")),
			(headings = gsap.utils.toArray(".section-heading")),
			(outerWrappers = gsap.utils.toArray(".outer")),
			(innerWrappers = gsap.utils.toArray(".inner")),
			(splitHeadings = headings.map(
				(heading) =>
					new SplitText(heading, {
						type: "chars,words,lines",
						linesClass: "clip-text",
					})
			)),
			(currentIndex = -1),
			(wrap = gsap.utils.wrap(0, sections.length - 1))

		gsap.set(outerWrappers, { xPercent: 100 })
		gsap.set(innerWrappers, { xPercent: -100 })

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

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLElement // Type assertion here
		if (target.dataset.index) {
			const index = parseInt(target.dataset.index) - 1
			const direction = index > currentIndex ? 1 : -1
			gotoSection(index, direction)
			window.history.pushState({}, "", target.textContent?.toLowerCase())
		}
	}

	return (
		<div>
			<div className='fixed top-16 left-0 right-0 p-8 w-full z-50 flex justify-between'>
				{navLinks.map((link) => {
					return (
						<button
							key={link.label}
							onClick={handleClick}
							data-index={link.index}
						>
							{link.label}
						</button>
					)
				})}
			</div>
			<Section section={sectionsContent[0]} />
			<Section section={sectionsContent[1]} />
			<Section section={sectionsContent[2]} />
			<Section section={sectionsContent[3]} />
			<Section section={sectionsContent[4]} />
		</div>
	)
}

function Section({ section }: { section: { index: number; heading: string } }) {
	return (
		<section
			className={`${section.index} fixed top-0 w-full min-w-full h-full invisible`}
			key={section.index}
		>
			<div className='outer w-full h-full overflow-clip'>
				<div className='inner w-full h-full overflow-clip'>
					<div className='bg absolute flex flex-col justify-center items-center w-full h-full bg-primary'>
						<h2 className='section-heading text-displayLarge mb-8'>
							{section.heading}
						</h2>
					</div>
				</div>
			</div>
		</section>
	)
}
