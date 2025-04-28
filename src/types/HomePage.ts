import { BlockContent } from "./BlockContent"

export type HomePage = {
	title: string
	subtitle: string
	content: BlockContent[]
	metadataTitle?: string
	metadataDescription?: string
	metadataKeywords?: string[]
	tween: gsap.core.Tween
}
