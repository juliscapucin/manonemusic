"use client"

import { forwardRef } from "react"

import { Heading } from "@/components/ui"

type TitleProps = {
	children: string
	classes?: string
}

export const TitleDisplay = forwardRef(function Title(
	{ children, classes }: TitleProps,
	ref: React.Ref<HTMLDivElement>
) {
	return (
		<div className={`flip-title mb-8 bg-primary ${classes}`} ref={ref}>
			<Heading
				tag={"h1"}
				classes='whitespace-nowrap uppercase'
				variant='display'
			>
				{children}
			</Heading>
		</div>
	)
})
