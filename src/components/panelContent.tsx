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
	console.log(data)
	return (
		<>
			{section === "home" && <HomePage data={data.homePage} />}
			{/* {section === "films" && <FilmsPage data={data.films} />}

			{section === "projects" && <ProjectsPage data={data.project} />}
			{section === "releases" && (
				<ReleasesPage
					data={{
						page: data.portfolioPages,
						items: data.releases,
					}}
				/>
			)}
			{section === "about" && <AboutPage data={data.aboutPage} />}
			{section === "contact" && <ContactPage data={data.contactPage} />} */}
		</>
	)
}
