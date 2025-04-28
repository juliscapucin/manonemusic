"use client"

import { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { AllData, NavLink } from "@/types"
import { PanelContent } from "@/components"
import { animateSplitText } from "@/animations"

type PanelDesktopProps = {
	data: AllData
	sections: NavLink[]
}

export default function PanelDesktop({ data, sections }: PanelDesktopProps) {
	const panelsContainerRef = useRef<HTMLDivElement | null>(null)
	// const tweenRef = useRef<gsap.core.Tween | null>(null)
	const [tweenRef, setTweenRef] = useState<gsap.core.Tween | null>(null)
	const [isPageLoaded, setIsPageLoaded] = useState(false)

	useEffect(() => {
		setIsPageLoaded(true)
	}, [])

	// Horizontal Panel animation
	useEffect(() => {
		if (!panelsContainerRef.current || !isPageLoaded) return
		gsap.registerPlugin(ScrollTrigger)

		/* Panels */
		const container = panelsContainerRef.current
		const panels = gsap.utils.toArray(".gsap-panel")

		const ctx = gsap.context(() => {
			const tween = gsap.to(panels, {
				x: () => -1 * (container.scrollWidth - innerWidth),
				ease: "none",
				scrollTrigger: {
					trigger: container,
					pin: true,
					start: "top top",
					scrub: 1,
					end: () => "+=" + (container.scrollWidth - container.offsetWidth),
					invalidateOnRefresh: true,
					// markers: true,
				},
			})

			// set Ref value to pass down to children
			// tweenRef.current = tween
			setTweenRef(tween)
		}, container)

		return () => {
			ctx.revert()
		}
	}, [isPageLoaded])

	return (
		<main>
			<div
				ref={panelsContainerRef}
				className='gsap-panels-container flex gap-32 opacity-0'
			>
				{sections.map((section) => {
					return (
						<section
							data-id={`panel-${section.slug === "/" ? "home" : section.slug}`}
							className='gsap-panel h-screen min-h-full pl-8 min-w-fit w-fit overflow-clip'
							key={`panel-${section.slug}`}
						>
							<PanelContent
								data={data}
								section={section.slug}
								tween={tweenRef}
							/>
						</section>
					)
				})}
			</div>
		</main>
	)
}
