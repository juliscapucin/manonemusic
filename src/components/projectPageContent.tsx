import Link from "next/link"
import { PortableText } from "@portabletext/react"

import { Project } from "@/types"
import { PlayerTrackList, ProjectPageImage } from "@/components"
import { Button } from "@/components/buttons"

type ProjectPageContentProps = Project & {
	setIsTrailerActive: (value: boolean) => void
	setIsPageDisplaced: (value: boolean) => void
}

export default function ProjectPageContent({
	image,
	description,
	tracklist,
	projectVideo,
	projectLink,
	releaseLink,
	setIsTrailerActive,
	setIsPageDisplaced,
}: ProjectPageContentProps) {
	return (
		<div className='relative w-full flex items-start gap-8 mt-12'>
			<ProjectPageImage imgSrc={image.imageUrl} imgAlt={image.imageAlt} />
			<div className='mt-2 pr-8 flex-1 max-w-prose'>
				{tracklist && <PlayerTrackList tracks={tracklist} />}
				{description && <PortableText value={description} />}
				{/* Links */}
				<div className='mt-8 space-x-4'>
					{projectVideo && setIsTrailerActive && (
						<Button
							classes='underlined-link'
							action={() => {
								setIsTrailerActive(true)
								setIsPageDisplaced(true)
							}}
						>
							View Trailer
						</Button>
					)}
					{projectLink && (
						<Link
							className='underlined-link'
							href={projectLink}
							target='_blank'
						>
							Visit Project
						</Link>
					)}
					{releaseLink && (
						<Link
							className='underlined-link'
							href={releaseLink}
							target='_blank'
						>
							View release
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
