import { defineType } from "sanity"

const cookiesSchema = defineType({
	name: "cookies",
	title: "Cookies",
	type: "document",
	fields: [
		{ name: "title", title: "Title", type: "string" },
		{ name: "metadataTitle", title: "Metadata Title", type: "string" },
		{
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		},
	],
})

export default cookiesSchema
