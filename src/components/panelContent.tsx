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
	tween: gsap.core.Tween | null
}

export default function PanelContent({
	data,
	section,
	tween,
}: PanelContentProps) {
	let Content: React.ReactNode

	switch (section) {
		case "/":
			Content = <HomePage tween={tween} />
			break
		case "about":
			Content = <AboutPage {...{ tween, ...data.aboutPage }} />
			break
		case "contact":
			Content = <ContactPage {...{ tween, ...data.contactPage }} />
			break
		case "film":
		case "commercial":
			Content = (
				<ProjectsPage
					projectsPageData={data.portfolioSections[section]}
					projects={data[`${section}s`]}
					tween={tween}
				/>
			)
			break
		case "releases":
		case "projects":
			Content = (
				<ProjectsPage
					projectsPageData={data.portfolioSections[section]}
					projects={data[section]}
					tween={tween}
				/>
			)
			break
		default:
			Content = null
	}

	return <>{Content}</>
}
