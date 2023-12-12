import { ProjectCard } from "@/components"

import { Project } from "@/types"

type WorkData = {
	title: string
}

type Props = { projectsData: Project[] }

export default function WorkPage({ projectsData }: Props) {
	return (
		<section className='relative flex justify-center gap-4 h-64 w-full'>
			{projectsData.map((project: Project) => (
				<ProjectCard
					key={project.slug}
					{...{ title: project.title, coverImage: project.coverImage }}
				/>
			))}
		</section>
	)
}
