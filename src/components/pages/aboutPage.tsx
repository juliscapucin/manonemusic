import { Copyright } from ".."

type AboutData = {
	title: string
	text: string
}

export default function AboutPage({ data }: { data: AboutData }) {
	return (
		<>
			<p className='max-w-prose'>{data.text}</p>
			<Copyright />
		</>
	)
}
