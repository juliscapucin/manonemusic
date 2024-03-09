"use client"

import { Logo, VideoPlayer } from "@/components/ui"

type ProjectTrailerProps = {
	videoUrl: string
	backToProject: () => void
}

export default function ProjectTrailer({
	videoUrl,
	backToProject,
}: ProjectTrailerProps) {
	return (
		<div className='w-screen h-screen overflow-clip'>
			<div className='absolute flex justify-center items-center w-screen h-screen bg-primary z-50'>
				<button
					className={"absolute top-16 left-8"}
					onClick={() => backToProject()}
				>
					Back to Project
				</button>
				<VideoPlayer src={videoUrl} title='Trailer Video' />
			</div>
		</div>
	)
}
