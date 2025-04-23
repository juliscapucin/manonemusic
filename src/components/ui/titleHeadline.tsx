"use client"

import { forwardRef } from "react"

import { Heading } from "@/components/ui"

type TitleProps = {
	children: string
	classes?: string
}

export const TitleHeadline = forwardRef(function Title(
	{ children, classes }: TitleProps,
	ref: React.Ref<HTMLDivElement>
) {
	return (
		<div
			className={`gsap-projects-title gsap-project-content bg-primary ${classes}`}
			ref={ref}
		>
			<Heading tag={"h1"} classes='uppercase' variant='headline'>
				{children}
			</Heading>
		</div>
	)
})
