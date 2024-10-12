import { ImageField } from "./Image"

export type Commercial = {
	title: string
	releaseDate: string
	slug: {
		_type: string
		current: string
	}
	image: ImageField
	commercialInfo?: string
	description?: string
}
