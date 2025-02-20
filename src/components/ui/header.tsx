"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { CustomButton, NavLink } from "@/components/ui"
import { handlePanelSlide, projectExit } from "@/lib/animations"
import { NavLink as NavLinkType } from "@/types"

type HeaderProps = {
	navLinks: NavLinkType[]
}

export default function Header({ navLinks }: HeaderProps) {
	const [variant, setVariant] = useState<"section" | "page">("section")
	const [isPageLoaded, setIsPageLoaded] = useState(false)
	const pathname = usePathname()
	const router = useRouter()
	const navRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!pathname || !isPageLoaded) return

		// Split the pathname and filter out empty segments
		const pathSegments = pathname.split("/").filter(Boolean)

		// Check if the path is first-level (e.g., "/commercial")
		if (pathSegments.length <= 1) setVariant("section")
		else setVariant("page")
	}, [pathname])

	useEffect(() => {
		// Check if the page is loaded to slide into position
		if (!isPageLoaded) {
			console.log(pathname)
			handlePanelSlide(pathname, false)
			setIsPageLoaded(true)
		}
	}, [])

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
