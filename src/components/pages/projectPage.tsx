"use client"

import { useLayoutEffect, useRef, useState } from "react"

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
	const [isPageDisplaced, setIsPageDisplaced] = useState(false)
	const containerProjectRef = useRef<HTMLDivElement>(null)
	const pageWrapperRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	useLayoutEffect(() => {
		if (isPageDisplaced) {
			const tl = gsap.timeline()
			tl.to(pageWrapperRef.current, {
				duration: 0.6,
				yPercent: -30,
				opacity: 0,
			})
		} else {
			const tl = gsap.timeline()
			tl.to(pageWrapperRef.current, {
				duration: 0.4,
				yPercent: 0,
				opacity: 1,
			})
		}
	}, [isPageDisplaced])

	return (
		<div
			ref={containerProjectRef}
			className='relative w-screen h-screen overflow-clip'
		>
			<PageWrapper ref={pageWrapperRef}>
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
						setIsPageDisplaced={setIsPageDisplaced}
						projectLink={projectPageData.projectLink}
						projectVideo={projectPageData.projectVideo}
						releaseLink={projectPageData.releaseLink}
					/>
				</div>
			</PageWrapper>

			{/* Trailer */}
			{projectPageData.projectVideo && isTrailerActive && (
				<ProjectTrailer
					videoUrl={projectPageData.projectVideo}
					isTrailerActive={isTrailerActive}
					setIsTrailerActive={setIsTrailerActive}
					setIsPageDisplaced={setIsPageDisplaced}
				/>
			)}
		</div>
	)
}
