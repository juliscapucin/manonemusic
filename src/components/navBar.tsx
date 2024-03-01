"use client"

import { usePathname } from "next/navigation"

import { MenuLink, ThemeSwitcher } from "@/components"

type NavLink = { label: string; slug: string }

type NavLinksProps = {
	navLinks: NavLink[]
	transitionOnClick: (index: number, pushSlug: boolean) => void
}

export default function NavBar({ navLinks, transitionOnClick }: NavLinksProps) {
	const pathname = usePathname()

	return (
		<nav
			className={`fixed bottom-8 right-0 w-1/2 flex flex-col items-start gap-2 z-100`}
		>
			{navLinks.map((link, index) => (
				<button
					className='text-titleSmall md:text-titleMedium lg:text-titleLarge uppercase'
					key={`panel-button-${index}`}
					onClick={() => transitionOnClick(index, true)}
				>
					{link.label}
				</button>
			))}
		</nav>
	)

	// return (
	// 	<>
	// 		{navLinks && (
	// 			<div className={"h-16 w-full hidden lg:flex overflow-clip"}>
	// 				{/* Menu links */}
	// 				<nav className='w-full h-full hidden lg:flex justify-end items-center gap-8 mr-8'>
	// 					{navLinks.map((link) => {
	// 						return (
	// 							<MenuLink
	// 								label={link.label}
	// 								key={link.slug}
	// 								activeState={
	// 									pathname.includes(`/${link.slug}`) ? true : false
	// 								}
	// 								action={() => {
	// 									transitionOnClick(link)
	// 								}}
	// 							/>
	// 						)
	// 					})}
	// 				</nav>

	// 				<ThemeSwitcher variant='header' />
	// 			</div>
	// 		)}
	// 	</>
	// )
}
