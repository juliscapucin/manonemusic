"use client";

import { useGSAP } from "@gsap/react";

import { PortfolioItem } from "@/types";
import { ProjectCard } from "@/components";
import { useWindowDimensions } from "@/hooks";
import { useRef, useState } from "react";
import { carouselLoop } from "@/lib/animations";
import { ButtonsCarousel } from "@/components/buttons";

type ProjectsMenuProps = {
   projects: PortfolioItem[];
   variant: "section" | "page";
   section: string;
};

export default function ProjectsMenu({
   projects,
   section,
   variant,
}: ProjectsMenuProps) {
   const { width } = useWindowDimensions();

   const outerContainerRef = useRef<HTMLDivElement | null>(null);
   const cardsContainerRef = useRef<HTMLDivElement | null>(null);
   const tlRef = useRef<gsap.core.Timeline | null>(null);

   const [timelineReady, setTimelineReady] = useState(false);
   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
   const [activeCarouselImage, setActiveCarouselImage] = useState(0);

   const handleCardHover = (arg: number | null) => setHoveredCard(arg);

   // MOBILE: Carousel
   useGSAP(() => {
      if (
         !outerContainerRef.current ||
         !cardsContainerRef.current ||
         width >= 1024
      ) {
         setTimelineReady(false);
         if (tlRef.current) {
            tlRef.current.kill();
            tlRef.current = null;
         }
         return;
      }

      const wrapper = outerContainerRef.current;
      const cards = Array.from(cardsContainerRef.current.children);

      tlRef.current = carouselLoop(
         cards,
         {
            paused: true,
            paddingRight: 16,
            draggable: true,
            speed: 0.5,
         },
         wrapper,
         setActiveCarouselImage,
      );

      setTimelineReady(true);
   }, [width]);

   return (
      <div className="relative z-10">
         <div
            ref={outerContainerRef}
            id="projects-menu"
            className={
               "gsap-projects-menu w-full h-[52svh] lg:h-72 overflow-x-visible lg:w-fit mx-4 lg:mx-0 pb-24 lg:pb-8 lg:pt-8 lg:border-b border-t border-faded bg-primary"
            }
         >
            <div
               ref={cardsContainerRef}
               className="relative w-fit h-full flex items-start justify-start gap-8 lg:gap-32 px-4 lg:px-8 pb-10 pt-2 lg:pt-0 lg:pb-4 mt-16 lg:mt-0"
            >
               {projects?.map((project: PortfolioItem, index) => {
                  return (
                     <ProjectCard
                        key={project.slug}
                        {...{
                           variant,
                           section,
                           title: project.title,
                           image: project.image,
                           slug: project.slug,
                           index,
                           isMobile: width < 1024,
                           handleCardHover,
                           hoveredCard,
                        }}
                     />
                  );
               })}
            </div>
         </div>
         {/* CAROUSEL ELEMENTS ON MOBILE */}
         {width < 1024 && timelineReady && tlRef.current && (
            <ButtonsCarousel
               tl={tlRef.current}
               itemsCount={projects.length}
               activeCarouselImage={activeCarouselImage}
               setActiveCarouselImage={setActiveCarouselImage}
            />
         )}
      </div>
   );
}
