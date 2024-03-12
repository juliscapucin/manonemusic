export type Album = {
	title: string
	slug: string
	coverImage: {
		url: string
		width: number
		height: number
	}
	tracksCollection: {
		items: {
			title: string
		}[]
	}
}
