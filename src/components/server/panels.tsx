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
export const dynamic = "force-dynamic"

import { PanelDesktop, PanelMobile } from "@/components"

export async function Panels() {
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

	return (
		<>
			<PanelDesktop data={data} />
			<PanelMobile data={data} />
		</>
	)
}
