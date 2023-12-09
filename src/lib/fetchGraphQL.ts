export default async function fetchGraphQL(query: string, collection: string) {
	const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
	const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
	const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}?acces_token=${ACCESS_TOKEN}`

	return fetch(CONTENTFUL_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${ACCESS_TOKEN}`,
		},
		body: JSON.stringify({ query }),
	})
		.then((response) => response.json())
		.then((json) => json.data[collection].items[0])
}
