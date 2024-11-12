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
				className={`relative w-screen h-screen min-h-svh max-w-desktop pt-32 pb-8 px-32 overflow-x-clip ${classes}`}
			>
				{children}
			</div>
		)
	}
)

SectionWrapper.displayName = "SectionWrapper"

export default SectionWrapper
