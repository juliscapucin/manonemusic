"use client"

import { useMemo } from "react"
import { CopyEmailButton } from "@/components/buttons"

type AvailabilityProps = {
	availability?: string
}

export default function Availability({ availability }: AvailabilityProps) {
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
		<div>
			<span className='block text-bodyMedium lg:text-bodyLarge'>
				Available {furtherAvailability}
			</span>
			<div className='overflow-clip'>
				<a
					href='mailto:hello@juliscapucin.com'
					className='flex flex-col text-titleSmall md:text-titleMedium lg:text-titleLarge font-light uppercase'
				>
					<span>Get in touch</span>
				</a>
			</div>
			<CopyEmailButton />
		</div>
	)
}
