"use client"

import { useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import { NavLink } from "@/components"
import { Button } from "@/components/ui"
import { handlePanelSlide, projectExit } from "@/lib/animations"

type NavLink = { label: string; slug: string }

type NavLinksProps = {
	variant?: "section" | "page"
	navLinks: NavLink[]
}

export default function NavBar({ variant, navLinks }: NavLinksProps) {
	const pathname = usePathname()
	const router = useRouter()
	const navRef = useRef<HTMLDivElement | null>(null)

	return (
		<nav
			ref={navRef}
			className='fixed top-8 right-8 left-8 flex justify-between z-header'
		>
			<Button
				href='/'
				classes={`underlined-link text-titleSmall md:text-titleMedium uppercase transition ${pathname === "/" ? "opacity-0 -translate-x-full" : "opacity-100"}`}
				transitionOnClick={
					variant === "section"
						? () => handlePanelSlide("/", true) // if in first level, slide to home
						: () => projectExit(() => router.push("/")) // if in second level, exit and navigate to home
				}
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
									variant === "section"
										? handlePanelSlide(link.slug, true)
										: projectExit(() => router.push(`/${link.slug}`))
								}}
							/>
						)
				)}
			</div>
		</nav>
	)
}
