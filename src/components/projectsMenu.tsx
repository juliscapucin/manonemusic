import { PortfolioItem } from "@/types"
import { ProjectCard } from "@/components"

type ProjectsMenuProps = {
	projects: PortfolioItem[]
}

export default function ProjectsMenu({ projects }: ProjectsMenuProps) {
	return (
		<div className='flex items-start gap-4'>
			{projects?.map((project: PortfolioItem) => {
				return (
					<ProjectCard
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
