import Image from "next/image"

type ProjectPageImageProps = {
	imgSrc: string
	imgAlt: string
}

export default function ProjectPageImage({
	imgSrc,
	imgAlt,
}: ProjectPageImageProps) {
	return (
		<div className='gsap-project-image relative w-1/4 min-w-[300px] aspect-square overflow-clip opacity-0'>
			<Image
				{...{
					src: imgSrc,
					alt: imgAlt,
					fill: true,
					className: "gsap-release-image object-cover",
					sizes: "50vw",
				}}
			/>
		</div>
	)
}
