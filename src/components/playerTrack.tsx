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

	const audioRef = useRef<HTMLAudioElement | null>(null)

	const url =
		"https://soundcloud.com/ixamusic/ixa-selfies-at-disneyland?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"

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

	const togglePlayer = () => {
		setIsPlaying(!isPlaying)
	}

	const handleDuration = (newDuration: number) => {
		const formatNewDuration = (() => {
			const minutes = Math.floor(newDuration / 60)
			const seconds = Math.floor(newDuration % 60)
			return `${minutes}:${seconds}`
		})()
		setDuration(formatNewDuration)
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
						config={{
							options: {
								auto_play: false,
								show_artwork: false,
								show_user: false,
								download: false,
								buying: false,
								frameborder: "no",
								color: "#B6D1C2",
							},
						}}
						width={"100%"}
						height={100}
						style={{ display: "none" }} // hide the default player
					/>
				)}
			</div>
			<button
				className='gsap-release-content group border border-faded-30 min-w-full h-24 p-8 flex transform duration-300 hover:border-secondary focus-visible:bg-faded-30'
				onClick={togglePlayer}
			>
				<div className='text-faded-30 transform duration-300 group-hover:text-secondary group-focus-visible:text-secondary'>
					{isPlaying ? "Pause" : "Play"}
				</div>
				<span className='text-faded-30 transform duration-300 group-hover:text-secondary group-focus-visible:text-secondary'>
					{track.title}
				</span>
				<span>{duration}</span>
			</button>
		</>
	)
}
