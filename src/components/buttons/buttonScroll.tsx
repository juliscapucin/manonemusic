import { IconArrow } from "../icons"

type ButtonScrollProps = {
	action: (direction: "previous" | "next") => void
	index: number
	sectionsTotal: number
}

export default function ButtonScroll({
	action,
	index,
	sectionsTotal,
}: ButtonScrollProps) {
	return (
		<div className='flex gap-8'>
			<button
				className={`flex items-center gap-2 rotate-180 transition-opacity duration-300 ${index === 0 ? "opacity-0" : "opacity-100"}`}
				onClick={() => action("previous")}
				aria-label='Scroll to previous page'
			>
				<IconArrow />
			</button>
			<p>Scroll</p>
			<button
				className={`flex items-center gap-2 transition-opacity duration-300 ${index + 1 === sectionsTotal ? "opacity-0" : "opacity-100"}`}
				onClick={() => action("next")}
				aria-label='Scroll to next page'
			>
				<IconArrow />
			</button>
		</div>
	)
}
