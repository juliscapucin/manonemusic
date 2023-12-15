"use client"

import React, { useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function homePanels() {
	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	const headerRef = useRef<HTMLDivElement | null>(null)
	let tween: gsap.core.Tween

	/* Main navigation */
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const container = panelsContainerRef.current
		if (!tween.scrollTrigger || !container) return

		const targetElem = e.target as HTMLButtonElement
		const targetAttr = targetElem.getAttribute("data-href")

		const targetPanel = document.querySelector(
			`[data-id=${targetAttr}]`
		) as HTMLDivElement
		let y = targetPanel!.offsetLeft

		// TO DO: check if this is necessary
		// if (
		// 	targetAttr &&
		// 	panelsContainerRef.current!.isSameNode(targetPanel!.parentElement)
		// ) {
		// 	let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
		// 		totalMovement = container.scrollWidth - innerWidth
		// 	y = Math.round(
		// 		tween.scrollTrigger.start +
		// 			(targetElem.offsetLeft / totalMovement) * totalScroll
		// 	)
		// }

		// console.log("useful stuff!", y, targetAttr)

		gsap.to(window, {
			scrollTo: {
				y: y,
				autoKill: false,
			},
			duration: 1,
		})
	}

	useEffect(() => {
		if (!outerContainerRef.current || !panelsContainerRef.current) return
		gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

		/* Panels */
		const container = panelsContainerRef.current
		const panels = gsap.utils.toArray(".panel")

		console.log("scrollWidth", container.scrollWidth)
		console.log("offsetWidth", container.offsetWidth)

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
					markers: true,
					onUpdate: (self) => {
						console.log("end", self.end)
						console.log(self.progress, "/1")
						console.log(
							window.scrollY,
							`/${document.body.scrollHeight - window.innerHeight}`
						)
					},
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
					{Array.from({ length: 4 }).map((_, index) => (
						<button
							key={`panel-button-${index}`}
							data-href={`panel-${index + 1}`}
							onClick={(e) => handleClick(e)}
						>
							Panel {index + 1}
						</button>
					))}
				</nav>
			</header>

			<section ref={outerContainerRef} id='panels'>
				<div ref={panelsContainerRef} id='panels-container' className='flex'>
					{Array.from({ length: 4 }).map((_, index) => (
						<article
							data-id={`panel-${index + 1}`}
							className='panel min-w-full w-full h-screen min-h-full outline outline-secondary'
							key={`panel-${index}`}
						>
							<div className='container mt-32'>
								<div className='col-6'>
									<h1 className='text-displayLarge'>Panel {index + 1}</h1>
								</div>
								<div className='col-6 d-flex flex-column'>
									<p className='step-description'>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Including versions of Lorem Ipsum.
									</p>

									<div className='panels-navigation'>
										<div className='nav-panel' data-sign='minus'>
											<button
												data-href={
													index - 1 > 1 ? `panel-${index - 1}` : "panel-1"
												}
												onClick={(e) => handleClick(e)}
											>
												Prev
											</button>
										</div>
										<div className='nav-panel' data-sign='plus'>
											<button
												data-href={
													index + 1 < 4 ? `panel-${index + 1}` : "panel-4"
												}
											>
												Next
											</button>
										</div>
									</div>
								</div>
							</div>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}
