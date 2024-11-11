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
			name: "releaseDate",
			title: "Release Date",
			type: "date",
			options: {
				dateFormat: "MM/YYYY",
			},
			validation: (Rule: Rule) =>
				Rule.required().error("Release Date is required"),
		},
		{
			name: "info",
			title: "Info",
			type: "string",
			description: "(Ex: 'Purple Sun Records')",
			rows: 1,
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
		{
			name: "releaseLink",
			title: "Release Link",
			type: "url",
			description: "(Link to album on Spotify)",
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
