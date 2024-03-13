"use client"

import { Suspense, useState } from "react"

import { PlayerTrack } from "@/components"

import { Track } from "@/types"

type PlayerTrackListProps = {
	tracks: Track[]
}

export default function PlayerTrackList({ tracks }: PlayerTrackListProps) {
	return (
		<div className='w-full flex flex-col gap-4'>
			{tracks.map((track) => (
				<PlayerTrack key={track.title} track={track} />
			))}
		</div>
	)
}
