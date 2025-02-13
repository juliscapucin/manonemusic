"use client"

import { useRef } from "react"

import { Availability, Copyright, SocialLinks } from "@/components"
import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import type { ContactPage } from "@/types"
import ButtonEmail from "../buttons/buttonEmail"

export default function ContactPage({ title, subtitle, socials }: ContactPage) {
	const titleContactRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleContactRef, "/contact", windowAspectRatio)

	return (
		<SectionWrapper>
			{subtitle && <Subtitle subtitle={subtitle} />}
			<TitleDisplay ref={titleContactRef}>{title}</TitleDisplay>
			<div className='w-full h-full flex justify-between items-end'>
				<Copyright />
				<div className='mt-16'>
					<Availability availability='' />
					<ButtonEmail />
				</div>
				<SocialLinks data={socials} />
			</div>
		</SectionWrapper>
	)
}
