export default function PageWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='w-screen custom-min-w-screen custom-min-h-screen'>
			{children}
		</div>
	)
}
