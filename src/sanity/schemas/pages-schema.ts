import { Rule } from "sanity"

const pagesSchema = {
	name: "pages",
	title: "----------- Pages -----------",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title (required)",
			type: "string",
			validation: (Rule: Rule) => Rule.required().error("Title is required"),
		},
	],
}

export default pagesSchema
