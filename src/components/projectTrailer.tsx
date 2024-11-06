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
		setIsTrailerActive(false)
	}

	useLayoutEffect(() => {
		if (isTrailerActive) {
			const tl = gsap.timeline()
			tl.to(trailerContainerRef.current, {
				duration: 0.5,
				xPercent: -100,
			})
		} else {
			const tl = gsap.timeline()
			tl.to(trailerContainerRef.current, {
				duration: 0.5,
				xPercent: 0,
			})
		}
	}, [isTrailerActive])

	return (
		<div
			ref={trailerContainerRef}
			className={`w-screen h-screen overflow-clip bg-colorWhite fixed top-0 left-full ${isTrailerActive ? "pointer-events-auto" : "pointer-events-none"}`}
		>
			<div className='absolute flex justify-center items-center w-screen h-screen bg-primary z-50'>
				<Button classes='absolute top-16 left-8' action={() => backToProject()}>
					Back to Project
				</Button>
				<VideoPlayer src={videoUrl} title='Trailer Video' />
			</div>
		</div>
	)
}
