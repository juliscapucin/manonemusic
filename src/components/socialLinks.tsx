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
				<div ref={wrapperRef} className='overflow-hidden'>
					<h3 className='mb-4'>Listen & Follow</h3>
					{data.map((item) => {
						return (
							<div
								className='relative flex justify-start items-start'
								key={item.platform}
							>
								<Link
									className='underlined-link block text-titleSmall md:text-titleMedium lg:text-titleLarge uppercase'
									href={item.link}
									target='_blank'
								>
									{item.platform}
								</Link>
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}
