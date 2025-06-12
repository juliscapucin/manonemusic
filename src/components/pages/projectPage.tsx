"use client";

import { useRef, useState } from "react";

import gsap from "gsap";

import { PageWrapper, TitleHeadline } from "@/components/ui";
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

   return (
      <div className="relative w-screen h-screen bg-primary overflow-hidden pl-4 lg:px-0">
         <PageWrapper ref={pageWrapperRef}>
            {/* Project Page */}
            <div className="gsap-project-page opacity-0 mr-4 pt-4 border-l border-r border-faded pb-16 lg:pb-8">
               <ButtonBack slug={section} />
               <div className="px-4 lg:px-8 mt-16 overflow-clip">
                  <AutoGrid />
                  <TitleHeadline>{projectPageData.title}</TitleHeadline>

                  {/* RENDER RELEASE DATE ONLY ON RELEASES */}
                  <div className="gsap-project-content mt-4">
                     {pathname.includes("releases") &&
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
                        )}
                     {projectPageData.info && <p>{projectPageData.info}</p>}
                  </div>
               </div>
               <ProjectPageContent
                  {...projectPageData}
                  setIsTrailerActive={setIsTrailerActive}
                  setIsPageDisplaced={setIsPageDisplaced}
               />
            </div>
         </PageWrapper>

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
      </div>
   );
}
