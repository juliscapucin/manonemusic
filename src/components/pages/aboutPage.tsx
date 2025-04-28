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

type AboutPageProps = AboutPage & { tween: gsap.core.Tween | null }

export default function AboutPage({
	title,
	subtitle,
	content,
	image,
	tween,
}: AboutPageProps) {
	const titleAboutRef = useRef(null)

	useTitleScrollTrigger(titleAboutRef, "/about", tween)

	return (
		<SectionWrapper classes='landscape:flex justify-between items-start gap-8'>
			<div className=''>
				<TitleDisplay ref={titleAboutRef}>{title}</TitleDisplay>
				{subtitle && <Subtitle subtitle={subtitle} />}
			</div>
			<div className='relative min-w-[30vw] mt-16 md:hidden lg:block'>
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
			<div className='mt-16 w-[30vw]'>
				{content && <TextBlock text={content} />}
			</div>
			<div className='mt-16 w-[30vw]'>
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
