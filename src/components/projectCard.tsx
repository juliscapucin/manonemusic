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
	const labelRef = useRef<HTMLParagraphElement>(null)

	const aspectRatio = image.imageWidth / image.imageHeight

	// Scale card on scroll + Animate label on hover
	useLayoutEffect(() => {
		if (!cardImageRef.current || !labelRef.current) return

		const cardImage = cardImageRef.current
		const cardLabel = labelRef.current
		const container = cardImage.closest("a")
		let isAnimating = false

		if (!container) return

		gsap.registerPlugin(Observer)

		ctx = gsap.context(() => {
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
	}, [cardImageRef, labelRef])

	return (
		<CustomButton
			transitionOnClick={() => {
				variant === "section"
					? panelsExit(() => router.push(`/${section}/${slug}`))
					: projectExit(() => router.push(`/${section}/${slug}`))
			}}
			href={`/${section}/${slug}`}
			classes={`relative group gsap-project-card bg-primary ${variant === "section" ? "h-full w-[calc((100%/2)-0.5rem)] md:w-[calc((100%/3)-0.5rem)] landscape:w-fit" : "w-16 landscape:w-24 aspect-square"}`}
			style={{ aspectRatio }}
			aria-labelledby={`project-title-${slug}`}
			isDisabled={pathname.includes(slug)}
		>
			{image && (
				<div
					className='rounded-sm pointer-events-none'
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
				<div className='absolute inset-0 flex items-start justify-center z-10 pointer-events-none overflow-hidden'>
					<p
						className='text-labelMedium lg:text-headlineLarge uppercase text-left leading-none z-15'
						id={`project-title-${slug}`}
						ref={labelRef}
					>
						{/* {Array(80).fill(title).join(" ").slice(0, 100)} */}
						{title}
					</p>
				</div>
			)}
		</CustomButton>
	)
}
