import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectPage } from "@/components/pages"
import {
	getPortfolioItems,
	getPortfolioPage,
	getProject,
} from "@/sanity/sanity-queries"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params

	const projectPageData = await getProject(slug)
	const projectsData = await getPortfolioItems("project")
	const projectsPageData = await getPortfolioPage("Project")

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
