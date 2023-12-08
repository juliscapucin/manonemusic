"use client"

import { usePathname } from "next/navigation"

import { Availability, Copyright, SocialLinks } from "@/components"

export default function Footer() {
	const pathname = usePathname()

	const isProjectPage = pathname.includes("/work/")

	return (
		<div
			className={`pt-32 pb-16 lg:pl-16 ${
				isProjectPage ? "lg:pr-64" : "lg:pr-16"
			} lg:grid grid-cols-12 max-w-desktop bg-primary`}
		>
			<nav className='col-span-3'>
				{/* Nav Column */}

				{/* Social Column */}
				<div className='flex flex-col'>
					<SocialLinks apiRoute={"navbar"} variant={"footer"} />
				</div>
				<div className='flex flex-col mt-16'>
					<SocialLinks apiRoute={"socials"} variant={"footer"} />
				</div>
			</nav>

			{/* Availability / Contact */}
			<div className='col-start-7 col-span-6 flex flex-col justify-between lg:items-end mt-32 lg:mt-0 gap-32'>
				<Availability />

				{/* Copyright */}
				<Copyright />
			</div>
		</div>
	)
}
