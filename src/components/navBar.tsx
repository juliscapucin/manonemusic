"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

import { NavLink, ThemeSwitcher } from "@/components"

type NavLink = { label: string; slug: string; position: string }

type NavLinksProps = {
	navLinks: NavLink[]
	transitionOnClick: (index: number, pushSlug: boolean) => void
	isHome: boolean
}

export default function NavBar({
	navLinks,
	transitionOnClick,
	isHome,
}: NavLinksProps) {
	const pathname = usePathname()
	const navRef = useRef<HTMLDivElement | null>(null)

	return (
		<>
			{/* Home NavBar */}
			<nav
				ref={navRef}
				className={`fixed bottom-8 right-0 w-1/2 flex flex-col items-start gap-2 z-100 ${
					isHome ? "" : "hidden"
				}`}
			>
				{navLinks.map(
					(link, index) =>
						link.slug !== "/" && (
							<NavLink
								isHome={isHome}
								label={link.label}
								key={`panel-button-${index}`}
								activeState={pathname.includes(`/${link.slug}`) ? true : false}
								action={() => {
									transitionOnClick(index, true)
								}}
							/>
						)
				)}
			</nav>

			{/* Page NavBar */}
			<nav
				ref={navRef}
				className={`fixed bottom-0 right-0 w-screen h-screen grid grid-cols-2 grid-rows-2 z-100 ${
					isHome ? "hidden" : ""
				}`}
			>
				{navLinks.map(
					(link, index) =>
						link.slug !== "/" && (
							<NavLink
								isHome={isHome}
								label={link.label}
								position={link.position}
								key={`panel-button-${index}`}
								activeState={pathname.includes(`/${link.slug}`) ? true : false}
								action={() => {
									transitionOnClick(index, true)
								}}
							/>
						)
				)}
			</nav>
		</>
	)
}
