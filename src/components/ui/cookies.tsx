"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { PortableText } from "@portabletext/react"

import gsap from "gsap"

import { ButtonClose, ButtonRounded } from "@/components/buttons"
import { Heading } from "@/components/ui"
import { useCloseOnClickOutside, useCookieStorage } from "@/hooks"
import { Cookies as CookiesType } from "@/types"

type CookiesProps = {
	cookiesData: CookiesType
}

export default function Cookies({ cookiesData }: CookiesProps) {
	const { cookie, setCookie, updateCookie } = useCookieStorage()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const cookieButtonRef = useRef<HTMLDivElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)

	// Enter cookie button animation
	useLayoutEffect(() => {
		if (!cookieButtonRef.current || cookie === "true") return
		gsap.set(modalRef.current, { yPercent: 120 })
		gsap.to(cookieButtonRef.current, {
			xPercent: -100,
			duration: 0.2,
			ease: "power4.out",
			delay: 2.7,
		})
	}, [])

	// Toggle Cookie modal
	const handleCookieModal = () => {
		if (!modalRef.current) return

		const isOpen = !isModalOpen

		setIsModalOpen(isOpen)

		let ctx = gsap.context(() => {
			gsap.to(modalRef.current, {
				yPercent: isOpen ? 0 : 120,
				duration: 0.4,
				ease: "power2.out",
			})
		}, modalRef)

		return () => {
			ctx.revert()
		}
	}

	useCloseOnClickOutside(modalRef.current, handleCookieModal)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isModalOpen) {
				handleCookieModal()
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [handleCookieModal])

	if (cookie === "true") return null

	const handleOKButton = (cookie: string) => {
		updateCookie(cookie)

		if (!cookieButtonRef.current) return
		gsap.to(cookieButtonRef.current, {
			xPercent: 100,
			duration: 0.2,
			ease: "power4.in",
			onComplete: () => {
				setCookie(cookie)
			},
		})
	}

	{
		return (
			cookiesData &&
			cookie !== "true" && (
				<>
					{/* White overlay */}
					<div
						className={`fixed top-0 max-w-desktop mx-auto left-0 right-8 bottom-8 flex items-end justify-end z-cookies overflow-clip pointer-events-none transition-colors duration-300 ${
							isModalOpen ? "md:bg-primary/80" : ""
						}`}>
						{/* Cookie button */}
						<div
							ref={cookieButtonRef}
							className='translate-x-full flex items-center gap-4 bg-primary text-secondary border border-secondary rounded-full px-6 py-2 pointer-events-auto'>
							<button
								onClick={(e) => {
									e.preventDefault()
									handleCookieModal()
								}}
								className='underlined-link uppercase text-bodySmall select-none'>
								This site uses cookies
							</button>
							<ButtonRounded
								classes='text-bodySmall custom-rounded'
								onClick={() => handleOKButton("true")}>
								OK
							</ButtonRounded>
						</div>
					</div>

					{/* Cookie Policy modal */}
					<div
						className={`fixed w-full top-24 left-0 right-0 bottom-8 pr-0 max-w-desktop mx-auto overflow-clip z-cookiesOverlay ${
							isModalOpen ? "pointer-events-auto" : "pointer-events-none"
						}`}>
						{/* Gradients */}
						<div
							className={`absolute top-8 right-10 w-[98%] md:w-[70%] lg:w-[35%] h-16 ml-auto bg-gradient-to-b from-20% bg-gradient-middle from-primary to-transparent z-80 ${
								isModalOpen
									? "transition-opacity duration-300 delay-300"
									: "opacity-0"
							}`}></div>
						<div
							className={`absolute bottom-0 right-10 w-[98%] md:w-[70%] lg:w-[35%] h-16 ml-auto bg-gradient-to-t from-20% bg-gradient-middle from-primary to-transparent z-80 ${
								isModalOpen ? "" : "opacity-0"
							}`}></div>

						{/* Content */}
						<div
							ref={modalRef}
							className='cookies-overlay gutter-stable relative w-full md:w-3/4 lg:w-2/5 ml-auto mr-8 bg-primary border border-secondary rounded-3xl text-secondary h-full pb-8 overflow-y-scroll'>
							{/* Button Close */}
							<div className='absolute top-8 right-0'>
								<ButtonClose
									classes={`mx-auto pr-4 mt-4 flex justify-end z-100`}
									onClick={handleCookieModal}
								/>
							</div>
							<div className='custom-rich-text w-full px-4 lg:px-12 pb-12'>
								<Heading
									tag='h1'
									variant='headline'
									classes='mb-16 mt-24 lg:mt-16'>
									{cookiesData.title}
								</Heading>
								<PortableText value={cookiesData.content} />
							</div>
						</div>
					</div>
				</>
			)
		)
	}
}
