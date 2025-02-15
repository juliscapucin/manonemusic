"use client"

import { useRouter } from "next/navigation"

import Button from "./button"
import { transitionOnClickBack } from "@/lib/animations"

type ButtonBackProps = {
	ctx: gsap.Context
	slug: string
}

export default function ButtonBack({ ctx, slug }: ButtonBackProps) {
	const router = useRouter()

	return (
		<Button
			classes='underlined-link mb-8'
			action={() => transitionOnClickBack(ctx, () => router.push(`/${slug}`))}
		>
			Back to {slug.charAt(0).toUpperCase() + slug.slice(1)}
		</Button>
	)
}
