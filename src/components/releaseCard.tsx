"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

import { handlePanelSlide } from "@/lib/animations"

import { Album } from "@/types"

type ReleasesCardProps = {
	album: Album
}

export default function ReleaseCard({ album }: ReleasesCardProps) {
	const { title, coverImage, slug } = album
	const router = useRouter()
	const pathname = usePathname()

	return (
		<button
			onClick={() => {
				handlePanelSlide(2, true, () => router.push(`/releases/${slug}`))
			}}
			className='relative w-full aspect-square focus-visible:border-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary transition duration-300 hover:scale-105 transform-gpu overflow-hidden'
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
