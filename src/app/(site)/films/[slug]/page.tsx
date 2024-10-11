import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { FilmPage } from "@/components/pages"
import {
	getFilm,
	getPortfolioItems,
	getPortfolioPage,
	getPortfolioPages,
} from "@/sanity/sanity-queries"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params

	const filmData = await getFilm(slug)
	const filmsData = await getPortfolioItems("film")
	const filmsPageData = await getPortfolioPage("film")

	if (!filmData || !filmsData || !filmsPageData) return notFound()

	return (
		<FilmPage
			{...{
				filmData,
				filmsData,
				filmsPageData,
			}}
		/>
	)
}
