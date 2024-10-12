"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { handlePanelSlide } from "@/lib/animations"
import { ImageField } from "@/types/Image"

type ProjectCardProps = {
	title: string
	image: ImageField
	slug: string
}

export default function ProjectCard({ title, image, slug }: ProjectCardProps) {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<button
			onClick={() => {
				handlePanelSlide("projects", true, () =>
					router.push(`/projects/${slug}`)
				)
			}}
			className={`w-full h-full relative`}
		>
			<div className='relative w-full h-full'>
				{image && (
					<Image
						className={`${
							pathname.includes(slug) && "gsap-flip-project-card z-100"
						} object-cover`}
						src={image.imageUrl}
						alt={image.imageAlt}
						sizes='50vw'
						fill
					/>
				)}
			</div>
			<span>{title}</span>
		</button>
	)
}
