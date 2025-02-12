import {
	AboutPage,
	ContactPage,
	HomePage,
	ProjectsPage,
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
		case "about":
			content = <AboutPage {...data.aboutPage} />
			break
		case "contact":
			content = <ContactPage {...data.contactPage} />
			break
		case "film":
		case "commercial":
			content = (
				<ProjectsPage
					projectsPageData={data.portfolioSections[section]}
					projects={data[`${section}s`]}
				/>
			)
			break
		case "releases":
		case "projects":
			content = (
				<ProjectsPage
					projectsPageData={data.portfolioSections[section]}
					projects={data[section]}
				/>
			)
			break
		default:
			content = null
	}

	return <>{content}</>
}
