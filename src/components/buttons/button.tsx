type ButtonProps = {
	children: React.ReactNode
	action: () => void
}

export default function Button({ children, action }: ButtonProps) {
	return <button onClick={action}>{children}</button>
}
