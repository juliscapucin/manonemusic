"use client"

import { useEffect, useRef, useState } from "react"
import { PlayerTrackList } from "."

interface PlayerProps {
	src: string
}

export default function Player() {
	return (
		<>
			<PlayerTrackList />
		</>
	)
}
