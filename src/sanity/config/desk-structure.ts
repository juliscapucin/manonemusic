import { StructureBuilder } from "sanity/structure"

const deskStructure = (S: StructureBuilder) =>
	S.list()
		.title("Content")
		.items([
			// 🔹 Pages group
			S.listItem()
				.title("Pages")
				.child(
					S.list()
						.title("Pages")
						.items([
							S.listItem()
								.title("Home")
								.child(
									S.editor()
										.schemaType("homePage")
										.documentId("homePage")
										.views([S.view.form()])
								),

							S.listItem()
								.title("About")
								.child(
									S.editor()
										.schemaType("aboutPage")
										.documentId("aboutPage")
										.views([S.view.form()])
								),

							S.listItem()
								.title("Contact")
								.child(
									S.editor()
										.schemaType("contactPage")
										.documentId("contactPage")
										.views([S.view.form()])
								),

							S.listItem()
								.title("Cookies")
								.child(
									S.editor()
										.schemaType("cookies")
										.documentId("cookiesSingleton")
										.views([S.view.form()])
								),
						])
				),

			// 🔹 Portfolio pages group
			S.listItem()
				.title("Portfolio Pages")
				.schemaType("portfolioPage")
				.child(S.documentTypeList("portfolioPage").title("Portfolio Pages")),

			// 🔹 Work group
			S.listItem()
				.title("Portfolio Projects")
				.child(
					S.list()
						.title("Work")
						.items([
							S.documentTypeListItem("film").title("Film"),
							S.documentTypeListItem("commercial").title("Commercial"),
							S.documentTypeListItem("release").title("Releases"),
							S.documentTypeListItem("project").title("Projects"),
						])
				),

			// 🔹 Navigation group
			S.listItem()
				.title("Navigation")
				.child(
					S.list()
						.title("Work")
						.items([S.documentTypeListItem("header").title("Header Links")])
				),
		])

export default deskStructure
