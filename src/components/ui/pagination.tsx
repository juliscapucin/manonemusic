"use client"

import { handlePanelSlide } from "@/lib/animations"
import { usePathname } from "next/navigation"

import type { NavLink } from "@/types"
import { useEffect, useState } from "react"

type PaginationProps = {
	navLinks: NavLink[]
	index: number
}

export default function Pagination({ navLinks, index }: PaginationProps) {
	return (
		<span>
			[0{index}/0{navLinks.length}]
		</span>
	)
}
