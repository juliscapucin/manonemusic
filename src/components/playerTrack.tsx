"use client"

import { useEffect, useState, useRef } from "react"
import { Track } from "@/types"
import ReactPlayer from "react-player/soundcloud"
import { IconPause, IconPlay } from "@/components/icons"

type PlayerTrackProps = {
	index: number
	track: Track
	isPlaying: boolean
	buttonAction: () => void
	sliderAction: () => void
}

export default function PlayerTrack({
	index,
	track,
	isPlaying,
	buttonAction,
	sliderAction,
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

	const handleDuration = (newDuration: number) => {
		setDuration(newDuration)
	}

	const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
		if (!seeking) {
			// Update progress only if not currently seeking
			setPlayedSeconds(playedSeconds)
		}
	}

	const handleEnd = () => {
		buttonAction()
		setPlayedSeconds(0)
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
		sliderAction()
	}

	// Workaround to run component only on client side
	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<>
			{/* Original Player – Hidden */}
			{isClient && (
				<div className='absolute -z-5'>
					<ReactPlayer
						ref={playerRef}
						url={track.url}
						playing={isPlaying}
						onDuration={handleDuration}
						onProgress={handleProgress}
						onEnded={handleEnd}
						width={"100%"}
						height={100}
						style={{ opacity: 0, pointerEvents: "none" }}
					/>
				</div>
			)}
			{/* Custom Player */}
			{index === 0 && <div className='w-full h-[1px] bg-faded-30'></div>}
			<button
				className='relative pt-10 pb-6 px-2'
				onClick={buttonAction}
				aria-label={`Play or pause ${track.title}`}
			>
				<span className='absolute left-2 top-2 w-full text-start'>
					{track.title}
				</span>
				<div className='flex items-center gap-4 h-full w-full'>
					{isPlaying ? <IconPause /> : <IconPlay />}
					<span className=''>{formatDuration(playedSeconds)}</span>
					<input
						className=' h-[1px] w-full bg-faded-30 appearance-none'
						type='range'
						min={0}
						max={duration}
						value={playedSeconds}
						onMouseDown={onSeekMouseDown}
						onChange={(e) => setPlayedSeconds(parseFloat(e.target.value))}
						onMouseUp={onSeekMouseUp}
					/>
					<span className=''>{formatDuration(duration)}</span>
				</div>
			</button>
			<div className='w-full h-[1px] bg-faded-30'></div>
		</>
	)
}
