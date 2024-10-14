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
				classes='gsap-project-card w-1/6 relative'
				aria-labelledby={`project-title-${slug}`}
			>
				{image && (
					<div className='relative w-full aspect-square overflow-clip'>
						<Image
							className={`${
								pathname.includes(slug) && "gsap-project-card z-100"
							} relative w-1/6 aspect-square overflow-clip object-cover`}
							src={image.imageUrl}
							alt={image.imageAlt}
							sizes='50vw'
							fill
						/>
					</div>
				)}
				<span
					className='text-labelMedium lg:text-labelLarge uppercase text-left leading-none'
					id={`project-title-${slug}`}
				>
					{title}
				</span>
			</Button>
		</>
	)
}
