import ButtonArrow from "./buttonArrow"

interface ButtonsCarousel {
	tl: gsap.core.Timeline
}

const timingSettings = { duration: 0.3, ease: "power1.inOut" }

export default function ButtonsCarousel({ tl }: ButtonsCarousel) {
	return (
		<div className='mt-12 w-full flex flex-row justify-center gap-8'>
			<ButtonArrow
				onClick={() => tl.previous(timingSettings)}
				classes='rotate-180'
			/>
			<ButtonArrow onClick={() => tl.next(timingSettings)} classes='rotate-0' />
		</div>
	)
}
