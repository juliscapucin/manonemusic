"use client"

import { usePathname, useRouter } from "next/navigation"
import Logo from "./logo"

type HeaderProps = {
	handlePanelSlide?: (index: number, pushSlug: boolean) => void
}

export default function Header({ handlePanelSlide }: HeaderProps) {
	const pathname = usePathname()
	const router = useRouter()

	return (
		<button
			className={`fixed top-0 left-0 w-screen transition-transform duration-500 origin-top z-100 ${
				pathname === "/" ? "" : "scale-20"
			}`}
			onClick={() =>
				handlePanelSlide ? handlePanelSlide(0, true) : router.push("/")
			}
		>
			<Logo />
		</button>
	)
}
