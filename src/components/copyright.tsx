export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<div className='col-span-12 flex flex-col lg:mb-0 text-titleSmall md:text-titleMedium'>
			<span>©2017–{year}</span>
		</div>
	)
}
