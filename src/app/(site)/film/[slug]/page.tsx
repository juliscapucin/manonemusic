import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectPage } from "@/components/pages"
import {
	getFilm,
	getPortfolioItems,
	getPortfolioPage,
} from "@/sanity/sanity-queries"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params

	const filmPageData = await getFilm(slug)
	const filmsData = await getPortfolioItems("film")
	const filmsPageData = await getPortfolioPage("Film")

	if (!filmPageData || !filmsData || !filmsPageData) return notFound()

	return (
		<ProjectPage
			{...{
				projectPageData: filmPageData,
				projectsData: filmsData,
				projectsPageData: filmsPageData,
			}}
		/>
	)
}
