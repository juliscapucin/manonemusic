"use client"

import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

import { projectExit, panelsExit } from "@/lib/animations"
import { ImageField } from "@/types/Image"

import { Button } from "@/components/ui"

type ProjectCardProps = {
	variant: "section" | "page"
	section: string
	title: string
	image: ImageField
	slug: string
}

export default function ProjectCard({
	variant,
	section,
	title,
	image,
	slug,
}: ProjectCardProps) {
	const router = useRouter()
	const pathname = usePathname()

	const aspectRatio = image.imageWidth / image.imageHeight

	return (
		<Button
			transitionOnClick={() => {
				variant === "section"
					? panelsExit(() => router.push(`/${section}/${slug}`))
					: projectExit(() => router.push(`/${section}/${slug}`))
			}}
			href={`/${section}/${slug}`}
			classes={`relative gsap-project-card group ${variant === "section" ? "h-full w-[calc((100%/3)-1rem)] lg:w-fit" : "w-16 lg:w-24 aspect-square"}`}
			style={{ aspectRatio }}
			aria-labelledby={`project-title-${slug}`}
			isDisabled={pathname.includes(slug)}
		>
			{image && (
				<div className='rounded-sm'>
					<Image
						className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-300'
						src={image.imageUrl}
						alt={image.imageAlt}
						sizes='30vw'
						width={image.imageWidth}
						height={image.imageHeight}
					/>
				</div>
			)}
			{variant === "section" && (
				<span
					className='absolute top-full text-labelMedium lg:text-labelLarge uppercase text-left leading-none opacity-0 -translate-y-full group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300 z-15'
					id={`project-title-${slug}`}
				>
					{title}
				</span>
			)}
		</Button>
	)
}
