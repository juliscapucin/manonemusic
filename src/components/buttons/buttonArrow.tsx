import { IconArrow } from "../icons"

interface ButtonArrowProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	classes?: string
}

export default function ButtonArrow({ classes, ...props }: ButtonArrowProps) {
	return (
		<button
			className={`flex justify-center items-center opacity-30 hover:opacity-100 transition-opacity duration-300 ${classes}`}
			{...props}>
			<IconArrow />
		</button>
	)
}
