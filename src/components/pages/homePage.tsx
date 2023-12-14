"use client"

import { useEffect, useRef } from "react"

import gsap, { toArray } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Observer } from "gsap/Observer"
import { SplitText } from "gsap/SplitText"

import {
	AboutPage,
	ContactPage,
	ReleasesPage,
	WorkPage,
} from "@/components/pages"

const sectionsContent = [
	{ index: 1, heading: "Home", width: 0 },
	{ index: 2, heading: "Work", width: 0 },
	{ index: 3, heading: "Releases", width: 0 },
	{ index: 4, heading: "About", width: 0 },
	{ index: 5, heading: "Contact", width: 0 },
]

export default function HomePage({ data }: { data: any }) {
	const sectionsContainerRef = useRef<HTMLDivElement | null>(null)
	const outerContainerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!sectionsContainerRef.current || !outerContainerRef.current) return

		gsap.registerPlugin(ScrollTrigger, Observer, SplitText)

		const sections = gsap.utils.toArray(
			sectionsContainerRef.current.children
		) as HTMLDivElement[]

		const getScrollAmount = () => {
			const totalWidth = sections.reduce((width: number, section: any) => {
				return width + section.offsetWidth
			}, 0)
			return (totalWidth - window.innerWidth) * -1
		}

		const getSectionWidth = () => {
			sections.forEach((section, index) => {
				sectionsContent[index].width = section.offsetWidth
			})
		}

		getScrollAmount()

		let ctx = gsap.context(() => {
			getSectionWidth()

			console.log(sectionsContent)

			const tl = gsap.timeline({
				paused: true,
				scrollTrigger: {
					start: "top top",
					trigger: outerContainerRef.current,
					end: () => `+=${getScrollAmount() * -1}`,
					pin: true,
					scrub: 1,
				},
			})

			tl.to(sections, {
				x: () => `+=${getScrollAmount()}`,
				ease: "none",
			})
		})

		return () => {
			ctx.revert()
		}
	}, [sectionsContainerRef, outerContainerRef])

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLElement // Type assertion here
		if (target.dataset.index) {
			window.history.pushState({}, "", target.textContent?.toLowerCase())
		}
	}

	return (
		<div ref={outerContainerRef}>
			{/* <div className='fixed top-16 left-0 right-0 p-8 w-full z-50 flex justify-between'>
				{navLinks.map((link, index) => {
					if (index === 0) return
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
			</div> */}

			<div ref={sectionsContainerRef} className='flex'>
				<AboutPage data={data.aboutPageCollection.items[0]} />
				<WorkPage data={data.projectCollection.items} />
				<ReleasesPage data={data.releasesCollection.items[0]} />
				<AboutPage data={data.aboutPageCollection.items[0]} />
				<ContactPage data={data} />
			</div>
		</div>
	)
}
