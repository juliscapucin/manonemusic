import { ImageField } from "./Image"

type FilmInfo = {
	genre?: string
	duration?: string
	releaseDate?: string
	director?: string
	writer?: string
	music?: string
}

export type Film = {
	title: string
	slug: {
		_type: string
		current: string
	}
	filmInfo?: FilmInfo
	image: ImageField
	description?: string
	trailerUrl?: string
	link?: string
}
