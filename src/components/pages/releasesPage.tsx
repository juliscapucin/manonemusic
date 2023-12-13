"use client"

import { Title } from "@/components/ui"

type ReleasesData = {
	title: string
	text: string
}

export default function ReleasesPage({ data }: { data: ReleasesData }) {
	return (
		<div>
			<Title>{data.title}</Title>
			hello
		</div>
	)
}
