"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import { useLinkReveal } from "@/hooks"

type SocialsData = { platform: string; link: string }

type SocialLinksProps = {
	data: SocialsData[]
}

export default function SocialLinks({ data }: SocialLinksProps) {
	const wrapperRef = useRef(null)

	useLinkReveal(wrapperRef)

	return (
		<>
			{data && (
				<div ref={wrapperRef} className='overflow-hidden w-1/2'>
					<h3>Listen & Follow</h3>
					{data.map((item) => {
						return (
							<div
								className='relative flex justify-start items-start'
								key={item.platform}
							>
								<Link
									className='block h-11 group overflow-hidden'
									href={item.link}
									target='_blank'
								>
									{/* Animated Label */}
									<div className='flex flex-col justify-start items-start group-hover:-translate-y-1/2 transition'>
										<span className='font-headline text-headlineSmall uppercase text-secondary'>
											{item.platform}
										</span>
										<span className='font-headline text-headlineSmall uppercase text-secondary'>
											{item.platform}
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
