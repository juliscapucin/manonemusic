"use client"

import { usePathname } from "next/navigation"
import { CustomButton } from "@/components/ui"

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
					<CustomButton
						link={`/${slug}`}
						classes={`underlined-link text-titleSmall md:text-titleMedium uppercase`}
						transitionOnClick={action}>
						{label}
					</CustomButton>
				</div>
			)}
		</div>
	)
}
