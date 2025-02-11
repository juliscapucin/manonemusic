"use client"

import Link from "next/link"

// Define the props type for MyButton
type ButtonProps = {
	href: string
	classes?: string
	style?: React.CSSProperties
	children?: React.ReactNode
	transitionOnClick: (slug: string) => void
	isDisabled?: boolean
}

const CustomButton = ({
	href,
	classes,
	style,
	children,
	transitionOnClick,
	isDisabled = false,
}: ButtonProps) => {
	const slug =
		href && href.length > 0
			? href.startsWith("/")
				? href.slice(1)
				: href
			: "/"

	return isDisabled ? (
		<div className={`${classes}`} style={style}>
			{children}
		</div>
	) : (
		<Link href={href} passHref legacyBehavior>
			<a
				className={`${classes}`}
				style={style}
				href={href}
				onClick={(e) => {
					e.preventDefault()
					transitionOnClick(slug)
				}}
			>
				{children}
			</a>
		</Link>
	)
}

// Set displayName for better debugging and error messages
CustomButton.displayName = "Button"

export default CustomButton
