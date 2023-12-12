"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useRef, useState } from "react"

import {
	animateHorizontal,
	animateHorizontalTransition,
	animateMobileMenu,
} from "@/animations"

// TYPE
interface ContextProps {
	transitionOnClick: (link: NavLink, mobileMenuRef?: HTMLDivElement) => void
	pageRef: React.MutableRefObject<HTMLDivElement | null>
}

type NavLink = { label: string; slug: string }

// CREATE CONTEXT
const PageContext = createContext<ContextProps | null>(null)

// CONTEXT PROVIDER
export const PageContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const pageRef = useRef<HTMLDivElement | null>(null)
	const router = useRouter()

	const transitionOnClick = (link: NavLink, mobileMenuRef?: HTMLDivElement) => {
		// Toggle mobile menu
		if (mobileMenuRef) {
			animateMobileMenu(mobileMenuRef)
		}

		router.push(`/${link.slug}`)

		// animateHorizontalTransition(pageRef.current, 0, 100, () => {
		// 	router.push(`/${link.slug}`)
		// })
	}

	return (
		<PageContext.Provider
			value={{
				transitionOnClick,
				pageRef,
			}}
		>
			{children}
		</PageContext.Provider>
	)
}

// CONTEXT CUSTOM HOOK
export const usePageContext = () => {
	const context = useContext(PageContext)
	if (!context)
		throw new Error("usePageContext must be used within PageContextProvider")
	return context
}
