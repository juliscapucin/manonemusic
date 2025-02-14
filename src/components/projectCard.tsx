"use client"

import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { projectExit, panelsExit } from "@/lib/animations"
import { ImageField } from "@/types/Image"

import { CustomButton } from "@/components/ui"

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
	let ctx: gsap.Context

	const cardImageRef = useRef<HTMLDivElement>(null)

	const aspectRatio = image.imageWidth / image.imageHeight

	useLayoutEffect(() => {
		if (!cardImageRef.current) return

		const cardImage = cardImageRef.current

		gsap.registerPlugin(Observer)

		ctx = gsap.context(() => {
			Observer.create({
				target: window,
				type: "wheel,scroll,touch",
				onChange: (self) => {
					gsap.to(cardImage, {
						scale: 0.78,
						// filter: "grayscale(0%) brightness(1)",
						duration: 0.2,
					})
				},

				onStop: () => {
					gsap.to(cardImage, {
						scale: 0.7,
						// filter: "grayscale(30%) brightness(0.8)",
						duration: 0.5,
						ease: "power4.out",
					})
				},
			})
		})

		return () => ctx.revert()
	}, [cardImageRef])

	return (
		<CustomButton
			transitionOnClick={() => {
				variant === "section"
					? panelsExit(() => router.push(`/${section}/${slug}`))
					: projectExit(() => router.push(`/${section}/${slug}`))
			}}
			href={`/${section}/${slug}`}
			classes={`relative group gsap-project-card ${variant === "section" ? "h-full w-[calc((100%/2)-0.5rem)] md:w-[calc((100%/3)-0.5rem)] landscape:w-fit" : "w-16 landscape:w-24 aspect-square"}`}
			style={{ aspectRatio }}
			aria-labelledby={`project-title-${slug}`}
			isDisabled={pathname.includes(slug)}
		>
			{image && (
				<div
					className='rounded-sm'
					ref={cardImageRef}
					role='img'
					aria-label={image.imageAlt}
				>
					<Image
						className={`h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ${variant === "section" && "rounded-sm"}`}
						src={image.imageUrl}
						alt={image.imageAlt}
						sizes='30vw'
						width={image.imageWidth}
						height={image.imageHeight}
					/>
				</div>
			)}
			{variant === "section" && (
				<div className='absolute inset-0 flex items-center justify-center duration-300 z-10'>
					<span
						className='text-labelMedium lg:text-labelLarge uppercase text-left leading-none -translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-15 pointer-events-none'
						id={`project-title-${slug}`}
					>
						{title}
					</span>
				</div>
			)}
		</CustomButton>
	)
}
