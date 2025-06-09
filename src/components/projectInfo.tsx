import React from "react"

type ProjectInfoProps = {
	projectInfo: {
		releaseDate: string
		info: string | undefined
	}
}

export default function ProjectInfo({ projectInfo }: ProjectInfoProps) {
	return (
		<div className='gsap-project-content mt-4'>
			<p>
				Released{" "}
				{new Date(projectInfo.releaseDate).toLocaleDateString("en-US", {
					month: "long",
					year: "numeric",
				})}
			</p>
			{projectInfo.info && <p>{projectInfo.info}</p>}
		</div>
	)
}
