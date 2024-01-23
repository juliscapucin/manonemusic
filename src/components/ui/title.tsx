"use client"

import { forwardRef, useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { animateSplitText } from "@/animations"

type TitleProps = {
	children: React.ReactNode
}

export const Title = forwardRef(function Title(
	{ children }: TitleProps,
	ref: React.Ref<HTMLDivElement>
) {
	return (
		<div className='mb-16 bg-primary' ref={ref}>
			<h1 className='text-displayMedium md:text-displayLarge whitespace-nowrap'>
				{children}
			</h1>
		</div>
	)
})
