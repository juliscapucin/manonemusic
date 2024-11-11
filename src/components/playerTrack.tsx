"use client"

import { useEffect, useState, useRef } from "react"
import { Track } from "@/types"
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
	// const playerRef = useRef<ReactPlayer | null>(null)

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
		// playerRef.current?.seekTo(newTime)
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
					{/* <ReactPlayer
						ref={playerRef}
						url={track.link}
						playing={isPlaying}
						onDuration={handleDuration}
						onProgress={handleProgress}
						onEnded={handleEnd}
						width={"100%"}
						height={100}
						style={{ opacity: 0, pointerEvents: "none" }}
					/> */}
				</div>
			)}
			{/* Custom Player */}
			{/* TODO – Improve Custom Player styles */}
			{index === 0 && <div className='w-full h-[1px] bg-faded-30'></div>}
			<button
				className='relative pt-10 pb-6 px-2 w-full hover:bg-faded-5 transition-colors duration-300'
				onClick={buttonAction}
				aria-label={`Play or pause ${track.trackname}`}
			>
				<span className='absolute left-2 top-2 w-full text-start'>
					{track.trackname}
				</span>
				<div className='flex items-center gap-4 h-full w-full'>
					<div className='w-16'>{isPlaying ? <IconPause /> : <IconPlay />}</div>
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
