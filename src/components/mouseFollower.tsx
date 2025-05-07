"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type Props = {
	isHovering: boolean
	variant: "big" | "small"
}

export default function MouseFollower({ isHovering, variant }: Props) {
	const refCursor = useRef(null)

	// useEffect(() => {
	// 	const cursorDiv = refCursor.current as HTMLDivElement | null

	// 	if (!cursorDiv) return

	// 	gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 })

	// 	let xTo = gsap.quickTo(cursorDiv, "x", { duration: 0.6, ease: "power3" }),
	// 		yTo = gsap.quickTo(cursorDiv, "y", { duration: 0.6, ease: "power3" })

	// 	const moveCursor = (e: MouseEvent) => {
	// 		xTo(e.clientX)
	// 		yTo(e.clientY)
	// 	}

	// 	cursorDiv.parentElement?.addEventListener("mousemove", moveCursor)
	// 	return () => {
	// 		cursorDiv.parentElement?.removeEventListener("mousemove", moveCursor)
	// 	}
	// }, [refCursor])

	useEffect(() => {
		const cursorDiv = refCursor.current as HTMLDivElement | null

		if (!cursorDiv || !cursorDiv.parentElement) return

		gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 })

		const moveCursor = (e: MouseEvent) => {
			const parentRect = cursorDiv.parentElement!.getBoundingClientRect()
			if (!parentRect) return

			// Get x position relative to container because of scroll
			const relativeX = e.clientX - parentRect.left

			gsap.to(cursorDiv, {
				x: relativeX,
				y: e.clientY,
				duration: 0.5,
			})
		}

		cursorDiv.parentElement.addEventListener("mousemove", moveCursor)
		return () => {
			cursorDiv.parentElement!.removeEventListener("mousemove", moveCursor)
		}
	}, [refCursor, variant])

	return (
		<div
			className={`${
				variant === "big" ? "w-40 h-40 bg-primary/30" : "w-24 h-24 bg-secondary"
			} fixed top-0 left-0 rounded-full flex items-center justify-center z-15 pointer-events-none cursor-pointer border border-secondary transition-opacity duration-200 ${isHovering ? "" : "opacity-0"}`}
			ref={refCursor}>
			<div className='customcursor__follower__inner'>
				<span
					className={`${
						variant === "big"
							? "text-titleLarge font-extralight"
							: "text-labelLarge text-primary"
					}`}>
					OPEN
				</span>
			</div>
		</div>
	)
}
