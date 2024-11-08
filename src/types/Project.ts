import { ImageField } from "./Image"
import { Track } from "./Track"

export type Project = {
	title: string
	slug: {
		_type: string
		current: string
	}
	releaseDate: string
	info?: string
	image: ImageField
	description?: string
	projectLink?: string
	projectVideo?: string
	tracklist?: Track[]
}
