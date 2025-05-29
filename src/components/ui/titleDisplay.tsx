"use client";

import { forwardRef } from "react";

import { Heading } from "@/components/ui";

type TitleProps = {
   children: string;
   classes?: string;
};

export const TitleDisplay = forwardRef(function Title(
   { children, classes }: TitleProps,
   ref: React.Ref<HTMLDivElement>,
) {
   return (
      <div
         className={`mt-16 landscape:mt-24 mb-8 overflow-clip ${classes || ""}`}
         ref={ref}
      >
         <Heading
            tag={"h2"}
            classes="gsap-section-title whitespace-nowrap uppercase bg-primary"
            variant="display"
         >
            {children}
         </Heading>
      </div>
   );
});
