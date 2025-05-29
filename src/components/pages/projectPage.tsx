"use client";

import { useRef, useState } from "react";

import gsap from "gsap";

import { PageWrapper, TitleHeadline } from "@/components/ui";
import { Project } from "@/types";
import { ButtonBack } from "@/components/buttons";
import { ProjectInfo, ProjectPageContent, ProjectTrailer } from "@/components";
import { useTransitionOnEnter } from "@/hooks";
import { useGSAP } from "@gsap/react";

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
      <div className="relative w-screen h-screen bg-primary overflow-hidden">
         <PageWrapper ref={pageWrapperRef}>
            {/* Project Page */}
            <div className="gsap-project-page opacity-0">
               <ButtonBack slug={section} />

               <TitleHeadline>{projectPageData.title}</TitleHeadline>
               <ProjectInfo
                  projectInfo={{
                     releaseDate: projectPageData.releaseDate,
                     info: projectPageData.info,
                  }}
               />
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
