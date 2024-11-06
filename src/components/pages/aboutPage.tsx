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
			<div>
				<TitleDisplay ref={titleAboutRef}>{data.title}</TitleDisplay>
				{/* <Subtitle subtitle={data.subtitle} /> */}
				<div className='max-w-prose'>
					<PortableText value={data.content} />
				</div>
			</div>
			<div className='relative w-1/2 aspect-square overflow-clip'>
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
		</PageWrapper>
	)
}
