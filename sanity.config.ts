import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { media } from "sanity-plugin-media"

import schemas from "@/sanity/schemas"

export default defineConfig({
	title: "ManOne Music",
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	basePath: "/admin",
	plugins: [structureTool(), media()],
	schema: { types: schemas },
})
