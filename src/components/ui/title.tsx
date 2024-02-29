"use client"

import { forwardRef } from "react"

import { Heading } from "@/components/ui"

type TitleProps = {
	children: string
}

export const Title = forwardRef(function Title(
	{ children }: TitleProps,
	ref: React.Ref<HTMLDivElement>
) {
	return (
		<div className='mb-16 bg-primary' ref={ref}>
			<Heading
				tag={"h1"}
				styles='text-displayMedium md:text-displayLarge whitespace-nowrap uppercase'
				variant='display'
			>
				{children}
			</Heading>
		</div>
	)
})
