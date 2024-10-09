"use client"

import { useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import { NavLink } from "@/components"
import { Button } from "@/components/ui"

type NavLink = { label: string; slug: string }

type NavLinksProps = {
	navLinks: NavLink[]
	transitionOnClick: (
		slug: string,
		pushSlug: boolean,
		routerAction?: () => void
	) => void
}

export default function NavBar({ navLinks, transitionOnClick }: NavLinksProps) {
	const pathname = usePathname()
	const router = useRouter()
	const navRef = useRef<HTMLDivElement | null>(null)

	return (
		<nav
			ref={navRef}
			className='fixed top-8 right-8 w-full flex justify-end gap-16 z-50'
		>
			<NavLink
				label='MAN/ONE MUSIC'
				activeState={pathname === "/" ? true : false}
				action={() => {
					transitionOnClick("/", true)
				}}
			/>

			{navLinks.map(
				(link, index) =>
					link.slug !== "/" && (
						<NavLink
							label={link.label}
							key={`panel-button-${index}`}
							activeState={pathname.includes(`/${link.slug}`) ? true : false}
							action={() => {
								transitionOnClick(link.slug, true)
							}}
						/>
					)
			)}
		</nav>
	)
}
