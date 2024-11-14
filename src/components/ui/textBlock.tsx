import { PortableText, PortableTextBlock } from "next-sanity"

type TextBlockProps = {
	text: PortableTextBlock[]
}

export default function TextBlock({ text }: TextBlockProps) {
	return (
		<div className='space-y-8 max-w-prose'>
			<PortableText value={text} onMissingComponent={false} />
		</div>
	)
}
