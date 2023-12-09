import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AboutPage } from "@/components/pages"

import { fetchGraphQL } from "@/lib"
import { Title } from "@/components/ui"

export const metadata: Metadata = {
	title: "About",
	description:
		"Man One Music and lead composer Matt Rudge specialise in original music and sound.",
}

const query = `
	query {
		aboutPageCollection {
			items {
				title
				text
			}
		}
	}
`

export default async function Page() {
	const data = await fetchGraphQL(query, "aboutPageCollection")

	if (!data) return notFound()

	return (
		<>
			<Title>{data.title}</Title>
			<AboutPage data={data} />
		</>
	)
}
