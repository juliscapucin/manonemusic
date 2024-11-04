"use client"

import { useRef } from "react"
import Image from "next/image"

import { Copyright } from "@/components"
import { PageWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import type { AboutPage } from "@/types"

export default function AboutPage({ data }: { data: AboutPage }) {
	const titleAboutRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleAboutRef, "/about", windowAspectRatio)

	return (
		<PageWrapper classes='relative flex items-start justify-between'>
			<div>
				<TitleDisplay ref={titleAboutRef}>{data.title}</TitleDisplay>
				<Subtitle subtitle={data.subtitle} />
				<Copyright />
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
