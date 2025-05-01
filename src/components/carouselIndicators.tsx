type CarouselIndicatorsProps = {
	itemsCount: number
	activeIndex: number
}

export default function CarouselIndicators({
	itemsCount,
	activeIndex,
}: CarouselIndicatorsProps) {
	return (
		<div className='w-full mt-8 flex justify-center gap-2'>
			{[...Array(itemsCount)].map((_, index) => (
				<div
					className={`h-[1px] bg-secondary w-4 ${activeIndex === index ? "opacity-100" : "opacity-30"}`}
					key={index}></div>
			))}
		</div>
	)
}
