import { IconArrow } from "../icons"

type ButtonArrowProps = {
	action: () => void
	classes?: string
}

export default function ButtonArrow({ action, classes }: ButtonArrowProps) {
	return (
		<button
			className={`flex justify-center items-center h-16 w-16 opacity-30 hover:opacity-100 transition-opacity duration-300 ${classes}`}
			onClick={() => action()}
		>
			<IconArrow />
		</button>
	)
}
