import { Track } from "@/types"
import { PlayerTrackList, ProjectPageImage } from "@/components"

type ProjectPageContentProps = {
	img: {
		imgUrl: string
		imgAlt: string
	}
	tracklist?: Track[]
}

export default function ProjectPageContent({
	img,
	tracklist,
}: ProjectPageContentProps) {
	return (
		<div className='relative w-full flex gap-8 mt-8'>
			<ProjectPageImage imgSrc={img.imgUrl} imgAlt={img.imgAlt} />
			{tracklist && <PlayerTrackList tracks={tracklist} />}
		</div>
	)
}