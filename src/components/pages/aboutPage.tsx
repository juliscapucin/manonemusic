"use client"

import { useRef } from "react"
import Image from "next/image"
import { PortableText } from "next-sanity"

import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import type { AboutPage } from "@/types"

export default function AboutPage({ data }: { data: AboutPage }) {
	const titleAboutRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleAboutRef, "/about", windowAspectRatio)

	return (
		<SectionWrapper classes='flex justify-between items-start gap-32'>
			<div>
				<Subtitle subtitle={data.subtitle} />
				<TitleDisplay ref={titleAboutRef}>{data.title}</TitleDisplay>
				<div className='ml-[25%] max-w-prose'>
					<PortableText value={data.content} onMissingComponent={false} />
				</div>
			</div>
			<div className='relative w-1/3 aspect-square mt-16 rounded-sm overflow-clip'>
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
		</SectionWrapper>
	)
}
