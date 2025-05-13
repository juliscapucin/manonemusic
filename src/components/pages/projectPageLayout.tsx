"use client"

import { ProjectsMenuPage } from "@/components"
import { Header, MenuMobile } from "../ui"
import { NavLink, PortfolioItem, PortfolioPage } from "@/types"
import { usePathname } from "next/navigation"

type ProjectPageLayoutProps = {
	navLinks: NavLink[]
	projectsData: PortfolioItem[]
	projectsPageData: PortfolioPage
}

export default function ProjectPageLayout({
	navLinks,
	projectsData,
	projectsPageData,
}: ProjectPageLayoutProps) {
	const pathname = usePathname()

	// Check if the pathname has two sections (e.g., /projects/case)
	const isTwoSections = pathname.split("/").filter(Boolean).length === 2

	if (!isTwoSections) {
		return null // Do not render anything if the condition is not met
	}

	return (
		<>
			<Header variant='page' navLinks={navLinks} />
			<MenuMobile navLinks={navLinks} />
			<ProjectsMenuPage
				projectsData={projectsData}
				pageData={projectsPageData}
			/>
		</>
	)
}
