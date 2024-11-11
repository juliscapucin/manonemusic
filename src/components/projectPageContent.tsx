import { Track } from "@/types"
import { PlayerTrackList, ProjectPageImage } from "@/components"
import { Button } from "@/components/buttons"
import { release } from "os"

type ProjectPageContentProps = {
	img: {
		imgUrl: string
		imgAlt: string
	}
	tracklist?: Track[]
	description?: string
	projectVideo?: string
	projectLink?: string
	releaseLink?: string
	setIsTrailerActive: (value: boolean) => void
	setIsPageDisplaced: (value: boolean) => void
}

export default function ProjectPageContent({
	img,
	description,
	tracklist,
	projectVideo,
	projectLink,
	releaseLink,
	setIsTrailerActive,
	setIsPageDisplaced,
}: ProjectPageContentProps) {
	return (
		<div className='relative w-full flex gap-8 mt-12'>
			<ProjectPageImage imgSrc={img.imgUrl} imgAlt={img.imgAlt} />
			{tracklist && <PlayerTrackList tracks={tracklist} />}
			<div className='mt-2'>
				{description && <p className='max-w-prose'>{description}</p>}
				{/* Links */}
				<div className='mt-8 space-y-1'>
					{projectVideo && setIsTrailerActive && (
						<Button
							action={() => {
								setIsTrailerActive(true)
								setIsPageDisplaced(true)
							}}
						>
							View Trailer
						</Button>
					)}
					{projectLink && (
						<a className='block underline' href={projectLink} target='_blank'>
							View project
						</a>
					)}
					{releaseLink && (
						<a className='block underline' href={releaseLink} target='_blank'>
							View release
						</a>
					)}
				</div>
			</div>
		</div>
	)
}
