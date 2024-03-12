"use client"

import { useEffect, useRef, useState } from "react"

export default function PlayerTrack() {
	const [isPlaying, setIsPlaying] = useState(false)
	const audioRef = useRef(new Audio("/tracks/sample-file-4.mp3"))

	useEffect(() => {
		const audio = audioRef.current

		audio.addEventListener("ended", () => {
			setIsPlaying(false)
		})

		return () => {
			audio.pause()
			setIsPlaying(false)
		}
	}, [])

	const handlePlayPause = () => {
		const audio = audioRef.current

		if (isPlaying) {
			audio.pause()
			setIsPlaying(false)
		} else {
			audio.play()
			setIsPlaying(true)
		}
	}

	return (
		<button
			className='gsap-release-content group border border-faded-30 min-w-full h-24 p-8 flex transform duration-300 hover:border-secondary focus-visible:bg-faded-30'
			onClick={handlePlayPause}
		>
			<div className='text-faded-30 transform duration-300 group-hover:text-secondary group-focus-visible:text-secondary'>
				{isPlaying ? "Pause" : "Play"}
			</div>
			<span className='text-faded-30 transform duration-300 group-hover:text-secondary group-focus-visible:text-secondary'>
				Track Title
			</span>
		</button>
	)
}
