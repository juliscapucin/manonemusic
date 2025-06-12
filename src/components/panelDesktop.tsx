"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { AllData, NavLink } from "@/types";
import { PanelContent } from "@/components";
import { useWindowDimensions } from "@/hooks";
import { animateSplitText } from "@/animations";
import { panelsEnter } from "@/lib/animations";
import { ScrollProgress } from "./ui";
import scrollProgress from "./ui/scrollProgress";

type PanelDesktopProps = {
   data: AllData;
   sections: NavLink[];
};

export default function PanelDesktop({ data, sections }: PanelDesktopProps) {
   const panelsContainerRef = useRef<HTMLDivElement | null>(null);
   const [tween, setTween] = useState<gsap.core.Tween | null>(null);
   // const [scrollProgress, setScrollProgress] = useState(0);
   const scrollProgressRef = useRef(0);
   const { width } = useWindowDimensions();

   // Smooth Scroll
   useLayoutEffect(() => {
      gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

      ScrollSmoother.create({
         effects: true,
         smooth: 1,
         normalizeScroll: true,
         ease: "power3",
      });
   }, []);

   // Horizontal Panel animation
   useGSAP(() => {
      if (!panelsContainerRef.current) return;
      gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

      /* Panels */
      const container = panelsContainerRef.current;

      const tweenRef = gsap.to(".gsap-panels-container", {
         x: () => -1 * (container.scrollWidth - innerWidth),
         duration: 5,
         ease: "none",
         scrollTrigger: {
            trigger: container,
            pin: true,
            start: "top top",
            scrub: 1,
            end: () => "+=" + (container.scrollWidth - container.offsetWidth),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
               scrollProgressRef.current = self.progress * 100;
            },
            // markers: true,
         },
      });

      // set Ref value to pass to title animations
      setTween(tweenRef);
   }, []);

   // Left/right gestures through trackpad
   useEffect(() => {
      const container = panelsContainerRef.current;
      if (!container) return;

      const onWheel = (e: WheelEvent) => {
         // Ignore vertical scrolls
         if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

         e.preventDefault(); // Prevent horizontal native scroll
         window.scrollBy({
            top: e.deltaX, // Translate horizontal delta into vertical scroll
            behavior: "auto",
         });
      };

      window.addEventListener("wheel", onWheel, { passive: false });

      return () => {
         window.removeEventListener("wheel", onWheel);
      };
   }, []);

   // Title animations + routing funcionality
   useGSAP(
      () => {
         // Start ScrollTrigger when window is in desktop breakpoint
         if (width < 1024 || !tween) return;

         gsap.registerPlugin(ScrollTrigger);

         // Wait for the panels to slide into position before starting routing functionality
         setTimeout(() => {
            const titles = panelsContainerRef.current?.querySelectorAll(
               ".gsap-section-title",
            ) as HTMLHeadingElement[] | undefined;

            if (!titles) return;

            // Title ScrollTrigger + route handler
            titles.forEach((title, index) => {
               if (!title) return;
               let slug =
                  index === 0
                     ? "/"
                     : `/${title.innerText.toLowerCase().replace(/\s+/g, "-")}`;
               if (!slug) return;

               ScrollTrigger.create({
                  trigger: title,
                  start: index === 0 ? "left+=30 left" : "left right-=400",
                  end: "right center",
                  invalidateOnRefresh: true,
                  animation:
                     index === 0 ? undefined : animateSplitText(title, 2000), // don't run animation on home section
                  toggleActions: "play none none reverse",
                  fastScrollEnd: true,
                  horizontal: true,
                  containerAnimation: tween,
                  // markers: true,
                  onToggle: (self) => {
                     // Only update pathname / history if trigger is active and if new section
                     if (self.isActive && window.location.pathname !== slug) {
                        // Check how deep route is '/' Ex: '/film/sodo-express' vs '/film'
                        const slashCount = (
                           window.location.pathname.match(/\//g) || []
                        ).length;

                        // If first level
                        if (slashCount < 2) {
                           window.history.pushState(null, "", slug);
                        }
                     }
                  },
               });

               // Pin Title Horizontally on long sections
               const projectsMenu = title.parentElement
                  ?.nextElementSibling as HTMLElement;

               const projectsMenuWidth = projectsMenu?.offsetWidth;

               if (!projectsMenuWidth || projectsMenuWidth < window.innerWidth)
                  return;

               gsap.to(title, {
                  scrollTrigger: {
                     scrub: true,
                     trigger: projectsMenu,
                     start: "left-=20 left",
                     end: () => "+=" + (projectsMenuWidth - window.innerWidth),
                     invalidateOnRefresh: true,
                     // markers: true,
                     containerAnimation: tween,
                  },
                  x: () => "+=" + (projectsMenuWidth - window.innerWidth),
                  ease: "none",
               });
            }, panelsContainerRef.current);
         }, 10); // Delay routing functionality

         return () => {
            ScrollTrigger.killAll();
         };
      },
      { dependencies: [tween], scope: panelsContainerRef },
   );

   // Fade in panels on load
   useEffect(() => {
      if (!panelsContainerRef.current) return;
      panelsEnter(panelsContainerRef.current as HTMLDivElement);
   }, [panelsContainerRef]);

   return (
      <>
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <div
                  ref={panelsContainerRef}
                  className="gsap-panels-container relative flex gap-96 opacity-0"
               >
                  {sections.map((section) => {
                     return (
                        <section
                           data-id={`panel-${section.slug === "/" ? "home" : section.slug}`}
                           className="gsap-panel h-screen min-h-full px-8 min-w-fit w-fit"
                           key={`panel-${section.slug}`}
                        >
                           <PanelContent data={data} section={section.slug} />
                        </section>
                     );
                  })}
               </div>
            </div>
         </div>
         <ScrollProgress progressRef={scrollProgressRef} />
      </>
   );
}
