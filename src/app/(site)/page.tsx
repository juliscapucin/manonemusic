import { Panels } from "@/components/server"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function Home() {
	return (
		<main className='w-full lg:h-full'>
			<Panels />
		</main>
	)
}
