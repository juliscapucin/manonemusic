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
         className="section-wrapper relative custom-min-w-screen landscape:w-fit h-fit landscape:h-full pt-16 landscape:pt-0 pb-8 px-4 landscape:px-0 landscape:pb-40 landscape:flex justify-between items-center overflow-clip"
      >
         <div className={`items-end ${classes || ""}`}>{children}</div>
      </div>
   );
}
