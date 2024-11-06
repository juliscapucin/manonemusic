export type ContactPage = {
	title: string
	email: string
	socials: [
		{
			platform: string
			link: string
		},
	]
	love: [
		{
			platform: string
			link: string
		},
	]
	metadataTitle: string
	metadataDescription: string
	metadataKeywords: string[]
}
