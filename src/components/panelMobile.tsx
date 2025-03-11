"use client"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import { AllData } from "@/types"
import { usePathname } from "next/navigation"
import { PanelContent } from "@/components"
import { useLayoutEffect } from "react"
import path from "path"

export default function PanelMobile({ data }: { data: AllData }) {
	const pathname = usePathname()

	const fullHeightSections = ["/", "contact"]

	const navLinks = [
		{ title: "Home", slug: "/", order: 0 },
		...data.headerNavLinks,
	]

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollToPlugin)

		if (pathname === "/") {
			gsap.to(window, {
				scrollTo: {
					y: "#panel-home",
					offsetY: 0,
				},
				duration: 0.5,
			})
			return
		}

		gsap.to(window, {
			scrollTo: {
				y: `#panel-${pathname.split("/")[1]}`,
				offsetY: 100,
			},
			duration: 0.5,
		})
	}, [pathname])

	return (
		<div className='landscape:hidden'>
			{navLinks.map((section) => (
				<section
					id={`panel-${section.slug === "/" ? "home" : section.slug}`}
					data-id={`panel-${section.slug}`}
					className={`panel w-screen pl-8 overflow-x-clip ${fullHeightSections.includes(section.slug) ? "h-svh" : "h-auto"}`}
					key={`panel-${section.slug}`}
				>
					<PanelContent data={data} section={section.slug} />
				</section>
			))}
		</div>
	)
}
