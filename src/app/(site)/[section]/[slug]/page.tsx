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

	const projectPageData = await getProject(section, slug)
	const projectsData = await getPortfolioItems(section)
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
