"use client"

import React, { forwardRef } from "react"

type SectionWrapperProps = {
	children: React.ReactNode
	classes?: string
}

const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
	({ children, classes }, ref) => {
		return (
			<div
				ref={ref}
				className={`section-wrapper relative custom-min-w-screen landscape:w-fit h-fit landscape:h-screen pt-16 landscape:pt-32 pb-8 px-4 landscape:px-0 ${classes && classes}`}
			>
				{children}
			</div>
		)
	}
)

SectionWrapper.displayName = "SectionWrapper"

export default SectionWrapper
