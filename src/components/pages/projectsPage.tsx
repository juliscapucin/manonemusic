"use client";

import { useRef } from "react";

import { ProjectsMenu } from "@/components";

import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui";

import { PortfolioItem, PortfolioPage } from "@/types";

type ProjectPageProps = {
   projectsPageData: PortfolioPage;
   projects?: PortfolioItem[];
};

export default function ProjectsPage({
   projectsPageData,
   projects,
}: ProjectPageProps) {
   const titleRef = useRef(null);

   return (
      projectsPageData &&
      projects && (
         <SectionWrapper classes="h-fit">
            <TitleDisplay ref={titleRef}>{projectsPageData.title}</TitleDisplay>
            {projects && projectsPageData.title && (
               <ProjectsMenu
                  variant="section"
                  section={projectsPageData.title
                     .toLowerCase()
                     .replace(/\s/g, "-")}
                  projects={projects}
               />
            )}
         </SectionWrapper>
      )
   );
}
