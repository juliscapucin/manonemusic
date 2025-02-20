"use client"

import { useRouter } from "next/navigation"

import Button from "./button"
import { transitionOnClickBack } from "@/lib/animations"

type ButtonBackProps = {
	slug: string
}

export default function ButtonBack({ slug }: ButtonBackProps) {
	const router = useRouter()

	console.log(slug)

	return (
		<Button
			classes='underlined-link mb-8'
			action={() => transitionOnClickBack(() => router.push(`/${slug}`))}
		>
			Back to {slug.charAt(0).toUpperCase() + slug.slice(1)}
		</Button>
	)
}
