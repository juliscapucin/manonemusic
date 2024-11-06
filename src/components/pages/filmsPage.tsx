"use client"

import { useRef } from "react"

import { PageWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ProjectsMenu } from "@/components"
import { PortfolioItem, PortfolioPage } from "@/types"

type FilmsPageProps = {
	data?: PortfolioPage
	films?: PortfolioItem[]
}

export default function FilmsPage({ data, films }: FilmsPageProps) {
	const titleFilmsRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleFilmsRef, "/films", windowAspectRatio)

	return (
		data && (
			<PageWrapper>
				<TitleDisplay classes='gsap-projects-title' ref={titleFilmsRef}>
					{data.title}
				</TitleDisplay>
				<Subtitle subtitle={data.subtitle} />

				{films && (
					<ProjectsMenu
						variant='section'
						section={data.title.toLowerCase().replace(/\s/g, "-")}
						projects={films}
					/>
				)}
			</PageWrapper>
		)
	)
}
