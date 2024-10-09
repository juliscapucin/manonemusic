"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui"

interface NavLinkProps {
	label: string
	action: () => void
	activeState?: boolean
}

export default function NavLink({ label, action, activeState }: NavLinkProps) {
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
				<div className='overflow-clip max-h-8 pointer-events-auto'>
					{/* <button
						className={`${
							label === "Home" &&
							pathname === "/" &&
							"translate-y-full pointer-events-none"
						}`}
						onClick={action}
						aria-hidden={pathname === "/" && label === "Home"}
						tabIndex={pathname === "/" && label === "Home" ? -1 : 0}
					>
						<span className='underlined-link text-titleSmall md:text-titleMedium uppercase'>
							{label}
						</span>
					</button> */}
					<Button
						href={`/${label.toLowerCase()}`}
						classes='underlined-link text-titleSmall md:text-titleMedium uppercase'
						transitionOnClick={action}
					>
						{label}
					</Button>
				</div>
			)}
		</div>
	)
}
