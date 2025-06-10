"use client";

import { useEffect, useRef, useState } from "react";

export default function AutoGrid() {
   const containerRef = useRef<HTMLDivElement>(null);
   const [columns, setColumns] = useState(0);

   useEffect(() => {
      const updateGrid = () => {
         const containerWidth = containerRef.current?.offsetWidth || 0;
         const colCount = Math.floor(containerWidth / 30);
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
            className="absolute top-8 w-full h-[50vh] flex border-y border-faded-10"
         >
            {Array.from({ length: columns }).map((_, i) => (
               <div
                  key={i}
                  className={`flex-1 min-w-[30px] h-full transition-colors duration-300 hover:bg-secondary ${
                     i !== columns - 1 ? "border-r border-faded-10" : ""
                  }`}
               ></div>
            ))}
         </div>
      </div>
   );
}
