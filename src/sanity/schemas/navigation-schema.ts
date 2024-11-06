import { Rule } from "sanity"

const navigationSchema = {
	name: "navigation",
	title: "----------- Navigation -----------",
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

export default navigationSchema
