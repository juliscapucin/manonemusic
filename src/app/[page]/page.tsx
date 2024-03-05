import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AboutPage } from "@/components/pages"

import { fetchAll } from "@/lib"
import { Title } from "@/components/ui"
import { HorizontalPanel } from "@/components"

export const metadata: Metadata = {
	title: "About",
	description:
		"Man One Music and lead composer Matt Rudge specialise in original music and sound.",
}

const queryAbout = `
	query {
		aboutPageCollection {
			items {
				title
				text
			}
		}
	}
`

const query = `
	query {
		workPageCollection {
			items {
			  title
			}
		 }
		 projectCollection {
			items {
			  title
			  slug
			  text
			  coverImage {
				 url
				 title
				 description
				 width
				 height
			  }
			  videoUrl
			}
		 }
		releasesCollection {
			items {
				title
				text
			}
		}
		aboutPageCollection {
			items {
				title
				text
			}
		}
		contactPageCollection {
			items {
				title
				availability
			}
			}
			socialLinkCollection{
			items {
				label
				url
			}
		}
	}
`

export default async function Page() {
	const data = await fetchAll(query)

	if (!data) return notFound()
	return (
		<main className='w-screen custom-min-w-screen min-w-full h-full'>
			<HorizontalPanel data={data} />
		</main>
	)
}
