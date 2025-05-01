import { Heading } from "@/components/ui"

type CopyrightProps = {
	alignRight?: boolean
}

export default function Copyright({ alignRight }: CopyrightProps) {
	const year = new Date().getFullYear()

	return (
		<Heading
			tag='h3'
			variant='headline'
			classes={`uppercase text-nowrap ${alignRight && "text-right"}`}>
			{`©2017–${year}`}
		</Heading>
	)
}
