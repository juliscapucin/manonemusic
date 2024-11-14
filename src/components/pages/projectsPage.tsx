"use client"

import { useRef } from "react"

import { ProjectsMenu } from "@/components"

import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import { PortfolioItem, PortfolioPage } from "@/types"

type ProjectPageProps = {
	projectsPage: PortfolioPage
	projects?: PortfolioItem[]
	titleScrollTrigger?: boolean
}

export default function ProjectsPage({
	projectsPage,
	projects,
}: ProjectPageProps) {
	const titleWorkRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleWorkRef, projectsPage.slug, windowAspectRatio)

	return (
		projectsPage && (
			<SectionWrapper>
				{projectsPage.subtitle && <Subtitle subtitle={projectsPage.subtitle} />}
				<TitleDisplay classes='gsap-projects-title' ref={titleWorkRef}>
					{projectsPage.title}
				</TitleDisplay>
				{projects && projectsPage.title && (
					<ProjectsMenu
						variant='section'
						section={projectsPage.title.toLowerCase().replace(/\s/g, "-")}
						projects={projects}
					/>
				)}
			</SectionWrapper>
		)
	)
}
