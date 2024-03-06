export type Project = {
	title: string
	slug: string
	text: string
	coverImage: {
		url: string
		title: string
		description: string
		width: number
		height: number
	}
	videoUrl: string
	credits: string[]
	imdbLink: string
}
