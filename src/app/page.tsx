import { notFound } from "next/navigation"
import { HorizontalPanel } from "@/components"
import { fetchAll } from "@/lib"

import { queryAll } from "@/lib/queries"

export default async function Home() {
	const data = await fetchAll(queryAll)

	if (!data) return notFound()
	return (
		<main className='w-screen custom-min-w-screen min-w-full h-full'>
			<HorizontalPanel data={data} />
		</main>
	)
}
