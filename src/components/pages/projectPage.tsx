"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Logo, PageWrapper, Title } from "@/components/ui"
import { Project } from "@/types"
import { Button } from "@/components/buttons"
import { usePageContext } from "@/context"

type ProjectPageProps = {
	projectData: Project
}

export default function ProjectPage({ projectData }: ProjectPageProps) {
	const router = useRouter()
	const { pageRef, transitionOnClick, transitionOnEnter } = usePageContext()

	// Transition on Enter
	// useEffect(() => {
	// 	pageRef.current && transitionOnEnter(pageRef.current)
	// }, [pageRef])

	return (
		<div className='w-screen h-screen overflow-clip'>
			<Logo />
			<PageWrapper>
				<button
					className={"absolute z-30"}
					onClick={() => transitionOnClick("/projects")}
				>
					Back to Projects
				</button>
				<Title>{projectData.title}</Title>
				<div className='flex flex-wrap gap-16'>
					<div className='relative w-1/4 min-w-[300px] aspect-square overflow-clip'>
						<Image
							src={projectData.coverImage.url}
							alt={projectData.coverImage.description}
							fill
							style={{ objectFit: "cover" }}
							sizes='50vw'
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
						<div className='flex flex-col items-start'>
							<Button
								action={() =>
									router.push(`/projects/${projectData.slug}/trailer`)
								}
							>
								View Trailer
							</Button>
							<a
								className='block underline'
								href={"https://www.imdb.com"}
								target='_blank'
							>
								View on IMDB
							</a>
						</div>
					</div>
				</div>
			</PageWrapper>
		</div>
	)
}
