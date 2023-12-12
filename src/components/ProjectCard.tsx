import Image from "next/image"

type Props = {
	title: string
	coverImage: {
		url: string
		description: string
		width: number
		height: number
	}
}

export default function ProjectCard({ title, coverImage }: Props) {
	return (
		<div>
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
		</div>
	)
}
