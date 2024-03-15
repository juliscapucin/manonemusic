"use client"

import { useRef } from "react"
import Image from "next/image"

import { Copyright } from "@/components"
import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import { AboutPage } from "@/types"

export default function AboutPnel({ data }: { data: AboutPage }) {
	const titleAboutRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleAboutRef, "/about", windowAspectRatio)

	return (
		<PageWrapper>
			<TitleDisplay ref={titleAboutRef}>{data.title}</TitleDisplay>
			<div className='w-3/4 h-1/2 absolute flex justify-end items-end'>
				<p className='max-w-sm md:max-w-lg'>{data.text}</p>
			</div>

			<div className='absolute top-32 left-1/4 md:w-1/2 lg:w-1/3 aspect-square overflow-clip -z-5'>
				<Image
					{...{
						src: data.profilePhoto.url,
						alt: data.profilePhoto.description,
						fill: true,
						className: "object-cover",
						sizes: "50vw",
					}}
				/>
			</div>
			<Copyright />
		</PageWrapper>
	)
}
