import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Panels } from "@/components"

import {
	getAboutPage,
	getContactPage,
	getProjectItems,
	getPortfolioPages,
} from "@/sanity/sanity-queries"

export const metadata: Metadata = {
	title: "Man One Music",
	description:
		"Man One Music and lead composer Matt Rudge specialise in original music and sound.",
}

export default async function Page() {
	const data = await Promise.all([
		getContactPage(),
		getAboutPage(),
		getPortfolioPages(),
		getProjectItems("films"),
		getProjectItems("commercials"),
		getProjectItems("releases"),
		getProjectItems("projects"),
	])

	if (!data) return notFound()

	return (
		<main className='w-screen custom-min-w-screen min-w-full h-full'>
			<Panels data={data} />
		</main>
	)
}
