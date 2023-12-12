"use client"

import { useMemo, useRef } from "react"
import { CopyEmailButton } from "@/components/buttons"

type Props = {
	availability?: string
	variant?: string
	modalOpen?: boolean
}

export default function Availability({ availability }: Props) {
	const textRef = useRef(null)

	const getNextMonth = useMemo(() => {
		const currentDate = new Date()
		return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
	}, [])

	const parseStringToDate = (dateString: string) => {
		const parts = dateString.split(" ")
		if (parts.length === 2) {
			const month = new Date(`${parts[0]} 1, 1970`).getMonth()
			const year = parseInt(parts[1], 10)
			return new Date(year, month)
		}
		return getNextMonth
	}

	const furtherAvailability = useMemo(() => {
		const formatMonth = (date: Date) =>
			`${date.toLocaleString("default", {
				month: "long",
			})} ${date.getFullYear()}`

		if (!availability) {
			return formatMonth(getNextMonth)
		}

		const cmsDate = parseStringToDate(availability)
		return cmsDate.getTime() < getNextMonth.getTime()
			? formatMonth(getNextMonth)
			: formatMonth(cmsDate)
	}, [availability, getNextMonth])

	return (
		<div className='flex flex-col justify-center items-center'>
			<span className='block text-headlineSmall'>
				Available {furtherAvailability}
			</span>
			<div className='overflow-clip h-28 group'>
				<a
					href='mailto:hello@juliscapucin.com'
					className='flex flex-col text-displaySmall font-normal md:group-hover:-translate-y-1/2 transition-transform duration-200'
				>
					<span ref={textRef}>Say Hi :)</span>
					<span>Say Hi :)</span>
				</a>
			</div>
			<CopyEmailButton />
		</div>
	)
}
