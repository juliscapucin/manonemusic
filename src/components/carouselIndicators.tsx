type CarouselIndicatorsProps = {
	itemsCount: number
	activeIndex: number
}

export default function CarouselIndicators({
	itemsCount,
	activeIndex,
}: CarouselIndicatorsProps) {
	return (
		<div className='w-full flex justify-center items-center gap-2 h-full'>
			{[...Array(itemsCount)].map((_, index) => (
				<div
					className={`h-[1px] bg-secondary w-4 ${activeIndex === index ? "opacity-100" : "opacity-30"}`}
					key={index}></div>
			))}
		</div>
	)
}
