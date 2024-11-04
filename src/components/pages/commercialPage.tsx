"use client"

import { useLayoutEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import Flip from "gsap/Flip"

import { Logo, PageWrapper, TitleHeadline } from "@/components/ui"
import { Button } from "@/components/buttons"
import { CommercialsPage } from "@/components/pages"
import { Commercial, PortfolioItem, PortfolioPage } from "@/types"
import { transitionOnClickBack } from "@/lib/animations"
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
	const router = useRouter()
	const containerRef = useRef<HTMLDivElement>(null)
	const commercialPageRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div
			ref={containerRef}
			className='relative w-screen h-screen overflow-clip'
		>
			{/* commercials Page copy for seamless page transition */}
			{commercialsPageData && (
				<div className='gsap-projects-page absolute top-0 left-8 pb-8'>
					<CommercialsPage
						data={commercialsPageData}
						titleScrollTrigger={false}
						isTransition={true}
					/>
				</div>
			)}
			{/* commercial Page */}
			<PageWrapper>
				<div ref={commercialPageRef} className='gsap-project-page opacity-0'>
					{/* Back Button */}
					<Button
						classes='absolute'
						action={() => transitionOnClickBack(ctx, () => router.back())}
					>
						Back to commercials
					</Button>
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
