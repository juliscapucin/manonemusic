"use client"

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

	return (
		<div className='w-screen h-screen overflow-clip'>
			{/* <Logo /> */}
			<PageWrapper>
				{/* Back Button */}
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
	)
}
