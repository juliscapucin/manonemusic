"use client";

import { useRef } from "react";

import { location } from "@/utils/constants";

import { Copyright, Status } from "@/components";
import {
   Heading,
   Logo,
   SectionWrapper,
   TextBlock,
   TitleHeadline,
} from "@/components/ui";

import type { HomePage } from "@/types";

type HomePageProps = {
   subtitle: string;
};

export default function HomePage({ subtitle }: HomePageProps) {
   const titleHomeRef = useRef(null);

   return (
      <SectionWrapper classes="h-[90svh] lg:pt-20 lg:pb-20">
         <div className="mx-4 lg:mx-8 h-full flex flex-col justify-between">
            <div ref={titleHomeRef} className="gsap-section-title mt-2 lg:mt-0">
               <Logo />
               <h2 className="text-titleLarge text-balance max-w-[60%] lg:max-w-[400px] mt-2">
                  {subtitle}
               </h2>
            </div>

            <div className="flex items-end">
               <Status location={location} />

               <div>
                  <p>[Selected works]</p>
                  <Copyright />
               </div>
            </div>
         </div>
      </SectionWrapper>
   );
}
