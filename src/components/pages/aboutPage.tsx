"use client"

import { useRef } from "react"
import Image from "next/image"

import {
	SectionWrapper,
	Subtitle,
	TextBlock,
	TitleDisplay,
} from "@/components/ui"

import { ButtonRounded } from "@/components/buttons"

import type { AboutPage } from "@/types"
import { urlFor } from "@/lib/sanityImageURL"

type AboutPageProps = AboutPage & { index: number }

export default function AboutPage({
	title,
	subtitle,
	content1,
	content2,
	image,
	index,
}: AboutPageProps) {
	const titleAboutRef = useRef(null)

	return (
		<SectionWrapper classes='landscape:flex justify-between items-end gap-8 landscape:pb-40'>
			<div>
				<TitleDisplay ref={titleAboutRef} index={index}>
					{title}
				</TitleDisplay>
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
			<div className='mt-16 landscape:w-[70vw] landscape:flex items-end justify-between gap-8 *:flex-1 bg-primary'>
				{content1 && <TextBlock text={content1} />}
				<div>
					{content2 && <TextBlock text={content2} />}
					{/* BUTTONS */}
					<div className='flex gap-4 mt-8'>
						<ButtonRounded onClick={() => console.log("services")}>
							Services
						</ButtonRounded>
						<ButtonRounded onClick={() => console.log("services")}>
							Clients
						</ButtonRounded>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)

	return <h1>About</h1>
}
