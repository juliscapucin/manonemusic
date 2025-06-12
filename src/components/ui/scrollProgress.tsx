"use client";

import { useEffect, useRef } from "react";

type ScrollProgressProps = {
   progressRef: React.RefObject<number>;
};

export default function ScrollProgress({ progressRef }: ScrollProgressProps) {
   const localRef = useRef<HTMLDivElement>(null);
   const scrollValue = useRef(0); // Displayed value

   useEffect(() => {
      let frameId: number;

      const lerp = (start: number, end: number, t: number) => {
         return start * (1 - t) + end * t;
      };

      const update = () => {
         const target = progressRef.current ?? 0;

         // Lerp toward the target progress (t weakens smoothing strength)
         scrollValue.current = lerp(scrollValue.current, target, 0.1);

         if (localRef.current) {
            const x = Math.max(0, Math.min(100, scrollValue.current));
            localRef.current.style.transform = `translateX(-${100 - x}%)`;
         }

         frameId = requestAnimationFrame(update);
      };

      frameId = requestAnimationFrame(update);

      return () => cancelAnimationFrame(frameId);
   }, [progressRef]);

   return (
      <div className="fixed bottom-0 w-full h-1 overflow-clip z-30">
         <div
            ref={localRef}
            className="h-full bg-secondary -translate-x-full will-change-transform"
         ></div>
      </div>
   );
}
