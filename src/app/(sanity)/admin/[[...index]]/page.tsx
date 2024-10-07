"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/../sanity.config"

export const dynamic = "force-static"

export { viewport } from "next-sanity/studio"

export default function AdminPage() {
	return <NextStudio config={config} />
}
