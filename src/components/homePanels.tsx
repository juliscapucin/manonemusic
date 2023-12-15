"use client"

import React, { useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function homePanels() {
	const outerContainerRef = useRef<HTMLDivElement | null>(null)
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	let tween: gsap.core.Tween

	/* Main navigation */
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const container = panelsContainerRef.current
		if (!tween.scrollTrigger || !container) return
		e.preventDefault()

		const targetElem = e.target as HTMLAnchorElement
		const targetAttr = targetElem.getAttribute("href")

		const targetPanel = document.querySelector(targetAttr!) as HTMLDivElement

		let y = targetPanel!.offsetTop

		if (
			targetAttr &&
			panelsContainerRef.current!.isSameNode(targetPanel!.parentElement)
		) {
			let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
				totalMovement = container.scrollWidth - innerWidth
			y = Math.round(
				tween.scrollTrigger.start +
					(targetElem.offsetLeft / totalMovement) * totalScroll
			)
		}

		// console.log("useful stuff!", y, e.target.getAttribute("href"))

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

		tween = gsap.to(panels, {
			x: () => -1 * (container.scrollWidth - innerWidth),
			ease: "none",
			scrollTrigger: {
				trigger: container,
				pin: true,
				start: "top top",
				scrub: 1,
				end: () => "+=" + (container.scrollWidth - innerWidth),
				onUpdate: (self) => {
					// also useful!
					// console.log(self.progress, '/1')
					// console.log(window.scrollY, `/${document.body.scrollHeight - window.innerHeight}`)
				},
			},
		})
	}, [outerContainerRef, panelsContainerRef])

	return (
		<div id='page' className='site'>
			<div id='feather' className='feather'></div>

			<header id='masthead' className='site-header' role='banner'>
				<nav className='anchor-nav' role='navigation'>
					<button data-href='panel-1' className='anchor'>
						Panel 1
					</button>
					<button data-href='panel-2' className='anchor'>
						Panel 2
					</button>
					<button data-href='panel-3' className='anchor'>
						Panel 3
					</button>
					<button data-href='panel-4' className='anchor'>
						Panel 4
					</button>
					<button data-href='panel-5' className='anchor'>
						Panel 5
					</button>
					<button data-href='map' className='anchor'>
						Map
					</button>
				</nav>
			</header>

			<main id='content' className='site-content' role='main'>
				<section ref={outerContainerRef} id='panels'>
					<div ref={panelsContainerRef} id='panels-container' className='flex'>
						<article id='panel-1' className='panel full-screen red'>
							<div className='container'>
								<div className='row'>
									<div className='col-6'>
										<h1 className='text-displayLarge'>Panel</h1>
									</div>
									<div className='col-6 d-flex flex-column'>
										<h2>Panel 1</h2>

										<p className='step-description'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Including versions of Lorem Ipsum.
										</p>

										<div className='panels-navigation text-right'>
											<div className='nav-panel' data-sign='plus'>
												<a href='#panel-2' className='anchor'>
													Next
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</article>
						<article id='panel-2' className='panel full-screen orange'>
							<div className='container'>
								<div className='row'>
									<div className='col-6'>
										<h1 className='text-displayLarge'>Panel</h1>
									</div>
									<div className='col-6 d-flex flex-column'>
										<h2>Panel 2</h2>

										<p className='step-description'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Including versions of Lorem Ipsum.
										</p>

										<div className='panels-navigation'>
											<div className='nav-panel' data-sign='minus'>
												<a href='#panel-1' className='anchor'>
													Prev
												</a>
											</div>
											<div className='nav-panel' data-sign='plus'>
												<a href='#panel-3' className='anchor'>
													Next
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</article>
						<article id='panel-3' className='panel full-screen purple'>
							<div className='container'>
								<div className='row'>
									<div className='col-6'>
										<h1 className='text-displayLarge'>Panel</h1>
									</div>
									<div className='col-6 d-flex flex-column'>
										<h2>Panel 3</h2>

										<p className='step-description'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Including versions of Lorem Ipsum.
										</p>

										<div className='panels-navigation'>
											<div className='nav-panel' data-sign='minus'>
												<a href='#panel-2' className='anchor'>
													Prev
												</a>
											</div>
											<div className='nav-panel' data-sign='plus'>
												<a href='#panel-4' className='anchor'>
													Next
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</article>
						<article id='panel-4' className='panel full-screen green'>
							<div className='container'>
								<div className='row'>
									<div className='col-6'>
										<h1 className='text-displayLarge'>Panel</h1>
									</div>
									<div className='col-6 d-flex flex-column'>
										<h2>Panel 4</h2>

										<p className='step-description'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Including versions of Lorem Ipsum.
										</p>
										<div className='card'>test</div>
										<div className='card'>test</div>
										<div className='card'>test</div>
										<div className='card'>test</div>
										<div className='card'>test</div>
										<div className='card'>test</div>
										<div className='card'>test</div>
										<div className='card'>test</div>
										<div className='card'>test</div>
										<div className='card'>test</div>

										<div className='panels-navigation'>
											<div className='nav-panel' data-sign='minus'>
												<a href='#panel-3' className='anchor'>
													Prev
												</a>
											</div>
											<div className='nav-panel' data-sign='plus'>
												<a href='#panel-5' className='anchor'>
													Next
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</article>
						<article id='panel-5' className='panel full-screen gray'>
							<div className='container'>
								<div className='row'>
									<div className='col-6'>
										<h1 className='text-displayLarge'>Panel</h1>
									</div>
									<div className='col-6 d-flex flex-column'>
										<h2>Panel 5</h2>

										<p className='step-description'>
											Lorem Ipsum is simply dummy text of the printing and
											typesetting industry. Including versions of Lorem Ipsum.
										</p>
										<div className='cards-wrapper'>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>

											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
											<div className='card'>test</div>
										</div>

										<div className='panels-navigation text-right'>
											<div className='nav-panel' data-sign='minus'>
												<a href='#panel-4' className='anchor'>
													Prev
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</article>
					</div>
				</section>

				<section id='map' className='full-screen'></section>
			</main>
		</div>
	)
}
