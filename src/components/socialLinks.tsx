"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import { useLinkReveal } from "@/hooks"

type SocialsData = {
	label: string
	url: string
}[]

type Props = {
	data: SocialsData
}

export default function SocialLinks({ data }: Props) {
	const wrapperRef = useRef(null)

	useLinkReveal(wrapperRef)

	return (
		<>
			{data && (
				<div ref={wrapperRef} className='overflow-hidden'>
					<span>Socials</span>
					{data.map((link) => {
						return (
							<div
								className='relative max-h-32 min-h-32 flex justify-start items-start'
								key={link.url}
							>
								<Link
									className='block h-11 group overflow-hidden'
									href={link.url}
									target='_blank'
								>
									{/* Animated Label */}
									<div className='flex flex-col justify-start items-start group-hover:-translate-y-1/2 transition'>
										<span className='font-headline text-headlineSmall uppercase text-secondary'>
											{link.label}
										</span>
										<span className='font-headline text-headlineSmall uppercase text-secondary'>
											{link.label}
										</span>
									</div>
								</Link>
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}
