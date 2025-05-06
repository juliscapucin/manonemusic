import type { JSX } from "react"
type HeadingProps = {
	tag: string
	classes?: string
	children: string
	variant: "display" | "headline" | "title"
}

export default function Heading({
	tag,
	classes,
	children,
	variant,
}: HeadingProps) {
	const Tag = tag as keyof JSX.IntrinsicElements
	let headingStyles = ""

	switch (variant) {
		case "display":
			headingStyles =
				"text-displaySmall md:text-displayMedium lg:text-displayLarge font-medium uppercase"
			break
		case "headline":
			headingStyles =
				"text-headlineSmall md:text-headlineMedium lg:text-headlineLarge font-medium uppercase"
			break
		case "title":
			headingStyles =
				"text-titleSmall md:text-titleMedium lg:text-titleLarge uppercase"
			break
		default:
			headingStyles =
				"text-displaySmall md:text-displayMedium lg:text-displayLarge uppercase"
			break
	}

	return (
		<Tag
			className={`${
				classes ? classes : ""
			} ${headingStyles} leading-none tracking-tight font-extralight`}>
			{children}
		</Tag>
	)
}
