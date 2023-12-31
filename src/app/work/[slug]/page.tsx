import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { WorkPage } from "@/components/pages"

import { fetchGraphQL } from "@/lib"
import { Title } from "@/components/ui"

export const metadata: Metadata = {
	title: "About",
	description:
		"Man One Music and lead composer Matt Rudge specialise in original music and sound.",
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
	const projectData = data.projectCollection.items[0]

	if (!data) return notFound()

	return (
		<>
			<Title>{workData.title}</Title>
		</>
	)
}
