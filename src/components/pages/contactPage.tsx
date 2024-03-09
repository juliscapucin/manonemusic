"use client"

import { useRef } from "react"

import { Availability, SocialLinks } from "@/components"
import { PageWrapperDesktop, PageWrapperMobile, Title } from "@/components/ui"
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

	useTitleScrollTrigger(titleContactRef, "/contact")

	return (
		<>
			<PageWrapperDesktop>
				<Title ref={titleContactRef}>{title}</Title>
				<div className='flex flex-row flex-nowrap gap-32'>
					<Availability availability={availability} />
					<SocialLinks data={socialsData} />
				</div>
			</PageWrapperDesktop>
			<PageWrapperMobile>
				<Title>{title}</Title>
				<div className='flex flex-row flex-nowrap gap-32'>
					<Availability availability={availability} />
					<SocialLinks data={socialsData} />
				</div>
			</PageWrapperMobile>
		</>
	)
}
