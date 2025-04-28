import type { Metadata } from "next"

import { Panels } from "@/components"

export const metadata: Metadata = {
	title: "Man One Music",
	description:
		"Man One Music and lead composer Matt Rudge specialise in original music and sound.",
}

import { notFound } from "next/navigation"

import {
	getHomePage,
	getAboutPage,
	getContactPage,
	getPortfolioItems,
	getPortfolioSections,
	getHeaderNavLinks,
} from "@/sanity/sanity-queries"

// Opt out of caching for all data requests in the route segment
// export const dynamic = "force-dynamic"
// export const fetchCache = "force-no-store"

export default async function Page({
	params,
}: {
	params: { section: string }
}) {
	const [
		headerNavLinks,
		homePage,
		contactPage,
		aboutPage,
		sections,
		films,
		commercials,
		releases,
		projects,
	] = await Promise.all([
		getHeaderNavLinks(),
		getHomePage(),
		getContactPage(),
		getAboutPage(),
		getPortfolioSections(),
		getPortfolioItems("film"),
		getPortfolioItems("commercial"),
		getPortfolioItems("release"),
		getPortfolioItems("project"),
	])

	const portfolioSections = sections.reduce(
		(acc: { [key: string]: (typeof sections)[0] }, item) => {
			acc[item.slug] = item
			return acc
		},
		{}
	)

	// Check if the section exists, otherwise thwrow Error Page
	if (!headerNavLinks.find((item) => item.slug === params.section)) {
		return notFound()
	}

	const data = {
		headerNavLinks,
		homePage,
		contactPage,
		aboutPage,
		portfolioSections,
		films,
		commercials,
		releases,
		projects,
	}

	if (
		!data ||
		!data.headerNavLinks ||
		!data.homePage ||
		!data.contactPage ||
		!data.aboutPage ||
		!data.portfolioSections ||
		!data.films ||
		!data.commercials ||
		!data.releases ||
		!data.projects
	)
		return notFound()

	return <Panels data={data} />
}
