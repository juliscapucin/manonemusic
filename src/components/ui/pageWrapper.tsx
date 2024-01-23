export default function PageWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='w-screen custom-min-w-screen custom-min-h-screen h-full flex flex-col justify-center items-start'>
			{children}
		</div>
	)
}
