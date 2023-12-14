"use client"

import { useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Copyright } from "@/components"
import { PageWrapper, Title } from "@/components/ui"

type AboutData = {
	title: string
	text: string
}

export default function AboutPage({ data }: { data: AboutData }) {
	const titleRef = useRef(null)

	useEffect(() => {
		if (!titleRef.current) return

		gsap.registerPlugin(ScrollTrigger)

		const element = titleRef.current as HTMLDivElement

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: titleRef.current,
				start: "top 50%",
				end: () => `+=${element.parentElement!.offsetWidth / 2}`,
				// markers: true,
				// onUpdate: (self) => {
				// 	console.log(
				// 		"about",
				// 		"progress:",
				// 		self.progress.toFixed(3),
				// 		"direction:",
				// 		self.direction,
				// 		"velocity",
				// 		self.getVelocity()
				// 	)
				// },
			})
		})

		return () => ctx.revert()
	}, [titleRef])

	return (
		<PageWrapper>
			<Title ref={titleRef}>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
			<Copyright />
		</PageWrapper>
	)
}
