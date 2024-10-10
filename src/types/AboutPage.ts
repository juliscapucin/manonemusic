import { BlockContent } from "./BlockContent"

export type AboutPage = {
	title: string
	subtitle: string
	content: BlockContent[]
	metadataTitle?: string
	metadataDescription?: string
	metadataKeywords?: string[]
}
