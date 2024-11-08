"use client"

import { useRef, useState } from "react"

import gsap from "gsap"

import { ProjectInfo, ProjectPageContent, ProjectsMenuPage } from "@/components"
import { PageWrapper, TitleHeadline } from "@/components/ui"
import { ButtonBack } from "@/components/buttons"
import { Film, PortfolioItem, PortfolioPage } from "@/types"
import { useTransitionOnEnter } from "@/hooks"

type filmPageProps = {
	filmPageData: Film
	filmsData: PortfolioItem[]
	filmsPageData: PortfolioPage
}

export default function FilmPage({
	filmPageData,
	filmsData,
	filmsPageData,
}: filmPageProps) {
	const [isTrailerActive, setIsTrailerActive] = useState(false)

	const containerRef = useRef<HTMLDivElement>(null)
	const filmPageRef = useRef<HTMLDivElement>(null)

	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div
			ref={containerRef}
			className='relative w-screen h-screen overflow-clip'
		>
			<PageWrapper>
				<ProjectsMenuPage projectsData={filmsData} pageData={filmsPageData} />

				<div ref={filmPageRef} className='gsap-project-page opacity-0'>
					<ButtonBack ctx={ctx} slug={filmsPageData.slug} />

					<TitleHeadline>{filmPageData.title}</TitleHeadline>
					<ProjectInfo
						projectInfo={{
							info: filmPageData.info,
							releaseDate: filmPageData.releaseDate,
						}}
					/>

					<ProjectPageContent
						img={{
							imgUrl: filmPageData.image.imageUrl,
							imgAlt: `${filmPageData.title} album cover`,
						}}
						description={filmPageData.description}
						projectLink={filmPageData.projectLink}
						projectVideo={filmPageData.projectVideo}
						setIsTrailerActive={setIsTrailerActive}
					/>
				</div>
			</PageWrapper>
		</div>
	)
}
