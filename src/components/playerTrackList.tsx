"use client"

import { useState } from "react"

import { PlayerTrack } from "@/components"

import { Track } from "@/types"

type PlayerTrackListProps = {
	tracks: Track[]
}

export default function PlayerTrackList({ tracks }: PlayerTrackListProps) {
	// State to track which track is currently playing
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

	return (
		<div className='w-full flex flex-col gap-4'>
			{tracks.map((track) => (
				<PlayerTrack
					key={track.title}
					track={track}
					action={() => handleTrackClick(track.title)}
					isPlaying={currentlyPlaying === track.title}
				/>
			))}
		</div>
	)
}
