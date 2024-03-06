import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchProject } from "@/lib"
import { ProjectPage, TrailerPage } from "@/components/pages"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

import { queryProject } from "@/lib/queries"

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const variables = { slug }

	const data = await fetchProject(queryProject, variables)
	const projectData = data.projectCollection.items[0]

	if (!data || data.projectCollection.items.length === 0) return notFound()

	return <TrailerPage projectData={projectData} />
}
