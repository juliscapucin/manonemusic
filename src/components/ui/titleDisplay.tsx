"use client"

import { forwardRef } from "react"

import { Heading } from "@/components/ui"

type TitleProps = {
	children: string
	index: number
	classes?: string
}

export const TitleDisplay = forwardRef(function Title(
	{ children, classes, index }: TitleProps,
	ref: React.Ref<HTMLDivElement>
) {
	return (
		<div
			className={`gsap-section-title mt-16 landscape:mt-24 mb-8 bg-primary overflow-clip ${classes}`}
			ref={ref}>
			<span className='text-titleSmall md:text-titleMedium lg:text-titleLarge'>{`[0${index}]`}</span>

			<Heading
				tag={"h1"}
				classes='whitespace-nowrap uppercase'
				variant='display'>
				{children}
			</Heading>
		</div>
	)
})
