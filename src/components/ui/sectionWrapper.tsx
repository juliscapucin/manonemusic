"use client";

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
         className="section-wrapper relative custom-min-w-screen lg:w-fit h-fit lg:h-full pt-16 lg:pt-0 pb-8 px-4 lg:px-0 lg:pb-40 lg:flex justify-between items-center overflow-clip"
      >
         <div className={`items-end ${classes || ""}`}>{children}</div>
      </div>
   );
}
