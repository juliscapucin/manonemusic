import { usePathname, useRouter } from "next/navigation"

type LogoProps = {
	handlePanelSlide?: (index: number, pushSlug: boolean) => void
}

export default function Logo({ handlePanelSlide }: LogoProps) {
	const pathname = usePathname()
	const router = useRouter()

	const handleLogoClick = () => {
		router.push("/")
	}

	return (
		<button
			className={`fixed top-0 left-0 w-screen transition-transform duration-500 origin-top z-100 ${
				pathname === "/" ? "" : "scale-20"
			}`}
			onClick={() =>
				handlePanelSlide ? handlePanelSlide(0, true) : handleLogoClick()
			}
		>
			<h1 className={`logo font-medium text-center leading-none`}>
				MAN/ONE MUSIC
			</h1>
		</button>
	)
}
