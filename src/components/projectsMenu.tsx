"use client"

import { PortfolioItem } from "@/types"
import { ProjectCard } from "@/components"
import { useWindowDimensions } from "@/hooks"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { createScrollLoop } from "@/lib/animations"

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
	const { isMobile } = useWindowDimensions()
	const projectCardsContainerRef = useRef<HTMLDivElement | null>(null)

	useGSAP(() => {
		if (!projectCardsContainerRef.current || !isMobile) return
		createScrollLoop(projectCardsContainerRef.current)
	}, [isMobile, projectCardsContainerRef])

	return (
		<div
			id='projects-menu'
			className={`gsap-projects-menu relative w-full portrait:overflow-x-clip landscape:w-fit portrait:pb-16 landscape:h-2/5`}>
			<div
				ref={projectCardsContainerRef}
				className='w-full h-full flex items-start justify-start gap-16'>
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
		</div>
	)
}
