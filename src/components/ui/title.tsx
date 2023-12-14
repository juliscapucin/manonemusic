"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

import { animateSplitText } from "@/animations"

type TitleProps = {
	children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
	const titleRef = useRef(null)

	useEffect(() => {
		if (!titleRef.current) return

		let ctx = gsap.context(() => {
			animateSplitText(titleRef.current!)
		})

		return () => ctx.revert()
	}, [titleRef])

	return (
		<div className='overflow-clip mb-16'>
			<h1
				ref={titleRef}
				className='text-displayMedium md:text-displayLarge whitespace-nowrap'
			>
				{children}
			</h1>
		</div>
	)
}
