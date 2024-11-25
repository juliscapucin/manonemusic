"use client"

import React, { forwardRef } from "react"

import { useCustomEase } from "@/hooks"

type SectionWrapperProps = {
	children: React.ReactNode
	classes?: string
}

const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
	({ children, classes }, ref) => {
		useCustomEase()
		return (
			<div
				ref={ref}
				className={`relative custom-min-w-screen md:w-fit md:h-screen min-h-svh pt-32 pb-8 md:px-32 ${classes ? classes : ""}`}
			>
				{children}
			</div>
		)
	}
)

SectionWrapper.displayName = "SectionWrapper"

export default SectionWrapper
