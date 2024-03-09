import { navLinks } from "@/constants"

import {
	AboutPage,
	ContactPage,
	HomePage,
	ReleasesPage,
	ProjectsPage,
} from "@/components/pages"

import { AllData } from "@/types"
import { usePathname } from "next/navigation"

export default function PanelMobile({ data }: { data: AllData }) {
	const pathname = usePathname()
	return (
		<>
			{pathname === "/" ? (
				navLinks.map((section, index) => (
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
				))
			) : (
				<section
					className={`panel w-screen h-screen min-h-full pl-8 overflow-clip`}
				>
					{pathname === "/projects" && (
						<ProjectsPage data={data.projectCollection.items} />
					)}
					{pathname === "/releases" && (
						<ReleasesPage data={data.releasesCollection.items[0]} />
					)}
					{pathname === "/about" && (
						<AboutPage data={data.aboutPageCollection.items[0]} />
					)}
					{pathname === "/contact" && <ContactPage data={data} />}
				</section>
			)}
		</>
	)
}
