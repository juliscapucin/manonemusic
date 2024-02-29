type HeadingProps = {
	tag: string
	styles?: string
	children: string
	variant: "display" | "headline" | "title"
}

export default function Heading({
	tag,
	styles,
	children,
	variant,
}: HeadingProps) {
	const Tag = tag as keyof JSX.IntrinsicElements
	let headingStyles = ""

	switch (variant) {
		case "display":
			headingStyles =
				"text-displaySmall md:text-displayMedium lg:text-displayLarge font-normal"
			break
		case "headline":
			headingStyles =
				"text-headlineSmall md:text-headlineMedium lg:text-headlineLarge"
			break
		case "title":
			headingStyles = "text-titleSmall md:text-titleMedium lg:text-titleLarge"
			break
		default:
			headingStyles =
				"text-displaySmall md:text-displayMedium lg:text-displayLarge"
			break
	}

	return (
		<Tag className={`${styles} ${headingStyles} leading-none tracking-tight`}>
			{children}
		</Tag>
	)
}
