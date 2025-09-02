"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { IconChevron } from "@/components/icons";
import { usePathname } from "next/navigation";

type Props = {
   variant: "big" | "small";
};

export default function MouseFollower({ variant }: Props) {
   const refCursor = useRef<HTMLDivElement | null>(null);
   const [isActive, setIsActive] = useState(true);
   const activityTimeout = useRef<NodeJS.Timeout | null>(null);
   const pathname = usePathname();

   // Shared activity handler (scroll or mousemove)
   const triggerActivity = (pathname: string) => {
      setIsActive(pathname !== "/");

      if (activityTimeout.current) clearTimeout(activityTimeout.current);
      activityTimeout.current = setTimeout(() => {
         setIsActive(false);
      }, 3000); // show after 3s of inactivity
   };

   // Scroll detection
   useEffect(() => {
      window.addEventListener("scroll", () => triggerActivity(pathname), {
         passive: true,
      });
      return () => {
         window.removeEventListener("scroll", () => triggerActivity(pathname));
         if (activityTimeout.current) clearTimeout(activityTimeout.current);
      };
   }, [pathname]);

   // Mouse movement detection
   useEffect(() => {
      const cursorDiv = refCursor.current;
      if (!cursorDiv || !cursorDiv.parentElement) return;

      gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 });

      const moveCursor = (e: MouseEvent) => {
         const parentRect = cursorDiv.parentElement?.getBoundingClientRect();

         if (!parentRect) return;
         const relativeX = e.clientX - parentRect.left;

         triggerActivity(pathname);

         gsap.to(cursorDiv, {
            x: relativeX,
            y: e.clientY,
            duration: 0.3,
         });
      };

      const parent = cursorDiv.parentElement;
      parent.addEventListener("mousemove", moveCursor);

      return () => {
         parent.removeEventListener("mousemove", moveCursor);
      };
   }, [variant, pathname]);

   return (
      <div
         ref={refCursor}
         className={`fixed top-0 left-0 rounded-full flex items-center justify-center z-15 pointer-events-none border transition-opacity duration-700
            ${variant === "big" ? "w-40 h-40 bg-primary/30 border-secondary" : "w-24 h-24 bg-primary/30 border-secondary"}
            ${isActive ? "opacity-0" : "opacity-100"}`}
      >
         <div className="flex items-center gap-8">
            <IconChevron direction="back" />
            <span
               className={`${
                  variant === "big"
                     ? "text-title-large font-extralight"
                     : "text-label-large text-secondary"
               }`}
            >
               SCROLL
            </span>
            <IconChevron direction="forward" />
         </div>
      </div>
   );
}
