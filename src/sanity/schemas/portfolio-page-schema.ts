import { Rule } from "sanity"

const portfolioPageSchema = {
	name: "portfolioPage",
	title: "Portfolio Pages",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule: Rule) => Rule.required().error("Title is required"),
		},
		{
			name: "subtitle",
			title: "Subtitle (required)",
			type: "text",
			validation: (Rule: Rule) => Rule.required().error("Subtitle is required"),
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule: Rule) => Rule.required().error("Slug is required"),
		},
		{ name: "metadataTitle", title: "Metadata Title", type: "string" },
		{
			name: "metadataDescription",
			title: "Metadata Description",
			type: "string",
		},
		{
			name: "metadataKeywords",
			title: "Metadata Keywords",
			type: "array",
			of: [{ type: "string" }],
		},
	],
}

export default portfolioPageSchema
