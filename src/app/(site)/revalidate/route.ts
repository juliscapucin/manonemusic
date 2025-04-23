import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
	const secret = req.nextUrl.searchParams.get("secret")

	// SECURITY CHECK
	if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 })
	}

	try {
		const body = await req.json()

		// const typeToSection: Record<string, string> = {
		// 	film: "film",
		// 	project: "project",
		// 	release: "release",
		// 	commercial: "commercial",
		// }

		// const docType = body?._type
		// const slug = body?.slug?.current
		// const section = typeToSection[docType]

		// if (section && slug) {
		// 	await revalidatePath(`/${section}/${slug}`)
		// } else {
		// 	await revalidatePath("/")
		// }

		await Promise.all([
			revalidatePath("/"),
			revalidatePath("/film"),
			revalidatePath("/project"),
			revalidatePath("/release"),
			revalidatePath("/commercial"),
		])

		return NextResponse.json({ revalidated: true })
	} catch (err) {
		console.error("Error revalidating:", err)
		return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
	}
}
