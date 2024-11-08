import { notFound } from "next/navigation"

import {
	getHomePage,
	getAboutPage,
	getContactPage,
	getPortfolioItems,
	getPortfolioPages,
	getHeaderNavLinks,
} from "@/sanity/sanity-queries"

import { PanelDesktop, PanelMobile } from "@/components"

export async function Panels() {
	const [
		headerNavLinks,
		homePage,
		contactPage,
		aboutPage,
		portfolioPages,
		films,
		commercials,
		releases,
		projects,
	] = await Promise.all([
		getHeaderNavLinks(),
		getHomePage(),
		getContactPage(),
		getAboutPage(),
		getPortfolioPages(),
		getPortfolioItems("film"),
		getPortfolioItems("commercial"),
		getPortfolioItems("release"),
		getPortfolioItems("project"),
	])

	const data = {
		headerNavLinks,
		homePage,
		contactPage,
		aboutPage,
		portfolioPages,
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
		!data.portfolioPages ||
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
