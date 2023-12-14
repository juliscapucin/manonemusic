export default function PageWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='custom-min-w-screen h-full flex flex-col justify-center items-start'>
			{children}
		</div>
	)
}
