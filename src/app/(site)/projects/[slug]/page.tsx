import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchBySlug, fetchAll } from "@/lib"
import { ProjectPage } from "@/components/pages"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

import { queryAll, queryProject } from "@/lib/queries"

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const variables = { slug }

	const data = await fetchBySlug(queryProject, variables)
	const projectsData = await fetchAll(queryAll)
	const projectData = data.projectCollection.items[0]

	if (!data || !projectsData || data.projectCollection.items.length === 0)
		return notFound()

	return (
		<ProjectPage
			{...{
				projectData,
				projectsData: projectsData.projectCollection.items,
				transitionOnEnter: true,
			}}
		/>
	)
}
