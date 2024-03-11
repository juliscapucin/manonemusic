export default function PageWrapperDesktop({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='hidden lg:block w-screen custom-min-w-screen custom-min-h-screen max-w-desktop pt-32 bg-8 px-8 overflow-x-clip'>
			{children}
		</div>
	)
}
