import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectPage, ReleasePage } from "@/components/pages"
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
	const releasesPageData = await getPortfolioPage("Releases")

	if (!releasePageData || !releasesData || !releasesPageData) return notFound()

	return (
		<ProjectPage
			{...{
				projectPageData: releasePageData,
				projectsData: releasesData,
				projectsPageData: releasesPageData,
			}}
		/>
	)
}
