"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import gsap from "gsap"

import { handlePanelSlide, projectExit } from "@/lib/animations"
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

	return (
		<Button
			transitionOnClick={() => {
				variant === "section"
					? handlePanelSlide(section, true, () =>
							router.push(`/${section}/${slug}`)
						)
					: projectExit(() => router.push(`/${section}/${slug}`))
			}}
			href={`/${section}/${slug}`}
			classes={`gsap-project-card relative group ${variant === "section" ? "lg:w-64" : "w-16 lg:w-24"}`}
			aria-labelledby={`project-title-${slug}`}
		>
			{image && (
				<div className='relative w-full aspect-square overflow-clip z-5'>
					<Image
						className={`${
							pathname.includes(slug) && "gsap-project-card z-100"
						} relative w-full aspect-square overflow-clip object-cover group-hover:scale-105 transition-transform duration-300`}
						src={image.imageUrl}
						alt={image.imageAlt}
						sizes='50vw'
						fill
					/>
				</div>
			)}
			<span
				className='block text-labelMedium lg:text-labelLarge uppercase text-left leading-none opacity-0 -translate-y-full group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300'
				id={`project-title-${slug}`}
			>
				{title}
			</span>
		</Button>
	)
}
