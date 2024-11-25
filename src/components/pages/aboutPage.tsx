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

import type { AboutPage } from "@/types"

export default function AboutPage({
	title,
	subtitle,
	content,
	image,
}: AboutPage) {
	const titleAboutRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleAboutRef, "/about", windowAspectRatio)

	return (
		<SectionWrapper classes='lg:flex justify-between items-start md:gap-64 lg:gap-16'>
			<div className='md:w-1/2 xl:w-1/3 z-10'>
				<TitleDisplay ref={titleAboutRef}>{title}</TitleDisplay>
				{subtitle && <Subtitle subtitle={subtitle} />}
			</div>
			<div className='md:w-1/2 xl:w-2/3 mt-16 md:flex flex-col xl:flex-row items-start gap-16'>
				<div className='relative flex-1 w-full aspect-square rounded-sm overflow-clip'>
					<Image
						{...{
							src: image.imageUrl,
							alt: `${title} album cover`,
							fill: true,
							className: "gsap-film-image object-cover",
							sizes: "50vw",
						}}
					/>
				</div>
				<div className='flex-1'>{content && <TextBlock text={content} />}</div>
			</div>
		</SectionWrapper>
	)

	return <h1>About</h1>
}
