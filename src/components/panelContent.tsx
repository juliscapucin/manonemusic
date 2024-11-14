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

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
	"/": HomePage,
	film: FilmsPage,
	commercial: CommercialsPage,
	releases: ReleasesPage,
	about: AboutPage,
	contact: ContactPage,
	projects: ProjectsPage,
}

type PanelContentProps = {
	data: AllData
	section: string
}

export default function PanelContent({ data, section }: PanelContentProps) {
	const SectionComponent = sectionComponents[section]

	if (!SectionComponent) {
		return null // or handle the case where the section is not found
	}

	const sectionData: { [key: string]: any } = {
		"/": data.homePage,
		film: { data: data.portfolioSections[section], films: data.films },
		commercial: {
			data: data.portfolioSections[section],
			commercials: data.commercials,
		},
		releases: {
			releasesPageData: data.portfolioSections[section],
			releases: data.releases,
		},
		projects: {
			projectsPageData: data.portfolioSections[section],
			projects: data.projects,
		},
		about: data.aboutPage,
		contact: data.contactPage,
	}

	return <SectionComponent {...sectionData[section]} />
}
