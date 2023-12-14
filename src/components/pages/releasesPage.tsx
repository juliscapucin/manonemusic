"use client"

type ReleasesData = {
	title: string
	text: string
}

export default function ReleasesPage({ data }: { data: ReleasesData }) {
	return (
		<>
			<p className='max-w-prose'>{data.text}</p>
		</>
	)
}
