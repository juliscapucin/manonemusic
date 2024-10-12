"use client"

import { useRef } from "react"

import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ProjectCard, ProjectsMenu, ReleasesMenu } from "@/components"
import { PortfolioPage, PortfolioItem } from "@/types"

type ReleasesPageProps = {
	releasesPageData?: PortfolioPage
	releases: PortfolioItem[]
	titleScrollTrigger?: boolean
}

export default function ReleasesPage({
	releasesPageData: data,
	releases,
	titleScrollTrigger,
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
					<TitleDisplay classes='gsap-releases-title' ref={titleReleasesRef}>
						{data.title}
					</TitleDisplay>
					<p className='max-w-prose'>{data.subtitle}</p>
				</div>
				{releases && (
					<ProjectsMenu
						section={data.title.toLowerCase().replace(/\s/g, "-")}
						projects={releases}
					/>
				)}
			</PageWrapper>
		)
	)
}
