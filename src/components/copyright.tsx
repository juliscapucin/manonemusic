import { Heading } from "@/components/ui"

export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<Heading tag='h3' variant='headline' classes='uppercase text-nowrap'>
			{`©2017–${year}`}
		</Heading>
	)
}
