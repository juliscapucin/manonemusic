"use client"

import gsap from "gsap"

import { VideoPlayer } from "@/components/ui"
import { Button } from "@/components/buttons"
import { useLayoutEffect, useRef } from "react"

type ProjectTrailerProps = {
	videoUrl: string
	isTrailerActive: boolean
	setIsTrailerActive: (arg: boolean) => void
	setIsPageDisplaced: (arg: boolean) => void
}

export default function ProjectTrailer({
	videoUrl,
	isTrailerActive,
	setIsTrailerActive,
	setIsPageDisplaced,
}: ProjectTrailerProps) {
	const trailerContainerRef = useRef<HTMLDivElement>(null)

	const backToProject = () => {
		setIsPageDisplaced(false)

		const tl = gsap.timeline()
		tl.to(trailerContainerRef.current, {
			duration: 0.3,
			yPercent: 0,
			ease: "testEase",
			onComplete: () => setIsTrailerActive(false),
		})
	}

	useLayoutEffect(() => {
		if (!isTrailerActive) return

		const tl = gsap.timeline()
		tl.to(trailerContainerRef.current, {
			duration: 0.3,
			yPercent: -100,
			ease: "testEase",
		})
	}, [isTrailerActive])

	return (
		<div
			ref={trailerContainerRef}
			className={`fixed left-0 top-0 w-screen h-screen min-h-svh max-w-desktop pt-16 pb-8 px-32 flex items-center justify-start overflow-clip bg-colorBlack translate-y-full  ${isTrailerActive ? "pointer-events-auto" : "pointer-events-none"}`}
		>
			<div>
				<Button classes='mb-4' action={() => backToProject()}>
					Back
				</Button>
				<VideoPlayer src={videoUrl.split("/").pop() || ""} />
			</div>
		</div>
	)
}
