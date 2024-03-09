export default function PageWrapperMobile({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='lg:hidden w-screen custom-min-w-screen custom-min-h-screen max-w-desktop pt-32 bg-8 px-8 overflow-x-clip'>
			{children}
		</div>
	)
}
