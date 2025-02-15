import gsap from "gsap"
import { CustomEase } from "gsap/dist/CustomEase"
import { SplitText } from "gsap/dist/SplitText"

gsap.registerPlugin(SplitText, CustomEase)

export const animateCardLabel = (textElement: HTMLElement) => {
	if (!textElement) return
	const split = new SplitText(textElement, { type: "chars" })

	const tl = gsap.timeline()

	gsap.set(split.chars, {
		opacity: 0,
		backgroundColor: "rgba(var(--color-primary-rgb), 1)",
	})

	return tl.fromTo(
		split.chars,
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 0.1,
			stagger: 0.05,
		}
	)
}
