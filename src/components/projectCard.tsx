"use client"

import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useState } from "react"
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

	const aspectRatio = image.imageWidth / image.imageHeight

	useLayoutEffect(() => {
		gsap.registerPlugin(Observer)

		ctx = gsap.context(() => {
			function handleScroll(scaleAmount: number) {
				// const clampedScale = Math.min(Math.max(scaleAmount, 1), 0.5)

				gsap.to(".gsap-card-image", {
					scale: scaleAmount,
					duration: 0.5,
					ease: "power4.inOut",
				})
			}

			Observer.create({
				target: window,
				type: "wheel,scroll,touch",
				onChange: (self) => {
					console.log(self.velocityY)
				},

				onUp: () => {
					handleScroll(0.5)
				},
				onDown: () => {
					handleScroll(0.5)
				},

				onStop: () => {
					gsap.to(".gsap-card-image", {
						scale: 1,
						duration: 0.5,
						ease: "power4.inOut",
					})
				},
			})
		})

		return () => ctx.revert()
	}, [])

	return (
		<CustomButton
			transitionOnClick={() => {
				variant === "section"
					? panelsExit(() => router.push(`/${section}/${slug}`))
					: projectExit(() => router.push(`/${section}/${slug}`))
			}}
			href={`/${section}/${slug}`}
			classes={`relative gsap-project-card group ${variant === "section" ? "h-full w-[calc((100%/2)-0.5rem)] md:w-[calc((100%/3)-0.5rem)] landscape:w-fit" : "w-16 landscape:w-24 aspect-square"}`}
			style={{ aspectRatio }}
			aria-labelledby={`project-title-${slug}`}
			isDisabled={pathname.includes(slug)}
		>
			{image && (
				<div className='gsap-card-image rounded-sm'>
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
		</CustomButton>
	)
}
