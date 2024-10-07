const contactPageSchema = {
	name: "contactPage",
	title: "Contact Page",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
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
		{
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
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
	],
}

export default contactPageSchema
