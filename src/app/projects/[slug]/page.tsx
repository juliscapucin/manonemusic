import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchProject } from "@/lib"
import { Title } from "@/components/ui"
import { ProjectPage } from "@/components/pages"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

const query = `
query GetProjectBySlug($slug: String!) {
	projectCollection(where: {slug: $slug}, limit: 1) {
	  items {
		 title
		 text
		 slug
		 coverImage {
			url
			title
			description
			width
			height
		 }
		 videoUrl
	  }
	}
 }
`

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const variables = { slug }

	const data = await fetchProject(query, variables)
	const projectData = data.projectCollection.items[0]

	if (!data || data.projectCollection.items.length === 0) return notFound()

	return <ProjectPage projectData={projectData} />
}
