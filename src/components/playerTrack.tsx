"use client"

import { useEffect, useState, useRef } from "react"
import { Track } from "@/types"
import ReactPlayer from "react-player/soundcloud"

type PlayerTrackProps = {
	track: Track
	isPlaying: boolean
	action: () => void
}

export default function PlayerTrack({
	track,
	isPlaying,
	action,
}: PlayerTrackProps) {
	const [isClient, setIsClient] = useState(false)
	const [duration, setDuration] = useState(0) // Store duration in seconds
	const [playedSeconds, setPlayedSeconds] = useState(0) // Track played time in seconds
	const [seeking, setSeeking] = useState(false) // Track whether the user is currently seeking
	const playerRef = useRef<ReactPlayer | null>(null)

	const url = "https://soundcloud.com/ixamusic/ixa-selfies-at-disneyland"

	const formatDuration = (data: number) => {
		const minutes = Math.floor(data / 60)
		const seconds = Math.floor(data % 60)
		return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}` // Ensure two-digit seconds
	}

	const togglePlayer = () => {
		isPlaying = !isPlaying
	}

	const handleDuration = (newDuration: number) => {
		setDuration(newDuration)
	}

	const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
		if (!seeking) {
			// Update progress only if not currently seeking
			setPlayedSeconds(playedSeconds)
		}
	}

	// Slider change starts
	const onSeekMouseDown = () => {
		setSeeking(true)
	}

	// Slider change ends and seek to new time
	const onSeekMouseUp = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		const newTime = parseFloat((e.target as HTMLInputElement).value)
		setSeeking(false)
		playerRef.current?.seekTo(newTime)
		setPlayedSeconds(newTime)
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
						ref={playerRef}
						url={url}
						playing={isPlaying}
						onDuration={handleDuration}
						onProgress={handleProgress}
						width={"100%"}
						height={100}
						style={{ opacity: 0, pointerEvents: "none" }}
					/>
				)}
			</div>
			<button onClick={action}>{isPlaying ? "Pause" : "Play"}</button>
			<div>
				<input
					type='range'
					min={0}
					max={duration}
					value={playedSeconds}
					onMouseDown={onSeekMouseDown}
					onChange={(e) => setPlayedSeconds(parseFloat(e.target.value))}
					onMouseUp={onSeekMouseUp}
				/>
				<span>
					{formatDuration(playedSeconds)}/{formatDuration(duration)}
				</span>
			</div>
		</>
	)
}
