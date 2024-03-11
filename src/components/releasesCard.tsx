import Image from "next/image"

import { Album } from "@/types"

type ReleasesCardProps = {
	album: Album
}

export default function ReleasesCard({ album }: ReleasesCardProps) {
	const { title, coverImage } = album

	return (
		<button className='relative w-full aspect-square bg-faded-70'>
			<Image
				src={coverImage.url}
				alt={`${title} album cover`}
				sizes='50vw'
				fill
			/>
			<span>{title}</span>
		</button>
	)
}
