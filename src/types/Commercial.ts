import { ImageField } from "./Image"

export type Commercial = {
	title: string
	slug: {
		_type: string
		current: string
	}
	image: ImageField
	releaseDate: string
	info?: string
	description?: string
}
