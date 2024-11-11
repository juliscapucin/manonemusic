import gsap from "gsap"

import { CustomEase } from "gsap/all"
import { useEffect } from "react"
export default function useCustomEase() {
	useEffect(() => {
		gsap.registerPlugin(CustomEase)

		CustomEase.create("testEase", ".17,.67,.83,.67")
		CustomEase.create(
			"testEase2",
			"M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"
		)
		CustomEase.create(
			"hop",
			"M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0"
		)

		CustomEase.create(
			"hohoho",
			"M0,0 C0.11,0.494 0.368,-0.002 0.494,0.123 0.626,0.255 0.504,1 1,1"
		)
	}, [])
}
