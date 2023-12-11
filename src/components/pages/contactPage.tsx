import { Availability } from "@/components"

type ContactData = {
	title: string
}

export default function ContactPage({ data }: { data: ContactData }) {
	return (
		<>
			<p>hi</p>
			<Availability />
		</>
	)
}
