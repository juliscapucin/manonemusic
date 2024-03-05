"use client"

import { useEffect } from "react"

import { Logo, VideoPlayer } from "@/components/ui"
import { usePageContext } from "@/context"

import { Project } from "@/types"

type TrailerPageProps = {
	projectData: Project
}

export default function TrailerPage({ projectData }: TrailerPageProps) {
	const { pageRef, transitionOnClick, transitionOnEnter } = usePageContext()

	// Transition on Enter
	useEffect(() => {
		pageRef.current && transitionOnEnter(pageRef.current)
	}, [pageRef])

	return (
		<>
			<Logo />

			<div
				ref={pageRef}
				className='absolute flex justify-center items-center w-screen h-screen bg-colorBlack z-50'
			>
				<button
					className={"absolute top-16 left-8"}
					onClick={() => transitionOnClick(`/projects/${projectData.slug}`)}
				>
					Back to Project
				</button>
				<VideoPlayer
					src='https://player.vimeo.com/video/371168497'
					title='Trailer Video'
				/>
			</div>
		</>
	)
}
