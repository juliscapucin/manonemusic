"use client";

import { AutoGrid } from "@/components";

type SectionWrapperProps = {
   children: React.ReactNode;
   classes?: string;
   ref?: React.Ref<HTMLDivElement>;
};

export default function SectionWrapper({
   children,
   classes,
   ref,
}: SectionWrapperProps) {
   return (
      <div
         ref={ref}
         className="section-wrapper relative w-screen custom-min-w-screen lg:w-fit lg:min-h-svh pt-16 lg:pt-0 pb-8 px-0 lg:flex justify-between items-center overflow-clip lg:border border-faded"
      >
         <div className={`bg-primary ${classes || ""}`}>{children}</div>
         <AutoGrid />
      </div>
   );
}
