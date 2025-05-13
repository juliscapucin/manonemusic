import { ProjectPageLayout } from "@/components/pages"
import {
	getHeaderNavLinks,
	getPortfolioItems,
	getPortfolioPage,
} from "@/sanity/sanity-queries"

import { notFound } from "next/navigation"

export default async function PageLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ section: string }>
}) {
	const { section } = await params
	const navLinks = await getHeaderNavLinks()
	const projectsPageData = await getPortfolioPage(section)

	// Because all sections are singular in the schema but vary in the header nav / slug
	const sectionWithoutS = section.endsWith("s") ? section.slice(0, -1) : section

	const projectsData = await getPortfolioItems(sectionWithoutS)

	if (!projectsData) return notFound()

	return (
		<>
			<ProjectPageLayout
				{...{
					navLinks,
					projectsData,
					projectsPageData,
				}}
			/>

			{children}
		</>
	)
}
