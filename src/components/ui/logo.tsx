type LogoProps = {
	isHome: boolean
	handleSlide: (index: number, isHome: boolean) => void
}

export default function Logo({ isHome, handleSlide }: LogoProps) {
	return (
		<button
			className={`fixed top-0 left-0 w-screen transition-transform duration-500 origin-top z-100 ${
				isHome ? "" : "scale-20"
			}`}
			onClick={() => handleSlide(0, true)}
		>
			<h1 className={`logo font-medium text-center leading-none`}>
				MAN/ONE MUSIC
			</h1>
		</button>
	)
}
