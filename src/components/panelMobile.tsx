"use client"

import { AllData } from "@/types"
import { usePathname } from "next/navigation"
import { PanelContent } from "@/components"

export default function PanelMobile({ data }: { data: AllData }) {
	const pathname = usePathname()
	const section = pathname.replace("/", "")

	const navLinks = [
		{ title: "Home", slug: "/", order: 0 },
		...data.headerNavLinks,
	]

	const handleNavLinkClick = (slug: string, pushSlug: boolean) => {
		if (pushSlug) {
			window.history.pushState(null, "", `/${slug}`)
		}
	}

	return (
		<main className='lg:hidden'>
			{navLinks.map((section, index) => (
				<section
					data-id={`panel-${index}`}
					className={`panel w-screen min-h-svh pl-8 overflow-x-clip`}
					key={`panel-${index}`}
				>
					<PanelContent data={data} section={section.slug} />
				</section>
			))}
		</main>
	)
}
