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
		<div className='gsap-project-content w-full'>
			{tracks.map((track, index) => (
				<PlayerTrack
					index={index}
					key={track.trackname}
					track={track}
					buttonAction={() => handleTrackClick(track.trackname)}
					sliderAction={() => handleSlideClick(track.trackname)}
					isPlaying={currentlyPlaying === track.trackname}
				/>
			))}
			{/* TODO add Soundcloud logo */}
		</div>
	)
}
