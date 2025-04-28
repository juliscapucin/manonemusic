"use client"

import { useRef } from "react"

import { Copyright, SocialLinks } from "@/components"
import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import type { ContactPage } from "@/types"
import ButtonEmail from "../buttons/buttonEmail"

export default function ContactPage({ title, subtitle, socials }: ContactPage) {
	const titleContactRef = useRef(null)

	// useTitleScrollTrigger(titleContactRef, "/contact")

	return (
		<SectionWrapper>
			{subtitle && <Subtitle subtitle={subtitle} />}
			<TitleDisplay ref={titleContactRef}>{title}</TitleDisplay>
			<div className='mt-32 w-full flex justify-between items-end'>
				<Copyright />

				<ButtonEmail />

				<SocialLinks data={socials} />
			</div>
		</SectionWrapper>
	)
}
