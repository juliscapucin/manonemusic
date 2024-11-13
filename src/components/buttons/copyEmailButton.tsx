"use client"

import { useState, useRef } from "react"

export default function CopyEmailButton() {
	const [showCopyFeedback, setShowCopyFeedback] = useState(false)
	const labelRef = useRef(null)

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText("hello@juliscapucin.com")
			.then(() => {
				setShowCopyFeedback(true)
				setTimeout(() => setShowCopyFeedback(false), 2000)
			})
			.catch((err) => {
				console.error("Failed to copy email address: ", err)
			})
	}

	return (
		<div className='relative h-16'>
			<div
				ref={labelRef}
				className='relative w-fit h-4 flex items-center overflow-clip'
			>
				<span className='px-2 text-primary text-labelSmall'>
					Copied to clipboard!
				</span>
				<div
					className={`absolute top-0 left-0 right-1 w-full h-4 bg-secondary transition-transform duration-100 -z-5 ${showCopyFeedback ? "translate-x-0" : "-translate-x-[95%]"}`}
				></div>
			</div>

			<button
				className='group overflow-clip h-6 cursor-pointer'
				onClick={copyToClipboard}
			>
				<div className='flex flex-col group-hover:-translate-y-1/2 transition-transform duration-200 text-labelLarge'>
					<span>Copy email address</span>
					<span>Copy email address</span>
				</div>
			</button>
		</div>
	)
}
