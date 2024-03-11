"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { handlePanelSlide } from "@/lib/animations"

type ProjectCardProps = {
	title: string
	coverImage: {
		url: string
		description: string
		width: number
		height: number
	}
	slug: string
}

export default function ProjectCard({
	title,
	coverImage,
	slug,
}: ProjectCardProps) {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<button
			onClick={() => {
				handlePanelSlide(1, true, () => router.push(`/projects/${slug}`))
			}}
			className={`w-full h-full relative`}
		>
			<div className='relative w-full h-full'>
				<Image
					className={`${
						pathname.includes(slug) && "gsap-flip-project-card z-100"
					} object-cover`}
					src={coverImage.url}
					alt={coverImage.description}
					sizes='50vw'
					fill
				/>
			</div>
			<span>{title}</span>
		</button>
	)
}
