import { notFound } from "next/navigation"

import {
	getHomePage,
	getAboutPage,
	getContactPage,
	getPortfolioItems,
	getPortfolioPages,
} from "@/sanity/sanity-queries"

import { PanelDesktop, PanelMobile } from "@/components"

export async function Panels() {
	const [
		homePage,
		contactPage,
		aboutPage,
		portfolioPages,
		films,
		commercials,
		releases,
		projects,
	] = await Promise.all([
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
		homePage,
		contactPage,
		aboutPage,
		portfolioPages,
		films,
		commercials,
		releases,
		projects,
	}

	if (!data) return notFound()

	return (
		<>
			<PanelDesktop data={data} />
			<PanelMobile data={data} />
		</>
	)
}
