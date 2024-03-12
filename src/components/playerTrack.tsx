"use client"

import { useEffect, useRef } from "react"
import { Track } from "@/types"

type PlayerTrackProps = {
	track: Track
	action: () => void
	isPlaying: boolean
}

export default function PlayerTrack({
	track,
	action,
	isPlaying,
}: PlayerTrackProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		audioRef.current = new Audio(track.url)
		const audio = audioRef.current
		if (!audio) return

		if (isPlaying) {
			// Attempt to play the audio and catch any errors
			audio
				.play()
				.catch((error) =>
					console.error("Error attempting to play audio:", error)
				)
		} else {
			audio.pause()
		}

		audio.addEventListener("ended", () => {
			audio.pause()
		})

		return () => {
			audio.pause()
			audio.removeEventListener("ended", () => {
				audio.pause()
			})
		}
	}, [isPlaying, action])

	return (
		<button
			className='gsap-release-content group border border-faded-30 min-w-full h-24 p-8 flex transform duration-300 hover:border-secondary focus-visible:bg-faded-30'
			onClick={action}
		>
			{/* <audio
				ref={audioRef}
				src={track.url}
				controls
				controlsList='nodownload'
				preload='metadata'
			/> */}
			<div className='text-faded-30 transform duration-300 group-hover:text-secondary group-focus-visible:text-secondary'>
				{isPlaying ? "Pause" : "Play"}
			</div>
			<span className='text-faded-30 transform duration-300 group-hover:text-secondary group-focus-visible:text-secondary'>
				{track.title}
			</span>
		</button>
	)
}
