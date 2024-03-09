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
	ProjectsPage,
} from "@/components/pages"
import { AllData } from "@/types"
import { NavBar } from "@/components"
import { Logo } from "@/components/ui"
import { ButtonScroll } from "./buttons"
import { handlePanelSlide } from "@/lib/animations"

export default function PanelDesktop({ data }: { data: AllData }) {
	const pathname = usePathname()
	const [isHome, setIsHome] = useState(pathname === "/" ? true : false)
	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	let tween: gsap.core.Tween

	useEffect(() => {
		setIsHome(pathname === "/" ? true : false)
	}, [pathname])

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
					onUpdate: (self) => {
						// fix this!
						// if (self.progress <= 0.12 && !isHome) {
						// 	window.history.pushState(null, "", "/")
						// 	setIsHome(true)
						// }
						// console.log("end", self.end)
						// console.log(self.progress, "/1")
						// console.log(
						// 	window.scrollY,
						// 	`/${document.body.scrollHeight - window.innerHeight}`
						// )
					},
				},
			})
		}, container)

		return () => {
			ctx.revert()
		}
	}, [outerContainerRef, panelsContainerRef])

	// Jump to panel on internal page load
	useEffect(() => {
		if (!pathname) return

		if (pathname === "/") {
			setIsHome(true)
			return
		}

		setIsHome(false)
		const index = navLinks.findIndex((link) => `/${link.slug}` === pathname)

		handlePanelSlide(index, false)
	}, [])

	return (
		<div>
			<NavBar
				navLinks={navLinks}
				transitionOnClick={handlePanelSlide}
				isHome={isHome}
			/>

			<Logo handlePanelSlide={handlePanelSlide} />

			{/* Panels */}
			<div ref={outerContainerRef}>
				<div ref={panelsContainerRef} className='flex gap-32'>
					{navLinks.map((section, index) => (
						<section
							data-id={`panel-${index}`}
							className={`panel custom-min-w-screen h-screen min-h-full pl-8 overflow-clip`}
							key={`panel-${index}`}
						>
							{section.label.toLowerCase() === "home" && (
								<HomePage data={data.aboutPageCollection.items[0]} />
							)}

							{section.label.toLowerCase() === "projects" && (
								<ProjectsPage data={data.projectCollection.items} />
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
							<div className='absolute bottom-1/2 right-8 flex gap-8 z-20'>
								{/* <ButtonScroll
									action={() =>
										handlePanelSlide(index - 1 > 0 ? index - 1 : 0, true)
									}
								/> */}
								<ButtonScroll
									action={() =>
										handlePanelSlide(
											index + 1 > navLinks.length ? navLinks.length : index + 1,
											true
										)
									}
								/>
							</div>
						</section>
					))}
				</div>
			</div>
		</div>
	)
}
