import { Rule } from "sanity"

const releaseSchema = {
	name: "release",
	title: "Releases",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title (required)",
			type: "string",
			validation: (Rule: Rule) => Rule.required().error("Title is required"),
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
			title: "Image (required)",
			type: "image",
			validation: (Rule: Rule) => Rule.required().error("Image is required"),
		},
		{
			name: "releaseDate",
			title: "Release Date (required)",
			type: "date",
			validation: (Rule: Rule) =>
				Rule.required().error("Release Date is required"),
		},
		{
			name: "releaseInfo",
			title: "Release Info",
			type: "string",
		},
		{
			name: "tracklist",
			title: "Tracklist (required)",
			type: "array",
			of: [
				{
					type: "object",
					title: "Track",
					fields: [
						{
							name: "trackname",
							title: "Track Name",
							type: "string",
							validation: (Rule: Rule) =>
								Rule.required().error("Track name is required"),
						},
						{
							name: "link",
							title: "Track Link",
							type: "string",
							validation: (Rule: Rule) =>
								Rule.required().error("Track link is required"),
						},
					],
				},
			],
			validation: (Rule: Rule) =>
				Rule.required().error("Tracklist is required"),
		},
	],
	orderings: [
		{
			title: "Release Date, New",
			name: "releaseDateDesc",
			by: [{ field: "releaseDate", direction: "desc" }],
		},
	],
}

export default releaseSchema
