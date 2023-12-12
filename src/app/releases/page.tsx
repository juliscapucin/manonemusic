import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ReleasesPage } from "@/components/pages"

import { fetchGraphQL } from "@/lib"
import { Title } from "@/components/ui"

export const metadata: Metadata = {
	title: "Releases",
	description: "Man One Music releases page.",
}

const query = `
	query {
		releasesCollection {
			items {
				title
				text
			}
		}
	}
`

export default async function Page() {
	const data = await fetchGraphQL(query)
	const releasesData = data.releasesCollection.items[0]

	if (!data) return notFound()

	return (
		<>
			<Title>{releasesData.title}</Title>
			<ReleasesPage data={releasesData} />
		</>
	)
}
