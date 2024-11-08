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

	return (
		<Button
			transitionOnClick={() => {
				variant === "section"
					? panelsExit(() => router.push(`/${section}/${slug}`))
					: projectExit(() => router.push(`/${section}/${slug}`))
			}}
			href={`/${section}/${slug}`}
			classes={`gsap-project-card relative group opacity-90 ${variant === "section" ? "lg:w-64" : "w-16 lg:w-24"}`}
			aria-labelledby={`project-title-${slug}`}
			isDisabled={pathname.includes(slug)}
		>
			{/* Overlay */}
			<div
				className={`absolute w-full h-full top-0 left-0 bg-colorBlack z-10 group-hover:opacity-0 transi transition-opacity duration-300 ${pathname.includes(slug) ? "opacity-0" : "opacity-70"}`}
			></div>

			{/* Image */}
			{image && (
				<div className='relative w-full aspect-square rounded-sm overflow-clip z-5'>
					<Image
						className='relative w-full aspect-square overflow-clip object-cover group-hover:scale-105 transition-transform duration-300'
						src={image.imageUrl}
						alt={image.imageAlt}
						sizes='50vw'
						fill
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