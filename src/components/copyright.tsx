import { Heading } from "@/components/ui"

type CopyrightProps = {
	hasCredits?: boolean
}

export default function Copyright({ hasCredits = true }: CopyrightProps) {
	const year = new Date().getFullYear()

	return (
		<div className='flex-1'>
			<Heading tag='h3' variant='title' classes='w-1/2 mt-4 uppercase'>
				{`©2017–${year}`}
			</Heading>
			{hasCredits && (
				<a
					className='text-labelLarge uppercase'
					href='https://juliscapucin.com'
				>
					Design & Development by Juli Scapucin
				</a>
			)}
		</div>
	)
}
