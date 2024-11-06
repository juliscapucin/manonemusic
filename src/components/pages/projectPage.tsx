"use client"

import { useRef, useState } from "react"

import gsap from "gsap"

import { PageWrapper, TitleHeadline } from "@/components/ui"
import { PortfolioItem, PortfolioPage, Project } from "@/types"
import { Button, ButtonBack } from "@/components/buttons"
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
			<PageWrapper hasMenu={true}>
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
					/>

					{/* Buttons / Links */}
					<div className='flex flex-col items-start'>
						{projectPageData.projectVideo && (
							<Button action={() => setIsTrailerActive(true)}>
								View Trailer
							</Button>
						)}
						{projectPageData.projectLink && (
							<a
								className='block underline'
								href={projectPageData.projectLink}
								target='_blank'
							>
								View project
							</a>
						)}
					</div>
				</div>
			</PageWrapper>

			{/* Trailer */}
			{projectPageData.projectVideo && (
				<PageWrapper>
					<ProjectTrailer
						videoUrl='https://player.vimeo.com/video/844715489?title=0&byline=0&portrait=0&muted=1&autoplay=1&controls=0&loop=1'
						isTrailerActive={isTrailerActive}
						setIsTrailerActive={setIsTrailerActive}
					/>
				</PageWrapper>
			)}
		</div>
	)
}
