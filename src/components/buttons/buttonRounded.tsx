type ButtonRoundedProps = {
	label: string
	action: () => void
}

export default function ButtonRounded({ label, action }: ButtonRoundedProps) {
	return <button className='custom-button-rounded'>{label}</button>
}
