"use client"

import { useEffect, useRef, useState } from "react"
import { Track } from "@/types"
import ReactPlayer from "react-player/soundcloud"

type PlayerTrackProps = {
	track: Track
}

export default function PlayerTrack({ track }: PlayerTrackProps) {
	const [isClient, setIsClient] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState("0:00")
	const [progress, setProgress] = useState("0:00")

	const audioRef = useRef<HTMLAudioElement | null>(null)

	const url = "https://soundcloud.com/ixamusic/ixa-selfies-at-disneyland"
	// const url =
	// 	"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/857650483&color=%23b6d1c2&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"

	// useEffect(() => {
	// 	audioRef.current = new Audio(track.url)
	// 	const audio = audioRef.current
	// 	if (!audio) return

	// 	if (isPlaying) {
	// 		// Attempt to play the audio and catch any errors
	// 		audio
	// 			.play()
	// 			.catch((error) =>
	// 				console.error("Error attempting to play audio:", error)
	// 			)
	// 	} else {
	// 		audio.pause()
	// 	}

	// 	audio.addEventListener("ended", () => {
	// 		audio.pause()
	// 	})

	// 	return () => {
	// 		audio.pause()
	// 		audio.removeEventListener("ended", () => {
	// 			audio.pause()
	// 		})
	// 	}
	// }, [isPlaying, action])

	const formatDuration = (data: number) => {
		const minutes = Math.floor(data / 60)
		const seconds = Math.floor(data % 60)
		return `${minutes}:${seconds}`
	}

	const togglePlayer = () => {
		setIsPlaying(!isPlaying)
	}

	const handleDuration = (newDuration: number) => {
		setDuration(formatDuration(newDuration))
	}

	const handleProgress = (progressData: number) => {
		setProgress(formatDuration(progressData.playedSeconds))
	}

	// Workaround to run component only on client side
	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<>
			<div className='gsap-release-content'>
				{isClient && (
					<ReactPlayer
						url={url}
						playing={isPlaying}
						onDuration={handleDuration}
						onProgress={handleProgress}
						width={"100%"}
						height={100}
					/>
				)}
			</div>
			{/* <button
				className='gsap-release-content group border border-faded-30 min-w-full h-24 p-8 flex transform duration-300 hover:border-secondary focus-visible:bg-faded-30'
				onClick={togglePlayer}
			>
				<div className='text-faded-30 transform duration-300 group-hover:text-secondary group-focus-visible:text-secondary'>
					{isPlaying ? "Pause" : "Play"}
				</div>
				<span className='text-faded-30 transform duration-300 group-hover:text-secondary group-focus-visible:text-secondary'>
					{track.title}
				</span>
				<span>
					{progress}/{duration}
				</span>
				
			</button> */}
			{/* <iframe
				width='100%'
				height='60'
				scrolling='no'
				frameBorder='no'
				style={{ backgroundColor: "transparent" }}
				src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/857650483&color=%23b6d1c2&auto_play=false&hide_related=true&show_comments=false&show_sharing=false&show_buying=false&show_user=false&show_artwork=false&show_reposts=false&show_teaser=false'
			></iframe> */}
		</>
	)
}
