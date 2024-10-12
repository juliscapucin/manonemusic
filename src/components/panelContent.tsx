import {
	AboutPage,
	ContactPage,
	FilmsPage,
	HomePage,
	ReleasesPage,
	ProjectsPage,
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
			{/* {section === "releases" && (
				<ReleasesPage
				{data.portfolioPages?.find((page) => page.title === "Releases")}
				/>
			)} */}
			{section === "about" && <AboutPage data={data.aboutPage} />}
			{section === "contact" && <ContactPage data={data.contactPage} />}
		</>
	)
}
