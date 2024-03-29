"use client"

import { useEffect, MouseEvent, useState, use } from "react"

// import { ButtonArrow } from "@buttons/."
import { useThemeStorage } from "@/hooks"
// import { IconChevron } from "@icons/."

const themes = [
	{ theme: "light", color: "bg-colorWhite" },
	{ theme: "dark", color: "bg-colorBlack" },
	{ theme: "green", color: "bg-colorGreen" },
]

interface Props {
	variant: "body" | "header"
}

export default function ThemeSwitcher({ variant }: Props) {
	const { theme, setTheme } = useThemeStorage()
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		if (theme && theme.length === 0) {
			setTheme("dark")
		}
	}, [])

	const handleThemeChange = (
		e: MouseEvent<HTMLButtonElement>,
		color: string
	) => {
		setTheme(color)
		toggleMenu()
		e.currentTarget.classList.add("active")
	}

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	//  Apply theme on theme change
	useEffect(() => {
		const documentDiv = document.querySelector("html")
		documentDiv?.setAttribute("data-theme", theme ? theme : "dark")
	}, [theme])

	return (
		<>
			{variant === "body" && (
				<div className='theme-switcher mt-4 lg:mt-8 flex flex-col items-center'>
					<span className='mb-2 lg:mb-4'>Theme</span>
					<div className='flex flex-col gap-2'>
						{themes.map((item) => {
							return (
								<div className='flex gap-2 items-center' key={item.theme}>
									<div
										className={`arrow w-8 fill-secondary transition-opacity ${
											theme !== item.theme && "opacity-0"
										}`}
									>
										{/* <ButtonArrow /> */}
									</div>
									<button
										type='button'
										className={`${item.color} ${
											item.theme === theme && "active"
										} border border-faded-30 w-8 lg:w-10 h-8 lg:h-10`}
										onClick={(e) => handleThemeChange(e, item.theme)}
									></button>
								</div>
							)
						})}
					</div>
				</div>
			)}
			{variant === "header" && (
				<div
					className={`theme-switcher flex items-end h-full pb-[6px] transition-transform duration-200 ${
						!menuOpen && "translate-x-[120px]"
					}`}
				>
					{/* Open Theme Menu */}
					<button
						className='flex gap-2 h-full items-end mr-4'
						onClick={toggleMenu}
					>
						<span
							className={`mr-4 transition-transform duration-200 ${
								menuOpen && "translate-x-[38px]"
							}`}
						>
							Theme
						</span>
						{/* Active State */}
						<div
							className={`w-6 h-6 border border-secondary mb-2 ${
								menuOpen && "opacity-0"
							}
       }`}
						></div>
						{/* Chevron */}
						<div className='mb-2'>{/* <IconChevron /> */}</div>
					</button>
					<div className='flex gap-4'>
						{/* Themes buttons */}
						{themes.map((item) => {
							return (
								<div className='relative' key={item.theme}>
									<button
										type='button'
										className={`${item.color} ${
											item.theme === theme && "active"
										} border border-faded-30 w-6 h-6 hover:scale-125 transition-transform duration-200`}
										onClick={(e) => handleThemeChange(e, item.theme)}
									></button>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</>
	)
}
