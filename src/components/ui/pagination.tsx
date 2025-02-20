"use client"

import type { NavLink } from "@/types"

type PaginationProps = {
	navLinks: NavLink[]
	index: number
}

export default function Pagination({ navLinks, index }: PaginationProps) {
	return (
		<span className='text-right'>
			[0{index}/0{navLinks.length}]
		</span>
	)
}
