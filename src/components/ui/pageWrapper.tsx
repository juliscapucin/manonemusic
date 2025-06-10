"use client";

type PageWrapperProps = {
   children: React.ReactNode;
   classes?: string;
   ref: React.RefObject<HTMLDivElement | null>;
};

export default function PageWrapper({
   children,
   classes,
   ref,
}: PageWrapperProps) {
   return (
      <div
         ref={ref}
         className={`page-wrapper relative w-full h-screen min-h-svh pt-16 pb-20 lg:pb-8 lg:pr-40 overflow-y-scroll overflow-x-clip lg:ml-8 ${classes || ""}`}
         id="page-wrapper"
      >
         {children}
      </div>
   );
}
