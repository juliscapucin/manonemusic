"use client"

import { animateSplitText } from "@/animations"
import { useEffect, useRef } from "react"

type TitleProps = {
	children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
	const titleRef = useRef(null)

	useEffect(() => {
		if (titleRef.current) {
			animateSplitText(titleRef.current)
		}
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
