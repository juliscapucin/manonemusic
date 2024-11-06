"use client"

import { navLinks } from "@/constants"

import { AllData } from "@/types"
import { usePathname } from "next/navigation"
import { NavBar, PanelContent } from "@/components"

export default function PanelMobile({ data }: { data: AllData }) {
	const pathname = usePathname()
	const section = pathname.replace("/", "")

	const handleNavLinkClick = (slug: string, pushSlug: boolean) => {
		if (pushSlug) {
			window.history.pushState(null, "", `/${slug}`)
		}
	}

	return (
		<div className='lg:hidden'>
			{/* <Logo /> */}
			<NavBar navLinks={navLinks} sectionTransition={handleNavLinkClick} />
			{pathname === "/" ? (
				navLinks.map((section, index) => (
					<section
						data-id={`panel-${index}`}
						className={`panel w-screen h-screen min-h-full pl-8 overflow-clip`}
						key={`panel-${index}`}
					>
						<PanelContent data={data} section={section.label.toLowerCase()} />
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
