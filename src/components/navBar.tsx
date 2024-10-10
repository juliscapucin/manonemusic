"use client"

import { useRef } from "react"
import { usePathname } from "next/navigation"

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
	const navRef = useRef<HTMLDivElement | null>(null)

	return (
		<nav
			ref={navRef}
			className='fixed top-8 right-8 left-8 flex justify-between z-50'
		>
			<Button
				href='/'
				classes={`underlined-link text-titleSmall md:text-titleMedium uppercase transition ${pathname === "/" ? "opacity-0 -translate-x-full" : "opacity-100"}`}
				transitionOnClick={() => transitionOnClick("/", true)}
			>
				MAN/ONE MUSIC
			</Button>

			<div className='flex gap-8'>
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
			</div>
		</nav>
	)
}
