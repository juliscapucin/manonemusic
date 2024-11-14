"use client"

import { useRef } from "react"

import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ProjectsMenu } from "@/components"
import { PortfolioItem, PortfolioPage } from "@/types"

type CommercialsPageProps = {
	data: PortfolioPage
	commercials?: PortfolioItem[]
}

export default function CommercialsPage({
	data,
	commercials,
}: CommercialsPageProps) {
	const titleCommercialsRef = useRef(null)
	const { windowAspectRatio } = useWindowDimensions()

	useTitleScrollTrigger(titleCommercialsRef, data.slug, windowAspectRatio)

	return (
		data && (
			<SectionWrapper>
				{data.subtitle && <Subtitle subtitle={data.subtitle} />}
				<TitleDisplay ref={titleCommercialsRef}>{data.title}</TitleDisplay>

				{commercials && (
					<ProjectsMenu
						variant='section'
						section={data.title.toLowerCase().replace(/\s/g, "-")}
						projects={commercials}
					/>
				)}
			</SectionWrapper>
		)
	)
}
