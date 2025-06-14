import { PortableText, PortableTextBlock } from "next-sanity";

type TextBlockProps = {
   text: PortableTextBlock[];
   classes?: string;
};

export default function TextBlock({ text, classes }: TextBlockProps) {
   return (
      <div
         className={`space-y-8 max-w-prose *:lg:text-bodySmall *:xl:text-bodyMedium ${classes}`}
      >
         <PortableText value={text} onMissingComponent={false} />
      </div>
   );
}
