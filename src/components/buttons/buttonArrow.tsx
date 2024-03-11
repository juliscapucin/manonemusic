import { IconArrow } from "../icons"

type ButtonArrowProps = {
	rotation?: string
	action: () => void
	classes?: string
}

export default function ButtonArrow({
	rotation,
	action,
	classes,
}: ButtonArrowProps) {
	return (
		<button
			className={`rotate-${rotation} flex justify-center items-center bg-faded-30 h-8 w-8 ${classes}`}
			onClick={() => action()}
		>
			<IconArrow />
		</button>
	)
}
