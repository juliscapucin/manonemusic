"use client"

import { ButtonScroll } from "@/components/buttons"
import { handlePanelSlide } from "@/lib/animations"
import { usePathname, useRouter } from "next/navigation"

import type { NavLink } from "@/types"
import { useEffect, useState } from "react"

type PaginationProps = {
	navLinks: NavLink[]
}

export default function Pagination({ navLinks }: PaginationProps) {
	const pathname = usePathname()
	const [index, setIndex] = useState(0)
	const [pages, setPages] = useState<NavLink[]>([])

	useEffect(() => {
		const foundPage = pages.find((link) => `/${link.slug}` === pathname)
		const newIndex = foundPage ? navLinks.indexOf(foundPage) + 1 : 0
		setIndex(newIndex)
	}, [pathname, pages])

	useEffect(() => {
		const homeLink = { title: "Home", slug: "" }
		const updatedPages = [homeLink, ...navLinks]
		setPages(updatedPages)
	}, [navLinks])

	return (
		<div className='fixed bottom-8 left-8 flex justify-center items-center w-full px-4 py-2'>
			<ButtonScroll
				index={index}
				total={navLinks.length + 1}
				action={() => {
					const nextIndex =
						index + 1 > navLinks.length ? navLinks.length : index + 1
					const nextSlug = navLinks[nextIndex].slug

					handlePanelSlide(nextSlug, true)
				}}
			/>
		</div>
	)
}
