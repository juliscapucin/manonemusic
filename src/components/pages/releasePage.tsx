"use client"

import gsap from "gsap"

import { ProjectInfo, ProjectPageContent, ProjectsMenuPage } from "@/components"
import { PageWrapper, TitleHeadline } from "@/components/ui"
import { ButtonBack } from "@/components/buttons"
import { PortfolioItem, PortfolioPage, Release } from "@/types"
import { useTransitionOnEnter } from "@/hooks"

type releasePageProps = {
	releasePageData: Release
	releasesData: PortfolioItem[]
	releasesPageData: PortfolioPage
}

export default function ReleasePage({
	releasePageData,
	releasesData,
	releasesPageData,
}: releasePageProps) {
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div className='relative w-screen h-screen overflow-clip'>
			<PageWrapper hasMenu={true}>
				<ProjectsMenuPage
					projectsData={releasesData}
					pageData={releasesPageData}
				/>
				<div className='gsap-project-page opacity-0'>
					<ButtonBack ctx={ctx} slug={releasesPageData.slug} />
					<TitleHeadline>{releasePageData.title}</TitleHeadline>
					<ProjectInfo
						projectInfo={{
							releaseDate: releasePageData.releaseDate,
							info: releasePageData.releaseInfo,
						}}
					/>
					<ProjectPageContent
						img={{
							imgUrl: releasePageData.image.imageUrl,
							imgAlt: `${releasePageData.title} album cover`,
						}}
						tracklist={releasePageData.tracklist}
					/>
				</div>
			</PageWrapper>
		</div>
	)
}
