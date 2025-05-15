"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import gsap from "gsap"

type ButtonRoundedProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		classes?: string
		children?: React.ReactNode
	}

export default function ButtonRounded({
	classes,
	children,
	...props
}: ButtonRoundedProps) {
	const { onClick, href } = props
	const maskRef = useRef(null)

	const [isHovered, setIsHovered] = useState(false)

	const sharedStyles =
		"text-bodyMedium lg:text-bodyLarge uppercase rounded-full border border-secondary px-3 py-1"
	const buttonStyles = "inline-block"
	const overlayStyles = "bg-secondary text-primary pointer-events-none"

	useEffect(() => {
		if (!maskRef.current) return

		const clipValue = isHovered
			? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
			: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"

		gsap.to(maskRef.current, {
			clipPath: clipValue,
			duration: 0.4,
			ease: "power4.out",
		})
	}, [isHovered])

	return (
		<>
			{href ? (
				<div className='relative overflow-clip'>
					<div className='overflow-clip'>
						<Link
							href={href || ""}
							className={`${sharedStyles} ${overlayStyles} ${classes || ""}`}>
							{children}
						</Link>
					</div>
					<Link
						href={href || ""}
						className={`${sharedStyles} ${buttonStyles} ${classes || ""}`}>
						{children}
					</Link>
				</div>
			) : (
				<div className='relative overflow-clip'>
					<div
						ref={maskRef}
						className='absolute top-0 left-0 pointer-events-none z-50'
						style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }} // mask's initial state
					>
						<div className={`${sharedStyles} ${overlayStyles}`}>{children}</div>
					</div>
					<button
						onClick={onClick}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						className={`${sharedStyles} ${buttonStyles} ${classes || ""}`}>
						{children}
					</button>
				</div>
			)}
		</>
	)
}
