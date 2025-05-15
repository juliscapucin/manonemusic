import Image from "next/image"

import { Project } from "@/types"
import { PlayerTrackList } from "@/components"
import { Button, ButtonRounded } from "@/components/buttons"
import { CustomLink, ImageWithSpinner, TextBlock } from "@/components/ui"

type ProjectPageContentProps = Project & {
	setIsTrailerActive: (value: boolean) => void
	setIsPageDisplaced: (value: boolean) => void
}

export default function ProjectPageContent({
	image,
	description,
	tracklist,
	projectVideo,
	projectLink,
	releaseLink,
	setIsTrailerActive,
	setIsPageDisplaced,
}: ProjectPageContentProps) {
	return (
		<div className='gsap-project-page-content relative w-full flex flex-col landscape:flex-row items-start gap-8 mt-12'>
			<div className='gsap-project-image relative w-full landscape:w-1/4 min-w-[300px] opacity-0'>
				<ImageWithSpinner
					quality={70}
					{...{
						image,
						fill: true,
						classes: "",
						sizes: "50vw",
					}}
				/>
			</div>
			<div className='mt-2 pr-8 flex-1 max-w-prose'>
				{tracklist && <PlayerTrackList tracks={tracklist} />}
				{description && <TextBlock text={description} />}

				{/* Project Links */}
				<div className='mt-16 flex gap-4 w-fit mx-auto'>
					{projectVideo && setIsTrailerActive && (
						<ButtonRounded
							key={"button-trailer"}
							onClick={() => {
								setIsTrailerActive(true)
								setIsPageDisplaced(true)
							}}>
							View Trailer
						</ButtonRounded>
					)}
					{projectLink && (
						<ButtonRounded
							key={"button-project"}
							href={projectLink}
							target='_blank'>
							View Project
						</ButtonRounded>
					)}
					{releaseLink && (
						<ButtonRounded
							key={"button-release"}
							href={releaseLink}
							target='_blank'>
							View Release
						</ButtonRounded>
					)}
				</div>
			</div>
		</div>
	)
}
