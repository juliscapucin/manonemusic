import { navLinks } from "@/constants"

import { AllData } from "@/types"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui"
import { NavBar, PanelContent } from "@/components"

export default function PanelMobile({ data }: { data: AllData }) {
	const pathname = usePathname()
	const section = pathname.replace("/", "")

	const handleNavLinkClick = (index: number, pushSlug: boolean) => {
		const slug = navLinks[index].slug
		if (pushSlug) {
			window.history.pushState(null, "", `/${slug}`)
		}
	}

	return (
		<>
			{/* <Logo /> */}
			<NavBar navLinks={navLinks} transitionOnClick={handleNavLinkClick} />
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
		</>
	)
}
