import { Album } from "@/types/Album"
import { Project } from "@/types/Project"
import { AboutPage } from "./About"

interface WorkPage {
	title: string
}

interface WorkPageCollection {
	items: WorkPage[]
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

interface AlbumCollection {
	items: Album[]
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
	albumCollection: AlbumCollection
	aboutPageCollection: AboutPageCollection
	contactPageCollection: ContactPageCollection
	socialLinkCollection: SocialLinkCollection
}
