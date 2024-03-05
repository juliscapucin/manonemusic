import { usePathname } from "next/navigation"

type LogoProps = {
	handleSlide: (index: number, pushSlug: boolean) => void
}

export default function Logo({ handleSlide }: LogoProps) {
	const pathname = usePathname()

	return (
		<button
			className={`fixed top-0 left-0 w-screen transition-transform duration-500 origin-top z-100 ${
				pathname === "/" ? "" : "scale-20"
			}`}
			onClick={() => handleSlide(0, true)}
		>
			<h1 className={`logo font-medium text-center leading-none`}>
				MAN/ONE MUSIC
			</h1>
		</button>
	)
}
