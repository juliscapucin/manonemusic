import { createClient, groq } from "next-sanity"
import clientConfig from "@/sanity/config/client-config"
import type { AboutPage, ContactPage, NavLink, Project } from "@/types"

const client = createClient(clientConfig)

export async function getShowreel(): Promise<any> {
	return client.fetch(groq`*[title == "Showreel Home"][0].images`)
}

export async function getProjectItems(project: string): Promise<Project[]> {
	return client.fetch(
		groq`*[name == $project] | order(releaseDate desc){
      _id,
      "slug": slug.current,
      title,
      image,
   }`,
		{ project }
	)
}

export async function getProject(slug: string): Promise<Project> {
	return client.fetch(
		groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      "slug": slug.current,
      title,
      artist,
      projectInfo,
      releaseDate,
      images,
      isNews
   }`,
		{ slug }
	)
}

export async function getAboutPage(): Promise<AboutPage> {
	return client.fetch(
		groq`*[_type == "aboutPage"][0] {
      title,
      metadataTitle,
      metadataDescription,
      metadataKeywords,
      "headerLink": header->slug.current,
      content,
      contactAbout[]{
         name,
         email,
         phone
      },
   }`
	)
}

export async function getContactPage(): Promise<ContactPage> {
	return client.fetch(
		groq`*[_type == "contactPage"][0] {
      title,
      email,
      socials,
      love,
      metadataTitle,
      metadataDescription,
      metadataKeywords,
   }`
	)
}

export async function getPortfolioPages(): Promise<ContactPage> {
	return client.fetch(
		groq`*[_type == "portfolioPage"][0] {
      title,
      email,
      socials,
      love,
      metadataTitle,
      metadataDescription,
      metadataKeywords,
   }`
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
