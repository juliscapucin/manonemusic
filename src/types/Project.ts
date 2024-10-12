import { ImageField } from "./Image"

export type Project = {
	title: string
	releaseDate: string
	slug: {
		_type: string
		current: string
	}
	image: ImageField
	projectLink?: string
	projectVideo?: string
	projectInfo?: string
}
