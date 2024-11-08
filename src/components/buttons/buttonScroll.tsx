import { IconArrow } from "../icons"

type ButtonScrollProps = {
	index: number
	total: number
	action: () => void
}

export default function ButtonScroll({
	action,
	index,
	total,
}: ButtonScrollProps) {
	return (
		<button
			// className='sr-only focus:not-sr-only'
			className='flex items-center gap-2'
			onClick={action}
			aria-label='Scroll to next page'
		>
			<span>
				[0{index + 1}/0{total}]
			</span>
			<IconArrow />
		</button>
	)
}
