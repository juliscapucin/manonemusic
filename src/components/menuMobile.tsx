"use client"

import { useRef } from "react"
import { usePathname } from "next/navigation"

import { animateMobileMenu } from "@/animations"

import { Availability, ThemeSwitcher } from "@/components"
import { ButtonBurger, ButtonClose } from "@/components/buttons"

type NavLink = { label: string; slug: string }

type NavLinksProps = {
	navLinks: NavLink[]
	transitionOnClick: (link: NavLink, mobileMenuRef?: HTMLDivElement) => void
}

export default function MenuMobile({
	navLinks,
	transitionOnClick,
}: NavLinksProps) {
	const mobileMenuRef = useRef(null)
	const pathname = usePathname()

	return (
		<>
			{navLinks && (
				<div className='block lg:hidden'>
					<div className='absolute max-w-full max-w-16 py-2 flex justify-end items-center bg-primary'>
						{/* Burger Button */}
						<ButtonBurger
							action={(e) => {
								if (mobileMenuRef.current) {
									animateMobileMenu(mobileMenuRef.current)
								}
							}}
						/>
					</div>
					<aside
						className='absolute top-0 w-full custom-min-h-screen p-8 bg-primary transition-transform -translate-y-full duration-300'
						ref={mobileMenuRef}
					>
						{/* Close Button */}
						<div className='absolute top-8 right-8'>
							<ButtonClose
								action={(e) => {
									if (mobileMenuRef.current) {
										animateMobileMenu(mobileMenuRef.current)
									}
								}}
							/>
						</div>

						{/* Nav Links */}
						<nav className='flex flex-col border-solid border-b border-secondary mt-32 h-full'>
							{navLinks.map((link) => {
								return (
									<div
										className={`relative max-h-32 min-h-32 flex justify-start items-start`}
										key={link.slug}
									>
										{/* Inactive Link */}
										{(pathname === "/" && link.slug === "/") ||
										pathname.includes(`/${link.slug}`) ? (
											<span className='font-headline text-displaySmall uppercase text-faded-30 opacity-70'>
												{link.label}
											</span>
										) : (
											// Active Link
											<button
												className='block'
												onClick={() => {
													if (mobileMenuRef.current)
														transitionOnClick(link, mobileMenuRef.current)
												}}
											>
												<span className='font-headline text-displaySmall uppercase text-secondary'>
													{link.label}
												</span>
											</button>
										)}
									</div>
								)
							})}
						</nav>

						{/* Theme Switcher */}
						<div className='col-span-full row-span-1 flex justify-end pt-4 pr-2 pb-10'>
							<ThemeSwitcher variant='body' />
						</div>

						{/* Availability / Contact */}
						<div className='w-full flex justify-center mt-32'>
							<Availability />
						</div>
					</aside>
				</div>
			)}
		</>
	)
}
