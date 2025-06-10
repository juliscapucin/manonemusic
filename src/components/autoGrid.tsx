"use client";

import { useEffect, useRef, useState } from "react";

export default function AutoGrid() {
   const containerRef = useRef<HTMLDivElement>(null);
   const [columns, setColumns] = useState(0);

   useEffect(() => {
      const updateGrid = () => {
         const containerWidth = containerRef.current?.offsetWidth || 0;
         const colCount = Math.floor(containerWidth / 60);
         setColumns(colCount - 1);
      };

      updateGrid();
      window.addEventListener("resize", updateGrid);
      return () => window.removeEventListener("resize", updateGrid);
   }, []);

   return (
      <div className="autogrid absolute inset-0 min-w-full min-h-full">
         <div
            ref={containerRef}
            className="absolute top-8 w-full h-[50vh] flex border-y border-faded"
         >
            {Array.from({ length: columns }).map((_, i) => (
               <div
                  key={i}
                  className={`relative flex-1 min-w-[60px] h-full group overflow-clip ${
                     i !== columns - 1 ? "border-r border-faded" : ""
                  }`}
               >
                  <div className="w-full h-full bg-faded-70 transition-transform duration-500 -translate-y-[92%] group-hover:translate-y-0 mix-blend-plus-lighter"></div>
               </div>
            ))}
         </div>
      </div>
   );
}
