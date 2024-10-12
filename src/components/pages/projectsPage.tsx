"use client"

import { useRef } from "react"

import { ProjectsMenu } from "@/components"

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

	console.log(projectsPage?.title)

	return (
		projectsPage && (
			<PageWrapper>
				<div className='block w-full h-full relative'>
					<>
						<TitleDisplay classes='gsap-projects-title' ref={titleWorkRef}>
							{projectsPage.title}
						</TitleDisplay>
						<p className='w-1/2'>{projectsPage.subtitle}</p>
						{projects && projectsPage.title && (
							<ProjectsMenu
								section={projectsPage.title.toLowerCase().replace(/\s/g, "-")}
								projects={projects}
							/>
						)}
					</>
				</div>
			</PageWrapper>
		)
	)
}
