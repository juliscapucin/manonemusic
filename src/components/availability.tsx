"use client"

import { useMemo } from "react"
import { ButtonRounded } from "./buttons"

type AvailabilityProps = {
	availability?: string
	slideToContact?: () => void
}

export default function Availability({
	availability,
	slideToContact,
}: AvailabilityProps) {
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

	const furtherAvailability = () => {
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
	}

	return (
		<div className='flex items-center gap-4'>
			<p className='block text-bodyMedium lg:text-bodyLarge uppercase'>
				Available {furtherAvailability()}
			</p>
			{slideToContact && (
				<ButtonRounded onClick={() => slideToContact()}>
					Contact me
				</ButtonRounded>
			)}
		</div>
	)
}
