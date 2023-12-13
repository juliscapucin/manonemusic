import { ProjectCard } from "@/components"

import { Project } from "@/types"

type WorkData = {
	title: string
}

type Props = { data: Project[] }

export default function WorkPage({ data }: Props) {
	return (
		<div className='flex justify-center gap-4 h-64'>
			{data.map((project: Project) => (
				<ProjectCard
					key={project.slug}
					{...{ title: project.title, coverImage: project.coverImage }}
				/>
			))}
		</div>
	)
}
