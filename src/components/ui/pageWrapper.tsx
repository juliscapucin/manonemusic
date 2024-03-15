"use client"

type PageWrapperProps = {
	children: React.ReactNode
	classes?: string
}

export default function PageWrapper({ children, classes }: PageWrapperProps) {
	return (
		<div
			className={`relative w-screen h-screen custom-min-h-screen pt-32 bg-8 px-64 overflow-x-clip ${classes}`}
		>
			<div className='absolute top-0 left-0 w-[1px] min-h-screen bg-faded-30'></div>
			{children}
		</div>
	)
}
