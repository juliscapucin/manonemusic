"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"

import { ProjectCard } from "@/components"

import { Project } from "@/types"
import { PageWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type Props = { data: Project[]; titleScrollTrigger?: boolean }

export default function ProjectsPage({
	data,
	titleScrollTrigger = true,
}: Props) {
	const titleWorkRef = useRef(null)
	const router = useRouter()

	useTitleScrollTrigger(titleWorkRef, "/projects")

	return (
		<PageWrapper>
			<Title ref={titleScrollTrigger ? titleWorkRef : null}>Projects</Title>
			<div className='flex justify-center gap-4 h-64'>
				{data.map((project: Project) => (
					<ProjectCard
						key={project.slug}
						{...{
							title: project.title,
							coverImage: project.coverImage,
							slug: project.slug,
						}}
					/>
				))}
			</div>
		</PageWrapper>
	)
}
