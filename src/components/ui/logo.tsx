import { usePathname, useRouter } from "next/navigation"

import { usePageContext } from "@/context"

type LogoProps = {
	handlePanelSlide?: (index: number, pushSlug: boolean) => void
}

export default function Logo({ handlePanelSlide }: LogoProps) {
	const { transitionOnClick } = usePageContext()
	const pathname = usePathname()
	const router = useRouter()

	return (
		<button
			className={`fixed top-0 left-0 w-screen transition-transform duration-500 origin-top z-100 ${
				pathname === "/" ? "" : "scale-20"
			}`}
			onClick={() =>
				handlePanelSlide ? handlePanelSlide(0, true) : transitionOnClick("/")
			}
		>
			<h1 className={`logo font-medium text-center leading-none`}>
				MAN/ONE MUSIC
			</h1>
		</button>
	)
}
