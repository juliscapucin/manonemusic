import { PortfolioItem, PortfolioPage } from "@/types"
import ProjectsMenu from "./projectsMenu"

type ProjectsMenuPageProps = {
	projectsData: PortfolioItem[]
	pageData: PortfolioPage
}

export default function ProjectsMenuPage({
	projectsData,
	pageData,
}: ProjectsMenuPageProps) {
	return (
		<aside className='fixed top-32 right-8 bottom-0 overflow-y-scroll z-10'>
			<ProjectsMenu
				variant='page'
				projects={projectsData}
				section={pageData.slug}
			/>
		</aside>
	)
}
