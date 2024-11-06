"use client"

import { useRef } from "react"

import { location } from "@/constants"

import { Copyright, Status } from "@/components"
import { Heading } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import type { HomePage } from "@/types"

export default function HomePage({ data }: { data: HomePage }) {
	const titleHomeRef = useRef(null)

	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleHomeRef, "/", windowAspectRatio)

	return (
		<section
			className='relative w-screen h-screen min-h-svh custom-min-w-screen max-w-desktop pb-8 overflow-x-clip'
			data-id='panel-home'
		>
			<div className='mt-32'>
				<h1 ref={titleHomeRef} className='logo'>
					MAN/ONE MUSIC
				</h1>
			</div>
			<div className='relative flex w-full md:mt-8'>
				<Heading tag='h2' variant='title' classes='w-1/2 uppercase'>
					Music & Sound Design
				</Heading>
			</div>

			<div className='w-full flex justify-between mt-32 md:mt-16'>
				<div className='w-1/2'>
					<p className='text-balance max-w-prose'>
						Tailored sound design and audio identities that capture the spirit
						of your brand and resonate with your audience.
					</p>
				</div>
				<Status location={location} />
			</div>
			<Copyright hasCredits={false} />
			{/* <Availability /> */}
		</section>
	)
}
