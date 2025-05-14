"use client"

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

import schemas from "@/sanity/schemas"
import deskStructure from "@/sanity/config/desk-structure"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
	title: "ManOne Music",
	projectId,
	dataset,
	basePath: "/admin",
	plugins: [structureTool({ structure: deskStructure })],
	schema: { types: schemas },
})
