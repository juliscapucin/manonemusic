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
			className='relative w-full aspect-square group focus-visible:border-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary overflow-hidden'
		>
			{/* <div className='absolute top-0 left-0 w-full h-full bg-faded-30 z-100'></div> */}
			<Image
				className={`${
					pathname.includes(slug) && "gsap-flip-release-card z-50"
				} object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
				src={coverImage.url}
				alt={`${title} album cover`}
				sizes='50vw'
				fill
			/>
		</button>
	)
}
