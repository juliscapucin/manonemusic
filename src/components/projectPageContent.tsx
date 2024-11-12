import Link from "next/link"

import { Project, Track } from "@/types"
import { PlayerTrackList, ProjectPageImage } from "@/components"
import { Button } from "@/components/buttons"
import { PortableText } from "@portabletext/react"

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
						<Link href={projectLink} target='_blank'>
							View project
						</Link>
					)}
					{releaseLink && (
						<Link href={releaseLink} target='_blank'>
							View release
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
