"use client"

import React, { useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { navLinks } from "@/constants"
import {
	AboutPage,
	ContactPage,
	ReleasesPage,
	WorkPage,
} from "@/components/pages"
import { AllData } from "@/types"

export default function homePanels({ data }: { data: AllData }) {
	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	const headerRef = useRef<HTMLDivElement | null>(null)
	let tween: gsap.core.Tween

	const handleClick = (targetSection: string) => {
		console.log(targetSection)
		const container = panelsContainerRef.current
		if (!tween.scrollTrigger || !container) return

		const targetPanel = document.querySelector(
			`[data-id=${targetSection}]`
		) as HTMLDivElement
		let y = targetPanel!.offsetLeft

		// TO DO: check if this is necessary
		// if (
		// 	targetSection &&
		// 	panelsContainerRef.current!.isSameNode(targetPanel!.parentElement)
		// ) {
		// 	let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
		// 		totalMovement = container.scrollWidth - innerWidth
		// 	y = Math.round(
		// 		tween.scrollTrigger.start +
		// 			(targetElem.offsetLeft / totalMovement) * totalScroll
		// 	)
		// }

		// console.log("useful stuff!", y, targetSection)

		gsap.to(window, {
			scrollTo: {
				y: y,
				autoKill: false,
			},
			duration: 1,
		})
	}

	// ScrollTrigger + Panel animation
	useEffect(() => {
		if (!outerContainerRef.current || !panelsContainerRef.current) return
		gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

		/* Panels */
		const container = panelsContainerRef.current
		const panels = gsap.utils.toArray(".panel")

		let ctx = gsap.context(() => {
			tween = gsap.to(panels, {
				x: () => -1 * (container.scrollWidth - innerWidth),
				ease: "none",
				scrollTrigger: {
					trigger: outerContainerRef.current,
					pin: true,
					start: "top top",
					scrub: 1,
					end: () => "+=" + (container.scrollWidth - container.offsetWidth),
					invalidateOnRefresh: true,
					// markers: true,
					// onUpdate: (self) => {
					// 	console.log("end", self.end)
					// 	console.log(self.progress, "/1")
					// 	console.log(
					// 		window.scrollY,
					// 		`/${document.body.scrollHeight - window.innerHeight}`
					// 	)
					// },
				},
			})
		}, container)

		return () => {
			ctx.revert()
		}
	}, [outerContainerRef, panelsContainerRef])

	return (
		<div id='page' className='site'>
			<div id='feather' className='feather'></div>

			<header ref={headerRef} className='fixed z-100'>
				<nav className='flex gap-8'>
					{navLinks.map((link, index) => (
						<button
							key={`panel-button-${index}`}
							onClick={() => handleClick(`panel-${index}`)}
						>
							{link.label}
						</button>
					))}
				</nav>
			</header>

			<section ref={outerContainerRef} id='panels'>
				<div ref={panelsContainerRef} id='panels-container' className='flex'>
					{navLinks.map((section, index) => (
						<article
							data-id={`panel-${index}`}
							className='panel min-w-[2000px] h-screen min-h-full pl-8'
							key={`panel-${index}`}
						>
							<div className='container mt-32'>
								{section.label === "Home" && (
									<>
										<h1 className='text-displayLarge'>{section.label}</h1>

										<p className='text-titleLarge'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Including versions of Lorem Ipsum.
										</p>
									</>
								)}

								{section.label === "Work" && (
									<WorkPage data={data.projectCollection.items} />
								)}
								{section.label === "Releases" && (
									<ReleasesPage data={data.releasesCollection.items[0]} />
								)}
								{section.label === "About" && (
									<AboutPage data={data.aboutPageCollection.items[0]} />
								)}
								{section.label === "Contact" && <ContactPage data={data} />}

								{/* Previous/Next Navigation */}
								<div className='absolute bottom-8 left-8 flex gap-8'>
									<button
										onClick={() =>
											handleClick(
												`${index - 1 > 0 ? `panel-${index - 1}` : "panel-0"}`
											)
										}
									>
										Prev
									</button>
									<button
										onClick={() =>
											handleClick(
												`${
													index + 1 > navLinks.length
														? `panel-${navLinks.length}`
														: `panel-${index + 1}`
												}`
											)
										}
									>
										Next
									</button>
								</div>
							</div>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}
