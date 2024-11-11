import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectPage } from "@/components/pages"
import {
	getPortfolioItems,
	getPortfolioPage,
	getProject,
} from "@/sanity/sanity-queries"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

export default async function Page({
	params,
}: {
	params: { section: string; slug: string }
}) {
	const { section, slug } = params

	// Because all sections are singular in the schema but vary in the header nav / slug
	const sectionWithoutS = section.endsWith("s") ? section.slice(0, -1) : section

	const projectPageData = await getProject(sectionWithoutS, slug)
	const projectsData = await getPortfolioItems(sectionWithoutS)
	const projectsPageData = await getPortfolioPage(section)

	if (!projectPageData || !projectsData || !projectsPageData) return notFound()

	return (
		<ProjectPage
			{...{
				projectPageData,
				projectsData,
				projectsPageData,
			}}
		/>
	)
}
