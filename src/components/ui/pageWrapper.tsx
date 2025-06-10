"use client";

import React, { forwardRef } from "react";

type PageWrapperProps = {
   children: React.ReactNode;
   classes?: string;
};

const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
   ({ children, classes }, ref) => {
      return (
         <div
            ref={ref}
            className={`page-wrapper relative w-screen h-screen min-h-svh pt-28 pb-32 lg:pb-8 pr-8 lg:pr-32 overflow-y-scroll overflow-x-clip border-l border-faded ml-8 ${classes || ""}`}
            id="page-wrapper"
         >
            {children}
         </div>
      );
   },
);

PageWrapper.displayName = "PageWrapper";

export default PageWrapper;
