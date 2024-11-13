import { createClient, groq } from "next-sanity"
import clientConfig from "@/sanity/config/client-config"
import type {
	AboutPage,
	ContactPage,
	HomePage,
	NavLink,
	PortfolioPage,
	Project,
	Release,
} from "@/types"
import { PortfolioItem } from "@/types/PortfolioItem"

const client = createClient(clientConfig)

export async function getHomePage(): Promise<HomePage> {
	return client.fetch(
		groq`*[_type == "aboutPage"][0] {
      title,
      content,
      metadataTitle,
      metadataDescription,
      metadataKeywords,
   }`
	)
}

export async function getAboutPage(): Promise<AboutPage> {
	return client.fetch(
		groq`*[_type == "aboutPage"][0] {
      title,
      subtitle,
      "image": {
         "imageUrl": image.image.asset->url,
         "imageAlt": image.imageAlt
      },      
      content,
      metadataTitle,
      metadataDescription,
      metadataKeywords,
   }`
	)
}

export async function getContactPage(): Promise<ContactPage> {
	return client.fetch(
		groq`*[_type == "contactPage"][0] {
      title,
      subtitle,
      email,
      socials,
      love,
      metadataTitle,
      metadataDescription,
      metadataKeywords,
   }`
	)
}

export async function getPortfolioSections(): Promise<PortfolioPage[]> {
	return client.fetch(
		groq`*[_type == "portfolioPage"] {
      title,
      "slug": slug.current,
      subtitle,
      metadataTitle,
      metadataDescription,
      metadataKeywords,
   }`
	)
}

export async function getPortfolioPage(
	section: string
): Promise<PortfolioPage> {
	return client.fetch(
		groq`*[_type == "portfolioPage" && slug.current == $section] | order(releaseDate desc)[0]{
      title,
      subtitle,
      "slug": slug.current
   }`,
		{ section }
	)
}

export async function getPortfolioItems(
	section: string
): Promise<PortfolioItem[]> {
	return client.fetch(
		groq`*[_type == $section] | order(releaseDate desc){
      _id,
      "slug": slug.current,
      "image": {
         "imageUrl": image.image.asset->url,
         "imageAlt": image.imageAlt,
         "imageWidth": image.image.asset->metadata.dimensions.width,
         "imageHeight": image.image.asset->metadata.dimensions.height
         },
      title,
   }`,
		{ section }
	)
}

export async function getProject(
	section: string,
	slug: string
): Promise<Project> {
	return client.fetch(
		groq`*[_type == $section && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      releaseDate,
      "image": {
         "imageUrl": image.image.asset->url,
         "imageAlt": image.imageAlt
         },
      info,
      description,
      projectLink,
      releaseLink,
      projectVideo,
      tracklist[]{
         trackname,
         link
         }
      }`,
		{ slug, section }
	)
}

export async function getHeaderNavLinks(): Promise<NavLink[]> {
	return client.fetch(
		groq`*[_type == "header"]|order(order asc) {
         title,
         "slug": slug.current,
         order
       }`
	)
}
