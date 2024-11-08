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
			{section === "/" && <HomePage data={data.homePage} />}
			{section === "film" && (
				<FilmsPage data={data.portfolioSections[section]} films={data.films} />
			)}

			{section === "commercial" && (
				<CommercialsPage
					data={data.portfolioSections[section]}
					commercials={data.commercials}
				/>
			)}

			{section === "release" && (
				<ReleasesPage
					releasesPageData={data.portfolioSections[section]}
					releases={data.releases}
				/>
			)}

			{section === "project" && (
				<ProjectsPage
					projectsPage={data.portfolioSections[section]}
					projects={data.projects}
				/>
			)}

			{section === "about" && <AboutPage data={data.aboutPage} />}
			{section === "contact" && <ContactPage data={data.contactPage} />}
		</>
	)
}
