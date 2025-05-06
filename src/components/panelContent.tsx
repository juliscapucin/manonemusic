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
	index: number
}

export default function PanelContent({
	data,
	section,
	index,
}: PanelContentProps) {
	let Content: React.ReactNode

	switch (section) {
		case "/":
			Content = <HomePage />
			break
		case "about":
			Content = <AboutPage {...data.aboutPage} index={index} />
			break
		case "contact":
			Content = <ContactPage {...data.contactPage} index={index} />
			break
		case "film":
		case "commercial":
			Content = (
				<ProjectsPage
					projectsPageData={data.portfolioSections[section]}
					projects={data[`${section}s`]}
					index={index}
				/>
			)
			break
		case "releases":
		case "projects":
			Content = (
				<ProjectsPage
					projectsPageData={data.portfolioSections[section]}
					projects={data[section]}
					index={index}
				/>
			)
			break
		default:
			Content = null
	}

	return <>{Content}</>
}
