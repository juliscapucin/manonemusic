import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AboutPage } from "@/components/pages"

import { fetchGraphQL } from "@/lib"

export const metadata: Metadata = {
	title: "About",
	description: "A list of projects I have worked on.",
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
	const data = await fetchGraphQL(query)

	console.log(data)

	if (!data) return notFound()

	// return <AboutPage data={data} />
	return <h1>About</h1>
}
