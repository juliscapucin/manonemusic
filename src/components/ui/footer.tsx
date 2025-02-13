"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { NavLink } from "@/types"
import { Pagination } from "@/components/ui"
import { IconArrow } from "@/components/icons"

import { handlePanelSlide } from "@/lib/animations"
import { Button, ButtonScroll } from "../buttons"

type FooterProps = {
	navLinks: NavLink[]
}

export default function Footer({ navLinks }: FooterProps) {
	const pathname = usePathname()
	const [index, setIndex] = useState(0)

	const homeLink = { title: "Home", slug: "", order: 0 }
	const sections = [homeLink, ...navLinks]

	useEffect(() => {
		const foundPage = sections.find((link) => `/${link.slug}` === pathname)
		const newIndex = foundPage ? sections.indexOf(foundPage) : 1

		setIndex(newIndex)
	}, [pathname, sections])

	const handleNavigation = (direction: "previous" | "next") => {
		const newIndex =
			direction === "previous"
				? Math.max(0, index - 1)
				: Math.min(sections.length - 1, index + 1)
		const newSlug = sections[newIndex].slug

		handlePanelSlide(newSlug, true)
	}

	return (
		<footer className='fixed bottom-0 w-full p-8 flex justify-between text-white text-center'>
			<Pagination index={index + 1} navLinks={sections} />

			<ButtonScroll
				sectionsTotal={sections.length}
				action={handleNavigation}
				index={index}
			/>
		</footer>
	)
}
