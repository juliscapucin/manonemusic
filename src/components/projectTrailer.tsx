"use client"

import gsap from "gsap"

import { VideoPlayer } from "@/components/ui"
import { Button } from "@/components/buttons"
import { useLayoutEffect, useRef } from "react"

type ProjectTrailerProps = {
	videoUrl: string
	isTrailerActive: boolean
	setIsTrailerActive: (arg: boolean) => void
}

export default function ProjectTrailer({
	videoUrl,
	isTrailerActive,
	setIsTrailerActive,
}: ProjectTrailerProps) {
	const trailerContainerRef = useRef<HTMLDivElement>(null)

	const backToProject = () => {
		const tl = gsap.timeline()
		tl.to(trailerContainerRef.current, {
			duration: 0.8,
			xPercent: 100,
			onComplete: () => setIsTrailerActive(false),
		})
	}

	useLayoutEffect(() => {
		if (!isTrailerActive) return

		const tl = gsap.timeline()
		tl.to(trailerContainerRef.current, {
			duration: 0.3,
			xPercent: -100,
		})
	}, [isTrailerActive])

	return (
		<div
			ref={trailerContainerRef}
			className={`fixed top-0 left-full w-screen h-screen flex items-center justify-center overflow-clip bg-colorBlack  ${isTrailerActive ? "pointer-events-auto" : "pointer-events-none"}`}
		>
			<div>
				<Button classes='mb-4' action={() => backToProject()}>
					Back to Project
				</Button>
				<VideoPlayer src={videoUrl} title='Trailer Video' />
			</div>
		</div>
	)
}
