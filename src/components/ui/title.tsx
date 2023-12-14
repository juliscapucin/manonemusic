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
	// useEffect(() => {
	// 	if (!titleRef.current) return

	// 	let ctx = gsap.context(() => {
	// 		animateSplitText(titleRef.current!)
	// 	})

	// 	return () => ctx.revert()
	// }, [titleRef])

	// useEffect(() => {
	// 	if (!titleRef.current) return

	// 	gsap.registerPlugin(ScrollTrigger)

	// 	ScrollTrigger.create({
	// 		trigger: titleRef.current,
	// 		start: "left center",
	// 		end: "right left",
	// 		onUpdate: (self) => {
	// 			console.log(
	// 				"progress:",
	// 				self.progress.toFixed(3),
	// 				"direction:",
	// 				self.direction,
	// 				"velocity",
	// 				self.getVelocity()
	// 			)
	// 		},
	// 	})
	// }, [titleRef])

	return (
		<div className='overflow-clip mt-32 mb-16' ref={ref}>
			<h1 className='text-displayMedium md:text-displayLarge whitespace-nowrap'>
				{children}
			</h1>
		</div>
	)
})
