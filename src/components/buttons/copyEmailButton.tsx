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
		<div className='relative h-16 mt-4'>
			{showCopyFeedback && (
				<div
					ref={labelRef}
					className='absolute -top-8 w-full flex justify-center'
				>
					<span className='bg-secondary px-2 text-primary text-labelSmall uppercase'>
						Copied to clipboard!
					</span>
				</div>
			)}
			<button
				className='group overflow-clip h-6 cursor-pointer'
				onClick={copyToClipboard}
			>
				<div className='flex flex-col group-hover:-translate-y-1/2 transition-transform duration-200 text-labelLarge uppercase'>
					<span>Copy email address</span>
					<span>Copy email address</span>
				</div>
			</button>
		</div>
	)
}
