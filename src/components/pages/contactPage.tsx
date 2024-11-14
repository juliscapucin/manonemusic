"use client"

import { useRef } from "react"

import { Availability, Copyright, SocialLinks } from "@/components"
import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import type { ContactPage } from "@/types"

export default function ContactPage({ title, subtitle, socials }: ContactPage) {
	const titleContactRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleContactRef, "/contact", windowAspectRatio)

	return (
		<SectionWrapper>
			{subtitle && <Subtitle subtitle={subtitle} />}
			<TitleDisplay ref={titleContactRef}>{title}</TitleDisplay>
			<div className='flex justify-between mt-16 ml-[25%]'>
				<Availability availability='' />
				<SocialLinks data={socials} />
			</div>
			<Copyright />
		</SectionWrapper>
	)
}
