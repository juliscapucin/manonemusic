"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

type SocialsData = { platform: string; link: string }

type SocialLinksProps = {
	data: SocialsData[]
}

export default function SocialLinks({ data }: SocialLinksProps) {
	return (
		data && (
			<div className='overflow-hidden text-right'>
				<h3 className='mb-4'>Listen & Follow</h3>
				{data.map((item) => {
					return (
						<div
							className='relative flex justify-end items-start'
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
		)
	)
}
