"use client"

import { useRef } from "react"

import { PageWrapper, TitleDisplay } from "@/components/ui"
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
				<TitleDisplay classes='gsap-films-title' ref={titleFilmsRef}>
					{data.title}
				</TitleDisplay>
				<p className='max-w-prose'>{data.subtitle}</p>

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
