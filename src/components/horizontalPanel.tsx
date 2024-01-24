"use client"

import React, { useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { navLinks } from "@/constants"
import {
	AboutPage,
	ContactPage,
	HomePage,
	ReleasesPage,
	WorkPage,
} from "@/components/pages"
import { AllData } from "@/types"
import { Heading } from "@/components/ui"

export default function HorizontalPanel({ data }: { data: AllData }) {
	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	const headerRef = useRef<HTMLDivElement | null>(null)
	let tween: gsap.core.Tween

	// Scroll to panel on nav click
	const handleClick = (targetIndex: number) => {
		const container = panelsContainerRef.current
		if (!tween.scrollTrigger || !container) return

		const targetPanel = document.querySelector(
			`[data-id=panel-${targetIndex}]`
		) as HTMLDivElement
		let y = targetPanel!.offsetLeft

		gsap.to(window, {
			scrollTo: {
				y: y,
				autoKill: false,
			},
			duration: 1,
		})

		window.history.pushState({}, "", navLinks[targetIndex].slug.toLowerCase())
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

			<header ref={headerRef} className='fixed bottom-8 right-8 w-1/2 z-100'>
				<nav className='flex flex-col items-start gap-2'>
					{navLinks.map((link, index) => (
						<button
							key={`panel-button-${index}`}
							onClick={() => handleClick(index)}
						>
							{link.label}
						</button>
					))}
				</nav>
			</header>

			<Heading
				tag='h1'
				variant='headline'
				styles='fixed top-0 left-0 w-screen text-center'
			>
				MAN/ONE MUSIC
			</Heading>

			<section ref={outerContainerRef}>
				<div ref={panelsContainerRef} className='flex'>
					{navLinks.map((section, index) => (
						<article
							data-id={`panel-${index}`}
							className='panel min-w-[2000px] h-screen min-h-full pl-8 overflow-clip'
							key={`panel-${index}`}
						>
							<div className='container mt-32'>
								{section.label.toLowerCase() === "home" && (
									<HomePage data={data.aboutPageCollection.items[0]} />
								)}

								{section.label.toLowerCase() === "work" && (
									<WorkPage data={data.projectCollection.items} />
								)}
								{section.label.toLowerCase() === "releases" && (
									<ReleasesPage data={data.releasesCollection.items[0]} />
								)}
								{section.label.toLowerCase() === "about" && (
									<AboutPage data={data.aboutPageCollection.items[0]} />
								)}
								{section.label.toLowerCase() === "contact" && (
									<ContactPage data={data} />
								)}

								{/* Previous/Next Navigation */}
								{/* <div className='absolute bottom-8 left-8 flex gap-8'>
									<button
										onClick={() => handleClick(index - 1 > 0 ? index - 1 : 0)}
									>
										Prev
									</button>
									<button
										onClick={() =>
											handleClick(
												index + 1 > navLinks.length
													? navLinks.length
													: index + 1
											)
										}
									>
										Next
									</button>
								</div> */}
							</div>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}
