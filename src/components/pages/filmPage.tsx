"use client"

import { useRef } from "react"
import Image from "next/image"

import gsap from "gsap"

import { ProjectsMenuPage } from "@/components"
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
	const containerRef = useRef<HTMLDivElement>(null)
	const filmPageRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div
			ref={containerRef}
			className='relative w-screen h-screen overflow-clip'
		>
			<PageWrapper hasMenu={true}>
				<ProjectsMenuPage projectsData={filmsData} pageData={filmsPageData} />

				<div ref={filmPageRef} className='gsap-project-page opacity-0'>
					<ButtonBack ctx={ctx} slug={filmsPageData.slug} />

					<TitleHeadline classes='gsap-project-content mt-6'>
						{filmPageData.title}
					</TitleHeadline>
					<div className='relative w-full flex gap-8'>
						<div className='gsap-project-page flex flex-wrap gap-16'>
							<div className='gsap-project-image relative w-1/4 min-w-[300px] aspect-square overflow-clip opacity-0'>
								<Image
									{...{
										src: filmPageData.image.imageUrl,
										alt: `${filmPageData.title} album cover`,
										fill: true,
										className: "gsap-film-image object-cover",
										sizes: "50vw",
									}}
								/>
							</div>
							<div className='gsap-project-content w-1/3 min-w-[300px] space-y-8'>
								{filmPageData.description}
							</div>
						</div>
					</div>
				</div>
			</PageWrapper>
		</div>
	)
}
