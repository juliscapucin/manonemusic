"use client"

import { useRef } from "react"

import { Availability, Copyright, SocialLinks } from "@/components"
import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import type { ContactPage } from "@/types"

export default function ContactPage({ data }: { data: ContactPage }) {
	const titleContactRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleContactRef, "/contact", windowAspectRatio)

	return (
		<PageWrapper>
			<TitleDisplay ref={titleContactRef}>{data.title}</TitleDisplay>
			<div className='flex justify-between mt-32'>
				<Availability availability='' />
				<SocialLinks data={data.socials} />
			</div>
			<Copyright />
		</PageWrapper>
	)
}
