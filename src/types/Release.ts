import { ImageField } from "./Image"

type Track = {
	trackname: string
	link: string
}

export type Release = {
	title: string
	slug: {
		_type: string
		current: string
	}
	image: ImageField
	releaseDate: string
	releaseInfo?: string
	tracklist: Track[]
}
