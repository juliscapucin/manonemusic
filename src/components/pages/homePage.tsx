"use client"

import { useEffect, useRef } from "react"

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

	useEffect(() => {
		if (!homeWrapperRef.current) return

		gsap.registerPlugin(ScrollTrigger)
		const homeWrapper = homeWrapperRef.current as HTMLDivElement

		const offsetLeft = () => homeWrapper!.offsetLeft
		const width = () => homeWrapper!.offsetWidth

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: homeWrapper,
				start: () => `${offsetLeft()}px bottom`,
				end: () => `+=${width()}`,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					self.isActive && window.history.pushState({}, "", "/")
				},
			})
		})

		return () => ctx.revert()
	}, [homeWrapperRef])

	return (
		<div
			ref={homeWrapperRef}
			className='w-screen custom-min-w-screen custom-min-h-screen h-full'
		>
			<div className='flex w-full'>
				<Heading tag='h2' variant='headline' styles='w-1/2'>
					Music & Sound Design
				</Heading>
				<Status location='Amsterdam' />
			</div>
			<div className='absolute left-8 bottom-0'>
				<p className='w-1/4'>
					Tailored sound design and audio identities that captures the spirit of
					your brand and resonate with your audience. Let's elevate your
					identity through sound.
				</p>
			</div>
		</div>
	)
}
