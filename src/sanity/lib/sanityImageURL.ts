// Builds image URLs from Sanity assets

import { createClient } from "next-sanity"
import createImageUrlBuilder from "@sanity/image-url"

const config = {
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // find this in sanity.json or sanity.config.ts
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	useCdn: true,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!, // use the current date
}

export const sanityClient = createClient(config)

const builder = createImageUrlBuilder(config)

export function urlFor(source: any) {
	return builder.image(source)
}
