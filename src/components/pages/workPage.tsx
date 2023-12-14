"use client"

import { useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { ProjectCard } from "@/components"

import { Project } from "@/types"
import { PageWrapper, Title } from "@/components/ui"

type WorkData = {
	title: string
}

type Props = { data: Project[] }

export default function WorkPage({ data }: Props) {
	const titleWorkRef = useRef(null)

	useEffect(() => {
		if (!titleWorkRef.current) return

		gsap.registerPlugin(ScrollTrigger)
		const element = titleWorkRef.current as HTMLDivElement

		const offsetLeft = element.parentElement!.offsetLeft / 2
		const width = element.parentElement!.offsetWidth

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: titleWorkRef.current,
				start: `${offsetLeft}px 50%`,
				end: () => `+=${offsetLeft + width}`,
				markers: true,
				onUpdate: (self) => {
					console.log(
						"work",
						"progress:",
						self.progress.toFixed(3),
						"direction:",
						self.direction,
						"velocity",
						self.getVelocity()
					)
				},
			})
		})

		return () => ctx.revert()
	}, [titleWorkRef])

	return (
		<PageWrapper>
			<Title ref={titleWorkRef}>Work</Title>

			<div className='flex justify-center gap-4 h-64'>
				{data.map((project: Project) => (
					<ProjectCard
						key={project.slug}
						{...{ title: project.title, coverImage: project.coverImage }}
					/>
				))}
			</div>
		</PageWrapper>
	)
}
