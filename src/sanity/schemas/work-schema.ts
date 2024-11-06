import { Rule } from "sanity"

const workSchema = {
	name: "work",
	title: "----------- Portfolio Items -----------",
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

export default workSchema
