import { PortfolioItem } from "@/types"
import { ProjectCard } from "@/components"

type ProjectsMenuProps = {
	projects: PortfolioItem[]
	section: string
	variant: "section" | "page"
}

export default function ProjectsMenu({ projects, section }: ProjectsMenuProps) {
	return (
		<div className='flex items-start gap-4'>
			{projects?.map((project: PortfolioItem) => {
				return (
					<ProjectCard
						variant='section'
						section={section}
						key={project.slug}
						title={project.title}
						image={project.image}
						slug={project.slug}
					/>
				)
			})}
		</div>
	)
}
