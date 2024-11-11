"use client"

import { AllData } from "@/types"
import { usePathname } from "next/navigation"
import { PanelContent } from "@/components"

export default function PanelMobile({ data }: { data: AllData }) {
	const pathname = usePathname()
	const section = pathname.replace("/", "")

	const navLinks = data.headerNavLinks

	const handleNavLinkClick = (slug: string, pushSlug: boolean) => {
		if (pushSlug) {
			window.history.pushState(null, "", `/${slug}`)
		}
	}

	return (
		<div className='lg:hidden'>
			{pathname === "/" ? (
				navLinks.map((section, index) => (
					<section
						data-id={`panel-${index}`}
						className={`panel w-screen h-screen min-h-full pl-8 overflow-clip`}
						key={`panel-${index}`}
					>
						<PanelContent data={data} section={section.slug} />
					</section>
				))
			) : (
				<section
					className={`panel w-screen h-screen min-h-full pl-8 overflow-clip`}
				>
					<PanelContent data={data} section={section} />
				</section>
			)}
		</div>
	)
}
