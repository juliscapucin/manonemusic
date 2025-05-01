"use client"

import { useState } from "react"
import ButtonArrow from "./buttonArrow"
import { CarouselIndicators } from "@/components"

interface ButtonsCarouselProps {
	tl: gsap.core.Timeline
	itemsCount: number
}

const timingSettings = { duration: 0.3, ease: "power1.inOut" }

export default function ButtonsCarousel({
	tl,
	itemsCount,
}: ButtonsCarouselProps) {
	const [activeIndex, setActiveIndex] = useState(() => tl.current())

	const roundedButtonClasses = "rounded-full p-2 border border-secondary"

	const handlePreviousClick = () => {
		tl.previous(timingSettings)
		setActiveIndex(tl.current())
	}
	const handleNextClick = () => {
		tl.next(timingSettings)
		setActiveIndex(tl.current())
	}

	return (
		<div>
			<CarouselIndicators itemsCount={itemsCount} activeIndex={activeIndex} />
			<div className='mt-6 w-full flex flex-row justify-center gap-8'>
				<ButtonArrow
					isShort={true}
					onClick={handlePreviousClick}
					classes={`rotate-180 ${roundedButtonClasses}`}
				/>
				<ButtonArrow
					isShort={true}
					onClick={handleNextClick}
					classes={`rotate-0 ${roundedButtonClasses}`}
				/>
			</div>
		</div>
	)
}
