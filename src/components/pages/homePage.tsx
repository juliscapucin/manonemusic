"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Copyright, Status } from "@/components"
import { Heading, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

type HomeData = {
	title: string
	text: string
}

export default function HomePage({ data }: { data: HomeData }) {
	const homeWrapperRef = useRef(null)
	const titleHomeRef = useRef(null)
	const pathname = usePathname()

	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleHomeRef, "/", windowAspectRatio)

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
			data-id='panel-home'
		>
			<div className='mt-32 h-40'>
				<TitleDisplay ref={titleHomeRef}>MAN/ONE MUSIC</TitleDisplay>
			</div>
			<div className='relative flex w-full'>
				<Heading tag='h2' variant='title' classes='w-1/2 uppercase'>
					Music & Sound Design
				</Heading>
				<Copyright />
			</div>

			<div className='w-full flex justify-between mt-32 md:mt-16'>
				<div className='w-1/2'>
					<p className='max-w-prose'>
						Tailored sound design and audio identities that capture the spirit
						of your brand and resonate with your audience.
					</p>
				</div>
				<p className='w-1/2'>Location: Amsterdam</p>
			</div>
			<Status location='Amsterdam' />
		</section>
	)
}
