import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchAll } from "@/lib"
import { Panels } from "@/components"

import { queryAll } from "@/lib/queries"

export const metadata: Metadata = {
	title: "Man One Music",
	description:
		"Man One Music and lead composer Matt Rudge specialise in original music and sound.",
}

export default async function Page() {
	const data = await fetchAll(queryAll)

	if (!data) return notFound()

	return (
		<main className='w-screen custom-min-w-screen min-w-full h-full'>
			<Panels data={data} index={4} />
		</main>
	)
}
