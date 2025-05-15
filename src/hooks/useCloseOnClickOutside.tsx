import { useEffect } from "react"

export default function useCloseOnClickOutside(
	refContainer: React.RefObject<HTMLDivElement | null>,
	handleFunction: () => void,
	isModalOpen: boolean
) {
	useEffect(() => {
		if (!refContainer.current || !isModalOpen) return

		function handleClickOutside(e: MouseEvent) {
			if (isModalOpen && !refContainer.current!.contains(e.target as Node)) {
				handleFunction()
			}
		}

		window.addEventListener("click", handleClickOutside)

		return () => {
			window.removeEventListener("click", handleClickOutside)
		}
	}, [handleFunction, isModalOpen])
}
