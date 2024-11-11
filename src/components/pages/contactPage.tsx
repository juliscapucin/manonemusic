"use client"

import { useRef } from "react"

import { Availability, Copyright, SocialLinks } from "@/components"
import { PageWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import type { ContactPage } from "@/types"

export default function ContactPage({ data }: { data: ContactPage }) {
	const titleContactRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleContactRef, "/contact", windowAspectRatio)

	return (
		<PageWrapper>
			<Subtitle subtitle={data.subtitle} />
			<TitleDisplay ref={titleContactRef}>{data.title}</TitleDisplay>
			<div className='flex justify-between mt-16 ml-[25%]'>
				<Availability availability='' />
				<SocialLinks data={data.socials} />
			</div>
			<Copyright />
		</PageWrapper>
	)
}
