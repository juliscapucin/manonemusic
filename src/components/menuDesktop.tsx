"use client"

import { usePathname } from "next/navigation"

import { MenuLink, ThemeSwitcher } from "@/components"

type NavLink = { label: string; slug: string; _key: number }

type NavLinksProps = {
	navLinks: NavLink[]
	transitionOnClick: (link: NavLink) => void
}

export default function MenuDesktop({
	navLinks,
	transitionOnClick,
}: NavLinksProps) {
	const pathname = usePathname()

	return (
		<>
			{navLinks && (
				<div className={"h-16 max-w-full mx-8 px-4 hidden lg:flex bg-primary"}>
					{/* Menu links */}
					<nav className='w-full h-full hidden lg:flex justify-end items-center gap-8 mr-8'>
						{navLinks.map((link) => {
							return (
								<MenuLink
									label={link.label}
									key={link._key}
									activeState={
										pathname.includes(`/${link.slug}`) ? true : false
									}
									action={() => {
										transitionOnClick(link)
									}}
								/>
							)
						})}
					</nav>

					<ThemeSwitcher variant='header' />
				</div>
			)}
		</>
	)
}
