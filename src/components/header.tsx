"use client"

import { useRouter } from "next/navigation"

import { navLinks } from "@/constants"

import { MenuDesktop, MenuMobile } from "@/components"
import { usePageContext } from "@/context"

type NavLink = { label: string; slug: string }

export default function Header() {
	const { transitionOnClick } = usePageContext()

	// const router = useRouter()

	// const useTransitionOnClick = (
	// 	link: NavLink,
	// 	mobileMenuRef?: HTMLDivElement
	// ) => {
	// 	// Toggle mobile menu
	// 	if (mobileMenuRef) {
	// 		animateMobileMenu(mobileMenuRef)
	// 	}

	// 	router.push(`/${link.slug}`)
	// }

	return (
		navLinks && (
			<header className='fixed top-0 z-100 w-full max-w-desktop'>
				<MenuDesktop
					navLinks={navLinks}
					transitionOnClick={transitionOnClick}
				/>
				<MenuMobile navLinks={navLinks} transitionOnClick={transitionOnClick} />
			</header>
		)
	)
}
