"use client"

import { useRef } from "react"

import { ProjectCard } from "@/components"

import { Project } from "@/types"
import { PageWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type WorkData = {
	title: string
}

type Props = { data: Project[] }

export default function WorkPage({ data }: Props) {
	const titleWorkRef = useRef(null)

	useTitleScrollTrigger(titleWorkRef)

	return (
		<PageWrapper>
			<Title ref={titleWorkRef}>Work</Title>
			<div className='flex justify-center gap-4 h-64'>
				{data.map((project: Project) => (
					<ProjectCard
						key={project.slug}
						{...{ title: project.title, coverImage: project.coverImage }}
					/>
				))}
			</div>
		</PageWrapper>
	)
}
