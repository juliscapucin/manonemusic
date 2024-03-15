import { useEffect } from "react"

// TODO - try to implement this functionality for accessibility
type FocusHandler = {
	button: HTMLButtonElement
	handleFocus: () => void
}

export default function useScrollIntoView() {
	useEffect(() => {
		const buttons = document.querySelectorAll("button")

		// Create an array to keep track of each button's unique focus handler
		const focusHandlers: FocusHandler[] = []

		buttons.forEach((button) => {
			const handleFocus = () => {
				button.scrollIntoView({ behavior: "smooth" })
			}

			// Add the focus handler to the array
			focusHandlers.push({ button, handleFocus })

			button.addEventListener("focus", handleFocus)
		})

		// Cleanup function to remove event listeners
		return () => {
			focusHandlers.forEach(({ button, handleFocus }) => {
				button.removeEventListener("focus", handleFocus)
			})
		}
	}, [])
}
