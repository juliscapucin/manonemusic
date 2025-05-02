import ButtonArrow from "./buttonArrow"

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

	return (
		<div className='relative mt-6 w-full h-16 px-4 flex flex-row justify-center items-center gap-8'>
			{/* BUTTON PREVIOUS */}
			<ButtonArrow
				isShort={true}
				onClick={() => {
					tl.toIndex(activeCarouselImage - 1, timingSettings)
					setActiveCarouselImage(tl.current())
				}}
				classes={`prev-btn rotate-180 ${roundedButtonClasses}`}
			/>

			{/* PAGE INDICATORS */}
			<div className='w-full flex justify-center items-center gap-2 h-full'>
				{[...Array(itemsCount)].map((_, index) => (
					<button
						onClick={() => {
							tl.toIndex(index, timingSettings)
							setActiveCarouselImage(tl.current())
						}}
						className={`h-[1px] bg-secondary w-4 ${activeCarouselImage === index ? "opacity-100" : "opacity-30"}`}
						key={index}></button>
				))}
			</div>

			{/* BUTTON NEXT */}
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
