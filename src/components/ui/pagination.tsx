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

	const homeLink = { title: "Home", slug: "" }
	const sections = [homeLink, ...navLinks]

	useEffect(() => {
		const foundPage = sections.find((link) => `/${link.slug}` === pathname)
		console.log(foundPage)
		const newIndex = foundPage ? navLinks.indexOf(foundPage) + 1 : 0
		setIndex(newIndex)
	}, [pathname, sections])

	return (
		<div className='fixed bottom-8 left-8 flex justify-center items-center w-full px-4 py-2'>
			<span>
				[0{index + 1}/0{navLinks.length + 1}]
			</span>
			<ButtonScroll
				actionLeft={() => {
					const previousIndex = index - 1 < 1 ? 1 : index
					const previousSlug = navLinks[previousIndex].slug

					console.log(previousSlug)

					handlePanelSlide(previousSlug, true)
				}}
				actionRight={() => {
					const nextIndex =
						index + 1 > navLinks.length + 1 ? navLinks.length : index
					const nextSlug = navLinks[nextIndex].slug

					handlePanelSlide(nextSlug, true)
				}}
			/>
		</div>
	)
}
