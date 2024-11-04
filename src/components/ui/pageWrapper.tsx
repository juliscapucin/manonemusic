"use client"

type PageWrapperProps = {
	children: React.ReactNode
	classes?: string
}

export default function PageWrapper({ children, classes }: PageWrapperProps) {
	return (
		<div
			className={`relative w-screen h-screen custom-min-w-screen custom-min-h-screen max-w-desktop pt-32 pb-8 px-32 overflow-x-clip ${classes}`}
		>
			{children}
		</div>
	)
}
