"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { NavLink } from "@/types"
import { Pagination } from "@/components/ui"
import { IconArrow } from "@/components/icons"

import { handlePanelSlide } from "@/lib/animations"
import { Button, ButtonScroll } from "../buttons"
import Availability from "../availability"

type FooterProps = {
	navLinks: NavLink[]
}

export default function Footer({ navLinks }: FooterProps) {
	const pathname = usePathname()
	const [index, setIndex] = useState(0)

	const sections = navLinks

	useEffect(() => {
		const foundPage = sections.find((link) => `/${link.slug}` === pathname)
		const newIndex = foundPage ? sections.indexOf(foundPage) : 0

		setIndex(newIndex)
	}, [pathname, sections])

	const handleNavigation = (direction: "previous" | "next") => {
		const newIndex =
			direction === "previous"
				? index - 1 >= 0
					? index - 1
					: index
				: index + 1 < sections.length
					? index + 1
					: index
		const newSlug = sections[newIndex].slug

		handlePanelSlide(newSlug, true)
	}

	return (
		<footer className='fixed bottom-0 w-full p-8 flex items-center text-white text-center [&>*]:flex-1'>
			<Availability slideToContact={() => handlePanelSlide("contact", true)} />

			<ButtonScroll
				sectionsTotal={sections.length}
				action={handleNavigation}
				index={index}
			/>

			<Pagination index={index} navLinks={sections} />
		</footer>
	)
}
