"use client"

import { usePathname } from "next/navigation"

interface NavLinkProps {
	label: string
	action: () => void
	activeState?: boolean
	position?: string
}

export default function NavLink({
	label,
	action,
	activeState,
	position,
}: NavLinkProps) {
	const pathname = usePathname()

	return (
		<div className={`${position} px-1`}>
			{activeState ? (
				<div className='relative max-h-8'>
					<span className='text-titleSmall md:text-titleMedium lg:text-titleLarge uppercase opacity-30'>
						{label}
					</span>
				</div>
			) : (
				<div className='overflow-clip max-h-8'>
					<button
						className={`flex flex-col justify-center items-center hover:-translate-y-1/2 transition-transform ${
							label === "Home" &&
							pathname === "/" &&
							"translate-y-full pointer-events-none"
						}`}
						onClick={action}
						aria-hidden={pathname === "/" && label === "Home"}
						tabIndex={pathname === "/" && label === "Home" ? -1 : 0}
					>
						<span className='text-titleSmall md:text-titleMedium lg:text-titleLarge uppercase'>
							{label}
						</span>
						<span className='text-titleSmall md:text-titleMedium lg:text-titleLarge uppercase'>
							{label}
						</span>
					</button>
				</div>
			)}
		</div>
	)
}
