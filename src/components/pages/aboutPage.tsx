"use client"

import { useRef } from "react"
import Image from "next/image"

import {
	SectionWrapper,
	Subtitle,
	TextBlock,
	TitleDisplay,
} from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import { ButtonRounded } from "@/components/buttons"

import type { AboutPage } from "@/types"
import { urlFor } from "@/lib/sanityImageURL"

export default function AboutPage({
	title,
	subtitle,
	content,
	image,
}: AboutPage) {
	const titleAboutRef = useRef(null)

	// useTitleScrollTrigger(titleAboutRef, "/about")

	return (
		<SectionWrapper classes='landscape:flex justify-between items-start gap-8'>
			<div className='flex-1'>
				<TitleDisplay ref={titleAboutRef}>{title}</TitleDisplay>
				{subtitle && <Subtitle subtitle={subtitle} />}
			</div>
			<div className='relative flex-1 mt-16'>
				<div className='block relative aspect-square rounded-sm overflow-clip'>
					<Image
						{...{
							src: urlFor(image.imageRef).url(), // generate url via _ref to save on api calls
							alt: `Profile picture of Matt Rudge, the leading figure behind ManOne Music`,
							fill: true,
							className: "object-cover",
							sizes: "50vw",
						}}
					/>
				</div>
			</div>
			<div className='flex-1 mt-16'>
				{content && <TextBlock text={content} />}
				<div className='flex gap-4'>
					<ButtonRounded
						label='Services'
						action={() => console.log("services")}
					/>
					<ButtonRounded
						label='Clients'
						action={() => console.log("clients")}
					/>
				</div>
			</div>
		</SectionWrapper>
	)

	return <h1>About</h1>
}
