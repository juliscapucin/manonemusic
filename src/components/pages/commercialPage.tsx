"use client"

import gsap from "gsap"

import { ProjectInfo, ProjectPageContent, ProjectsMenuPage } from "@/components"
import { PageWrapper, TitleHeadline } from "@/components/ui"
import { ButtonBack } from "@/components/buttons"
import { Commercial, PortfolioItem, PortfolioPage } from "@/types"
import { useTransitionOnEnter } from "@/hooks"

type commercialPageProps = {
	commercialPageData: Commercial
	commercialsData: PortfolioItem[]
	commercialsPageData: PortfolioPage
}

export default function CommercialPage({
	commercialPageData,
	commercialsData,
	commercialsPageData,
}: commercialPageProps) {
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div className='relative w-screen h-screen overflow-clip'>
			<PageWrapper hasMenu={true}>
				<ProjectsMenuPage
					projectsData={commercialsData}
					pageData={commercialsPageData}
				/>

				<div className='gsap-project-page opacity-0'>
					<ButtonBack ctx={ctx} slug={commercialsPageData.slug} />

					<TitleHeadline>{commercialPageData.title}</TitleHeadline>
					<ProjectInfo
						projectInfo={{
							info: commercialPageData.info,
							releaseDate: commercialPageData.releaseDate,
						}}
					/>

					<ProjectPageContent
						img={{
							imgUrl: commercialPageData.image.imageUrl,
							imgAlt: `${commercialPageData.title} album cover`,
						}}
						description={commercialPageData.description}
					/>
				</div>
			</PageWrapper>
		</div>
	)
}
