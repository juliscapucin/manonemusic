"use client"

import { useRef } from "react"
import Image from "next/image"
import { PortableText } from "next-sanity"

import { PageWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import type { AboutPage } from "@/types"

export default function AboutPage({ data }: { data: AboutPage }) {
	const titleAboutRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleAboutRef, "/about", windowAspectRatio)

	return (
		<PageWrapper classes='flex justify-between items-start gap-32'>
			<div className='flex-1'>
				<div className='h-40'></div>
				<TitleDisplay ref={titleAboutRef}>{data.title}</TitleDisplay>
				<div className='ml-[25%] max-w-prose'>
					<PortableText value={data.content} />
				</div>
			</div>
			<div className='h-full flex-1'>
				<Subtitle subtitle={data.subtitle} hasMarginLeft={false} />
				<div className='relative w-1/2 aspect-square mt-16 rounded-sm overflow-clip'>
					<Image
						{...{
							src: data.image.imageUrl,
							alt: `${data.title} album cover`,
							fill: true,
							className: "gsap-film-image object-cover",
							sizes: "50vw",
						}}
					/>
				</div>
			</div>
		</PageWrapper>
	)
}
