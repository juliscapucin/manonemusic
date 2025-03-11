import { PortfolioItem } from "@/types"
import { ProjectCard } from "@/components"

type ProjectsMenuProps = {
	projects: PortfolioItem[]
	variant: "section" | "page"
	section: string
	isMobile: boolean
}

export default function ProjectsMenu({
	projects,
	section,
	variant,
	isMobile,
}: ProjectsMenuProps) {
	return (
		<div
			id='projects-menu'
			className={`gsap-projects-menu relative w-full landscape:w-fit flex items-start justify-start gap-4 flex-wrap landscape:h-2/5 landscape:flex-nowrap`}
		>
			{projects?.map((project: PortfolioItem) => {
				return (
					<ProjectCard
						key={project.slug}
						{...{
							variant,
							section,
							title: project.title,
							image: project.image,
							slug: project.slug,
							isMobile,
						}}
					/>
				)
			})}
		</div>
	)
}
