"use client"

import { useLayoutEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { projectExit, panelsExit } from "@/lib/animations"
import { ImageField } from "@/types/Image"

import { CustomButton } from "@/components/ui"

import { animateCardLabel } from "@/animations"
import { urlFor } from "@/lib/sanityImageURL"
import path from "path"

type ProjectCardProps = {
	variant: "section" | "page"
	section: string
	title: string
	image: ImageField
	slug: string
	isMobile?: boolean
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

	const cardImageRef = useRef<HTMLDivElement>(null)
	const labelRef = useRef<HTMLParagraphElement>(null)

	const aspectRatio = image.imageWidth / image.imageHeight

	// Scale card on scroll + Animate label on hover
	useLayoutEffect(() => {
		if (!cardImageRef.current || !labelRef.current || isMobile) return

		const cardImage = cardImageRef.current
		const cardLabel = labelRef.current
		const container = cardImage.closest("a")
		let isAnimating = false

		if (!container) return

		gsap.registerPlugin(Observer)

		ctx.add(() => {
			gsap.set(cardLabel, {
				opacity: 0,
			})

			Observer.create({
				target: container,
				onHover: (self) => {
					if (isAnimating) return
					gsap.to(cardLabel, {
						opacity: 1,
						duration: 0.2,
					})
					self.event.target &&
						self.event.target === container &&
						animateCardLabel(cardLabel)
					isAnimating = true
				},
				onHoverEnd: () => {
					if (isAnimating) {
						isAnimating = false
						gsap.to(cardLabel, {
							opacity: 0,
							duration: 0.2,
						})
					}
				},
			})

			// Observer.create({
			// 	target: window,
			// 	type: "wheel,scroll,touch",
			// 	onChange: (self) => {
			// 		gsap.to(cardImage, {
			// 			scale: 0.78,
			// 			// filter: "grayscale(0%) brightness(1)",
			// 			duration: 0.2,
			// 		})
			// 	},

			// 	onStop: () => {
			// 		gsap.to(cardImage, {
			// 			scale: 0.7,
			// 			// filter: "grayscale(30%) brightness(0.8)",
			// 			duration: 0.5,
			// 			ease: "power4.out",
			// 		})
			// 	},
			// })
		})

		return () => ctx.revert()
	}, [cardImageRef, labelRef, isMobile])

	return (
		<CustomButton
			transitionOnClick={() => {
				variant === "section"
					? panelsExit(() => router.push(`/${section}/${slug}`))
					: projectExit(() => router.push(`/${section}/${slug}`))
			}}
			href={`/${section}/${slug}`}
			classes={`relative group gsap-project-card bg-primary ${variant === "section" ? "min-w-40 h-full w-fit" : `w-16 landscape:w-32 aspect-square ${pathname.includes(slug) && "pointer-events-none"}`}`}
			style={{ aspectRatio }}
			aria-labelledby={`project-title-${slug}`}
			isDisabled={pathname.includes(slug)}
		>
			{image?.imageRef && (
				<div
					className='rounded-sm pointer-events-none w-full overflow-hidden mb-2 lg:-mb-10'
					ref={cardImageRef}
					role='img'
					aria-label={image.imageAlt}
				>
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
					ref={labelRef}
				>
					{title}
				</p>
			)}
		</CustomButton>
	)
}
