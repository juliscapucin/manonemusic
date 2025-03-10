type CopyrightProps = {
	hasCredits?: boolean
}

export default function Copyright({ hasCredits = true }: CopyrightProps) {
	const year = new Date().getFullYear()

	return (
		<div className='flex-1'>
			<h3>©2017–{year}</h3>
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
