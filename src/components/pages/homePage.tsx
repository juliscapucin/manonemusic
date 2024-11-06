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
		<div
			className='relative w-screen h-screen min-h-svh max-w-desktop pt-32 pb-16 overflow-x-clip'
			data-id='panel-home'
		>
			<Copyright hasCredits={false} />
			<h1 ref={titleHomeRef} className='logo'>
				MAN/ONE MUSIC
			</h1>
			<Heading tag='h2' variant='title' classes='w-1/2 mt-8 uppercase'>
				Music & Sound Design
			</Heading>
			<div className='w-full flex justify-between mt-32 md:mt-16'>
				<p className='text-balance max-w-prose'>
					Tailored sound design and audio identities that capture the spirit of
					your brand and resonate with your audience.
				</p>
				<Status location={location} />
			</div>
			{/* <Availability /> */}
		</div>
	)
}
