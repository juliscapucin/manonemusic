"use client"

import React, { useEffect, useRef, useState } from "react"
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
import { NavBar } from "@/components"

export default function HorizontalPanel({ data }: { data: AllData }) {
	const pathname = usePathname()
	const [isHome, setIsHome] = useState(pathname === "/" ? true : false)
	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
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

	// Jump to panel on internal page load
	useEffect(() => {
		if (pathname === "/") {
			setIsHome(true)
			return
		}

		setIsHome(false)
		const index = navLinks.findIndex((link) => `/${link.slug}` === pathname)

		handleSlide(index, false)
	}, [pathname])

	return (
		<div>
			<NavBar
				navLinks={navLinks}
				transitionOnClick={handleSlide}
				isHome={isHome}
			/>

			{/* Logo */}
			<h1
				className={`logo fixed top-0 left-0 w-screen font-medium text-center leading-none transition-transform duration-500 origin-top ${
					isHome ? "" : "scale-20"
				}`}
			>
				MAN/ONE MUSIC
			</h1>

			{/* Panels */}
			<div ref={outerContainerRef}>
				<div ref={panelsContainerRef} className='flex'>
					{navLinks.map((section, index) => (
						<section
							data-id={`panel-${index}`}
							className={`${
								index > 0 && "ml-32"
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
						</section>
					))}
				</div>
			</div>
		</div>
	)
}
