import { Rule } from "sanity"

const contactPageSchema = {
	name: "contactPage",
	title: "Contact Page",
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
			title: "Subtitle",
			type: "string",
		},
		{
			name: "email",
			title: "email",
			type: "string",
			validation: (Rule: Rule) => Rule.required().error("Email is required"),
		},
		{
			name: "socials",
			title: "Socials",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "platform",
							title: "Platform",
							type: "string",
						},
						{
							name: "link",
							title: "Link",
							type: "url",
						},
					],
				},
			],
		},
		{
			name: "love",
			title: "Love",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "platform",
							title: "Platform",
							type: "string",
						},
						{
							name: "link",
							title: "Link",
							type: "url",
						},
					],
				},
			],
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

export default contactPageSchema
