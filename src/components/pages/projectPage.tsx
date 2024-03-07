"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"

import gsap from "gsap"
import Flip from "gsap/Flip"

import { Logo, PageWrapper, Title } from "@/components/ui"
import { Project } from "@/types"
import { Button } from "@/components/buttons"
import { ProjectsPage } from "."
import { useLayoutEffect, useRef } from "react"

type ProjectPageProps = {
	projectData: Project
	projectsData?: Project[]
	transitionOnEnter: boolean
}

export default function ProjectPage({
	projectData,
	projectsData,
	transitionOnEnter,
}: ProjectPageProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const containerRef = useRef<HTMLDivElement>(null)
	const projectsPageRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)

	// const transitionOnClickBack = (slug: string) => {
	// 	gsap.to(containerRef.current, {
	// 		xPercent: 0,
	// 		duration: 0.8,
	// 		ease: "power2.inOut",
	// 		onComplete: () => {
	// 			router.push(slug)
	// 		},
	// 	})
	// }

	// Transition on enter
	useLayoutEffect(() => {
		const container = containerRef.current
		const projectsPage = projectsPageRef.current

		if (!container || !projectsPage) return

		gsap.registerPlugin(Flip)

		let ctx = gsap.context(() => {
			// Position the project card image on the page
			Flip.fit(".flip-project-card", ".flip-project-page", {
				scale: true,
				absolute: true,
				duration: 0.3,
				ease: "power4.out",
				onComplete: () => {
					const image = imageRef.current
					if (!image) return
					image.classList.remove("opacity-0")
				},
			})

			gsap.to(projectsPage, { opacity: 0, duration: 0.3 })
		}, [container])

		return () => {
			ctx.revert()
		}
	}, [containerRef, projectsPageRef])

	return (
		<div className='w-screen h-screen overflow-clip'>
			<div ref={containerRef} className='relative'>
				{/* For seamless page transition */}
				{projectsData && (
					<div ref={projectsPageRef} className='absolute top-0 left-8 pb-8'>
						<ProjectsPage data={projectsData} titleScrollTrigger={false} />
					</div>
				)}
				{/* Project Page */}
				<div className='w-screen h-screen overflow-clip'>
					{/* <Logo /> */}
					<PageWrapper>
						{/* Back Button */}
						<button
							className={"absolute z-30"}
							onClick={() => router.push("/projects")}
						>
							Back to Projects
						</button>
						<Title>{projectData.title}</Title>
						<div className='flex flex-wrap gap-16'>
							<div className='flip-project-page relative w-1/4 min-w-[300px] aspect-square overflow-clip'>
								<Image
									{...{
										src: projectData.coverImage.url,
										alt: projectData.coverImage.description,
										fill: true,
										className: "object-cover opacity-0",
										sizes: "50vw",
										ref: imageRef,
									}}
								/>
							</div>
							<div className='w-1/3 min-w-[300px] space-y-8'>
								{/* Credits */}
								<ul className='text-labelLarge'>
									{projectData.credits &&
										projectData.credits.map((credit, index) => (
											<li key={index}>{credit}</li>
										))}
								</ul>
								<p>{projectData.text}</p>
								{/* Buttons / Links */}
								<div className='flex flex-col items-start'>
									<Button
										action={() =>
											router.push(`/projects/${projectData.slug}/trailer`)
										}
									>
										View Trailer
									</Button>
									{projectData.imdbLink && (
										<a
											className='block underline'
											href={projectData.imdbLink}
											target='_blank'
										>
											View on IMDB
										</a>
									)}
								</div>
							</div>
						</div>
					</PageWrapper>
				</div>
			</div>
		</div>
	)
}
