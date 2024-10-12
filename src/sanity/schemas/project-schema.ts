import { Rule } from "sanity"

const projectSchema = {
	name: "project",
	title: "Projects",
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
			title: "Release Date (required, used for News page ordering)",
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
			name: "projectInfo",
			title: "Project Info",
			type: "string",
		},
		{
			name: "projectLink",
			title: "Project Link",
			type: "url",
		},
		{
			name: "projectVideo",
			title: "Project Video",
			type: "url",
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

export default projectSchema
