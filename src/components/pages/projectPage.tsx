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
	const { pageRef, transitionOnClick } = usePageContext()

	return (
		<div ref={pageRef} className='w-screen h-screen overflow-none'>
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
					<p className='w-1/3 min-w-[300px]'>{projectData.text}</p>
					<Button
						action={() =>
							transitionOnClick(`/projects/${projectData.slug}/trailer`)
						}
					>
						View Trailer
					</Button>
				</div>
			</PageWrapper>
		</div>
	)
}
