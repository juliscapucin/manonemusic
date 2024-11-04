import { PortfolioItem } from "@/types"
import { ProjectCard } from "@/components"

type ProjectsMenuProps = {
	projects: PortfolioItem[]
	variant: "section" | "page"
	section: string
}

export default function ProjectsMenu({
	projects,
	section,
	variant,
}: ProjectsMenuProps) {
	return (
		<div className='flex items-start gap-4'>
			{projects?.map((project: PortfolioItem) => {
				return (
					<ProjectCard
						variant={variant}
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
