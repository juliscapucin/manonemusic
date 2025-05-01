"use client"

import { useState } from "react"
import ButtonArrow from "./buttonArrow"
import { CarouselIndicators } from "@/components"

interface ButtonsCarouselProps {
	tl: gsap.core.Timeline
	itemsCount: number
	activeCarouselImage: number
	setActiveCarouselImage: (arg: number) => void
}

const timingSettings = { duration: 0.3, ease: "power1.inOut" }

export default function ButtonsCarousel({
	tl,
	itemsCount,
	activeCarouselImage,
	setActiveCarouselImage,
}: ButtonsCarouselProps) {
	const roundedButtonClasses = "rounded-full p-2 border border-secondary"

	console.log("activeImage", activeCarouselImage)

	return (
		<div className='relative mt-6 w-full h-16 px-4 flex flex-row justify-center items-center gap-8'>
			<ButtonArrow
				isShort={true}
				onClick={() => {
					tl.toIndex(activeCarouselImage - 1, timingSettings)
					setActiveCarouselImage(tl.current())
				}}
				classes={`prev-btn rotate-180 ${roundedButtonClasses}`}
			/>
			<CarouselIndicators
				itemsCount={itemsCount}
				activeIndex={activeCarouselImage}
			/>
			<ButtonArrow
				isShort={true}
				onClick={() => {
					tl.toIndex(activeCarouselImage + 1, timingSettings)
					setActiveCarouselImage(tl.current())
				}}
				classes={`next-btn rotate-0 ${roundedButtonClasses}`}
			/>
		</div>
	)
}
