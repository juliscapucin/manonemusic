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
			{section === "home" && (
				<HomePage data={data.aboutPageCollection.items[0]} />
			)}

			{section === "projects" && (
				<ProjectsPage data={data.projectCollection.items} />
			)}
			{section === "releases" && (
				<ReleasesPage
					data={{
						page: data.releasesCollection.items[0],
						albums: data.albumCollection.items,
					}}
				/>
			)}
			{section === "about" && (
				<AboutPage data={data.aboutPageCollection.items[0]} />
			)}
			{section === "contact" && <ContactPage data={data} />}
		</>
	)
}
