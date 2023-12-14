"use client"

import { useRef } from "react"

import { Availability, SocialLinks } from "@/components"
import { PageWrapper, Title } from "@/components/ui"

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
	const titleRef = useRef(null)

	const socialsData = data.socialLinkCollection?.items
	const availability = data.contactPageCollection?.items[0].availability
	const title = data.contactPageCollection.items[0].title

	return (
		<PageWrapper>
			<Title ref={titleRef}>{title}</Title>
			<div className='flex gap-32'>
				<Availability availability={availability} />
				<SocialLinks data={socialsData} />
			</div>
		</PageWrapper>
	)
}
