import type { Metadata } from "next"

import { Panels } from "@/components/server"

export const metadata: Metadata = {
	title: "Man One Music",
	description:
		"Man One Music and lead composer Matt Rudge specialise in original music and sound.",
}

export default async function Page() {
	return (
		<main className='w-screen custom-min-w-screen min-w-full h-full'>
			<Panels />
		</main>
	)
}
