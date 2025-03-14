import { PortfolioItem, PortfolioPage } from "@/types"
import { ProjectsMenu, ProjectCard } from "@/components"

type ProjectsMenuPageProps = {
	projectsData: PortfolioItem[]
	pageData: PortfolioPage
}

export default function ProjectsMenuPage({
	projectsData,
	pageData,
}: ProjectsMenuPageProps) {
	return (
		<>
			{/* Mobile */}
			<aside className='fixed h-fit right-4 bottom-0 left-4 flex gap-4 overflow-x-scroll z-10 landscape:translate-y-[200%] transition-transform duration-300 bg-colorBlack p-4'>
				{projectsData?.map((project: PortfolioItem) => {
					return (
						<ProjectCard
							variant='page'
							section={pageData.slug}
							key={project.slug}
							title={project.title}
							image={project.image}
							slug={project.slug}
						/>
					)
				})}
			</aside>

			{/* Desktop */}
			<aside className='fixed w-24 top-24 right-4 bottom-4 flex flex-col gap-4 overflow-y-scroll z-10 translate-x-[200%] landscape:translate-x-0 transition-transform duration-300'>
				{projectsData?.map((project: PortfolioItem) => {
					return (
						<ProjectCard
							variant='page'
							section={pageData.slug}
							key={project.slug}
							title={project.title}
							image={project.image}
							slug={project.slug}
						/>
					)
				})}
			</aside>
		</>
	)
}
