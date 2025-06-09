"use client";

import { useGSAP } from "@gsap/react";

import { PortfolioItem } from "@/types";
import { MouseFollower, ProjectCard } from "@/components";
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
         width > 1024
      )
         return;

      const wrapper = outerContainerRef.current;
      const cards = Array.from(cardsContainerRef.current.children);

      tlRef.current = carouselLoop(
         cards,
         {
            paused: true,
            paddingRight: 32,
            draggable: true,
            speed: 0.5,
         },
         wrapper,
         setActiveCarouselImage,
      );

      setTimelineReady(true);
   }, [width]);

   return (
      <div
         ref={outerContainerRef}
         id="projects-menu"
         className={
            "gsap-projects-menu relative w-full h-96 lg:h-80 overflow-x-visible lg:w-fit pb-16 lg:pb-8 lg:pt-8"
         }
      >
         {/* TODO: Make this work <MouseFollower isHovering={hoveredCard !== null} variant="big" /> */}
         <div
            ref={cardsContainerRef}
            className="relative w-fit h-full flex items-start justify-start gap-16 lg:gap-32 px-4 lg:px-8 py-8 lg:pb-8 border-t border-b border-faded-10"
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
                        imageTexture: project.imageTexture,
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
         {/* CAROUSEL ELEMENTS ON MOBILE */}
         {timelineReady && tlRef.current && (
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
