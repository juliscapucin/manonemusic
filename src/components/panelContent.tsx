import {
	AboutPage,
	ContactPage,
	FilmsPage,
	HomePage,
	ReleasesPage,
	ProjectsPage,
	CommercialsPage,
} from "@/components/pages"

import { AllData } from "@/types"

type PanelContentProps = {
	data: AllData
	section: string
}

export default function PanelContent({ data, section }: PanelContentProps) {
	console.log(data.portfolioPages)
	return (
		<>
			{section === "/" && <HomePage data={data.homePage} />}
			{section === "film" && (
				<FilmsPage
					data={data.portfolioPages.find((page) => page.slug === section)}
					films={data.films}
				/>
			)}

			{section === "commercial" && (
				<CommercialsPage
					data={data.portfolioPages.find((page) => page.slug === section)}
					commercials={data.commercials}
				/>
			)}

			{section === "release" && (
				<ReleasesPage
					releasesPageData={data.portfolioPages.find(
						(page) => page.slug === section
					)}
					releases={data.releases}
				/>
			)}

			{section === "project" && (
				<ProjectsPage
					projectsPage={data.portfolioPages.find(
						(page) => page.slug === section
					)}
					projects={data.projects}
				/>
			)}

			{section === "about" && <AboutPage data={data.aboutPage} />}
			{section === "contact" && <ContactPage data={data.contactPage} />}
		</>
	)
}
