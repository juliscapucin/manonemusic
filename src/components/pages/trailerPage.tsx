"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { useRouter } from "next/navigation"

import gsap from "gsap"

import { Logo, VideoPlayer } from "@/components/ui"

import { Project } from "@/types"
import { ProjectPage } from "."

type TrailerPageProps = {
	projectData: Project
}

export default function TrailerPage({ projectData }: TrailerPageProps) {
	const pageContainerRef = useRef(null)
	const router = useRouter()
	let ctx = gsap.context(() => {})

	// Transition on Click Back
	const transitionOnClickBack = (slug: string) => {
		ctx.add(() => {
			gsap.to(pageContainerRef.current, {
				xPercent: 0,
				duration: 0.5,
				ease: "power4.out",
				onComplete: () => {
					router.push(`${slug}?back=true`)
				},
			})
		})
	}

	// Transition on Enter
	useLayoutEffect(() => {
		if (!pageContainerRef.current) return

		ctx.add(() => {
			gsap.to(pageContainerRef.current, {
				xPercent: -50,
				duration: 0.5,
				ease: "power4.out",
			})
		})
	}, [pageContainerRef])

	useEffect(() => {
		return () => ctx.revert()
	}, [])

	return (
		<div className='overflow-clip'>
			<div ref={pageContainerRef} className='flex flex-nowrap w-fit'>
				<ProjectPage projectData={projectData} transitionOnEnter={false} />
				<div className='w-screen h-screen overflow-clip'>
					<Logo />

					<div className='absolute flex justify-center items-center w-screen h-screen bg-primary z-50'>
						<button
							className={"absolute top-16 left-8"}
							onClick={() =>
								transitionOnClickBack(`/projects/${projectData.slug}`)
							}
						>
							Back to Project
						</button>
						<VideoPlayer
							src='https://player.vimeo.com/video/371168497'
							title='Trailer Video'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
