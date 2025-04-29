"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

type SocialsData = { platform: string; link: string }

type SocialLinksProps = {
	data: SocialsData[]
}

export default function SocialLinks({ data }: SocialLinksProps) {
	return (
		<div className='flex-1'>
			{data && (
				<div className='overflow-hidden'>
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
		</div>
	)
}
