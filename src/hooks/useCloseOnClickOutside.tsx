import { useEffect } from "react"

export default function useCloseOnClickOutside(
	container: HTMLElement | null,
	handleFunction: () => void
) {
	useEffect(() => {
		if (!container) return
		console.log("container")

		function handleClickOutside(e: MouseEvent) {
			console.log("click outside")
			if (!container!.contains(e.target as Node)) handleFunction()
		}

		document.removeEventListener("click", handleClickOutside)

		return () => {
			document.removeEventListener("click", handleClickOutside)
		}
	}, [container])
}
