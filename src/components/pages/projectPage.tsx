"use client"

import { useRouter } from "next/navigation"
import { Logo, Title } from "@/components/ui"
import { Project } from "@/types"

type ProjectPageProps = {
	projectData: Project
}

export default function ProjectPage({ projectData }: ProjectPageProps) {
	const router = useRouter()

	const handleClose = () => {
		router.push("/projects")
	}

	return (
		<>
			<Logo />
			<button className={"absolute z-50"} onClick={handleClose}>
				Close
			</button>
			<Title>{projectData.title}</Title>
		</>
	)
}
