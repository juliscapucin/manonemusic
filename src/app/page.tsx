import { notFound } from "next/navigation"
import { HorizontalPanel } from "@/components"
import { fetchGraphQL } from "@/lib"

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

export default async function Home() {
	const data = await fetchGraphQL(query)

	if (!data) return notFound()
	return (
		<main className='w-screen custom-min-w-screen min-w-full h-full'>
			<HorizontalPanel data={data} />
		</main>
	)
}
