"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

import { SectionWrapper } from "@/components/ui";
import { animateSplitTextVertical } from "@/lib/animations";

export default function IntroPage() {
   const logoRef1 = useRef(null);
   const logoRef2 = useRef(null);
   const maskRef = useRef(null);

   useEffect(() => {
      if (!logoRef1.current || !logoRef2.current || !maskRef.current) return;
      animateSplitTextVertical(logoRef1.current);
      animateSplitTextVertical(logoRef2.current, undefined, 0.2);

      // REVEAL
      gsap.to(maskRef.current, {
         clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
         delay: 2,
         duration: 0.6,
         ease: "power2.inOut",
      });
   }, []);

   return (
      <div
         ref={maskRef}
         className="fixed top-0 left-0 right-0 bottom-0 px-4 lg:px-8 bg-primary z-intro pointer-events-none"
         style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
         }}
      >
         {/* Header spacer */}
         <div className="fixed left-0 top-0 right-0 h-(--header-height-mobile) bg-primary border-b border-faded z-header"></div>
         <SectionWrapper classes="h-[90svh] lg:pt-20 lg:pb-20">
            <div className="mx-4 lg:mx-8 h-full flex flex-col justify-between">
               <div className="gsap-section-title mt-2 lg:mt-0 overflow-y-clip">
                  <h1
                     ref={logoRef1}
                     className="logo pointer-events-none text-faded-70 overflow-y-clip"
                  >
                     MAN/ONE
                  </h1>
                  <h1
                     ref={logoRef2}
                     className="logo pointer-events-none text-faded-70 overflow-y-clip"
                  >
                     MUSIC
                  </h1>
               </div>
            </div>
         </SectionWrapper>
      </div>
   );
}
