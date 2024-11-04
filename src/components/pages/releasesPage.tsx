"use client"

import { useRef } from "react"

import { PageWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ProjectCard, ProjectsMenu, ReleasesMenu } from "@/components"
import { PortfolioPage, PortfolioItem } from "@/types"

type ReleasesPageProps = {
	releasesPageData?: PortfolioPage
	releases: PortfolioItem[]
	titleScrollTrigger?: boolean
	isTransition?: boolean
}

export default function ReleasesPage({
	releasesPageData: data,
	releases,
	titleScrollTrigger,
	isTransition,
}: ReleasesPageProps) {
	const titleReleasesRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(
		titleReleasesRef,
		"/releases",
		windowAspectRatio,
		titleScrollTrigger
	)

	return (
		data && (
			<PageWrapper>
				<div>
					<TitleDisplay classes='gsap-projects-title' ref={titleReleasesRef}>
						{data.title}
					</TitleDisplay>

					<Subtitle subtitle={data.subtitle} isTransition={isTransition} />
				</div>
				{releases && (
					<ProjectsMenu
						variant='section'
						section={data.title.toLowerCase().replace(/\s/g, "-")}
						projects={releases}
					/>
				)}
			</PageWrapper>
		)
	)
}
