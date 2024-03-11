import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchAlbum, fetchAll } from "@/lib"
import { ReleasePage } from "@/components/pages"

export const metadata: Metadata = {
	title: "release",
	description: "release description",
}

import { queryAll, queryAlbum } from "@/lib/queries"

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const variables = { slug }

	const data = await fetchAlbum(queryAlbum, variables)

	const releasesPageData = await fetchAll(queryAll)
	const releaseData = data.albumCollection.items[0]

	if (!data || !releasesPageData) return notFound()

	return (
		<ReleasePage
			{...{
				releaseData,
				releasesPageData: releasesPageData.releasesCollection.items[0],
				releasesData: releasesPageData.albumCollection.items,
				transitionOnEnter: true,
			}}
		/>
	)
}
