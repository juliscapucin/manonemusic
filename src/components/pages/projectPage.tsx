"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"

import { Logo, PageWrapper, TitleDisplay } from "@/components/ui"
import { PortfolioItem, PortfolioPage, Project } from "@/types"
import { Button } from "@/components/buttons"
import { ProjectsPage } from "."
import { useLayoutEffect, useRef } from "react"
import { ProjectTrailer, ProjectsMenu } from "@/components"
import { transitionOnClickBack } from "@/lib/animations"
import { useTransitionOnEnter } from "@/hooks"

type ProjectPageProps = {
	projectPageData: Project
	projectsData: PortfolioItem[]
	projectsPageData: PortfolioPage
}

export default function ProjectPage({
	projectPageData,
	projectsData,
	projectsPageData,
}: ProjectPageProps) {
	const router = useRouter()
	const containerProjectRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	useTransitionOnEnter(ctx)

	return (
		<div
			ref={containerProjectRef}
			className='relative w-screen h-screen overflow-clip'
		>
			{/* Projects Page copy for seamless page transition */}
			{projectsPageData && (
				<div className='gsap-projects-page absolute top-0 left-8 pb-8'>
					<ProjectsPage
						projectsPage={projectsPageData}
						projects={projectsData}
						titleScrollTrigger={false}
						isTransition={true}
					/>
				</div>
			)}
			{/* Project Page */}
			<PageWrapper>
				<div className='gsap-project-page opacity-0'>
					{/* Back Button */}
					<Button
						classes='absolute z-30'
						action={() => transitionOnClickBack(ctx, () => router.back())}
					>
						Back to Projects
					</Button>
					<TitleDisplay classes='gsap-project-content opacity-0'>
						{projectPageData.title}
					</TitleDisplay>
					<div className='gsap-project-page flex flex-wrap gap-16'>
						<div className='gsap-project-image relative w-1/4 min-w-[300px] aspect-square overflow-clip opacity-0'>
							{projectPageData.image && (
								<Image
									{...{
										src: projectPageData.image.imageUrl,
										alt: projectPageData.image.imageAlt,
										fill: true,
										className: "gsap-project-image object-cover",
										sizes: "50vw",
									}}
								/>
							)}
						</div>
						<div className='gsap-project-content w-1/3 min-w-[300px] space-y-8 opacity-0'>
							{/* Credits */}
							{/* <ul className='text-labelLarge'>
								{projectPageData.credits &&
									projectPageData.credits.map((credit, index) => (
										<li key={index}>{credit}</li>
									))}
							</ul> */}
							<p>{projectPageData?.projectInfo}</p>
							{/* Buttons / Links */}
							<div className='flex flex-col items-start'>
								{projectPageData.projectVideo && (
									<Button
										action={() =>
											gsap.to(".gsap-project-page", {
												xPercent: -50,
												duration: 1,
												ease: "power4.out",
											})
										}
									>
										View Trailer
									</Button>
								)}
								{projectPageData.projectLink && (
									<a
										className='block underline'
										href={projectPageData.projectLink}
										target='_blank'
									>
										View project
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</PageWrapper>
			{/* Trailer */}
			{projectPageData.projectVideo && (
				<PageWrapper>
					<ProjectTrailer
						videoUrl='https://player.vimeo.com/video/371168497'
						backToProject={() =>
							gsap.to(".gsap-project-page", {
								xPercent: 0,
								duration: 1,
								ease: "power4.out",
							})
						}
					/>
				</PageWrapper>
			)}
		</div>
	)
}
