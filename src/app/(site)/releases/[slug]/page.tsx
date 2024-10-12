import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ReleasePage } from "@/components/pages"
import {
	getRelease,
	getPortfolioItems,
	getPortfolioPage,
} from "@/sanity/sanity-queries"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params

	const releasePageData = await getRelease(slug)
	const releasesData = await getPortfolioItems("release")
	const releasesPageData = await getPortfolioPage("release")

	if (!releasePageData || !releasesData || !releasesPageData) return notFound()

	return (
		<ReleasePage
			{...{
				releasePageData,
				releasesData,
				releasesPageData,
			}}
		/>
	)
}
