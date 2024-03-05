type ButtonScrollProps = {
	action: () => void
}

export default function ButtonScroll({ action }: ButtonScrollProps) {
	return <button onClick={action}>Scroll to explore</button>
}
