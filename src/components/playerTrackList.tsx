"use client"

import { PlayerTrack } from "@/components"

import { Track } from "@/types"
import { useState } from "react"

type PlayerTrackListProps = {
	tracks: Track[]
}

export default function PlayerTrackList({ tracks }: PlayerTrackListProps) {
	const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

	const handleTrackClick = (clickedTrackTitle: string) => {
		if (currentlyPlaying === clickedTrackTitle) {
			// If the clicked track is already playing, pause it.
			setCurrentlyPlaying(null)
		} else {
			// Play the clicked track and pause others
			setCurrentlyPlaying(clickedTrackTitle)
		}
	}

	const handleSlideClick = (clickedTrackTitle: string) => {
		setCurrentlyPlaying(clickedTrackTitle)
	}

	return (
		<div className='w-full flex flex-col gap-4'>
			{tracks.map((track) => (
				<PlayerTrack
					key={track.title}
					track={track}
					buttonAction={() => handleTrackClick(track.title)}
					sliderAction={() => handleSlideClick(track.title)}
					isPlaying={currentlyPlaying === track.title}
				/>
			))}
		</div>
	)
}
