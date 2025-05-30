"use client";

import { Heading } from "@/components/ui";

type TitleProps = {
   ref?: React.RefObject<HTMLDivElement | null>;
   children: string;
   classes?: string;
};

export default function TitleDisplay({ children, classes, ref }: TitleProps) {
   return (
      <div
         className={`mt-16 landscape:mt-24 mb-8 opacity-90 ${classes || ""}`}
         ref={ref}
      >
         <Heading
            tag={"h2"}
            classes="gsap-section-title whitespace-nowrap uppercase"
            variant="display"
         >
            {children}
         </Heading>
      </div>
   );
}
