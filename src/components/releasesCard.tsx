"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import { handlePanelSlide } from "@/lib/animations"

import { Album } from "@/types"

type ReleasesCardProps = {
	album: Album
}

export default function ReleasesCard({ album }: ReleasesCardProps) {
	// const { title, coverImage, slug } = album
	const router = useRouter()

	return (
		<button
			onClick={() => {
				handlePanelSlide(2, true, () => router.push(`/releases/${album.slug}`))
			}}
			className='relative w-full aspect-square bg-faded-70'
		>
			<Image
				src={album.coverImage.url}
				alt={`${album.title} album cover`}
				sizes='50vw'
				fill
			/>
			<span>{album.title}</span>
		</button>
	)
}
