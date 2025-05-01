"use client"

import Link from "next/link"

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	classes?: string
	style?: React.CSSProperties
	children?: React.ReactNode
	transitionOnClick: (slug: string) => void
	isDisabled?: boolean
}

const CustomButton = ({
	classes,
	style,
	children,
	transitionOnClick,
	isDisabled = false,
	...props
}: ButtonProps) => {
	const { href, onMouseEnter, onMouseLeave } = props

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
		<Link
			href={href || ""}
			className={`${classes}`}
			style={style}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={(e) => {
				e.preventDefault()
				transitionOnClick(slug)
			}}>
			{children}
		</Link>
	)
}

// Set displayName for better debugging and error messages
CustomButton.displayName = "Button"

export default CustomButton
