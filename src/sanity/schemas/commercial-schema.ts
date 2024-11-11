import { Rule } from "sanity"

const commercialSchema = {
	name: "commercial",
	title: "Commercials",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title (required)",
			type: "string",
			validation: (Rule: Rule) => Rule.required().error("Title is required"),
		},
		{
			name: "releaseDate",
			title: "Release Date",
			type: "date",
			validation: (Rule: Rule) =>
				Rule.required().error("Release Date is required"),
		},
		{
			name: "slug",
			title: "Slug (required)",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule: Rule) => Rule.required().error("Slug is required"),
		},
		{
			name: "image",
			type: "object",
			title: "Image",
			fields: [
				{
					name: "image",
					title: "Image",
					type: "image",
					validation: (Rule: Rule) =>
						Rule.required().error("Image is required"),
				},
				{
					name: "imageAlt",
					title: "Image Alt Text",
					type: "string",
					validation: (Rule: Rule) =>
						Rule.required().error("Image Alt Text is required"),
				},
			],
		},
		{
			name: "info",
			title: "Info",
			type: "string",
		},
		{ name: "description", title: "Description", type: "text" },
		{ name: "projectVideo", title: "Project Video", type: "url" },
		{ name: "projectLink", title: "Project Link", type: "url" },
	],
	orderings: [
		{
			title: "Commercial Date, New",
			name: "commercialDateDesc",
			by: [{ field: "commercialDate", direction: "desc" }],
		},
	],
}

export default commercialSchema
