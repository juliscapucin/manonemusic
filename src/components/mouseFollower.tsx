"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { IconChevron } from "@/components/icons";

type Props = {
   variant: "big" | "small";
};

export default function MouseFollower({ variant }: Props) {
   const refCursor = useRef<HTMLDivElement | null>(null);
   const [isActive, setIsActive] = useState(true);
   const activityTimeout = useRef<NodeJS.Timeout | null>(null);

   // Shared activity handler (scroll or mousemove)
   const triggerActivity = () => {
      setIsActive(true);
      if (activityTimeout.current) clearTimeout(activityTimeout.current);
      activityTimeout.current = setTimeout(() => {
         setIsActive(false);
      }, 3000); // hide after 3s of inactivity
   };

   // Scroll detection
   useEffect(() => {
      window.addEventListener("scroll", triggerActivity, { passive: true });
      return () => {
         window.removeEventListener("scroll", triggerActivity);
         if (activityTimeout.current) clearTimeout(activityTimeout.current);
      };
   }, []);

   // Mouse movement detection
   useEffect(() => {
      const cursorDiv = refCursor.current;
      if (!cursorDiv || !cursorDiv.parentElement) return;

      gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 });

      const moveCursor = (e: MouseEvent) => {
         const parentRect = cursorDiv.parentElement!.getBoundingClientRect();
         const relativeX = e.clientX - parentRect.left;

         triggerActivity();

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
   }, [variant]);

   return (
      <div
         ref={refCursor}
         className={`fixed top-0 left-0 rounded-full flex items-center justify-center z-15 pointer-events-none border transition-opacity duration-500
            ${variant === "big" ? "w-40 h-40 bg-primary/30 border-secondary" : "w-24 h-24 bg-primary/30 border-secondary"}
            ${isActive ? "opacity-0" : "opacity-100"}`}
      >
         <div className="flex items-center gap-8">
            <IconChevron direction="back" />
            <span
               className={`${
                  variant === "big"
                     ? "text-titleLarge font-extralight"
                     : "text-labelLarge text-secondary"
               }`}
            >
               SCROLL
            </span>
            <IconChevron direction="forward" />
         </div>
      </div>
   );
}
