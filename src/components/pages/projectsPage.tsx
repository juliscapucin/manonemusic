"use client"

import { useRef } from "react"

import { ProjectCard } from "@/components"

import { Project } from "@/types"
import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"

type Props = { data: Project[]; titleScrollTrigger?: boolean }

export default function ProjectsPage({ data, titleScrollTrigger }: Props) {
	const titleWorkRef = useRef(null)
	const gridElements = new Array(36).fill(0)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(
		titleWorkRef,
		"/projects",
		windowAspectRatio,
		titleScrollTrigger
	)

	return (
		<PageWrapper>
			<div className='hidden lg:grid grid-cols-12 grid-rows-3 gap-2 w-full h-full relative'>
				<TitleDisplay classes='gsap-projects-title' ref={titleWorkRef}>
					Projects
				</TitleDisplay>
				{gridElements.map((_, index) => {
					const project = data.find((project) => project.gridPosition == index)

					return project ? (
						<ProjectCard
							key={project.slug}
							title={project.title}
							coverImage={project.coverImage}
							slug={project.slug}
						/>
					) : (
						<div key={index} className='w-full h-full'></div>
					)
				})}
			</div>
		</PageWrapper>
	)
}
