import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CommercialPage } from "@/components/pages"
import {
	getCommercial,
	getPortfolioItems,
	getPortfolioPage,
} from "@/sanity/sanity-queries"

export const metadata: Metadata = {
	title: "Project",
	description: "Project description",
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params

	const commercialPageData = await getCommercial(slug)
	const commercialsData = await getPortfolioItems("commercial")
	const commercialsPageData = await getPortfolioPage("Commercials")

	if (!commercialPageData || !commercialsData || !commercialsPageData)
		return notFound()

	return (
		<CommercialPage
			{...{
				commercialPageData,
				commercialsData,
				commercialsPageData,
			}}
		/>
	)
}
