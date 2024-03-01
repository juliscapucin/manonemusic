"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"

type StatusProps = {
	location: string
}

function Status({ location }: StatusProps) {
	const [currentDate, setCurrentDate] = useState(new Date())
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
	useLayoutEffect(() => {
		if (!statusWrapperRef.current) return

		let ctx = gsap.context(() => {
			gsap.from(".line", {
				xPercent: -100,
				duration: 0.3,
				ease: "expo4.inOut",
				stagger: 0.25,
			})
		}, statusWrapperRef.current)

		return () => {
			ctx.revert()
		}
	}, [statusWrapperRef.current])

	const dayOfWeek = currentDate.toLocaleDateString("en-US", { weekday: "long" })
	const dayOfMonth = currentDate.toLocaleDateString("en-US", { day: "numeric" })
	const month = currentDate.toLocaleDateString("en-US", { month: "long" })
	const time = currentDate.toLocaleTimeString("en-US")

	return (
		<div
			ref={statusWrapperRef}
			className='flex flex-col w-1/2 text-titleSmall md:text-titleMedium lg:text-titleLarge overflow-clip'
		>
			<h2 className='line'>{location}</h2>
			<span className='line'>
				{dayOfWeek} | {dayOfMonth} {month}
			</span>
			{/* {time && <span className='line'>{time}</span>} */}
		</div>
	)
}

export default Status
