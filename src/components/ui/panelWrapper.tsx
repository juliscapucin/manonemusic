import { usePageContext } from "@/context"

export default function PanelWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	const { pageRef } = usePageContext()

	return (
		<div
			ref={pageRef}
			className='w-screen custom-min-w-screen custom-min-h-screen max-w-desktop pt-32 bg-8 px-8'
		>
			{children}
		</div>
	)
}
