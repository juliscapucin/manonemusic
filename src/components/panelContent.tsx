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
	let content

	switch (section) {
		case "/":
			content = <HomePage data={data.homePage} />
			break
		case "film":
			content = (
				<FilmsPage data={data.portfolioSections[section]} films={data.films} />
			)
			break
		case "commercial":
			content = (
				<CommercialsPage
					data={data.portfolioSections[section]}
					commercials={data.commercials}
				/>
			)
			break
		case "releases":
			content = (
				<ReleasesPage
					releasesPageData={data.portfolioSections[section]}
					releases={data.releases}
				/>
			)
			break
		case "projects":
			content = (
				<ProjectsPage
					projectsPageData={data.portfolioSections[section]}
					projects={data.projects}
				/>
			)
			break
		case "about":
			content = <AboutPage {...data.aboutPage} />
			break
		case "contact":
			content = <ContactPage {...data.contactPage} />
			break
		default:
			content = null
	}

	return <>{content}</>
}
