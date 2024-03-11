"use client"

import { useWindowDimensions } from "@/hooks"

type VideoPlayerProps = {
	src: string
	title: string
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
	const { width, height } = useWindowDimensions()
	return (
		<iframe
			src={src}
			title={title}
			allow='autoplay; fullscreen'
			height={height / 2}
			width={width / 2}
		/>
	)
}
