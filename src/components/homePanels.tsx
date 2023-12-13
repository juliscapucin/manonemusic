import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function homePanels() {
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)

	// useEffect(() => {
	// 	if (!panelsContainerRef.current) return

	// 	gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

	// 	/* Main navigation */
	// 	const tl = gsap.timeline({})

	// 	/* Panels */
	// 	const panels = gsap.utils.toArray(".panel")
	// 	tl.to(panels, {
	// 		xPercent: -100 * (panels.length - 1),
	// 		ease: "none",
	// 		scrollTrigger: {
	// 			trigger: panelsContainerRef.current,
	// 			pin: true,
	// 			scrub: 1,
	// 			snap: {
	// 				snapTo: 1 / (panels.length - 1),
	// 				inertia: false,
	// 				duration: { min: 0.1, max: 0.1 },
	// 			},
	// 			markers: true,
	// 			end: () =>
	// 				"+=" + (panelsContainerRef.current!.offsetWidth - innerWidth),
	// 		},
	// 	})
	// }, [panelsContainerRef])

	useEffect(() => {
		if (!panelsContainerRef.current) return
		gsap.registerPlugin(ScrollTrigger)

		const sections = gsap.utils.toArray(".panel") as HTMLDivElement[]

		let maxWidth = 0

		// Infinite Horizontal Scroll
		const getMaxWidth = () => {
			const width = sections.reduce((totalWidth, section) => {
				return totalWidth + section.offsetWidth
			}, 0)

			maxWidth = width
		}

		ScrollTrigger.addEventListener("refreshInit", getMaxWidth)

		gsap.to(sections, {
			x: () => -(maxWidth - window.innerWidth),
			ease: "none",
			scrollTrigger: {
				trigger: panelsContainerRef.current,
				pin: true,
				scrub: true,
				start: 1,
				end: "+=5000",
				invalidateOnRefresh: true,
				markers: true,
				onLeave: (self) => {
					console.log("onLeave")
					self.scroll(4)
					ScrollTrigger.update()
				},
				onLeaveBack: (self) => {
					console.log("onLeaveBack")
					// self.scroll(ScrollTrigger.maxScroll(window) - 4)
					self.scroll(4)
					ScrollTrigger.update()
				},
			},
		})
	}, [panelsContainerRef])

	return (
		<>
			<header className='site-header fixed z-50' role='banner'>
				<nav className='anchor-nav' role='navigation'>
					<a href='#intro' className='anchor'>
						Home
					</a>
					<a href='#panel-1' className='anchor'>
						Panel 1
					</a>
					<a href='#panel-3' className='anchor'>
						Panel 3
					</a>
					<a href='#panel-5' className='anchor'>
						Panel 5
					</a>
				</nav>
			</header>
			<div
				ref={panelsContainerRef}
				className='w-full min-w-full h-full flex overflow-clip'
			>
				<section
					id={"panel-home"}
					className='panel bg-red-500 min-w-full h-full'
				></section>
				<section
					id={"panel-work"}
					className='panel bg-blue-500 min-w-full h-full'
				></section>
				<section
					id={"panel-releases"}
					className='panel bg-yellow-500 min-w-full h-full'
				></section>
				<section
					id={"panel-about"}
					className='panel bg-green-500 min-w-full h-full'
				></section>
				<section
					id={"panel-home"}
					className='panel bg-red-500 min-w-full h-full'
				></section>
			</div>
		</>
	)
}
