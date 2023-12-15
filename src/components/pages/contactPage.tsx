"use client"

import { useRef } from "react"

import { Availability, SocialLinks } from "@/components"
import { PageWrapper, Title } from "@/components/ui"
import { useTitleScrollTrigger } from "@/hooks"

type ContactData = {
	contactPageCollection: {
		items: {
			title: string
			availability: string
		}[]
	}
	socialLinkCollection: {
		items: {
			label: string
			url: string
		}[]
	}
}

export default function ContactPage({ data }: { data: ContactData }) {
	const titleContactRef = useRef(null)

	const socialsData = data.socialLinkCollection?.items
	const availability = data.contactPageCollection?.items[0].availability
	const title = data.contactPageCollection.items[0].title

	useTitleScrollTrigger(titleContactRef)

	return (
		<div className='h-full flex flex-col justify-center items-start'>
			<Title ref={titleContactRef}>{title}</Title>
			<div className='flex flex-row flex-nowrap gap-32'>
				<Availability availability={availability} />
				<SocialLinks data={socialsData} />
				<Availability availability={availability} />
				<SocialLinks data={socialsData} />
				<Availability availability={availability} />
				<SocialLinks data={socialsData} />
			</div>
		</div>
	)
}
