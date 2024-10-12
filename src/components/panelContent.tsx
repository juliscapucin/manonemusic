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
	return (
		<>
			{section === "home" && <HomePage data={data.homePage} />}
			{section === "films" && (
				<FilmsPage
					data={data.portfolioPages?.find((page) => page.title === "Films")}
					films={data.films}
				/>
			)}

			{section === "commercials" && (
				<CommercialsPage
					data={data.portfolioPages?.find(
						(page) => page.title === "Commercials"
					)}
					commercials={data.commercials}
				/>
			)}

			{section === "releases" && (
				<ReleasesPage
					releasesPageData={data.portfolioPages?.find(
						(page) => page.title === "Releases"
					)}
					releases={data.releases}
				/>
			)}

			{section === "projects" && (
				<ProjectsPage
					projectsPage={data.portfolioPages?.find(
						(page) => page.title === "Projects"
					)}
					projects={data.projects}
				/>
			)}

			{section === "about" && <AboutPage data={data.aboutPage} />}
			{section === "contact" && <ContactPage data={data.contactPage} />}
		</>
	)
}
