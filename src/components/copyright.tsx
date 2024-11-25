type CopyrightProps = {
	hasCredits?: boolean
}

export default function Copyright({ hasCredits = true }: CopyrightProps) {
	const year = new Date().getFullYear()

	return (
		<div className='absolute right-8 bottom-16 lg:mb-0 text-titleSmall md:text-titleMedium z-5'>
			<h3>©2017–{year}</h3>
			{hasCredits && (
				<a className='text-labelLarge' href='https://juliscapucin.com'>
					Credits
				</a>
			)}
		</div>
	)
}
