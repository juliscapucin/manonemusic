import { Copyright } from "@/components"
import { MainWrapper, Title } from "@/components/ui"

type AboutData = {
	title: string
	text: string
}

export default function AboutPage({ data }: { data: AboutData }) {
	return (
		<div className='w-full min-w-full h-full overflow-clip flex flex-col justify-center items-center mt-32'>
			<Title>{data.title}</Title>
			<p className='max-w-prose'>{data.text}</p>
			<Copyright />
		</div>
	)
}
