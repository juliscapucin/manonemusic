"use client"

import React, { forwardRef } from "react"
import Link from "next/link"

// Define the props type for MyButton
type ButtonProps = {
	href: string
	classes?: string
	children?: React.ReactNode
	transitionOnClick: (slug: string) => void
}

const Button = ({
	href,
	classes,
	children,
	transitionOnClick,
}: ButtonProps) => {
	const slug =
		href && href.length > 0
			? href.startsWith("/")
				? href.slice(1)
				: href
			: "/"

	return (
		<Link href={href} passHref legacyBehavior>
			<a
				className={`${classes}`}
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
Button.displayName = "Button"

export default Button
