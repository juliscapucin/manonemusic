import { IconChevron } from "@/components/icons"

interface ButtonArrowProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	classes?: string
}

export default function ButtonChevron({ classes, ...props }: ButtonArrowProps) {
	return (
		<button
			className={`w-12 aspect-square flex justify-center items-center opacity-30 hover:opacity-100 transition-opacity duration-300 ${classes}`}
			{...props}>
			<IconChevron />
		</button>
	)
}
