// Docs: https://www.sanity.io/docs/image-urls

export default function sanityImageLoader({
	src,
	width,
	quality,
}: {
	src: string
	width: number
	quality?: number
}): string {
	const url = new URL(src)

	url.searchParams.set("w", width.toString())
	url.searchParams.set("auto", "format")
	url.searchParams.set("fit", "crop")
	url.searchParams.set("q", (quality || 75).toString())

	return url.toString()
}
