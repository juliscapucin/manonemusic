"use client"

import { useState, useEffect } from "react"

export const useWindowDimensions = () => {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [windowAspectRatio, setWindowAspectRatio] = useState("")
	const [isMobile, setIsMobile] = useState<boolean | null>(null)

	useEffect(() => {
		if (typeof window === "undefined") return

		const listener = () => {
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)
			setWindowAspectRatio(
				window.innerWidth > window.innerHeight ? "landscape" : "portrait"
			)
			setIsMobile(window.innerWidth <= 768)
		}
		listener()

		window.addEventListener("resize", listener)

		return () => {
			window.removeEventListener("resize", listener)
		}
	}, [])

	return {
		width,
		height,
		windowAspectRatio,
		isMobile,
	}
}
