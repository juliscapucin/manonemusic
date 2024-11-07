"use client"

import { useRef } from "react"

import { ProjectsMenu } from "@/components"

import { PageWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

import { PortfolioItem, PortfolioPage } from "@/types"

type ProjectPageProps = {
	projectsPage?: PortfolioPage
	projects?: PortfolioItem[]
	titleScrollTrigger?: boolean
}

export default function ProjectsPage({
	projectsPage,
	projects,
}: ProjectPageProps) {
	const titleWorkRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleWorkRef, "/projects", windowAspectRatio)

	return (
		projectsPage && (
			<PageWrapper>
				<div className='block w-full h-full relative'>
					<Subtitle subtitle={projectsPage.subtitle} />
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
				</div>
			</PageWrapper>
		)
	)
}
