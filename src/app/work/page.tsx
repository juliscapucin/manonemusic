import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { WorkPage } from "@/components/pages"

import { fetchGraphQL } from "@/lib"
import { Title } from "@/components/ui"

export const metadata: Metadata = {
	title: "Work",
	description: "Man One Music case studies.",
}

const query = `
	query {
		workPageCollection {
		  items {
			 title
		  }
		}
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
			 videoUrl
		  }
		}
	 }
`

export default async function Page() {
	const data = await fetchGraphQL(query)
	const workData = data.workPageCollection.items[0]
	const projectsData = data.projectCollection.items

	if (!data) return notFound()

	return (
		<>
			<Title>{workData.title}</Title>
			<WorkPage projectsData={projectsData} />
		</>
	)
}
