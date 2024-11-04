"use client"

import { useRef } from "react"

import { PageWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ProjectsMenu, ReleasesMenu } from "@/components"
import { PortfolioItem, PortfolioPage } from "@/types"

type FilmsPageProps = {
	data?: PortfolioPage
	films?: PortfolioItem[]
	titleScrollTrigger?: boolean
}

export default function FilmsPage({
	data,
	films,
	titleScrollTrigger,
}: FilmsPageProps) {
	const titleFilmsRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(
		titleFilmsRef,
		"/films",
		windowAspectRatio,
		titleScrollTrigger
	)

	return (
		data && (
			<PageWrapper>
				<TitleDisplay classes='gsap-projects-title' ref={titleFilmsRef}>
					{data.title}
				</TitleDisplay>
				<Subtitle subtitle={data.subtitle} />

				{films && (
					<ProjectsMenu
						section={data.title.toLowerCase().replace(/\s/g, "-")}
						projects={films}
					/>
				)}
			</PageWrapper>
		)
	)
}
