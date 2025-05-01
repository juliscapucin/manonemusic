import ButtonArrow from "./buttonArrow"

interface ButtonsCarouselProps {
	tl: gsap.core.Timeline
}

const timingSettings = { duration: 0.3, ease: "power1.inOut" }

export default function ButtonsCarousel({ tl }: ButtonsCarouselProps) {
	const roundedButtonClasses = "rounded-full p-2 border border-secondary"

	return (
		<div className='mt-6 w-full flex flex-row justify-center gap-8'>
			<div className=''>
				<ButtonArrow
					isShort={true}
					onClick={() => tl.previous(timingSettings)}
					classes={`rotate-180 ${roundedButtonClasses}`}
				/>
			</div>
			<ButtonArrow
				isShort={true}
				onClick={() => tl.next(timingSettings)}
				classes={`rotate-0 ${roundedButtonClasses}`}
			/>
		</div>
	)
}
