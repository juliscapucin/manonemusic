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
			<p>Released {projectInfo.releaseDate}</p>
			{projectInfo.info && <p>{projectInfo.info}</p>}
		</div>
	)
}
