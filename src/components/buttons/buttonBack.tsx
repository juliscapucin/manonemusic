"use client"

import { useRouter } from "next/navigation"

import { transitionOnClickBack } from "@/lib/animations"
import { CustomButton } from "@/components/ui"
import { IconChevron } from "../icons"

type ButtonBackProps = {
	slug: string
}

export default function ButtonBack({ slug }: ButtonBackProps) {
	const router = useRouter()

	return (
		<div className='mb-8 flex gap-4'>
			<IconChevron direction='back' />
			<CustomButton
				classes='underlined-link'
				transitionOnClick={() =>
					transitionOnClickBack(() => router.push(`/${slug}`))
				}>
				Back to {slug.charAt(0).toUpperCase() + slug.slice(1)}
			</CustomButton>
		</div>
	)
}
