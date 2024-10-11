import { BlockContent } from "./BlockContent"
import { ImageField } from "./Image"

export type AboutPage = {
	title: string
	subtitle: string
	image: ImageField
	content: BlockContent[]
	metadataTitle?: string
	metadataDescription?: string
	metadataKeywords?: string[]
}
