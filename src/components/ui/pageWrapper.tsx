"use client"

import { navLinks } from "@/constants"
import NavBar from "../navBar"
import { projectExit } from "@/lib/animations"

type PageWrapperProps = {
	children: React.ReactNode
	classes?: string
	hasMenu?: boolean
}

export default function PageWrapper({
	children,
	classes,
	hasMenu,
}: PageWrapperProps) {
	return (
		<div
			className={`relative w-screen h-screen custom-min-w-screen custom-min-h-screen max-w-desktop pt-32 pb-8 px-32 overflow-x-clip ${classes}`}
		>
			{hasMenu && <NavBar navLinks={navLinks} variant='page' />}

			{children}
		</div>
	)
}
