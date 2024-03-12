import { PlayerTrack } from "@/components"
import { Album } from "@/types"

type PlayerTrackListProps = {
	tracks: { title: string }[]
}

export default function PlayerTrackList({ tracks }: PlayerTrackListProps) {
	const handleTrackClick = () => {}

	return (
		<div className='w-full flex flex-col gap-4'>
			{tracks.map((track) => (
				<PlayerTrack key={track.title} track={track} />
			))}
		</div>
	)
}
