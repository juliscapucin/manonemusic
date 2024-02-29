"use client"

import React, { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

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
	const pathname = usePathname()
	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	const headerRef = useRef<HTMLDivElement | null>(null)
	let tween: gsap.core.Tween

	// Scroll / jump to panel on nav click / page load
	const handleSlide = (targetIndex: number, pushSlug: boolean) => {
		const container = panelsContainerRef.current
		if (!container) return

		const targetPanel = container.querySelector(
			`[data-id=panel-${targetIndex}]`
		) as HTMLDivElement
		let y = targetPanel?.offsetLeft || 0

		if (pushSlug === true) {
			gsap.to(window, {
				scrollTo: {
					y: y,
					autoKill: false,
				},
				duration: 1,
			})
			window.history.pushState({}, "", navLinks[targetIndex].slug.toLowerCase())
		} else {
			gsap.set(window, {
				scrollTo: {
					y: y,
					autoKill: false,
				},
			})
		}
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

	// Jump to panel on page load
	useEffect(() => {
		if (pathname === "/") return

		const index = navLinks.findIndex((link) => `/${link.slug}` === pathname)

		handleSlide(index, false)
	}, [pathname])

	return (
		<div id='page' className='site'>
			{pathname === "/" && (
				<header
					ref={headerRef}
					className={`fixed bottom-8 right-8 w-1/2 z-100`}
				>
					<nav className='flex flex-col items-start gap-2'>
						{navLinks.map((link, index) => (
							<button
								key={`panel-button-${index}`}
								onClick={() => handleSlide(index, true)}
							>
								{link.label}
							</button>
						))}
					</nav>
				</header>
			)}

			<Heading
				tag='h1'
				variant='headline'
				styles={`fixed top-0 left-0 w-screen text-center transition-transform duration-500 origin-top ${
					pathname === "/" ? "scale-[2.0]" : ""
				}`}
			>
				MAN/ONE MUSIC
			</Heading>

			<section ref={outerContainerRef}>
				<div ref={panelsContainerRef} className='flex'>
					{navLinks.map((section, index) => (
						<article
							data-id={`panel-${index}`}
							className={`${
								index > 0 && "ml-16"
							} panel custom-min-w-screen h-screen min-h-full pl-8 overflow-clip`}
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
										onClick={() => handleSlide(index - 1 > 0 ? index - 1 : 0)}
									>
										Prev
									</button>
									<button
										onClick={() =>
											handleSlide(
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
