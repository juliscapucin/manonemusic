"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

import { handlePanelSlide } from "@/lib/animations"

import { Album } from "@/types"

type ReleasesCardProps = {
	album: Album
}

export default function ReleasesCard({ album }: ReleasesCardProps) {
	const { title, coverImage, slug } = album
	const router = useRouter()
	const pathname = usePathname()

	return (
		<button
			onClick={() => {
				handlePanelSlide(2, true, () => router.push(`/releases/${slug}`))
			}}
			className='relative w-full aspect-square bg-faded-70'
		>
			<Image
				className={`${
					pathname.includes(slug) && "gsap-flip-release-card z-100"
				} object-cover`}
				src={coverImage.url}
				alt={`${title} album cover`}
				sizes='50vw'
				fill
			/>
			<span>{title}</span>
		</button>
	)
}
