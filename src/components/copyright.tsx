export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<div className='col-span-12 flex flex-col lg:mb-0'>
			<span>Man/One Music ©{year}</span>
		</div>
	)
}
