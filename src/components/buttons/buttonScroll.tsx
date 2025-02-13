import { IconArrow } from "../icons"

type ButtonScrollProps = {
	actionRight: () => void
	actionLeft: () => void
}

export default function ButtonScroll({
	actionLeft,
	actionRight,
}: ButtonScrollProps) {
	return (
		<div className='flex gap-8'>
			<button
				className='flex items-center gap-2 rotate-180'
				onClick={actionLeft}
				aria-label='Scroll to previous page'
			>
				<IconArrow />
			</button>
			<p>Scroll</p>
			<button
				className='flex items-center gap-2'
				onClick={actionRight}
				aria-label='Scroll to next page'
			>
				<IconArrow />
			</button>
		</div>
	)
}
