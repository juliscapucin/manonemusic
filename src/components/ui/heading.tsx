type HeadingProps = {
	tag: string
	styles: string
	children: string
}

export default function Heading({ tag, styles, children }: HeadingProps) {
	const Tag = tag as keyof JSX.IntrinsicElements

	return (
		<Tag className={`${styles} font-normal leading-none tracking-tight`}>
			{children}
		</Tag>
	)
}
