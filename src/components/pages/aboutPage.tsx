import { Copyright } from ".."

type AboutData = {
	title: string
	text: string
}

export default function AboutPage({ data }: { data: AboutData }) {
	return (
		<>
			<p>{data.text}</p>
			<Copyright />
		</>
	)
}
