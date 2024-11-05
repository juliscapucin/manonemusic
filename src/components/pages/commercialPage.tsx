"use client"

import { useRef } from "react"
import Image from "next/image"

import gsap from "gsap"

import { ProjectsMenuPage } from "@/components"
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
	const containerRef = useRef<HTMLDivElement>(null)
	const commercialPageRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div
			ref={containerRef}
			className='relative w-screen h-screen overflow-clip'
		>
			<PageWrapper hasMenu={true}>
				<ProjectsMenuPage
					projectsData={commercialsData}
					pageData={commercialsPageData}
				/>

				<div ref={commercialPageRef} className='gsap-project-page opacity-0'>
					<ButtonBack ctx={ctx} slug={commercialsPageData.slug} />

					<TitleHeadline classes='mt-6'>
						{commercialPageData.title}
					</TitleHeadline>
					<div className='relative w-full flex gap-8'>
						<div className='gsap-project-page flex flex-wrap gap-16'>
							<div className='gsap-flip-commercial-image relative w-1/4 min-w-[300px] aspect-square overflow-clip'>
								<Image
									{...{
										src: commercialPageData.image.imageUrl,
										alt: `${commercialPageData.title} album cover`,
										fill: true,
										className: "gsap-project-image object-cover",
										sizes: "50vw",
									}}
								/>
							</div>
							<div className='gsap-project-content w-1/3 min-w-[300px] space-y-8'>
								{commercialPageData.description}
							</div>
						</div>
					</div>
				</div>
			</PageWrapper>
		</div>
	)
}
