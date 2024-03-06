import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchProject, fetchAll } from "@/lib"
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
		 credits
		 imdbLink
	  }
	}
 }
`

const allProjectsQuery = `
	query {
		 projectCollection {
			items {
			  title
			  slug
			  text
			  coverImage {
				 url
				 title
				 description
				 width
				 height
			  }
			}
		 }
	}
`

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const variables = { slug }

	const data = await fetchProject(query, variables)
	const projectsData = await fetchAll(allProjectsQuery)
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
