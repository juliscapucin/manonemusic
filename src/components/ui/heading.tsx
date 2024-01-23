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
			headingStyles = "text-displayMedium md:text-displayLarge font-normal"
			break
		case "headline":
			headingStyles = "text-headlineMedium md:text-headlineLarge"
			break
		case "title":
			headingStyles = "text-titleMedium md:text-titleLarge"
			break
		default:
			headingStyles = "text-displayMedium md:text-displayLarge"
			break
	}

	return (
		<Tag className={`${styles} ${headingStyles} leading-none tracking-tight`}>
			{children}
		</Tag>
	)
}
