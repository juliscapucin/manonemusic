/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.ctfassets.net", port: "" },
			{ protocol: "https", hostname: "cdn.sanity.io", port: "" },
		],
	},
}

module.exports = nextConfig
