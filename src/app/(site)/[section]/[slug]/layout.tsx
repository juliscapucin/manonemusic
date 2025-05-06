import {
	getHeaderNavLinks,
	getPortfolioItems,
	getPortfolioPage,
} from "@/sanity/sanity-queries"

import { Header } from "@/components/ui"
import { notFound } from "next/navigation"
import { ProjectsMenuPage } from "@/components"

export default async function PageLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: {
		section: string
		slug: string
	}
}) {
	const { section, slug } = await params
	const headerNavLinks = await getHeaderNavLinks()
	const projectsPageData = await getPortfolioPage(section)

	// Because all sections are singular in the schema but vary in the header nav / slug
	const sectionWithoutS = section.endsWith("s") ? section.slice(0, -1) : section

	const projectsData = await getPortfolioItems(sectionWithoutS)

	if (!projectsData) return notFound()

	console.log("layout")

	return (
		<>
			<Header variant='page' navLinks={headerNavLinks} />
			<ProjectsMenuPage
				projectsData={projectsData}
				pageData={projectsPageData}
			/>
			{children}
		</>
	)
}
