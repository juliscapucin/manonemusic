"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Copyright, Status } from "@/components"
import { Heading } from "@/components/ui"

type HomeData = {
	title: string
	text: string
}

export default function HomePage({ data }: { data: HomeData }) {
	const homeWrapperRef = useRef(null)
	const pathname = usePathname()

	// ScrollTrigger for Page Reveal
	// TODO add trigger for home page
	useEffect(() => {
		if (!homeWrapperRef.current || pathname !== "/") return

		gsap.registerPlugin(ScrollTrigger)
		const homeWrapper = homeWrapperRef.current as HTMLDivElement

		const offsetLeft = () => homeWrapper!.offsetLeft
		const width = () => homeWrapper!.offsetWidth

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: homeWrapper,
				start: () => `${offsetLeft()}px bottom`,
				end: () => `+=${width()}`,
				toggleActions: "play none none reverse",
				onUpdate: (self) => {
					if (self.isActive && window.location.pathname !== "/") {
						window.history.pushState(null, "", "/")
					}
				},
			})
		})

		return () => ctx.revert()
	}, [homeWrapperRef])

	return (
		<section
			ref={homeWrapperRef}
			className='relative w-screen h-screen custom-min-h-screen'
		>
			<div className='relative flex mt-48 w-screen pr-16'>
				<Heading tag='h2' variant='headline' styles='w-1/2'>
					Music & Sound Design
				</Heading>
				<Status location='Amsterdam' />
			</div>

			<p className='w-3/4 md:w-1/4 mt-32 md:mt-4'>
				Tailored sound design and audio identities that captures the spirit of
				your brand and resonate with your audience. Let's elevate your identity
				through sound.
			</p>
		</section>
	)
}
