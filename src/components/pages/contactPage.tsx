import { Availability, SocialLinks } from "@/components"
import { Title } from "@/components/ui"

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
		<div className='w-full min-w-full h-full overflow-clip flex justify-center items-center mt-32'>
			<Title>{data.contactPageCollection?.items[0].title}</Title>
			<Availability availability={availability} />
			<SocialLinks data={socialsData} />
		</div>
	)
}
