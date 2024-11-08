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
			src={`${src}?title=0&byline=0&portrait=0&muted=0&autoplay=1&controls=0&loop=1&dnt=1`}
			title={title}
			allow='autoplay; fullscreen'
			height={height * 0.7}
			width={width * 0.7}
		/>
	)
}
