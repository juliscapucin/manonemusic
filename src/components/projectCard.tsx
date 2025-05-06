"use client"

import { useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { projectExit, panelsExit } from "@/lib/animations"
import { ImageField } from "@/types/Image"

import { CustomButton } from "@/components/ui"

import { animateCardLabel } from "@/animations"
import { urlFor } from "@/lib/sanityImageURL"
import { useGSAP } from "@gsap/react"

type ProjectCardProps = {
	variant: "section" | "page"
	section: string
	title: string
	image: ImageField
	slug: string
	isMobile: boolean | null
}

const ctx = gsap.context(() => {})

export default function ProjectCard({
	variant,
	section,
	title,
	image,
	slug,
	isMobile = false,
}: ProjectCardProps) {
	const router = useRouter()
	const pathname = usePathname()

	const [isHovered, setIsHovered] = useState(false)

	const cardImageRef = useRef<HTMLDivElement>(null)
	const labelRef = useRef<HTMLParagraphElement>(null)

	const aspectRatio = image.imageWidth / image.imageHeight

	// LABEL ANIMATIONS
	useGSAP(
		() => {
			if (!labelRef.current) return
			const label = labelRef.current

			// MouseEnter
			if (isHovered) {
				gsap.set(label, {
					opacity: 0,
				})

				gsap.to(label, {
					opacity: 1,
					duration: 0.2,
				})

				animateCardLabel(label)

				// MouseLeave
			} else {
				gsap.to(label, {
					opacity: 0,
					duration: 0.2,
				})
			}
		},
		{ dependencies: [isHovered] }
	)

	return (
		<CustomButton
			transitionOnClick={() => {
				variant === "section"
					? panelsExit(() => router.push(`/${section}/${slug}`))
					: projectExit(() => router.push(`/${section}/${slug}`), false)
			}}
			onMouseEnter={() => {
				setIsHovered(true)
			}}
			onMouseLeave={() => setIsHovered(false)}
			href={`/${section}/${slug}`}
			classes={`relative group gsap-project-card bg-primary ${variant === "section" ? "min-w-40 h-full w-fit bg-faded-10" : `w-16 landscape:w-32 ${pathname.includes(slug) && "pointer-events-none"}`}`}
			style={{ aspectRatio }}
			aria-labelledby={`project-title-${slug}`}
			isDisabled={pathname.includes(slug)}>
			{image?.imageRef && (
				<div
					className='rounded-sm pointer-events-none w-full overflow-hidden mb-2 lg:-mb-10'
					ref={cardImageRef}
					role='img'
					aria-label={image.imageAlt}>
					<Image
						className={`relative h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ${variant === "section" && "rounded-sm"}`}
						src={urlFor(image.imageRef).url()}
						alt={image.imageAlt}
						width={image.imageWidth}
						height={image.imageHeight}
						sizes='30vw'
					/>
				</div>
			)}
			<span className='sr-only'>{title}</span>

			{/* LABEL */}
			{variant === "section" && (
				<p
					className='absolute top-full mt-2 text-labelMedium md:text-titleLarge uppercase text-left leading-none text-nowrap'
					id={`project-title-${slug}`}
					ref={labelRef}>
					{title}
				</p>
			)}
		</CustomButton>
	)
}
