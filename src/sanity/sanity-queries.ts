import { createClient, groq } from "next-sanity"
import clientConfig from "@/sanity/config/client-config"
import type { AboutPage, NavLink, Project } from "@/types"

const client = createClient(clientConfig)

export async function getShowreel(): Promise<any> {
	return client.fetch(groq`*[title == "Showreel Home"][0].images`)
}

export async function getProjects(): Promise<Project[]> {
	return client.fetch(
		groq`*[_type == "project"] | order(releaseDate desc){
      _id,
      "slug": slug.current,
      artist,
      artistSection,
      title,
      projectInfo,
      releaseDate,
      images,
      isNews,
      newsPageSize,
      addSpaceBefore,
      addSpaceAfter
   }`
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

export async function getHeaderNavLinks(): Promise<NavLink[]> {
	return client.fetch(
		groq`*[_type == "header"]|order(order) {
         title,
         "slug": slug.current,
         order
       }`
	)
}
