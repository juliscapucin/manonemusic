"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui"

interface NavLinkProps {
	label: string
	slug: string
	action: () => void
	activeState?: boolean
}

export default function NavLink({
	label,
	slug,
	action,
	activeState,
}: NavLinkProps) {
	const pathname = usePathname()

	return (
		<div>
			{activeState ? (
				<div className='relative max-h-8'>
					<span className='underlined-link active text-titleSmall md:text-titleMedium uppercase'>
						{label}
					</span>
				</div>
			) : (
				<div className='overflow-clip max-h-8'>
					<Button
						href={`/${slug}`}
						classes={`underlined-link text-titleSmall md:text-titleMedium uppercase`}
						transitionOnClick={action}
					>
						{label}
					</Button>
				</div>
			)}
		</div>
	)
}
