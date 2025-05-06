"use client"

import { PortfolioItem, PortfolioPage } from "@/types"
import { ProjectCard } from "@/components"

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
			<aside className='fixed h-fit right-4 bottom-0 left-4 flex gap-4 overflow-x-scroll z-10 landscape:opacity-0 p-4'>
				{projectsData?.map((project: PortfolioItem) => {
					return (
						<ProjectCard
							variant='page'
							section={pageData.slug}
							key={project.slug}
							title={project.title}
							image={project.image}
							slug={project.slug}
							isMobile={true}
						/>
					)
				})}
			</aside>

			{/* Desktop */}
			<aside
				className={
					"gsap-projects-menu-page fixed w-32 top-24 right-4 bottom-4 flex flex-col gap-4 overflow-y-scroll overflow-x-visible z-10 opacity-0 landscape:opacity-100"
				}>
				{projectsData?.map((project: PortfolioItem) => {
					return (
						<ProjectCard
							variant='page'
							section={pageData.slug}
							key={project.slug}
							title={project.title}
							image={project.image}
							slug={project.slug}
							isMobile={false}
						/>
					)
				})}
			</aside>
		</>
	)
}
