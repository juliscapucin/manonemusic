import { Rule } from "sanity"

const aboutPageSchema = {
	name: "aboutPage",
	title: "About Page",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title (required)",
			type: "string",
			validation: (Rule: Rule) => Rule.required().error("Title is required"),
		},
		{
			name: "subtitle",
			title: "Subtitle",
			type: "string",
		},
		{
			name: "image",
			type: "object",
			title: "Image (required)",
			fields: [
				{
					name: "image",
					title: "Image",
					type: "image",
					validation: (Rule: Rule) =>
						Rule.required().error("Image file is required"),
				},
				{
					name: "imageAlt",
					title: "Image Alt Text",
					type: "string",
					validation: (Rule: Rule) =>
						Rule.required().error("Image Alt Text is required"),
				},
			],
			validation: (Rule: Rule) => Rule.required().error("Image is required"),
		},
		{
			name: "content",
			title: "Content (required)",
			type: "array",
			of: [{ type: "block" }],
			validation: (Rule: Rule) => Rule.required().error("Content is required"),
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

export default aboutPageSchema
