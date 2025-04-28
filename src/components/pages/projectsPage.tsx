"use client"

import { useRef } from "react"

import { ProjectsMenu } from "@/components"

import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import { PortfolioItem, PortfolioPage } from "@/types"

type ProjectPageProps = {
	projectsPageData: PortfolioPage
	projects?: PortfolioItem[]
	titleScrollTrigger?: boolean
	tween: gsap.core.Tween | null
}

export default function ProjectsPage({
	projectsPageData,
	projects,
	tween,
}: ProjectPageProps) {
	const titleRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleRef, `/${projectsPageData.slug}`, tween)

	return (
		projectsPageData && (
			<SectionWrapper>
				{projectsPageData.subtitle && (
					<Subtitle subtitle={projectsPageData.subtitle} />
				)}
				<TitleDisplay classes='gsap-projects-title' ref={titleRef}>
					{projectsPageData.title}
				</TitleDisplay>
				{projects && projectsPageData.title && (
					<ProjectsMenu
						variant='section'
						section={projectsPageData.title.toLowerCase().replace(/\s/g, "-")}
						projects={projects}
						isMobile={windowAspectRatio == "portrait" ? true : false}
					/>
				)}
			</SectionWrapper>
		)
	)
}
