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
			name: "commercialDate",
			title: "Commercial Date (required, used for News page ordering)",
			type: "date",
			validation: (Rule: Rule) =>
				Rule.required().error("Commercial Date is required"),
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
			name: "commercialInfo",
			title: "Commercial Info",
			type: "string",
		},
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
