type CopyrightProps = {
	hasCredits?: boolean
}

export default function Copyright({ hasCredits = true }: CopyrightProps) {
	const year = new Date().getFullYear()

	return (
		<div className='absolute right-32 bottom-16 flex flex-col lg:mb-0 text-titleSmall md:text-titleMedium z-5'>
			<h3>©2017–{year}</h3>
			{hasCredits && (
				<p className='text-labelLarge'>
					Website by <a href='https://juliscapucin.com'>Juli Scapucin</a>
				</p>
			)}
		</div>
	)
}
