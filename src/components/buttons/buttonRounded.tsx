type ButtonRoundedProps = {
	label: string
	action: () => void
	classes?: string
}

export default function ButtonRounded({
	label,
	action,
	classes,
}: ButtonRoundedProps) {
	return (
		<button className={`custom-button-rounded ${classes && classes}`}>
			{label}
		</button>
	)
}
