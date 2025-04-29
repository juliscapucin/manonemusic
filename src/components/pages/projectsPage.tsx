"use client"

import { useRef } from "react"

import { ProjectsMenu } from "@/components"

import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

import { PortfolioItem, PortfolioPage } from "@/types"

type ProjectPageProps = {
	projectsPageData: PortfolioPage
	projects?: PortfolioItem[]
	titleScrollTrigger?: boolean
}

export default function ProjectsPage({
	projectsPageData,
	projects,
}: ProjectPageProps) {
	const titleRef = useRef(null)

	// useTitleScrollTrigger(titleRef, `/${projectsPageData.slug}`, tween)

	return (
		projectsPageData && (
			<SectionWrapper>
				{projectsPageData.subtitle && (
					<Subtitle subtitle={projectsPageData.subtitle} />
				)}
				<TitleDisplay ref={titleRef}>{projectsPageData.title}</TitleDisplay>
				{projects && projectsPageData.title && (
					<ProjectsMenu
						variant='section'
						section={projectsPageData.title.toLowerCase().replace(/\s/g, "-")}
						projects={projects}
					/>
				)}
			</SectionWrapper>
		)
	)
}
