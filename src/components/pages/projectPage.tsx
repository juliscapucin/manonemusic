"use client"

import { useRef, useState } from "react"

import gsap from "gsap"

import { PageWrapper, TitleHeadline } from "@/components/ui"
import { PortfolioItem, PortfolioPage, Project } from "@/types"
import { ButtonBack } from "@/components/buttons"
import {
	ProjectInfo,
	ProjectPageContent,
	ProjectTrailer,
	ProjectsMenuPage,
} from "@/components"
import { useTransitionOnEnter } from "@/hooks"

type ProjectPageProps = {
	projectPageData: Project
	projectsData: PortfolioItem[]
	projectsPageData: PortfolioPage
}

export default function ProjectPage({
	projectPageData,
	projectsData,
	projectsPageData,
}: ProjectPageProps) {
	const [isTrailerActive, setIsTrailerActive] = useState(false)
	const containerProjectRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div
			ref={containerProjectRef}
			className='relative w-screen h-screen overflow-clip'
		>
			<PageWrapper>
				{/* Projects Menu */}
				<ProjectsMenuPage
					projectsData={projectsData}
					pageData={projectsPageData}
				/>

				{/* Project Page */}
				<div className='gsap-project-page opacity-0'>
					<ButtonBack ctx={ctx} slug={projectsPageData.slug} />

					<TitleHeadline>{projectPageData.title}</TitleHeadline>
					<ProjectInfo
						projectInfo={{
							releaseDate: projectPageData.releaseDate,
							info: projectPageData.info,
						}}
					/>
					<ProjectPageContent
						img={{
							imgUrl: projectPageData.image.imageUrl,
							imgAlt: `${projectPageData.title} project image`,
						}}
						description={projectPageData.description}
						tracklist={projectPageData.tracklist}
						setIsTrailerActive={setIsTrailerActive}
						projectLink={projectPageData.projectLink}
						projectVideo={projectPageData.projectVideo}
					/>
				</div>
			</PageWrapper>

			{/* Trailer */}
			{projectPageData.projectVideo && isTrailerActive && (
				<PageWrapper>
					<ProjectTrailer
						videoUrl={projectPageData.projectVideo}
						isTrailerActive={isTrailerActive}
						setIsTrailerActive={setIsTrailerActive}
					/>
				</PageWrapper>
			)}
		</div>
	)
}
