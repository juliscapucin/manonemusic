import { IconArrow } from "../icons"

type ButtonScrollProps = {
	action: (direction: "previous" | "next") => void
	index: number
	sectionsTotal: number
}

type ScrollArrowProps = {
	direction: "previous" | "next"
	isDisabled: boolean
	onClick: () => void
}

const ScrollArrow = ({ direction, isDisabled, onClick }: ScrollArrowProps) => (
	<button
		className={`flex items-center gap-2 transition-opacity duration-300 ${
			direction === "previous" ? "rotate-180" : ""
		} ${isDisabled ? "opacity-20" : "opacity-100"}`}
		onClick={onClick}
		aria-label={`Scroll to ${direction} page`}
		disabled={isDisabled}
	>
		<IconArrow />
	</button>
)

export default function ButtonScroll({
	action,
	index,
	sectionsTotal,
}: ButtonScrollProps) {
	return (
		<div className='flex justify-center gap-8'>
			<ScrollArrow
				direction='previous'
				isDisabled={index === 0}
				onClick={() => action("previous")}
			/>
			<p>Scroll</p>
			<ScrollArrow
				direction='next'
				isDisabled={index + 1 === sectionsTotal}
				onClick={() => action("next")}
			/>
		</div>
	)
}
