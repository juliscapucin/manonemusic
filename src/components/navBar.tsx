"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

import { NavLink, ThemeSwitcher } from "@/components"

type NavLink = { label: string; slug: string; navLinkPosition: string }

type NavLinksProps = {
	navLinks: NavLink[]
	transitionOnClick: (index: number, pushSlug: boolean) => void
	isHome: boolean
}

export default function NavBar({ navLinks, transitionOnClick }: NavLinksProps) {
	const pathname = usePathname()
	const navRef = useRef<HTMLDivElement | null>(null)
	const navClasses =
		pathname === "/"
			? "fixed bottom-8 right-0 w-1/2 flex flex-col items-start gap-2 z-50"
			: "fixed bottom-0 right-0 w-screen h-screen grid grid-cols-2 grid-rows-2 z-5 pointer-events-none"

	return (
		<nav ref={navRef} className={`${navClasses}`}>
			{navLinks.map(
				(link, index) =>
					link.slug !== "/" && (
						<NavLink
							label={link.label}
							key={`panel-button-${index}`}
							position={pathname === "/" ? "" : link.navLinkPosition}
							activeState={pathname.includes(`/${link.slug}`) ? true : false}
							action={() => {
								transitionOnClick(index, true)
							}}
						/>
					)
			)}
		</nav>
	)
}
