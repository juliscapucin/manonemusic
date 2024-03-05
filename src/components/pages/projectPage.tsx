"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Logo, PageWrapper, Title } from "@/components/ui"
import { Project } from "@/types"
import { Button } from "@/components/buttons"

type ProjectPageProps = {
	projectData: Project
}

export default function ProjectPage({ projectData }: ProjectPageProps) {
	const router = useRouter()

	const handleClose = () => {
		router.push("/projects")
	}

	const handleTrailer = () => {
		router.push(`/projects/${projectData.slug}/trailer`)
	}

	return (
		<div className='w-screen h-screen overflow-none'>
			<Logo />
			<PageWrapper>
				<button className={"absolute z-50"} onClick={handleClose}>
					Close
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
					<Button action={handleTrailer}>View Trailer</Button>
				</div>
			</PageWrapper>{" "}
		</div>
	)
}
