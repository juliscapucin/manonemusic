"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

import { NavLink } from "@/components"

type NavLink = { label: string; slug: string }

type NavLinksProps = {
	navLinks: NavLink[]
	transitionOnClick: (index: number, pushSlug: boolean) => void
}

export default function NavBar({ navLinks, transitionOnClick }: NavLinksProps) {
	const pathname = usePathname()
	const navRef = useRef<HTMLDivElement | null>(null)

	return (
		<nav
			ref={navRef}
			className='fixed top-8 right-8 w-full flex justify-end gap-16 z-50'
		>
			{navLinks.map(
				(link, index) =>
					link.slug !== "/" && (
						<NavLink
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
	)
}
