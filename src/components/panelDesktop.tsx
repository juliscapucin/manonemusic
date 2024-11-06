"use client"

import React, { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { navLinks } from "@/constants"

import { AllData } from "@/types"
import { NavBar, PanelContent } from "@/components"
import { ButtonScroll } from "./buttons"
import { handlePanelSlide, panelsEnter } from "@/lib/animations"

type PanelDesktopProps = {
	data: AllData
}

export default function PanelDesktop({ data }: PanelDesktopProps) {
	const pathname = usePathname()
	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	let tween: gsap.core.Tween

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
						// TODO fix this!
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
		if (!pathname || !outerContainerRef.current) return

		if (pathname !== "/") {
			handlePanelSlide(pathname, false)
		}
		panelsEnter(outerContainerRef.current)
	}, [])

	return (
		<div className='hidden lg:block'>
			<NavBar navLinks={navLinks} variant='section' />

			{/* Panels */}
			<div ref={outerContainerRef} className='gsap-panels-container opacity-0'>
				<div ref={panelsContainerRef} className='flex gap-32'>
					{navLinks.map((section, index) => {
						return (
							<section
								data-id={`panel-${section.slug}`}
								className={`panel custom-min-w-screen h-screen min-h-full pl-8 overflow-clip`}
								key={`panel-${section.slug}`}
							>
								<PanelContent
									data={data}
									section={section.label.toLowerCase()}
								/>

								{/* Previous/Next Navigation */}
								<div className='absolute bottom-1/2 right-8 flex gap-8 z-20'>
									{/* <ButtonScroll
									action={() =>
										handlePanelSlide(index - 1 > 0 ? index - 1 : 0, true)
									}
								/> */}
									<ButtonScroll
										action={() => {
											const nextIndex =
												index + 1 > navLinks.length
													? navLinks.length
													: index + 1
											const nextSlug = navLinks[nextIndex].slug

											handlePanelSlide(nextSlug, true)
										}}
									/>
								</div>
							</section>
						)
					})}
				</div>
			</div>
		</div>
	)
}
