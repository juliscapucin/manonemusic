import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchAll } from "@/lib"
import { HorizontalPanel } from "@/components"

import { queryAll } from "@/lib/queries"

export const metadata: Metadata = {
	title: "Man One Music",
	description:
		"Man One Music and lead composer Matt Rudge specialise in original music and sound.",
}

export default async function Page() {
	const data = await fetchAll(queryAll)

	console.log(data)

	if (!data) return notFound()

	return (
		<main className='w-screen custom-min-w-screen min-w-full h-full'>
			<HorizontalPanel data={data} />
		</main>
	)
}
