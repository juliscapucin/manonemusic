export const queryAll = `
	query {
		projectsPageCollection {
			items {
			  title
			}
		 }
		 projectCollection {
			items {
			  title
			  slug
			  text
			  coverImage {
				 url
				 title
				 description
				 width
				 height
			  }
			  gridPosition
			}
		 }
		releasesCollection {
			items {
				title
				text
			}
		}
		albumCollection {
			items {
				title
				slug
				coverImage {
					url
					width
					height
				}
			}
		}
		aboutPageCollection {
			items {
				title
				text
			}
		}
		contactPageCollection {
			items {
				title
				availability
			}
			}
			socialLinkCollection{
			items {
				label
				url
			}
		}
	}
`

export const queryProject = `
query GetProjectBySlug($slug: String!) {
	projectCollection(where: {slug: $slug}, limit: 1) {
	  items {
		 title
		 text
		 slug
		 coverImage {
			url
			title
			description
			width
			height
		 }
		 videoUrl
		 credits
		 imdbLink
	  }
	}
 }
`

export const queryAlbum = `
query { 
	albumCollection {
		items {
			title
			slug
			coverImage {
				url
				width
				height
			}
		}
	}
}`
