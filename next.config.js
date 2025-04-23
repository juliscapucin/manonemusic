/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./src/lib/sanityImageLoader.ts",
		deviceSizes: [480, 768, 1024], // 3 responsive breakpoints
		imageSizes: [], // don't need extra fixed sizes
		remotePatterns: [
			{ protocol: "https", hostname: "cdn.sanity.io", port: "" },
		],
	},
}

module.exports = nextConfig
