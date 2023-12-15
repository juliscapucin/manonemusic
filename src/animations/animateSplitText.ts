import gsap from "gsap"
import { SplitText } from "gsap/dist/SplitText"

gsap.registerPlugin(SplitText)

export const animateSplitText = (
	textElement: HTMLElement,
	xTranslate?: number,
	delay?: number
) => {
	if (!textElement) return
	const split = new SplitText(textElement, { type: "chars" })

	const tl = gsap.timeline()

	gsap.set(split.chars, {
		xPercent: (index) => (xTranslate ? xTranslate * (index + 1) : 100),
		opacity: 0,
	})

	return tl.fromTo(
		split.chars,
		{
			xPercent: (index) => (xTranslate ? xTranslate * (index + 1) : 100),
			opacity: 1,
		},
		{
			opacity: 1,
			xPercent: 0,
			duration: 0.5,
			delay: delay || 0.5,
			stagger: 0.05,
			ease: "expo.out",
		}
	)
}
