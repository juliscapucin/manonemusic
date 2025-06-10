"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { PortfolioItem, PortfolioPage } from "@/types";
import { ProjectCard } from "@/components";

type ProjectsMenuPageProps = {
   projectsData: PortfolioItem[];
   pageData: PortfolioPage;
};

export default function ProjectsMenuPage({
   projectsData,
   pageData,
}: ProjectsMenuPageProps) {
   const menuDesktopRef = useRef<HTMLDivElement>(null);

   // Enter animation
   useGSAP(
      () => {
         if (!menuDesktopRef.current || !menuDesktopRef.current?.children)
            return;

         gsap.fromTo(
            menuDesktopRef.current.children,
            {
               xPercent: 100,
            },
            { xPercent: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
         );
      },
      { dependencies: [], scope: menuDesktopRef },
   );

   return (
      <>
         {/* Mobile */}
         <aside className="fixed h-24 w-full bottom-0 flex gap-4 overflow-x-scroll z-10 lg:hidden p-4 bg-primary">
            {projectsData?.map((project: PortfolioItem, index) => {
               return (
                  <ProjectCard
                     index={index}
                     variant="page"
                     section={pageData.slug}
                     key={project.slug}
                     title={project.title}
                     image={project.image}
                     slug={project.slug}
                     handleCardHover={null}
                     hoveredCard={null}
                  />
               );
            })}
         </aside>

         {/* Desktop */}
         <aside
            ref={menuDesktopRef}
            className={
               "gsap-projects-menu-page hidden lg:flex fixed w-36 top-16 right-2 bottom-0 flex-col gap-4 overflow-y-scroll overflow-x-visible z-10 opacity-0 lg:opacity-100 border-l border-faded py-4 pl-4 bg-primary"
            }
         >
            {projectsData?.map((project: PortfolioItem, index) => {
               return (
                  <ProjectCard
                     index={index}
                     variant="page"
                     section={pageData.slug}
                     key={project.slug}
                     title={project.title}
                     image={project.image}
                     slug={project.slug}
                     handleCardHover={null}
                     hoveredCard={null}
                  />
               );
            })}
         </aside>
      </>
   );
}
