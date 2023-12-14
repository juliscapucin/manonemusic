export default function MainWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='w-screen min-w-screen h-screen custom-min-h-screen flex flex-col justify-center items-center'>
			{children}
		</div>
	)
}
