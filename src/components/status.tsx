"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

type StatusProps = {
	location: string
}

type Day = {
	dayOfWeek: string
	dayOfMonth: string
	month: string
}

function Status({ location }: StatusProps) {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [time, setTime] = useState<string | null>(null)
	const [day, setDay] = useState<Day | null>(null)
	const statusWrapperRef = useRef<HTMLDivElement>(null)

	// 1s interval to update the time
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(new Date())
		}, 1000) // Update every second

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	// Animate the lines
	useGSAP(() => {
		if (!statusWrapperRef.current) return

		gsap.fromTo(
			".line",
			{
				xPercent: -100,
			},
			{
				xPercent: 0,
				duration: 0.3,
				ease: "expo4.inOut",
				stagger: 0.25,
			}
		)
	}, [statusWrapperRef.current])

	useEffect(() => {
		const options = { timeZone: "Europe/London" }

		const date = {
			dayOfWeek: currentDate.toLocaleDateString("en-GB", {
				weekday: "long",
				...options,
			}),
			dayOfMonth: currentDate.toLocaleDateString("en-GB", {
				day: "numeric",
				...options,
			}),
			month: currentDate.toLocaleDateString("en-GB", {
				month: "long",
				...options,
			}),
		}

		setDay(date)
		setTime(
			currentDate.toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				timeZone: "Europe/London",
			})
		)
	}, [currentDate])

	return (
		time && (
			<div
				ref={statusWrapperRef}
				className={`flex flex-col w-1/2 text-titleSmall md:text-titleMedium lg:text-titleLarge overflow-clip uppercase ${statusWrapperRef.current ? "opacity-1" : "opacity-0"}`}>
				<h2 className='line'>{location}</h2>
				<span className='line'>
					{day?.dayOfWeek} | {day?.dayOfMonth} {day?.month}
				</span>
				<span className='line'>{time}</span>
			</div>
		)
	)
}

export default Status
