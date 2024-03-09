import { navLinks } from "@/constants"

import {
	AboutPage,
	ContactPage,
	HomePage,
	ReleasesPage,
	ProjectsPage,
} from "@/components/pages"

import { AllData } from "@/types"

export default function VerticalPanel({ data }: { data: AllData }) {
	return (
		<>
			{navLinks.map((section, index) => (
				<section
					data-id={`panel-${index}`}
					className={`panel w-screen h-screen min-h-full pl-8 overflow-clip`}
					key={`panel-${index}`}
				>
					{section.label.toLowerCase() === "home" && (
						<HomePage data={data.aboutPageCollection.items[0]} />
					)}

					{section.label.toLowerCase() === "projects" && (
						<ProjectsPage data={data.projectCollection.items} />
					)}
					{section.label.toLowerCase() === "releases" && (
						<ReleasesPage data={data.releasesCollection.items[0]} />
					)}
					{section.label.toLowerCase() === "about" && (
						<AboutPage data={data.aboutPageCollection.items[0]} />
					)}
					{section.label.toLowerCase() === "contact" && (
						<ContactPage data={data} />
					)}
				</section>
			))}
		</>
	)
}
