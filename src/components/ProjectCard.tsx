"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { usePageContext } from "@/context"
import { handlePanelSlide } from "@/lib/animations"

type Props = {
	title: string
	coverImage: {
		url: string
		description: string
		width: number
		height: number
	}
	slug: string
}

export default function ProjectCard({ title, coverImage, slug }: Props) {
	const router = useRouter()
	const { transitionOnClick } = usePageContext()

	return (
		<button
			onClick={() => {
				handlePanelSlide(1, true, () => router.push(`/projects/${slug}`))
			}}
			className='bg-colorWhite'
		>
			<div className='relative w-32 h-[40vh] overflow-clip'>
				<Image
					className='object-cover'
					src={coverImage.url}
					alt={coverImage.description}
					sizes='20vw'
					fill
				/>
			</div>
			<span>{title}</span>
		</button>
	)
}
