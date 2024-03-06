interface WorkPage {
	title: string
}

interface WorkPageCollection {
	items: WorkPage[]
}

interface Project {
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

interface ProjectCollection {
	items: Project[]
}

interface Release {
	title: string
	text: string
}

interface ReleasesCollection {
	items: Release[]
}

interface AboutPage {
	title: string
	text: string
}

interface AboutPageCollection {
	items: AboutPage[]
}

interface ContactPage {
	title: string
	availability: string
}

interface ContactPageCollection {
	items: ContactPage[]
}

interface SocialLink {
	label: string
	url: string
}

interface SocialLinkCollection {
	items: SocialLink[]
}

export interface AllData {
	workPageCollection: WorkPageCollection
	projectCollection: ProjectCollection
	releasesCollection: ReleasesCollection
	aboutPageCollection: AboutPageCollection
	contactPageCollection: ContactPageCollection
	socialLinkCollection: SocialLinkCollection
}
