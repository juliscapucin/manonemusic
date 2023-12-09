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
	}
`

export default async function Page() {
	const data = await fetchGraphQL(query, "workPageCollection")

	if (!data) return notFound()

	return (
		<>
			<Title>{data.title}</Title>
			<WorkPage data={data} />
		</>
	)
}
