import { notFound } from "next/navigation"
import { Panels } from "@/components"
import { fetchAll } from "@/lib"

import { queryAll } from "@/lib/queries"

export default async function Home() {
	const data = await fetchAll(queryAll)

	if (!data) return notFound()
	return (
		<main className='w-full lg:h-full'>
			<Panels data={data} index={data.index} />
		</main>
	)
}
