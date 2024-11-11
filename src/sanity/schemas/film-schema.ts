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
			name: "releaseDate",
			title: "Release Date",
			type: "date",
			options: {
				dateFormat: "YYYY-MM-DD",
				calendarTodayLabel: "Today",
			},
			validation: (Rule: Rule) =>
				Rule.required().error("Release Date is required"),
		},
		{
			name: "info",
			title: "Info",
			type: "string",
			description: "Director: John Doe, Producer: Jane Doe, Duration: 1h 30m",
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
			name: "description",
			title: "Description",
			type: "text",
			description: "Describe the project in a couple of paragraphs",
		},
		{
			name: "projectVideo",
			title: "Project Video",
			type: "url",
			description: "Vimeo link",
		},
		{
			name: "projectLink",
			title: "Project Link",
			type: "url",
			description: "IMDB link",
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

export default filmSchema
