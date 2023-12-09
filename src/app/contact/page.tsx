import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ContactPage } from "@/components/pages"

import { fetchGraphQL } from "@/lib"
import { Title } from "@/components/ui"

export const metadata: Metadata = {
	title: "Contact",
	description: "Man One Music contact page.",
}

const query = `
	query {
		contactPageCollection {
			items {
				title
				availability
			}
		}
	}
`

export default async function Page() {
	const data = await fetchGraphQL(query, "contactPageCollection")

	if (!data) return notFound()

	return (
		<>
			<Title>{data.title}</Title>
			<ContactPage data={data} />
		</>
	)
}
