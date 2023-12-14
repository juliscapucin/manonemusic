export default function PageWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='w-full min-w-full h-full flex flex-col justify-center items-center'>
			{children}
		</div>
	)
}
