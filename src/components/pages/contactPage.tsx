import { Availability, SocialLinks } from "@/components"

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
	const socialsData = data.socialLinkCollection?.items
	const availability = data.contactPageCollection?.items[0].availability

	return (
		<>
			<p>hi</p>
			<Availability availability={availability} />
			<SocialLinks data={socialsData} />
		</>
	)
}
