import { AboutPage, ContactPage, HomePage, PortfolioPage } from "@/types"
import { PortfolioItem } from "./PortfolioItem"

export type AllData = {
	homePage: HomePage
	contactPage: ContactPage
	aboutPage: AboutPage
	portfolioPages: PortfolioPage[]
	films: PortfolioItem[]
	commercials: PortfolioItem[]
	releases: PortfolioItem[]
	projects: PortfolioItem[]
}
