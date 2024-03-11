"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useRef, useState } from "react"

import gsap from "gsap"

type ContextProps = {
	transitionOnClick: (link: string) => void
	transitionOnEnter: (container: HTMLDivElement) => void
	pageRef: React.MutableRefObject<HTMLDivElement | null>
}

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
	const pathname = usePathname()
	let ctx = gsap.context(() => {})

	const transitionOnEnter = (container: HTMLDivElement) => {
		ctx.add(() => {
			let timeline = gsap.timeline()
			timeline.set(container, { opacity: 0 }).to(container, {
				opacity: 1,
				duration: 0.5,
			})
		})
	}

	const transitionOnClick = (slug: string) => {
		const container = pageRef.current

		if (!container) return

		console.log("transitionOnClick", slug)

		ctx.add(() => {
			gsap.to(container, {
				opacity: 0,
				duration: 0.5,
				onComplete: () => {
					router.push(`${slug}`)
				},
			})
		})
	}

	useEffect(() => {
		return () => {
			ctx.revert()
		}
	}, [])

	return (
		<PageContext.Provider
			value={{
				transitionOnClick,
				transitionOnEnter,
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
