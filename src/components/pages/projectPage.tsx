"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import { TitleHeadline } from "@/components/ui";
import { Project } from "@/types";
import { ButtonBack } from "@/components/buttons";
import { AutoGrid, ProjectPageContent, ProjectTrailer } from "@/components";
import { useTransitionOnEnter } from "@/hooks";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

type ProjectPageProps = {
   projectPageData: Project;
   section: string;
};

export default function ProjectPage({
   projectPageData,
   section,
}: ProjectPageProps) {
   const [isTrailerActive, setIsTrailerActive] = useState(false);
   const [isPageDisplaced, setIsPageDisplaced] = useState(false);
   const pageWrapperRef = useRef<HTMLDivElement>(null);
   const pathname = usePathname();

   useTransitionOnEnter();

   useGSAP(() => {
      if (!pageWrapperRef.current) return;

      if (isPageDisplaced) {
         const tl = gsap.timeline();
         tl.to(pageWrapperRef.current, {
            duration: 0.6,
            yPercent: -30,
            opacity: 0,
         });
      } else {
         const tl = gsap.timeline();
         tl.to(pageWrapperRef.current, {
            duration: 0.4,
            yPercent: 0,
            opacity: 1,
         });
      }
   }, [isPageDisplaced, pageWrapperRef]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   return (
      <>
         <main
            ref={pageWrapperRef}
            className="page-wrapper relative w-full h-svh overflow-x-clip md:overflow-clip pt-16 pb-20 lg:pb-8 lg:pr-40 lg:ml-8"
            id="page-wrapper"
         >
            {/* Outlines */}
            <div className="gsap-project-page h-full flex flex-col ml-4 lg:ml-0 mr-4 border-l border-r border-faded">
               {/* Back Button */}
               <ButtonBack slug={section} />

               {/* Header */}
               <div className="px-4 lg:px-8 mt-16">
                  <AutoGrid />
                  <TitleHeadline>{projectPageData.title}</TitleHeadline>

                  {/* Info */}
                  <div className="gsap-project-content mt-2">
                     {
                        // Render release date only on releases
                        pathname.includes("releases") &&
                           projectPageData.releaseDate && (
                              <p>
                                 Released{" "}
                                 {new Date(
                                    projectPageData.releaseDate,
                                 ).toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                 })}
                              </p>
                           )
                     }
                     {projectPageData.info && <p>{projectPageData.info}</p>}
                  </div>
               </div>

               {/* Content */}
               <ProjectPageContent
                  {...projectPageData}
                  setIsTrailerActive={setIsTrailerActive}
                  setIsPageDisplaced={setIsPageDisplaced}
               />
            </div>
         </main>
         {/* Trailer */}
         {projectPageData.projectVideo && isTrailerActive && (
            <ProjectTrailer
               {...{
                  videoUrl: projectPageData.projectVideo,
                  isTrailerActive,
                  setIsTrailerActive,
                  setIsPageDisplaced,
               }}
            />
         )}
      </>
   );
}
