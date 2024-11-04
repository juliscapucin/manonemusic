"use client"

import { useRef } from "react"

import { PageWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ProjectsMenu, ReleasesMenu } from "@/components"
import { PortfolioItem, PortfolioPage } from "@/types"

type CommercialsPageProps = {
	data?: PortfolioPage
	commercials?: PortfolioItem[]
	titleScrollTrigger?: boolean
	isTransition?: boolean
}

export default function CommercialsPage({
	data,
	commercials,
	titleScrollTrigger,
	isTransition,
}: CommercialsPageProps) {
	const titleCommercialsRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(
		titleCommercialsRef,
		"/commercials",
		windowAspectRatio,
		titleScrollTrigger
	)

	return (
		data && (
			<PageWrapper>
				<TitleDisplay classes='gsap-projects-title' ref={titleCommercialsRef}>
					{data.title}
				</TitleDisplay>
				<Subtitle subtitle={data.subtitle} isTransition={isTransition} />

				{commercials && (
					<ProjectsMenu
						section={data.title.toLowerCase().replace(/\s/g, "-")}
						projects={commercials}
					/>
				)}
			</PageWrapper>
		)
	)
}
