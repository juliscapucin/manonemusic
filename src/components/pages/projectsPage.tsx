"use client"

import { useRef } from "react"

import { ProjectCard, ProjectsMenu } from "@/components"

import { PageWrapper, TitleDisplay } from "@/components/ui"
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
	titleScrollTrigger,
}: ProjectPageProps) {
	const titleWorkRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(
		titleWorkRef,
		"/projects",
		windowAspectRatio,
		titleScrollTrigger
	)

	return (
		<PageWrapper>
			<div className='block w-full h-full relative'>
				{projectsPage && (
					<>
						<TitleDisplay classes='gsap-projects-title' ref={titleWorkRef}>
							{projectsPage.title}
						</TitleDisplay>
						<p className='w-1/2'>{projectsPage.subtitle}</p>
					</>
				)}
				{projects && <ProjectsMenu projects={projects} />}
			</div>
		</PageWrapper>
	)
}
