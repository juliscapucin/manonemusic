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
		<div
			id='projects-menu'
			className={`gsap-projects-menu relative w-full md:w-fit flex items-start justify-start gap-4 ${variant === "page" ? "flex-col" : "flex-wrap landscape:h-2/5 landscape:flex-nowrap"}`}
		>
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
