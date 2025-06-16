"use client";

type PageWrapperProps = {
   children: React.ReactNode;
   classes?: string;
   ref?: React.RefObject<HTMLDivElement | null>;
};

export default function PageWrapper({
   children,
   classes,
   ref,
}: PageWrapperProps) {
   return (
      <main
         ref={ref}
         className={`page-wrapper relative w-full h-dvh pt-16 pb-20 lg:pb-8 lg:pr-40 lg:ml-8 ${classes || ""}`}
         id="page-wrapper"
      >
         {children}
      </main>
   );
}
