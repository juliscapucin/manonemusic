"use client"

import { useRef } from "react"

import { Copyright, Status } from "@/components"
import { PageWrapper, Heading, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type HomeData = {
	title: string
	text: string
}

export default function HomePage({ data }: { data: HomeData }) {
	const titleHomeRef = useRef(null)

	useTitleScrollTrigger(titleHomeRef, "/")

	return (
		<PageWrapper>
			<div className='flex w-full'>
				<Heading tag='h2' variant='headline' styles='w-1/2'>
					Music & Sound Design
				</Heading>
				<Status location='Amsterdam' />
			</div>
			<Title ref={titleHomeRef}>Home</Title>
			<div className='absolute left-8 bottom-0'>
				<p className='w-1/4'>
					Tailored sound design and audio identities that captures the spirit of
					your brand and resonate with your audience. Let's elevate your
					identity through sound.
				</p>
			</div>
		</PageWrapper>
	)
}
