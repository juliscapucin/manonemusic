import { Project } from "@/types"
import { PlayerTrackList, ProjectPageImage } from "@/components"
import { Button } from "@/components/buttons"
import { CustomLink, TextBlock } from "@/components/ui"

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
		<div className='gsap-project-page-content relative w-full flex items-start gap-8 mt-12'>
			<ProjectPageImage imgSrc={image.imageUrl} imgAlt={image.imageAlt} />
			<div className='mt-2 pr-8 flex-1 max-w-prose'>
				{tracklist && <PlayerTrackList tracks={tracklist} />}
				{description && <TextBlock text={description} />}
				{/* Links */}
				<div className='mt-8 space-x-4'>
					{projectVideo && setIsTrailerActive && (
						<Button
							classes='custom-button-rounded'
							action={() => {
								setIsTrailerActive(true)
								setIsPageDisplaced(true)
							}}
						>
							View Trailer
						</Button>
					)}
					{projectLink && (
						<CustomLink href={projectLink} label='View Project' />
					)}
					{releaseLink && (
						<CustomLink href={releaseLink} label='View Release' />
					)}
				</div>
			</div>
		</div>
	)
}
