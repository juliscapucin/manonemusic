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
		<Image
			src={coverImage.url}
			alt={coverImage.description}
			width={coverImage.width}
			height={coverImage.height}
		/>
	)
}
