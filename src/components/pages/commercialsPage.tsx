"use client"

import { useRef } from "react"

import { PageWrapper, TitleDisplay } from "@/components/ui"
import { useTitleScrollTrigger, useWindowDimensions } from "@/hooks"
import { ProjectsMenu, ReleasesMenu } from "@/components"
import { PortfolioItem, PortfolioPage } from "@/types"

type CommercialsPageProps = {
	data?: PortfolioPage
	commercials?: PortfolioItem[]
	titleScrollTrigger?: boolean
}

export default function CommercialsPage({
	data,
	commercials,
	titleScrollTrigger,
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
				<TitleDisplay
					classes='gsap-commercials-title'
					ref={titleCommercialsRef}
				>
					{data.title}
				</TitleDisplay>
				<p className='max-w-prose'>{data.subtitle}</p>

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
