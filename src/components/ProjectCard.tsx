"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { handlePanelSlide } from "@/lib/animations"
import { ImageField } from "@/types/Image"

import { Button } from "@/components/ui"
import Link from "next/link"

type ProjectCardProps = {
	section: string
	title: string
	image: ImageField
	slug: string
}

export default function ProjectCard({
	section,
	title,
	image,
	slug,
}: ProjectCardProps) {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<>
			<Button
				transitionOnClick={() => {
					handlePanelSlide(section, true, () =>
						router.push(`/${section}/${slug}`)
					)
				}}
				href={`/${section}/${slug}`}
				classes='gsap-project-card w-1/6 relative group'
				aria-labelledby={`project-title-${slug}`}
			>
				{image && (
					<div className='relative w-full aspect-square overflow-clip z-5'>
						<Image
							className={`${
								pathname.includes(slug) && "gsap-project-card z-100"
							} relative w-1/6 aspect-square overflow-clip object-cover group-hover:scale-105 transition-transform duration-300`}
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
		</>
	)
}
