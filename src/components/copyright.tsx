import { Heading } from "@/components/ui"

export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<div className='flex-1'>
			<Heading
				tag='h3'
				variant='headline'
				classes={`w-1/2 mt-4 uppercase text-nowrap`}
			>
				{`©2017–${year}`}
			</Heading>
		</div>
	)
}
