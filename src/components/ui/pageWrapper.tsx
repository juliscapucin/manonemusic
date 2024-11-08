"use client"

import React, { forwardRef } from "react"

import { useCustomEase } from "@/hooks"

type PageWrapperProps = {
	children: React.ReactNode
	classes?: string
}

const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
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

export default PageWrapper
