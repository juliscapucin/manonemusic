import { Rule } from "sanity"

const filmSchema = {
	name: "film",
	title: "Films",
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
			name: "filmInfo",
			title: "Film Info",
			type: "object",
			fields: [
				{
					name: "genre",
					title: "Genre",
					type: "string",
				},
				{
					name: "duration",
					title: "Duration",
					type: "string",
					description: "Duration of the movie in MMm format (ex: 150m)",
				},
				{
					name: "releaseDate",
					title: "Release Date",
					type: "date",
					options: {
						dateFormat: "YYYY-MM-DD",
						calendarTodayLabel: "Today",
					},
				},
				{
					name: "director",
					title: "Director",
					type: "string",
				},
				{
					name: "writer",
					title: "Writer",
					type: "string",
				},
				{
					name: "music",
					title: "Music",
					type: "string",
				},
			],
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
		{ name: "description", title: "Description", type: "text" },
		{ name: "trailerUrl", title: "Trailer URL", type: "url" },
		{ name: "link", title: "Link", type: "string" },
	],
	orderings: [
		{
			title: "Release Date, New",
			name: "releaseDateDesc",
			by: [{ field: "releaseDate", direction: "desc" }],
		},
	],
}

export default filmSchema
