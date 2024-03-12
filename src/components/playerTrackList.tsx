import { PlayerTrack } from "."

export default function PlayerTrackList() {
	return (
		<div className='w-full flex flex-col gap-4'>
			<PlayerTrack />
			<PlayerTrack />
			<PlayerTrack />
		</div>
	)
}
