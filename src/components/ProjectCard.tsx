"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

type Props = {
	title: string
	coverImage: {
		url: string
		description: string
		width: number
		height: number
	}
	slug: string
}

export default function ProjectCard({ title, coverImage, slug }: Props) {
	const router = useRouter()
	const handleClick = (slug: string) => {
		// window.history.pushState(null, "", `/projects/${slug}`)
		router.push(`/projects/${slug}`)
	}

	return (
		<button onClick={() => handleClick(slug)} className='bg-colorWhite'>
			<div className='relative w-32 h-[40vh] overflow-clip'>
				<Image
					className='object-cover'
					src={coverImage.url}
					alt={coverImage.description}
					sizes='50vw'
					fill
				/>
			</div>
			<span>{title}</span>
		</button>
	)
}
