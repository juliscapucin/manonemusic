"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { CustomButton, NavLink } from "@/components/ui"
import { handlePanelSlide, projectExit } from "@/lib/animations"
import { NavLink as NavLinkType } from "@/types"

type HeaderProps = {
	navLinks: NavLinkType[]
	variant?: "section" | "page"
}

export default function Header({ navLinks, variant = "section" }: HeaderProps) {
	const [isPageLoaded, setIsPageLoaded] = useState(false)
	const pathname = usePathname()
	const router = useRouter()
	const navRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		setIsPageLoaded(true)
	}, [])

	useEffect(() => {
		// Check if the page is loaded to slide into position
		if (!isPageLoaded && variant === "section") {
			handlePanelSlide(pathname, false)
			setIsPageLoaded(true)
		}
	}, [isPageLoaded, pathname, variant])

	return (
		<header>
			<nav
				ref={navRef}
				className='hidden landscape:flex fixed top-0 right-0 left-0 p-8 justify-between bg-colorBlack z-header'
			>
				<CustomButton
					href='/'
					classes={`underlined-link text-titleSmall md:text-titleMedium uppercase transition ${pathname === "/" ? "opacity-0 -translate-x-full" : "opacity-100"}`}
					transitionOnClick={
						variant === "section"
							? () => handlePanelSlide("/", true) // if in first level, slide to home
							: () => projectExit(() => router.push("/")) // if in second level, exit and navigate to home
					}
				>
					MAN/ONE MUSIC
				</CustomButton>

				<div className='hidden landscape:flex gap-8'>
					{navLinks.map(
						(link, index) =>
							link.slug !== "/" && (
								<NavLink
									label={link.title}
									slug={link.slug}
									key={`panel-button-${index}`}
									activeState={
										pathname.includes(`/${link.slug}`) ? true : false
									}
									action={() => {
										variant === "section"
											? handlePanelSlide(link.slug, true)
											: projectExit(() => router.push(`/${link.slug}`))
									}}
								/>
							)
					)}
				</div>
			</nav>
		</header>
	)
}
