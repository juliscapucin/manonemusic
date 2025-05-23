"use client"

import { useRef } from "react"

import { Copyright, Credits, SocialLinks } from "@/components"
import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import type { ContactPage } from "@/types"
import ButtonEmail from "../buttons/buttonEmail"

type ContactPageProps = ContactPage & {
	index: number
}

export default function ContactPage({
	title,
	subtitle,
	email,
	socials,
	index,
}: ContactPageProps) {
	const titleContactRef = useRef(null)

	return (
		<SectionWrapper>
			{subtitle && <Subtitle subtitle={subtitle} />}
			<TitleDisplay ref={titleContactRef} index={index}>
				{title}
			</TitleDisplay>
			<div className='mt-32 w-full flex flex-col-reverse lg:flex-row gap-16 *:flex-1 bg-primary'>
				<div>
					<Copyright />
					<Credits />
				</div>
				<ButtonEmail email={email} />

				<SocialLinks data={socials} />
			</div>
		</SectionWrapper>
	)
}
