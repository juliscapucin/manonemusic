"use client"

import { useRef } from "react"

import { Copyright, Status } from "@/components"
import { PageWrapper, Heading } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type HomeData = {
	title: string
	text: string
}

export default function HomePage({ data }: { data: HomeData }) {
	const titleHomeRef = useRef(null)

	useTitleScrollTrigger(titleHomeRef)

	return (
		<PageWrapper>
			<Heading tag='h1' variant='display'>
				MAN/ONE MUSIC
			</Heading>
			<div className='flex w-full'>
				<Heading tag='h2' variant='headline' styles='w-1/2'>
					Music & Sound Design
				</Heading>
				<Status location='Amsterdam' />
			</div>
			<div className='flex items-end h-full bg-red-500'>
				<p className='w-1/4'>
					Tailored sound design and audio identities that captures the spirit of
					your brand and resonate with your audience. Let's elevate your
					identity through sound.
				</p>
			</div>
		</PageWrapper>
	)
}
