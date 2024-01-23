"use client"

import { useRef } from "react"

import { Copyright, Status } from "@/components"
import { PageWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type HomeData = {
	title: string
	text: string
}

export default function HomePage({ data }: { data: HomeData }) {
	const titleHomeRef = useRef(null)

	useTitleScrollTrigger(titleHomeRef)

	return (
		<PageWrapper>
			<Status location='Amsterdam' />
		</PageWrapper>
	)
}
