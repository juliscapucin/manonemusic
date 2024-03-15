import { IconChevron } from "../icons"

type ButtonScrollProps = {
	action: () => void
}

export default function ButtonScroll({ action }: ButtonScrollProps) {
	return (
		<button
			className='sr-only focus:not-sr-only'
			onClick={action}
			aria-label='Scroll to next page'
		>
			<IconChevron />
		</button>
	)
}
