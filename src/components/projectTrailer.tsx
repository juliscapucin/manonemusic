"use client"

import { Logo, VideoPlayer } from "@/components/ui"
import { Button } from "@/components/buttons"

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
				<Button classes='absolute top-16 left-8' action={() => backToProject()}>
					Back to Project
				</Button>
				<VideoPlayer src={videoUrl} title='Trailer Video' />
			</div>
		</div>
	)
}
