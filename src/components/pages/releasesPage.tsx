"use client"

import { Title } from "@/components/ui"

type ReleasesData = {
	title: string
	text: string
}

export default function ReleasesPage({ data }: { data: ReleasesData }) {
	return (
		<div className='w-full min-w-full h-full overflow-clip mt-32'>
			<Title>{data.title}</Title>

			<p className='max-w-prose'>{data.text}</p>
		</div>
	)
}
